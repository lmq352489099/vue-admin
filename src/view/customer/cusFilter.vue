<template>
    <div class="view-container">
        <h2 class="view-title">购买力筛选</h2>
        <div class="container-main">
            <cmptShoppingFilter @search='setSearch'></cmptShoppingFilter>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Page :total="total" :current='pageNumber' @on-change='changePage' show-sizer :page-size-opts='pageSizeList' @on-page-size-change='changePageSize'></Page>
        </div>
    </div>
</template>

<script>
import cmptShoppingFilter from 'components/shoppingFilter.vue'
export default {
    components: {cmptShoppingFilter},
    data () {
        return {
            total: 0,
            pageNumber: 1,
            pageSize: 10,
            tableLoad: false,
            formSearch: {
                startTime: '',
                endTime: '',
                startNum: '',
                endNum: '',
                startPrice: '',
                endPrice: '',
                startAmount: '',
                endAmount: ''
            },
            pageSizeList: [10, 20, 50, 100, 200],
            col: [
                {
                    title: '用户ID',
                    key: 'sn'
                },
                {
                    title: '用户帐号',
                    key: 'createDate'
                },
                {
                    title: '消费金额',
                    sortable: true,
                    key: 'customerName',
                },
                {
                    title: '消费次数',
                    sortable: true,
                    key: 'mobile',
                },
                {
                    title: '订单均价',
                    sortable: true,
                },
                {
                    title: '最近购买时间',
                    sortable: true,
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     width: 80,
                //     align: 'center',
                //     render: (h, params) => {
                //          return h('div', [
                //             h('div', {
                //                 style: {
                //                         color: '#55A8FD',
                //                         cursor: "pointer"
                //                          },
                //                 on: {
                //                     'click': () => {
                //                         this.toRecord(params.row)
                //                     }
                //                 }                
                //             },'详情')
                //         ])
                //     }
                // }
            ],
            data: [
                {
                    createDate: '2017-10-01',
                    mobile: 10,
                    bindStatus: 2
                },
                {
                    createDate: '2017-10-11',
                    mobile: 12,
                    bindStatus: 3
                }
            ],
        }
    },
    created () {
        // this.getList(1, this.formSearch)
    },
    methods: {
        getList (pageNumber, form) {
            let _vm = this
            console.log(111)
            // form.pageSize = _vm.pageSize
            // form.pageNumber = pageNumber
            // _vm.tableLoad = true
            // _vm.$http.get({
            //     url: 'doct-webManager/productGood/saleRecord.jhtml',
            //     data: form,
            //     success: function(res){
            //         if(res.code === 0 ){
            //             _vm.data = res.content.page.content || []
            //             _vm.pageNumber = res.content.page.pageNumber || 1
            //             _vm.total = res.content.page.total || 0
            //         } else {
            //             console.log(res.data.desc)
            //         }
            //         _vm.tableLoad = false
            //     },
            // })
        },
        setSearch (data) {
            console.log(data)
        },
        changePage (num) {
            this.getList(num, this.formSearch)
        },
        changePageSize (val) {
            console.log(val)
            this.getList(1, this.formSearch)
        },
        toRecord (data) {
            this.$router.push('/appCusInfo')
        },
    }
}
</script>

