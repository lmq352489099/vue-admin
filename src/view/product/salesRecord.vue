<template>
    <div class="view-container">
        <h2 class="view-title">销售记录</h2>
        <div class="container-main">
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">筛选查询</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                    <FormItem label="编号" prop="sn">
                        <Input v-model.trim="formSearch.sn" placeholder="请输入编号" style='width:120px'></Input>
                    </FormItem>
                    <FormItem label="时间" prop="startTime">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" :value='timeBox' @on-change='setTime' :clearable='false'></DatePicker>
                    </FormItem>
                    <FormItem label="状态" prop="orderStatus">
                        <Select v-model="formSearch.orderStatus" placeholder="请选择订单状态" style='width:120px' :clearable='true'>
                            <Option :value="item.id" v-for='item in typeList' :key='item.id'>{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <Form-item label="金额" prop='priceSymbol'>
                        <Select v-model="formSearch.priceSymbol" style="width:60px">
                            <Option v-for="item in compareList" :key="item.name" :label="item.name" :value="item.id">{{item.name}}</Option>
                        </Select>
                        <Input-number :min="0" :max='1000000' v-model="formSearch.price" style="width:120px"></Input-number>
                    </Form-item>
                    <FormItem label="支付" prop="paymentMenthod">
                        <Select v-model="formSearch.paymentMenthod" placeholder="请选择支付方式" style='width:120px' :clearable='true'>
                            <Option :value="item.id" v-for='item in payList' :key='item.id'>{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="ghost" class='refresh' @click='refresh'>重置</Button>
                        <Button type="primary" class='search' @click='getList(1, formSearch)'>检索</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Button type="ghost" v-if='col[0].type' class='remove' @click='remove'>删除订单</Button>
            <Page :total="total" :current='pageNumber' @on-change='changePage' show-sizer show-total :page-size-opts='pageSizeList' @on-page-size-change='changePageSize'></Page>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchKey: true,
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            tableLoad: false,
            formSearch: {
                sn: '',
                startTime: moment().startOf('month'),
                endTime: moment().format('YYYY-MM-DD') + ' 23:59:59',
                orderStatus: '',
                paymentMenthod: '',
                priceSymbol: '大于等于',
                price: null
            },
         timeBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            compareList: [
                {
                    name: '>=',
                    id: '大于等于'
                },
                {
                    name: '>',
                    id: '大于'
                },
                {
                    name: '=',
                    id: '等于'
                },
                {
                    name: '<=',
                    id: '小于等于'
                },
                {
                    name: '<',
                    id: '小于'
                },
            ],
            pageSizeList: [10, 20, 50, 100, 200],
            col: [
                {
                    title: '订单编号',
                    key: 'sn'
                },
                {
                    title: '提交时间',
                    sortable: true,
                    key: 'createDate'
                },
                {
                    title: '用户账号',
                    key: 'userName'
                },
                {
                    title: '订单金额',
                    sortable: true,
                    key: 'payAmount',
                },
                {
                    title: '支付方式',
                    render: (h, params) => {
                        const _index = this.payList.findIndex(item => item.id === params.row.paymentMethod)
                        if(_index >= 0) {
                            return h('span', this.payList[_index].name)
                        }
                    }
                },
                // {
                //     title: '订单来源',
                //     render: (h, params) => {
                //         const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                //         if(_index >= 0) {
                //             return h('span', this.typeList[_index].name)
                //         }
                //     }
                // },
                {
                    title: '订单状态',
                    render: (h, params) => {
                        const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                        if(_index >= 0) {
                            return h('span', this.typeList[_index].name)
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('div', {
                                class: 'record-btn',
                                on: {
                                    'click': () => {
                                        this.toRecord(params.row)
                                    }
                                }
                            })
                        ])
                    }
                }
            ],
            data: []
        }
    },
    computed: {
        payList () {
            return this.$store.getters.getOrderPayTypeList
        },
        typeList () {
            return this.$store.getters.getOrderTypeList
        }
    },
    created () {
        this.getList(1, this.formSearch)
    },
    methods: {
        getList (pageNumber, form) {
            // let _vm = this,
            //     _select = {
            //         type: 'selection',
            //         width: 40,
            //         align: 'center'
            //     }
            // _vm.tableLoad = true
            // if(form.status === 5) {
            //     if(!_vm.col[0].type) {
            //         _vm.col.unshift(_select)
            //     }
            // } else {
            //     if(_vm.col[0].type) {
            //         _vm.col.splice(0, 1)
            //     }
            // }
            let _vm = this
            _vm.tableLoad = false
            form.pageSize = _vm.pageSize
            form.pageNumber = pageNumber
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/api/orderForm/getPage.jhtml',
                data: form,
                success: function(res){
                    if(res.code === 0 ){
                        _vm.data = res.content.content || []
                        _vm.pageNumber = res.content.pageNumber || 1
                        _vm.total = res.content.total || 0
                    } else {
                        console.log(res.data.desc)
                    }
                    _vm.tableLoad = false
                },
            })
        },
        setTime (date) {
            this.formSearch.startTime = date[0] + ' 00:00:00'
            this.formSearch.endTime = date[1] + ' 23:59:59'
        },
        refresh () {
            this.$refs.formSearch.resetFields()
            this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD')
            this.formSearch.endTime = moment().format('YYYY-MM-DD')
            this.timeBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
            this.formSearch.price = null
            this.getList(1, this.formSearch)
        },
        changePage (num) {
            this.getList(num, this.formSearch)
        },
        changePageSize (val) {
            console.log(val)
            this.pageSize = val
            this.getList(1, this.formSearch)
        },
        remove () {},
        toRecord (data) {
            this.$router.push({
                path: '/orderRecord',
                query: {
                    id: data.id
                }
            })
        },
        changeSearch (bool) {
            this.searchKey = bool
        },
    }
}
</script>

<style scoped>
    .add-product {
        margin-bottom: 21px;
        text-align: right;
    }
    .refresh, 
    .search {
        margin: 0px 8px 0 0;
    }
    .refresh {
        margin-left: -40px;
    }
    .remove {
        margin-top: 16px;
    }
</style>
