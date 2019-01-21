<template>
    <div id='userRightBar'>
        <div class="right-bar">
            <div class="close" @click='close(false)'><Icon type="ios-close-empty" class='close-right'></Icon></div>
            <h3>详细资料</h3>
            <div class="basic-info">
                <img :src="userDefault" alt="" />
                <div>
                    <h2>{{rightInfo.name}}</h2>
                    <p><!-- <span>56</span> -->{{genderText}}</p>
                </div>
            </div>
            <Form ref="formEdit" :model="formEdit" label-position="left" :label-width="80">
                <FormItem prop="position" label='职位'>
                    <Select v-model="formEdit.position" style='width:200px'>
                        <Option :value="item.id" v-for='item in rightInfo.positionList' :key='item.id'>{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="serviceState" label='状态'>
                    <Select v-model="formEdit.serviceState" style='width:200px'>
                        <Option :value="1">全职</Option>
                        <Option :value="2">兼职</Option>
                    </Select>
                </FormItem>
            </Form>
            <div class="right-footer">
                <Button type="error" @click='save(false)' :loading='saveLoad'>解除绑定</Button>
                <Button type="primary" @click="toTeam('add')" v-if='teamKey'>新建团队</Button>
                <Button type="primary" @click="toTeam('edit')" v-else>编辑团队</Button>
                <Button type="primary" @click='save(true)' :loading='saveLoad'>保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userRightBar',
    props: {
        rightInfo: Object,
    },
    data () {
        return {
            teamKey: true,
            saveLoad: false,
            userDefault: require('assets/images/user-default.png'),
            formEdit: {
                companyCreateId: '',
                position: '',
                serviceState: '',
            },
        }
    },
    watch: {
        rightInfo: {
            handler (val) {
                console.log(val)
                if(val.staffId) {
                    this.getTeamInfo(val.staffId)
                    this.getCompanyInfo(val.companyCreateUserId)
                }
            },
            deep: true
        },
    },
    computed: {
        genderText () {
            if(this.rightInfo.gender === 1) {
                return '男'
            } else {
                return '女'
            }
        },
    },
    methods: {
        getTeamInfo (id) {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staffGroup/getStaffGroupInfo.jhtml',
                data: {staffId: id},
                success: function(res){
                    if(res.code === 0 ){
                        _vm.teamKey = false
                    } else {
                        _vm.teamKey = true
                        console.log(res.desc)
                    }
                },
            })
        },
        getCompanyInfo (id) {
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/staff/getStaffPositionAndServiceState.jhtml',
                data: {companyCreateId: id},
                success: function(res){
                    if(res.code === 0 ){
                        _vm.formEdit.companyCreateId = id
                        _vm.formEdit.position = res.content.companyRoleType
                        _vm.formEdit.serviceState = res.content.serviceState || 1
                    } else {
                        console.log(res.desc)
                    }
                },
            })
        },
        close (bool) {
            this.$emit('closeRightBar', bool)
        },
        save (bool) {
            let _vm = this,
                _url = ''
            if(bool) {
                _url = 'doct-webManager/staff/setStaffPositionAndServiceState.jhtml'
            } else {
                _url = 'doct-webManager/company/cancelBind.jhtml'
            }
            _vm.saveLoad = true
            _vm.$http.post({
                url: _url,
                data: _vm.formEdit,
                success: function(res){
                    if(res.code === 0 ){
                        if(!bool) {
                            _vm.close(true)
                        }
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '操作成功！'
                        })
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                        console.log(res.desc)
                    }
                    _vm.saveLoad = false
                },
            })
        },
        toTeam (type) {
            this.$router.push({
                path: '/userTeam',
                query: {
                    id: this.rightInfo.staffId,
                    name: this.rightInfo.name,
                    type: type
                }
            })
        },
    }
}
</script>

<style scoped>
    #userRightBar {
        position: fixed;
        right: 0;
        top: 170px;
        bottom: 0;
        width: 404px;
        background-color: #fff;
        border-left: 1px solid #CCCCCC;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
    }
    .right-bar {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .close {
        position: absolute;
        left: -18px;
        top: 7px;
        width: 36px;
        height: 36px;
        border-left: 1px solid #CCCCCC;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
    }
    .close .close-right {
        position: relative;
        top: 5px;
        left: 10px;
        font-size: 26px;
    }
    .right-bar h3 {
        padding: 15px 0;
        font-size: 14px;
        line-height: 20px;
        font-weight: normal;
        text-align: center;
        color: #333;
        box-shadow: inset 0 -1px 0 0 #F0F1F2;
    }
    .basic-info {
        overflow: hidden;
        padding: 16px 36px;
        margin-bottom: 24px;
    }
    .basic-info img {
        overflow: hidden;
        float: left;
        display: block;
        width: 100px;
        height: 100px;
        margin-right: 26px;
        box-shadow: 0 4px 40px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
    }
    .basic-info div {
        float: left;
        width: 200px;
        padding-top: 15px;
    }
    .basic-info h2 {
        margin-bottom: 16px;
        font-size: 20px;
        font-weight: normal;
        line-height: 28px;
        color: #333;
    }
    .basic-info p {
        font-size: 18px;
        line-height: 25px;
        color: #9E9E9E;
    }
    .basic-info p span {
        margin-right: 20px;
    }
    .right-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        padding: 11px 20px;
        text-align: right;
        box-shadow: inset 0 1px 0 0 #F0F1F2;
    }
    .right-footer button {
        margin-left: 8px;
    }
</style>
