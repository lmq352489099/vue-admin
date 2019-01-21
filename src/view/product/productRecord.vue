<template>
    <div class="view-container">
        <h2 class="view-title">销售记录</h2>
        <div class="container-main">
            <Form ref="formSearch" :model="formSearch" inline :label-width='90'>
                <FormItem label="订单状态" prop="status">
                    <Select v-model="formSearch.status" placeholder="请选择订单状态" style='width:160px' @on-change='getList(1, formSearch)' :clearable='true'>
                        <Option :value="item.id" v-for='item in typeList' :key='item.id'>{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Page :total="total" :current='pageNumber' :page-size='pageSize' @on-change='changePage'></Page>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0,
            pageNumber: 1,
            tableLoad: false,
            formSearch: {
                status: '',
                productGoodId: this.$route.query.id,
            },
            typeList: [
                {
                    id: 1,
                    name: '待支付'
                },
                {
                    id: 4,
                    name: '使用中'
                },
                {
                    id: 5,
                    name: '已完成'
                },
                {
                    id: 2,
                    name: '已取消'
                },
            ],
            col: [
                {
                    title: '订单编号',
                    key: 'sn'
                },
                {
                    title: '下单时间',
                    key: 'createDate'
                },
                {
                    title: '产品信息',
                    width: 300,
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                padding: '16px 0',
                                overflow: 'hidden'
                            }
                        }, [
                            h('img', {
                                style: {
                                    float: 'left',
                                    width: '60px',
                                    height: '60px',
                                    marginRight: '10px',
                                },
                                attrs: {
                                    src: this.baseImgURL + params.row.thumbnail
                                },
                            }),
                            h('div', {
                                style: {
                                    float: 'left',
                                    width: '180px'
                                }
                            }, [
                                    h('p', {
                                        style: {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            height: '20px',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: '#757575',
                                        }
                                    }, params.row.productName),
                                    h('p', {
                                        style: {
                                            height: '20px',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: '#757575',
                                        }
                                    }, '数量： ' + params.row.num),
                                    h('p', {
                                        style: {
                                            height: '20px',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: '#757575',
                                        }
                                    }, '金额： ￥' + params.row.entireAmount),
                                ])
                        ])
                    }
                },
                {
                    title: '顾客姓名',
                    key: 'customerName'
                },
                {
                    title: '顾客电话',
                    key: 'mobile'
                },
                {
                    title: '所属医院',
                    render: (h, params) => {
                        return h('span', sessionStorage.getItem('companyName'))
                    }
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                        if(_index >= 0) {
                            return h('span', this.typeList[_index].name)
                        }
                    }
                },
            ],
            data: []
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
    created () {
        this.getList(1, this.formSearch)
    },
    methods: {
        getList (pageNumber, form) {
            let _vm = this
            form.pageSize = _vm.pageSize
            form.pageNumber = pageNumber
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/productGood/saleRecord.jhtml',
                data: form,
                success: function(res){
                    if(res.code === 0 ){
                        _vm.data = res.content.page.content || []
                        _vm.pageNumber = res.content.page.pageNumber || 1
                        _vm.total = res.content.page.total || 0
                    } else {
                        console.log(res.data.desc)
                    }
                    _vm.tableLoad = false
                },
            })
        },
        changePage (num) {
            this.getList(num, this.formSearch)
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
