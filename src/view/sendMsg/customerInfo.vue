<template>
    <div class="view-container">
        <h2 class="view-title">顾客信息</h2>
        <ul class="cusInfo">
            <li>
                <span>顾客姓名</span>
                <h3>{{cusInfo.name}}</h3>
                <Button type="primary" v-if='cusInfo.status === 0 || cusInfo.status === 1' @click='addInvite'>邀请绑定</Button>
                <Button type="ghost" v-if='cusInfo.status === 5 && !blackKey' @click='addBlack'>加入黑名单</Button>
                <Button v-if='cusInfo.status === 5 && blackKey'>已加入黑名单</Button>
            </li>
            <li>
                <span>手机号码</span>
                <p>{{cusInfo.mobile}}</p>
            </li>
            <li>
                <span>绑定状态</span>
                <p v-if='cusInfo.status === 5'>已绑定</p>
                <p v-if='cusInfo.status === 2'>已邀请</p>
                <p v-if='cusInfo.status === 0 || cusInfo.status === 1'>未绑定</p>
            </li>
        </ul>
        <Tabs type="card" :animated='false'>
            <TabPane label="治疗消息">
                <div class="container-main">
                    <div class="treatList-item" v-for='(item, index) in treatList' :key='index'>
                        <div class="treatList-item-left">
                            <h3>{{item.chargeName}}</h3>
                            <div>
                                <p>{{item.paidDate}}</p>
                                <p>
                                    <span>项目类型</span>
                                    {{item.chargeCategoryName}}
                                </p>
                                <p>
                                    <span>规 格</span>
                                    {{item.unitName}}
                                </p>
                                <p>
                                    <span>数 量</span>
                                    {{item.totalNum}}
                                </p>
                                <p>
                                    <span>指定医生</span>
                                    {{item.primaryDoctorName}}
                                </p>
                                <p>
                                    <span>提交用户</span>
                                    {{item.primaryDoctorName}}
                                </p>
                            </div>
                        </div>
                        <div class="treatList-item-right">
                            <h3>项目记录</h3>
                            <ul :class="[item.operationList.length ? '' : 'none']">
                                <li v-for='(item1, index1) in item.operationList' :key='index1'>
                                    <p class="status-wait" v-if='item1.num === 0'><span>待执行</span></p>
                                    <p class="status-do" v-else><span>已执行</span></p>
                                    <p>{{item.chargeName}}</p>
                                    <p>{{item1.operatorList.length ? item1.operatorList[0].userName : ''}}</p>
                                    <p>{{item1.createTime ? item1.createTime.split(' ')[0] : ''}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane label="发送消息统计">
                <div class="container-main">
                    <Table :columns="col" :data="data"></Table>
                </div>
            </TabPane>
        </Tabs>
        <Modal
            title="系统提示"
            v-model="modal"
            :loading='loading'
            @on-ok="ok"
            class-name="vertical-center-modal">
            <p v-if='statusKey'>确定要将此人加入黑名单？</p>
            <p v-else>确定邀请此人绑定？</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cusInfo: {
                name: this.$route.query.name,
                id: this.$route.query.id,
                userId: this.$route.query.userId,
                mobile: this.$route.query.mobile,
                status: this.$route.query.status * 1,
                companyId: sessionStorage.getItem('companyId')
            },
            modal: false,
            loading: true,
            blackKey: false,
            statusKey: true,
            treatList: [],
            col:[
                {
                    title: '创建时间',
                    key: 'createtime'
                },
                {
                    title: '任务名称',
                    key: 'name'
                },
                {
                    title: '任务描述',
                    key: 'description'
                },
                {
                    title: '任务模式',
                    render: (h, params) => {
                        return h('span', '规则消息')
                    }
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        const text = params.row.status === 1 ? '发送成功' : '发送失败'
                        return h('span', text)
                    }
                },
                {
                    title: '创建用户',
                    render: (h, params) => {
                        return h('span', '系统管理员')
                        
                    }
                },
            ],
            data: []
        }
    },
    created () {
        if(this.cusInfo.status === 5) {
            this.getBlackStatus()
        }
        this.getTreatList()
    },
    mounted () {
        this.getMessageList()
    },
    methods: {
        getTreatList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/guardTreatment/curelist.jhtml',
                data: {
                    companyId: _vm.cusInfo.companyId,
                    companyUserId: _vm.cusInfo.id,
                    state: 2
                },
                success: function(res) {
                    if(res.code === 0) {
                        _vm.treatList = res.content || []
                    }
                },
            })
        },
        getMessageList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/ruleMessage/getUserMsgSendedList.jhtml',
                data: {
                    companyId: _vm.cusInfo.companyId,
                    userId: _vm.cusInfo.id,
                },
                success: function(res) {
                    if(res.code === 0) {
                        _vm.data = res.content || []
                    }
                },
            })
        },
        getBlackStatus () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/blackList/judge.jhtml',
                data: {
                    companyId: _vm.cusInfo.companyId,
                    userId: _vm.cusInfo.userId
                },
                success: function(res) {
                    if(res.code === 0) {
                        _vm.blackKey = false
                    } else {
                        _vm.blackKey = true
                    }
                },
            })
        },
        addBlack () {
            if(!this.blackKey) {
                this.statusKey = true
                this.modal = true
            }
        },
        addInvite () {
            this.statusKey = false
            this.modal = true
        },
        ok () {
            let _vm = this,
                _url = '',
                _data = {}
            if(_vm.statusKey) {
                _url = 'doct-webManager/blackList/add.jhtml'
                _data = {
                    companyId: _vm.cusInfo.companyId,
                    userId: _vm.cusInfo.userId,
                    mobile: _vm.cusInfo.mobile,
                    userName: _vm.cusInfo.name,
                }
            } else {
                _url = 'doct-webManager/guard_user/sendInvitedSmsByTreatmentOnce.jhtml'
                _data = {
                    companyId: _vm.cusInfo.companyId,
                    companyUserId: _vm.cusInfo.id,
                    mobile: _vm.cusInfo.mobile,
                    name: _vm.cusInfo.name,
                }
            }
            _vm.$http.post({
                url: _url,
                data: _data,
                success: function(res) {
                    if(_vm.statusKey) {
                        if(res.code === 0) {
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '操作成功！'
                            })
                            _vm.getBlackStatus()
                        } else {
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.desc
                            })
                        }
                    } else {
                        if(res.content.code === 0 ) {
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '邀请成功！'
                            })
                        } else {
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.content.desc
                            })
                        }
                    }
                    _vm.modal = false
                },
            })
        },
        toView () {
            this.$router.push('/productEdit')
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .cusInfo {
        padding: 8px 20px;
        margin: 16px 40px 7px 20px;
        border: 1px solid #E5E5E5;
        background: #FCFCFC;
        border-radius: 4px;
    }
    .cusInfo li {
        padding: 8px 0;
    }
    .cusInfo li span {
        display: inline-block;
        margin-right: 24px;
        font-size: 14px;
        line-height: 28px;
        color: #9E9E9E;
        vertical-align: middle;
    }
    .cusInfo li h3 {
        display: inline-block;
        margin-right: 49px;
        font-size: 18px;
        font-weight: normal;
        line-height: 28px;
        color: #333;
        vertical-align: middle;
    }
    .cusInfo li p {
        display: inline-block;
        font-size: 14px;
        line-height: 28px;
        color: #333;
        vertical-align: middle;
    }
    .treatList-item {
        overflow: hidden;
        padding: 10px 0 27px;
        border-bottom: 1px solid #E5E5E5;
    }
    .treatList-item-left {
        float: left;
        width: 300px;
        margin-right: 25px;
    }
    .treatList-item-right h3, 
    .treatList-item-left h3 {
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        margin-bottom: 22px;
    }
    .treatList-item-left h3 {
        color: #333;
    }
    .treatList-item-left div {
        padding-left: 20px;
    }
    .treatList-item-left p {
        font-size: 13px;
        line-height: 18px;
        padding-bottom: 8px;
        color: #333;
    }
    .treatList-item-left span {
        display: inline-block;
        width: 53px;
        height: 18px;
        margin-right: 30px;
        color: #9e9e9e;
        text-align: justify;
        vertical-align: middle;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;
    }
    .treatList-item-right {
        float: left;
    }
    .treatList-item-right h3 {
        color: #757575;
    }
    .treatList-item-right ul {
        margin-left: 20px;
        border: 1px solid #EEEEEE;
        border-bottom: none;
    }
    .treatList-item-right .none {
        display: none;
    }
    .treatList-item-right li {
        overflow: hidden;
        width: 698px;
        padding: 10px 0;
        border-bottom: 1px solid #EEEEEE;
    }
    .treatList-item-right p {
        float: left;
        width: 25%;
        text-align: center;
        font-size: 13px;
        line-height: 24px;
        color: #333333;
    }
    .treatList-item-right .status-do span, 
    .treatList-item-right .status-wait span {
        display: block;
        width: 84px;
        height: 24px;
        margin: 0 auto;
        border-radius: 4px;
    }
    .treatList-item-right .status-wait span {
        color: #56D48F;
        background: rgba(86,212,143,0.15);
    }
    .treatList-item-right .status-do span {
        color: #9E9E9E;
        background: #F4F4F4;
    }
    @media screen and (-webkit-min-device-pixel-ratio:0){
        .treatList-item-left span:after{
            content:".";
            display: inline-block;
            width:100%;
            overflow:hidden;
            height:0;
        }
    }
</style>
