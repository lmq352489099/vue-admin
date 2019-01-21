<template>
    <div class="view-container">
        <h2 class="view-title">用户详情</h2>
        <div class="container-main">
            <div class="step-box">
                <div class="step">
                    <span class='diff'>顾客列表</span>
                    <span>用户详情</span>
                </div>
            </div>
            <div class="cus-info">
                <div class="cus-banner">
                    <div class="banner-item">
                        <img src="" alt="" />
                        <div class="info-box">
                            <h3>138****8888</h3>
                            <p>生日：2017年10月12日</p>
                            <p>性别：女</p>
                        </div>
                    </div>
                    <div class="banner-item">
                        <div class="info-box">
                            <h3>用户ID：8847466</h3>
                            <p>昵称：Winder</p>
                            <p class="vip">黄金会员</p>
                        </div>
                        <Button type="ghost" icon="refresh" class='refresh'>刷新</Button>
                    </div>
                </div>
                <div class="cus-table">
                    <div class="cus-row th">
                        <div class="cus-item">城市</div>
                        <div class="cus-item">职业</div>
                        <div class="cus-item">喜欢的分类</div>
                        <div class="cus-item">来源</div>
                        <div class="cus-item">注册时间</div>
                    </div>
                    <div class="cus-row td">
                        <div class="cus-item rb"><p>福建省厦门市</p></div>
                        <div class="cus-item rb"><p>服装设计/室内设计</p></div>
                        <div class="cus-item rb"><p>不知道分类是啥</p></div>
                        <div class="cus-item rb"><p>APP注册／WEB</p></div>
                        <div class="cus-item"><p>2017-10-10</p></div>
                    </div>
                </div>
                <div class="cus-remark">
                    <span>个性签名</span>
                    <p>个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名</p>
                </div>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">统计信息</h3>
                <div class="main-message-list">
                    <ul class="main-message-list-tit">
                        <li>消费金额</li>
                        <li>订单数量</li>
                        <li>优惠券(张)</li>
                        <li>商品评价</li>
                        <li>预约次数</li>
                        <li>关注</li>
                        <li>粉丝</li>
                        <li>售后记录</li>
                        <li>登录次数</li>
                        <li>收藏商品</li>
                    </ul>
                    <ul class="main-message-list-main">
                        <li>消费金额</li>
                        <li>订单数量</li>
                        <li>优惠券(张)</li>
                        <li>商品评价</li>
                        <li>预约次数</li>
                        <li>关注</li>
                        <li>粉丝</li>
                        <li>售后记录</li>
                        <li>登录次数</li>
                        <li>收藏商品</li>
                    </ul>
                </div>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">预约信息</h3>
                <Table :columns="col1" :data="data1" class='main-table'></Table>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">订单记录</h3>
                <Table :columns="col2" :data="data2" class='main-table'></Table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data1: [],
            data2: [],
            col1: [
                {
                    title: '预约编号',
                    key: 'sn'
                },
                {
                    title: '预约时间',
                    key: 'createDate'
                },
                {
                    title: '用户账户',
                    key: 'customerName'
                },
                {
                    title: '预约项目',
                    key: 'mobile',
                },
                {
                    title: '预约医生',
                    render: (h, params) => {
                        return h('span', sessionStorage.getItem('companyName'))
                    }
                },
                {
                    title: '预约方式',
                    render: (h, params) => {
                        const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                        if(_index >= 0) {
                            return h('span', this.typeList[_index].name)
                        }
                    }
                },
                {
                    title: '预约状态',
                    render: (h, params) => {
                        const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                        if(_index >= 0) {
                            return h('span', this.typeList[_index].name)
                        }
                    }
                }
            ],
            col2: [
                {
                    title: '订单编号',
                    key: 'sn'
                },
                {
                    title: '下单时间',
                    key: 'createDate'
                },
                {
                    title: '用户账号',
                    key: 'customerName'
                },
                {
                    title: '订单金额',
                    key: 'mobile',
                },
                {
                    title: '支付方式',
                    render: (h, params) => {
                        return h('span', sessionStorage.getItem('companyName'))
                    }
                },
                {
                    title: '订单来源',
                    render: (h, params) => {
                        const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus)
                        if(_index >= 0) {
                            return h('span', this.typeList[_index].name)
                        }
                    }
                },
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
        }
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    created () {

    },
    methods: {
        getList () {
            let _vm = this
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
    }
}
</script>

<style scoped>
    .cus-info {
        margin-bottom: 40px;
        background: #FFFFFF;
        background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, #FFFFFF 97%);
        border: 1px solid #E5E5E5;
        border-radius: 4px;
    }
    .cus-banner {
        overflow: hidden;
        padding: 40px;
    }
    .banner-item {
        float: left;
        width: 50%;
    }
    .banner-item img {
        display: block;
        float: left;
        width: 149px;
        height: 149px;
        margin-right: 40px;
        box-shadow: 0 5px 10px 0 rgba(85,168,253,0.16), 0 10px 20px 0 rgba(85,168,253,0.10);
        border-radius: 50%;
    }
    .banner-item .info-box {
        float: left;
        padding-right: 20px;
    }
    .banner-item h3 {
        margin-bottom: 12px;
        font-size: 24px;
        font-weight: normal;
        line-height: 33px;
        color: #333;
    }
    .banner-item p {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 22px;
        color: #9e9e9e;
    }
    .banner-item .vip {
        color: #FFC527;
        text-shadow: 0 2px 4px rgba(255,206,50,0.57);
    }
    .refresh {
        float: right;
    }
    .cus-table {
        display: table;
        width: 100%;
    }
    .cus-row {
        display: table-row;
    }
    .cus-item {
        display: table-cell;
        width: 20%;
        padding: 6px 30px;
    }
    .th .cus-item {
        padding: 0px 30px 16px;
        font-size: 16px;
        line-height: 22px;
        color: #9e9e9e;
    }
    .td .cus-item {
        font-size: 18px;
        line-height: 25px;
        color: #757575;
    }
    .cus-item p {
        min-height: 58px;
    }
    .rb {
        box-shadow: inset -1px 0 0 0 #E5E5E5;
    }
    .cus-remark {
        position: relative;
        overflow: hidden;
        padding: 20px 40px 20px 127px;
        border-top: 1px solid #E5E5E5;
    }
    .cus-remark p, 
    .cus-remark span {
        font-size: 16px;
        line-height: 22px;
        color: #9e9e9e;
    }
    .cus-remark span {
        position: absolute;
        left: 40px;
        top: 20px;
    }
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
</style>
