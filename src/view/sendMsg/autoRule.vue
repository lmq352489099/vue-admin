<template>
    <div class="view-container">
        <h2 class="view-title">疗程消息<span></span></h2>
        <div class="container-main autoRule" v-if='key'>
            <div class="add-autoRule">
                <p>当前任务<span>{{data.length}}</span>条</p>
                <Button type="primary" @click='toAdd'>添加疗程消息</Button>
                <Button type="ghost" @click='toTreatment'>查看疗程</Button>
            </div>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
        </div>
        <div class="showWay" v-else>
            <h3>我还可以这样玩</h3>
            <p>1、有促销信息想告诉顾客？</p>
            <p>2、有突发事件要通知？</p>
            <p>3、自动规则不能满足您？</p>
            <p class='try'>新建个临时任务，换个招式满足您！那就新建个规则试试吧~</p>
            <Button type="ghost" @click='toTreatment'>查看疗程</Button>
            <Button type="primary" @click='toAdd'>添加疗程消息</Button>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>您确定要删除此疗程消息吗？</p>
            <p>疗程消息名称：{{ruleInfo.ruleName}}</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            key: true,
            modal: false,
            loading: true,
            tableLoad: false,
            ruleInfo: {
                ruleId: '',
                ruleName: '',
            },
            col: [
                {
                    title: '任务名称',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    key: 'createtime'
                },
                {
                    title: '任务描述',
                    key: 'description'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        return h('span', '使用中')
                    }
                },
                {
                    title: '创建用户',
                    render: (h, params) => {
                        return h('span', '系统管理员')
                    }
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                class: 'record-btn',
                                style: {
                                    marginRight: '14px'
                                },
                                on: {
                                    'click': () => {
                                        this.toAdd()
                                    }
                                }
                            }),
                            h('div', {
                                class: 'delete-btn',
                                on: {
                                    'click': () => {
                                        this.remove(params.row)
                                    }
                                }
                            }),
                        ])
                       
                    }
                },
            ],
            data: [],
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.path === '/addAutoRule') {
            to.meta.keepAlive = false
        }
        next()
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            let _vm = this
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/ruleMessage/getList.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.data = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                    if(_vm.data.length === 0) {
                        _vm.key = false
                    }
                    _vm.tableLoad = false
                },
            })
        },
        remove (data) {
            this.ruleInfo.ruleId = data.id
            this.ruleInfo.ruleName = data.name
            this.modal = true
        },
        ok () {
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/ruleMessage/del.jhtml',
                data: _vm.ruleInfo,
                success: function(res) {
                    if(res.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '删除成功！'
                        })
                        _vm.getList()
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
        toAdd () {
            this.$router.push('/addAutoRule')
        },
        toTreatment () {
            this.$router.push('/treatment')
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .showWay {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 526px;
        height: 284px;
        padding: 22px 68px 0;
        margin: -142px 0 0 -163px;
        background: #FAFAFA;
        border-radius: 6px;
    }
    .showWay h3 {
        margin-bottom: 29px;
        font-size: 24px;
        line-height: 33px;
        font-weight: normal;
        color: #333333;
    }
    .showWay p {
        font-size: 14px;
        line-height: 20px;
        color: #333333;
    }
    .showWay .try {
        margin: 25px 0 30px;
        font-size: 13px;
        color: #9e9e9e;
    }
    .add-autoRule {
        height: 28px;
        margin: 16px 0;
    }
    .add-autoRule p {
        float: left;
        font-size: 14px;
        line-height: 28px;
        color: #333333;
    }
    .add-autoRule p span {
        color: #55A8FD;
    }
    .add-autoRule button {
        float: right;
        margin-left: 8px;
    }
</style>
