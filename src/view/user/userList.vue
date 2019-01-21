<template>
    <div class="view-container">
        <h2 class="view-title">员工管理</h2>
        <div class="container-main user-list">
            <div class="search-title">
                <Button type="primary" @click='sendAll'>全部邀请</Button>
                <Select v-model="formAll.isBinded" @on-change='getListAll(1, formAll)'>
                    <Option v-for='item in typeList' :key='item.id' :value="item.id">{{item.name}}</Option>
                </Select>
            </div>
            <Table :columns="colAll" :data="dataAll" :loading='tableAllLoad' @on-row-click='editUserInfo'></Table>
            <Page :total="totalAll" :current='pageNumberAll' :page-size='pageSize' @on-change='changePageAll'></Page>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p v-if='sendKey'>您确定要邀请{{bindUser.name}}绑定医院吗？</p>
            <p v-if='sendKey'>一天只能邀请一次！</p>
            <p v-if='!sendKey'>是否全部邀请！</p>
        </Modal>
        <transition name="slide-fade">
            <cmptUserRightBar :rightInfo='rightInfo' v-show='userKey' @closeRightBar='close'></cmptUserRightBar>
        </transition>
    </div>
</template>

<script>
import cmptUserRightBar from 'components/userRightBar.vue'
export default {
    components: {cmptUserRightBar},
    data () {
        return {
            defaultSrc: require('assets/images/user-default.png'),
            pageNumberAll: 1,
            totalAll: 0,
            modal: false,
            loading: true,
            tableAllLoad: false,
            userKey: false,
            sendKey: true,
            formAll: {
                isBinded: 2,
                show: ''
            },
            bindUser: {
                guardStaffId: '',
                name: '',
            },
            rightInfo: {
                positionList: [],
                gender: '',
                name: '',
            },
            serviceList: [
                {
                    id: 0,
                    name: '离职',
                    color: '#FF6242'
                },
                {
                    id: 1,
                    name: '全职',
                    color: '#56D48F'
                },
                {
                    id: 2,
                    name: '兼职',
                    color: '#FFC14A'
                }
            ],
            typeList: [],
            colAll: [
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
                                        src: this.defaultSrc
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
                    render: (h, params) => {
                        const _color = this.serviceList.filter(item => item.id === params.row.serviceStatus)[0].color || ''
                        const _text = this.serviceList.filter(item => item.id === params.row.serviceStatus)[0].name || ''
                        return h('div', [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '6px',
                                        height: '6px',
                                        marginRight: '4px',
                                        borderRadius: '50%',
                                        backgroundColor: _color
                                    }
                                }),
                                h('span', _text)
                            ])
                    }
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '绑定医院',
                    width: 110,
                    render: (h, params) => {
                        if(params.row.bindStatus === 2) {
                            return h('div', {
                                class: 'invited-word-btn'
                            }, '已邀请')
                        } else if ( params.row.bindStatus === 0 || params.row.bindStatus === 1 ) {
                            return h('div', {
                                class: 'invite-word-btn',
                                on: {
                                    click: () => {
                                        this.bind(event, params.row)
                                    }
                                }
                            }, '邀请绑定')
                        } else if (params.row.bindStatus === 5) {
                            return h('span', {
                                style: {
                                    fontSize: '14px',
                                    color: '#9e9e9e'
                                }
                            }, '已绑定')
                        }
                    }
                },
            ],
            dataAll: [],

        }
    },
    computed: {
        pageSize () {
            return this.$store.getters.getPageSize
        },
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    activated () {
        this.userKey = false
        this.rightInfo = {
            positionList: [],
            gender: '',
            name: '',
        }
    },
    mounted () {
        this.getListAll(1, this.formAll)
        this.getPositionList()
    },
    methods: {
        getListAll (pageNumber, form) {
            let _vm = this
            form.pageSize = _vm.pageSize
            form.pageNumber = pageNumber
            _vm.tableAllLoad = true
            _vm.$http.get({
                url: 'doct-webManager/guard_staff/get_page.jhtml',
                data: form,
                success: function(res){
                       console.log(form)
                    if(res.code === 0 ){
                        _vm.dataAll = res.content.page.content || []
                        _vm.pageNumberAll = res.content.page.pageNumber || 1
                        _vm.totalAll = res.content.page.total || 0
                        if(_vm.formAll.isBinded === 2) {
                            _vm.typeList = [
                                {
                                    id: 2,
                                    name: `全部成员(${_vm.totalAll})`
                                },
                                {
                                    id: 1,
                                    name: '已绑定'
                                },
                                {
                                    id: 0,
                                    name: '未绑定'
                                },
                            ]
                        }
                    } else {
                        console.log(res.data.desc)
                    }
                    _vm.tableAllLoad = false
                },
            })
        },
        getPositionList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/company/getCompanyPositions.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        let _obj = res.content || {},
                            _data = []
                        for (let i in _obj) {
                            _vm.rightInfo.positionList.push({
                                id: i * 1,
                                name:  _obj[i]
                            })
                        }
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        changePageAll (num) {
            this.getListAll(num, this.formAll)
        },
        bind (e, data) {
            e.stopPropagation()
            this.bindUser.name = data.name
            this.bindUser.guardStaffId = data.id
            this.sendKey = true
            this.modal = true
        },
        sendAll () {
            this.sendKey = false
            this.modal = true
        },
        ok () {
            let _vm = this,
                _url = _vm.sendKey ? 'doct-webManager/guard_staff/sendInvitedSmsOnce.jhtml' : 'doct-webManager/guard_staff/sendInvitedSmsAll.jhtml'
            _vm.$http.post({
                url: _url,
                data: _vm.bindUser,
                success: function(res) {
                    if(res.content.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '邀请成功！'
                        })
                        _vm.getListAll(_vm.pageNumberAll, _vm.formAll)
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                    _vm.modal = false
                },
            })
        },
        editUserInfo (data) {
            if(data.bindStatus === 5) {
                this.rightInfo.gender = data.gender
                this.rightInfo.name = data.name
                this.rightInfo.staffId = data.staffId
                this.rightInfo.companyCreateUserId = data.companyCreateUserId
                this.userKey = true
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '未绑定公司，无法获取职称及职位状态！'
                })
            }
        },
        close (bool) {
            this.userKey = false
            if(bool) {
                this.getListAll(1, this.formAll)
            }
        },
        toCusIndex (data) {
            const _userId = data.userId || ''
            this.$router.push({
                path: '/customerInfo',
                query: {
                    name: data.name,
                    id: data.companyCreateUserId,
                    mobile: data.mobile,
                    userId: _userId,
                    status: data.userBindStatus
                }
            })
        },
    }
}
</script>

<style scoped>
    .user-list .apply-title, 
    .user-list .search-title {
        height: 28px;
        margin-bottom: 16px;
    }
    .slide-fade-enter-active {
        transition: all .6s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(150px);
        opacity: 0;
    }
</style>
<style type="text/css">
    .user-list .search-title .ivu-select {
        float: right;
        width: 160px;
    }
    .user-list .search-title .ivu-btn {
        float: right;
        margin-left: 10px;    
    }
    .user-list .apply-title .ivu-btn {
        float: right;
        margin: 0px 0 0 8px;
    }
    .user-list .apply-title .del {
        float: left;
        margin: 0px 0 0 0px; 
    }
    .user-list .apply-title .ivu-select {
        float: right;
        width: 160px;
        margin-right: 12px;
    }
</style>
