<template>
    <div class="view-container">
        <h2 class="view-title">黑名单<span>加入黑名单，悦完美平台不再推送疗程相关的信息给顾客</span></h2>
        <div class="container-main autoRule">
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Page :total="total" :current='pageNumber' :page-size='pageSize' @on-change='changePage'></Page>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>您确定要从黑名单列表中移除此人么？</p>
            <p>客户名称：{{cusInfo.name}}</p>
            <p>客户手机号：{{cusInfo.mobile}}</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0,
            pageNumber: 1,
            modal: false,
            loading: true,
            tableLoad: false,
            cusInfo: {
                id: '',
                name: '',
                mobile: ''
            },
            col: [
                {
                    title: '顾客姓名',
                    key: 'userName'
                },
                {
                    title: '手机号',
                    key: 'userMobile'
                },
                {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
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
    computed: {
        pageSize () {
            return this.$store.getters.getPageSize
        },
    },
    mounted () {
        this.getList(1)
    },
    methods: {
        getList (pageNumber) {
            let _vm = this
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/blackList/getPage.jhtml',
                data: {
                    pageNumber: pageNumber,
                    pageSize: _vm.pageSize
                },
                success: function(res){
                    if(res.code === 0 ){
                        _vm.data = res.content.page.content || []
                        _vm.pageNumber = res.content.page.pageNumber || 1
                        _vm.total = res.content.page.total || 0
                    } else {
                        console.log(res.desc)
                    }
                    _vm.tableLoad = false
                },
            })
        },
        changePage (num) {
            this.getList(num)
        },
        remove (data) {
            this.cusInfo.id = data.id
            this.cusInfo.name = data.userName
            this.cusInfo.mobile = data.userMobile
            this.modal = true
        },
        ok () {
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/blackList/del.jhtml',
                data: _vm.cusInfo,
                success: function(res) {
                    if(res.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '操作成功！'
                        })
                        _vm.getList(_vm.pageNumber)
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
    }
}
</script>

