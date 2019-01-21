<template>
    <div class="view-container">
        <h2 class="view-title">
            {{title}}
        </h2>
        <div class="container-main user-team">
            <div class="step-box">
                <div class="step">
                    <span class='diff'>员工管理</span>
                    <span v-if='key'>创建团队</span>
                    <span v-else>编辑团队</span>
                </div>
            </div>
            <Form ref="formEdit" :model="formEdit" :rules="ruleForm" label-position="left">
                <Form-item prop='groupName'>
                    <span class='label'>团队名称</span>
                    <Input v-model.trim="formEdit.groupName" placeholder="请输入团队名称" :maxlength='16' style='width:272px'></Input>
                </Form-item>
                <Form-item>
                    <span class='label'>主管医生</span>
                    <img :src="defaultSrc" alt="" class="picture" />
                    <em class='name'>{{formEdit.name}}</em>
                </Form-item>
                <div class="view-title-second">
                    <h3>团队权限</h3>
                </div>
                <div class="box">
                    <Row :gutter="48">
                        <Col :sm="12" :md="8">
                            <Form-item>
                                <p class='name'>会话指派方式</p>
                                <RadioGroup v-model="talkType" vertical @on-change='setType'>
                                    <Radio :label="0">顺序轮派</Radio>
                                    <Radio :label="1">团队共享</Radio>
                                </RadioGroup>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8">
                            <Form-item>
                                <p class='name'>指派权限</p>
                                <Checkbox v-model="formEdit.changeRuleEnable">允许主管医生选择会话指派方式</Checkbox>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8">
                            <Form-item>
                                <p class='name'>主管医师权限</p>
                                <Checkbox v-model="formEdit.assignEnable">允许主管医生管理团队成员</Checkbox>
                            </Form-item>
                        </Col>
                    </Row>
                </div>
                <div class="view-title-second">
                    <h3>团队成员</h3>
                </div>
                <Form-item prop='staffIds'>
                    <Table :columns="col" :data="teamData" class='main-table'></Table>
                    <div class="more-box">
                        <p class="more" @click='showMore' v-if='moreKey'><span><Icon type="plus-round" color='#fff'></Icon></span>添加成员...</p>
                    </div>
                </Form-item>
            </Form>
            <div class="main-footer-btn">
                <Button type="ghost" @click='remove'>解散团队</Button>
                <Button type="ghost" @click='back'>取消</Button>
                <Button type="primary" :loading='saveLoad' @click='save'>保存</Button>
            </div>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>您确定要解散团队吗？</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入团队名称！'))
            } else {
                callback()
            }
        }
        const validateTeam = (rule, value, callback) => {
            console.log(value.length)
            if (value.length) {
                callback()
            } else {
                callback(new Error('请选择团队成员！'))
            }
        }
        return {
            title: '',
            defaultSrc: require('assets/images/user-default.png'),
            saveLoad: false,
            key: true,
            modal: false,
            loading: true,
            moreKey: true,
            talkType: 0,
            formEdit: {
                name: this.$route.query.name,
                groupId: '',
                staffId: this.$route.query.id,
                groupName: this.$route.query.name + '的团队',
                sequeAssign: false,
                groupAssign: true,
                changeRuleEnable: true,
                assignEnable: true,
                staffIds: []
            },
            col: [
                {
                    title: '医生',
                    render: (h, params) => {
                        return h('div', [
                                h('img', {
                                    style: {
                                        display: 'inline-block',
                                        width: '30px',
                                        height: '30px',
                                        marginRight: '8px',
                                        verticalAlign: 'top'
                                    },
                                    attrs: {
                                        src: this.baseImgURL + params.row.imagePath
                                    },
                                }),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        height: '30px',
                                        lineHeight: '30px',
                                        verticalAlign: 'top'
                                    },
                                }, params.row.name)
                            ])
                    }
                },
                {
                    title: '职位',
                    key: ''
                },
                {
                    title: '在职状态',
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        if(params.row.status) {
                            return h('div', {
                                class: 'remove-word-btn',
                                on: {
                                    click: () => {
                                        params.row.status = false
                                        const _index = this.formEdit.staffIds.findIndex(item => item === params.row.id)
                                        this.formEdit.staffIds.splice(_index, 1)
                                    }
                                }
                            }, '移除')
                        } else {
                            return h('div', {
                                class: 'invite-word-btn',
                                on: {
                                    click: () => {
                                        params.row.status = true
                                        this.formEdit.staffIds.push(params.row.id)
                                        this.$refs.formEdit.validateField('staffIds')
                                    }
                                }
                            }, '添加')
                        }
                    }
                },
            ],
            otherData: [],
            teamData: [],
            ruleForm: {
                groupName: [
                    { validator: validateName, trigger: 'blur' }
                ],
                staffIds: [
                    { validator: validateTeam, trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    created () {
        if(this.$route.query.type === 'add') {
            this.key = true
            this.getAllUser()
            this.title =  '创建团队'
        } else {
            this.key = false
            this.title =  '编辑团队'
            this.getTeamInfo(this.$route.query.id)
        }
    },
    methods: {
        getTeamInfo (id) {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staffGroup/getStaffGroupInfo.jhtml',
                data: {staffId: id},
                success: function(res){
                    if(res.code === 0 ){
                        const _teamInfo = res.content.staffGroup || {}
                        const _teamUser = res.content.staffMembers || []
                        _vm.formEdit.groupId = _teamInfo.id
                        _vm.formEdit.groupName = _teamInfo.name || _vm.$route.query.name + '的团队'
                        _vm.formEdit.sequeAssign = _teamInfo.sequeAssign
                        _vm.formEdit.groupAssign = _teamInfo.groupAssign
                        if(_teamInfo.sequeAssign && !_teamInfo.groupAssign) {
                            _vm.talkType = 1
                        }
                        _vm.formEdit.changeRuleEnable = _teamInfo.changeRuleEnable
                        _vm.formEdit.assignEnable = _teamInfo.assignEnable
                        _vm.teamData = _teamUser.filter(item => {
                            if(item.user !== _vm.$route.query.id * 1) {
                                item.id = item.user
                                item.status = true
                                _vm.formEdit.staffIds.push(item.id)
                                return item
                            }
                        })
                        _vm.getAllUser()
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        getAllUser () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staff/get_staffs.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        const _data = res.content || []
                        _vm.otherData = _data.filter(item => {
                            if(item.id !== _vm.$route.query.id * 1) {
                                const _index = _vm.formEdit.staffIds.findIndex(user => item.id === user)
                                if(_index < 0) {
                                    item.imagePath = item.image_path
                                    item.status = false
                                    return item
                                }
                            }
                        })
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        setType (val) {
            if(val) {
                this.formEdit.sequeAssign = true
                this.formEdit.groupAssign = false
            } else {
                this.formEdit.sequeAssign = false
                this.formEdit.groupAssign = true
            }
        },
        showMore () {
            this.moreKey = false
            this.teamData.push(...this.otherData)
        },
        save () {
            let _vm = this,
                _url = _vm.key ? 'doct-webManager/staffGroup/create.jhtml' : 'doct-webManager/staffGroup/editGroup.jhtml'
            _vm.$refs.formEdit.validate((valid) => {
                if (valid) {
                    _vm.saveLoad = true
                    _vm.formEdit.staffIds = _vm.formEdit.staffIds.join(',')
                    _vm.$http.post({
                        url: _url,
                        data: _vm.formEdit,
                        success: function(res) {
                            if(res.code === 0 ) {
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '操作成功！'
                                })
                                _vm.$router.go(-1)
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.desc
                                })
                                _vm.saveLoad = false
                            }
                        }
                    })
                }
            })
        },
        remove () {
            this.modal = true
        },
        ok () {
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/staffGroup/disbandGroup.jhtml',
                data: _vm.formEdit,
                success: function(res) {
                    if(res.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '操作成功！'
                        })
                        _vm.$router.push('/userList')
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                }
            })
        },
        back () {
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
    .step-box {
        margin: 4px 0 20px;
    }
    .step {
        position: relative;
        display: inline-block;
        height: 33px;
        border-left: 1px solid #E0E6ED;
        border-top: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;
        line-height: 31px;
        border-radius: 4px;
    }
    .step span {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 31px;
        font-size: 14px;
        line-height: 31px;
        text-align: center;
        color: #9e9e9e;
        background-color: #fbfbfb;
    }
    .step .diff {
        background-color: #fff;
        color: #55A8FD;
    }
    .step span:after {
        content: '';
        display: inline-block;
        position: absolute;
        background-color: #fbfbfb;
        width: 23px;
        height: 23px;
        transform: rotate(45deg);
        border-top: 1px solid #E0E6ED;
        border-right: 1px solid #E0E6ED;
        top: 4px;
        right: -9px;
        border-radius: 4px;
        z-index: 2;
    }
    .step .diff:after {
        background-color: #fff;
    }
    .label {
        padding-right: 10px;
        font-size: 14px;
        color: #757575;
    }
    .picture {
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 30px;
        margin-right: 8px;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
    }
    .name {
        font-style: normal;
        font-size: 14px;
        color: #333;
    }
    .box {
        padding: 0 20px 14px;
    }
    .more-box {
        text-align: center;
    }
    .more {
        display: inline-block;
        margin: 26px auto 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #55A8FD;
        cursor: pointer;
    }
    .more span {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 2px 2px 0 0;
        vertical-align: top;
        background-color: #55A8FD;
        border-radius: 50%;
    }
    .more i {
        position: relative;
        font-size: 10px;
        line-height: 16px;
        top: -3px;
    }
</style>
