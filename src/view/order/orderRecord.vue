<template>
    <div class="view-container">
        <h2 class="view-title">订单详情</h2>
        <div class="container-main">
            <div class="order-status">
                当前订单状态：<span>{{orderText}}</span>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">订单信息</h3>
                <div class="sync-mes">
                    <Row :gutter="48">
                        <Col :sm="10">
                            <div class="sync-item">
                                <span>订单编号：</span>
                                <p>{{orderMes.sn}}</p>
                            </div>
                            <div class="sync-item">
                                <span>下单时间：</span>
                                <p>{{orderMes.createDate}}</p>
                            </div>
                            <div class="sync-item">
                                <span>所属医院：</span>
                                <p>{{companyName}}</p>
                            </div>
                            <!-- <div class="sync-item">
                                <span>渠道：</span>
                                <p>12345123</p>
                            </div> -->
                        </Col>
                        <Col :sm="14">
                            <div class="sync-item">
                                <span>顾客姓名：</span>
                                <p>{{orderMes.userName}}</p>
                            </div>
                            <div class="sync-item">
                                <span>顾客电话：</span>
                                <p>{{orderMes.userMobile}}</p>
                            </div>
                            <div class="sync-item">
                                <span>顾客ID：</span>
                                <p>{{orderMes.user}}</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">商品信息</h3>
                <Table :columns="col" :data="data" class='main-table'></Table>
            </div>
            <!-- <div class="main-content-item">
                <h3 class="main-content-item-tit">费用信息</h3>
                <div class="main-message-list">
                    <ul class="main-message-list-tit price">
                        <li>商品合计</li>
                        <li>活动优惠</li>
                        <li>优惠券</li>
                        <li>运费</li>
                        <li>应付款金额</li>
                    </ul>
                    <ul class="main-message-list-main price">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div> -->
            <div class="main-content-item">
                <h3 class="main-content-item-tit">支付信息</h3>
                <div class="main-message-list">
                    <ul class="main-message-list-tit pay">
                        <li>支付方式</li>
                        <li>支付时间</li>
                        <li>支付流水号</li>
                        <li>支付状态</li>
                    </ul>
                    <ul class="main-message-list-main pay">
                        <li>{{payText}}</li>
                        <li>{{orderMes.createDate}}</li>
                        <li>{{orderMes.sn}}</li>
                        <li>{{orderText}}</li>
                    </ul>
                </div>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">商品其他信息</h3>
                <div class="main-message-list">
                    <ul class="main-message-list-tit other">
                        <li>有效期</li>
                        <li>医院营业时间</li>
                    </ul>
                    <ul class="main-message-list-main other">
                        <li>{{this.validity}}个月</li>
                        <li>8:30:00~18:00:00</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      num:1,
      validity:'',
      disabled:true,
      huakou: [
        {
          id: 0,
          name: "划扣待确认"
        },
        {
          id: 2,
          name: "已取消"
        },
        {
          id: 3,
          name: "已关闭"
        },
        {
          id: 4,
          name: "可使用"
        },
        {
          id: 5,
          name: "治疗完成"
        },
        {
          id: 8,
          name: "退款中"
        },
        {
          id: 9,
          name: "退款成功"
        }
      ],
      oid: "",
      companyName: sessionStorage.getItem("companyName"),
      orderMes: {},
      data: [],
      col: [
        {
          title: "商品编号",
          key: "productGood"
        },
        // {
        //     title: '分类',

        // },
        {
          title: "商品图片",
          render: (h, params) => {
            return h("img", {
              style: {
                display: "block",
                width: "60px",
                height: "60px",
                margin: "5px 0"
              },
              attrs: {
                src: this.baseImgURL + params.row.thumbnail
              }
            });
          }
        },
        {
          title: "商品名称",
          key: "productName"
        },
        {
          title: "售价",
          key: "amount"
        },
        {
          title: "数量",
          key: "num"
        },
        {
          title: "小计",
          key: "entireAmount"
        },
        {
          title: "剩余数量",
          key: "restNum"
        },
        {
          title: "操作",
          key: "",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    disabled: this.disabled
                  },
                  on: {
                    click: () => {
                      this.fund(params.row);
                    }
                  }
                },
                "划扣"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    baseImgURL() {
      return this.$store.getters.getBaseImgURL;
    },
    orderText() {
      const data = this.$store.getters.getOrderTypeList;
      const _index = data.findIndex(
        item => item.id === this.orderMes.orderStatus
      );
      if (_index >= 0) {
        return data[_index].name;
      } else {
        return "";
      }
    },
    payText() {
      const data = this.$store.getters.getOrderPayTypeList;
      const _index = data.findIndex(
        item => item.id === this.orderMes.paymentMethod
      );
      if (_index >= 0) {
        return data[_index].name;
      } else {
        return "";
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    fund(data) {
      let _vm = this;
      _vm.$http.post({
        url: "doct-webManager/treatment/updateTreatmentDetail.jhtml",
        data: {
          orderItemId:data.id,
          num: _vm.num
        },
        success: function(res) {
          console.log(data)
          console.log(_vm.num)
          _vm.$Message.info({
            content: res.desc,
          });
        }
      });
    },
    getList() {
      let _vm = this;
      _vm.$http.get({
        url: "doct-webManager/api/orderForm/info.jhtml",
        data: { orderFormId: _vm.$route.query.id },
        success: function(res) {
         _vm.validity = res.content.goods[0].expiyTime 
          // console.log(res.content.order.orderStatus)
          if(res.content.order.orderStatus == 4){
            _vm.disabled = false
          }
          if (res.code === 0) {
            _vm.orderMes = res.content.order || {};
            _vm.orderMes.userName = res.content.userName || "";
            _vm.orderMes.userMobile = res.content.userMobile || "";
            _vm.data = _vm.orderMes.orderItems || [];
          } else {
            // console.log(res.data.desc);
          }
          _vm.tableLoad = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.order-status {
  width: 210px;
  height: 60px;
  margin: 14px 0 30px 0;
  border: 1px solid #e5e5e5;
  font-size: 16px;
  line-height: 58px;
  text-align: center;
  color: #9e9e9e;
  border-radius: 4px;
}
.sync-mes {
  padding: 30px 30px 34px;
  border: 1px solid #e5e5e5;
  background-color: #fdfdfd;
  border-radius: 4px;
}
.sync-item {
  overflow: hidden;
}
.sync-mes p,
.sync-mes span {
  font-size: 14px;
  line-height: 24px;
}
.sync-mes span {
  float: left;
  width: 75px;
  text-align: right;
  color: #9e9e9e;
}
.sync-mes p {
  margin-left: 80px;
  color: #151515;
}
.pay li {
  width: 25%;
}
.other li {
  width: 50%;
}
.price li {
  width: 20%;
}

</style>
