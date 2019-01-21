<template>
    <div class="view-container">
        <h2 class="view-title">商品列表</h2>
        <Tabs type="card" :animated='false' :value='labelActive'>
            <TabPane :label="label1" name='audit'>
                <div class="container-main">
                    <div class="add-product">
                        <Button type="primary" @click='toView(1)'>发布商品</Button>
                    </div>
                    <Table :columns="col" :data="data"></Table>
                </div>
            </TabPane>
            <TabPane :label="label2" name='draft'>
                <div class="container-main">
                    <div class="add-product">
                        <Button type="primary" @click='toView(1)'>发布商品</Button>
                    </div>
                    <Table :columns="col1" :data="data1"></Table>
                </div>
            </TabPane>
        </Tabs>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>确定撤销商品?</p>
            <p>商品名称：{{productInfo.name}}</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modal: false,
            loading: true,
            productInfo: {
                productGoodId: '',
                name: '',
            },
            col: [
                {
                    title: '产品名称',
                    key: 'name'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        return h('span', '待审核')
                    }
                },
                {
                    title: '提交医院',
                    render: (h, params) => {
                        return h('span', sessionStorage.getItem('companyName'))
                    }
                },
                {
                    title: '提交时间',
                    key: 'createDate'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                class: 'cancel-btn',
                                on: {
                                    'click': () => {
                                        this.remove(params.row)
                                    }
                                }
                            }),
                        ]);
                    }
                }
            ],
            col1: [
                {
                    title: '产品名称',
                    key: 'name'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        return h('span', '草稿')
                    }
                },
                {
                    title: '提交医院',
                    render: (h, params) => {
                        return h('span', sessionStorage.getItem('companyName'))
                    }
                },
                {
                    title: '提交时间',
                    key: 'createDate'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                class: 'edit-btn',
                                style: {
                                    marginRight: '14px'
                                },
                                on: {
                                    'click': () => {
                                        this.toView(params.row)
                                    }
                                }
                            }),
                            h('div', {
                                class: 'cancel-btn',
                                on: {
                                    'click': () => {
                                        this.remove(params.row)
                                    }
                                }
                            }),
                        ]);
                    }
                }
            ],
            data: [],
            data1: []
        }
    },
    computed: {
        label1 () {
            const _text = this.data.length > 0 ? `审核中(${this.data.length})` : '审核中'
            return _text
        },
        label2 () {
            const _text = this.data1.length > 0 ? `草稿(${this.data1.length})` : '草稿'
            return _text
        },
        labelActive () {
            return this.$store.getters.getProductTabs
        },
    },
    created () {
        if(this.$route.query.active) {
            this.labelActive = this.$route.query.active
        }
        this.getList()
    },
    methods: {
        getList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/productGood/list.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        let _data = res.content.filter(item => {
                            if(item.status === 2) {
                                item.timeSort = new Date(item.createDate)
                                return item
                            }
                        }) || [],
                            _data1 = res.content.filter(item => {
                            if(item.status === 0) {
                                item.timeSort = new Date(item.createDate)
                                return item
                            }
                        }) || []
                        _vm.data = _data.sort((x, y) => y.timeSort - x.timeSort)
                        _vm.data1 = _data1.sort((x, y) => y.timeSort - x.timeSort)
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        remove (data) {
            this.productInfo.name = data.name
            this.productInfo.productGoodId = data.id
            this.modal = true
        },
        ok () {
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/productGood/del.jhtml',
                data: _vm.productInfo,
                success: function(res) {
                    if(res.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '操作成功！'
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
        toView (data) {
            let _id = ''
            if(typeof data === 'number') {
                _id = 'add'
            } else {
                _id = data.id
            }
            this.$router.push({
                path: '/productEdit',
                query: {
                    id: _id
                }
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .add-product {
        margin-bottom: 21px;
        text-align: right;
    }
</style>
