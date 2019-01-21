<template>
    <div class="view-container">
        <h2 class="view-title">草稿箱</h2>
        <div class="container-main">
            <p style="font-size: 16px;color: #333;font-weight: normal;margin-bottom: 20px;">筛选条件</p>
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">搜索</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                    <FormItem label="编号" prop="sn">
                        <Input v-model.trim="formSearch.sn" placeholder="请输入编号" style='width:120px'></Input>
                    </FormItem>
                    <FormItem label="类型" prop="orderStatus">
                        <Select v-model="formSearch.orderStatus" placeholder="请选择商品类型" style='width:120px' :clearable='true'>
                            <Option :value="item.id" v-for='item in typeList' :key='item.id'>{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <Form-item label="售价" prop='priceSymbol'>
                        <Select v-model="formSearch.priceSymbol" style="width:60px">
                            <Option v-for="item in compareList" :key="item.name" :label="item.name" :value="item.id">{{item.name}}</Option>
                        </Select>
                        <Input-number :min="0" :max='1000000' v-model="formSearch.price" style="width:120px"></Input-number>
                    </Form-item>
                    <FormItem>
                        <Button type="ghost" class='refresh' @click='refresh'>重置</Button>
                        <Button type="primary" class='search' @click='getList(1, formSearch)'>开始检索</Button>
                    </FormItem>
                </Form>
            </div>
                <p style="font-size: 16px;color: #333;font-weight: normal;margin-bottom: 20px;">数据列表</p>
            <Table  ref='selection'  :columns="col" :data="data" :loading='tableLoad'></Table>
             <Page :total="10" show-total></Page>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: true,
      total: 0,
      pageSize: 10,
      pageNumber: 1,
      tableLoad: false,
      formSearch: {
        sn: "",
        startTime:
          moment()
            .startOf("isoWeek")
            .format("YYYY-MM-DD") + " 00:00:00",
        endTime: moment().format("YYYY-MM-DD") + " 23:59:59",
        orderStatus: "",
        paymentMenthod: "",
        priceSymbol: "大于等于",
        price: null
      },
      timeBox: [
        moment()
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ],
      compareList: [
        {
          name: ">=",
          id: "大于等于"
        },
        {
          name: ">",
          id: "大于"
        },
        {
          name: "=",
          id: "等于"
        },
        {
          name: "<=",
          id: "小于等于"
        },
        {
          name: "<",
          id: "小于"
        }
      ],

      col: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "编号",
          key: ""
        },
        {
          title: "商品",
           width: 300,
          render:(h,params)=> {
            return h("div", [
              h("img", {
                style: {
                  float: "left",
                  width: "48px",
                  height: "48px",
                  margin: "16px 10px 16px 0"
                },
                attrs: {
                  src: this.baseImgURL + params.row.image
                }
              }),
              h(
                "p",
                {
                  style: {
                    float: "left",
                    height: "40px",
                    width: "200px",
                    marginTop: "20px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#757575",
                    display: "-webkit-box",
                    boxOrient: "vertical",
                    lineClamp: 2,
                    overflow: "hidden"
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          title: "商品分类",
          key: ""
        },
        {
          title: "售价",
          key: ""
        },
        {
          title: "保存时间",
          key:""
        },  {
          title: "编辑人员",
          key:""
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("div", {
                class: "record-btn",
                on: {
                  click: () => {
                    // this.toRecord(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      data: []
    };
  },
  computed: {
    payList() {
      return this.$store.getters.getOrderPayTypeList;
    },
    typeList() {
      return this.$store.getters.getOrderTypeList;
    }
  },
  created() {
    this.getList(1, this.formSearch);
  },
  methods: {
    getList(pageNumber, form) {
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
      let _vm = this;
      _vm.tableLoad = false;
      form.pageSize = _vm.pageSize;
      form.pageNumber = pageNumber;
      _vm.tableLoad = true;
      _vm.$http.get({
        url: "doct-webManager/api/orderForm/getPage.jhtml",
        data: form,
        success: function(res) {
          if (res.code === 0) {
            _vm.data = res.content.content || [];
            _vm.pageNumber = res.content.pageNumber || 1;
            _vm.total = res.content.total || 0;
          } else {
            console.log(res.data.desc);
          }
          _vm.tableLoad = false;
        }
      });
    },
    setTime(date) {
      this.formSearch.startTime = date[0] + " 00:00:00";
      this.formSearch.endTime = date[1] + " 23:59:59";
    },
    refresh() {
      this.$refs.formSearch.resetFields();
      this.formSearch.startTime = moment()
        .startOf("isoWeek")
        .format("YYYY-MM-DD");
      this.formSearch.endTime = moment().format("YYYY-MM-DD");
      this.timeBox = [
        moment()
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ];
      this.formSearch.price = null;
      this.getList(1, this.formSearch);
    },
    changePage(num) {
      this.getList(num, this.formSearch);
    },
    changePageSize(val) {
      console.log(val);
      this.pageSize = val;
      this.getList(1, this.formSearch);
    },
    remove() {},
    toRecord(data) {
      this.$router.push({
        path: "/orderRecord",
        query: {
          id: data.id
        }
      });
    },
    changeSearch(bool) {
      this.searchKey = bool;
    }
  }
};
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
