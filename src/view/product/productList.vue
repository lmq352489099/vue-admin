<template>
    <div class="view-container">
        <h2 class="view-title">商品列表</h2>
        <Tabs type="card" :animated='false'>
            <TabPane :label="label1">
                <!-- 数据列表 -->
                <!-- <div class="data-list">
                    <div>
                        <span style="margin-right:10px;">
                            数据列表 
                        </span>
                        <Button type="ghost" class='refresh'>上架</Button>
                        <Button type="ghost" class='refresh'>下架</Button>
                          <Select class=""  style="width:100px" placeholder="更多操作">
                                <Option v-for="item in moreList" :value="item.value" :key="item.value" ></Option>
                        </Select> 
                    </div>
                    <div>
                       <Button type="ghost" class='refresh'>导出数据</Button>
                        <Select class="phcolor" style="width:100px" @on-change='changeRow' placeholder="显示条数">
                            <Option v-for="item in numList" :value="item.value" :key="item.value" ></Option>
                        </Select>  
                          <Select class="phcolor" style="width:100px" @on-change='changeRank' placeholder="排序方式">
                            <Option v-for="item in rankList" :value="item.value" :key="item.value" ></Option>
                        </Select>  
                    </div>
                </div>
                <div :class="['main-search-box', searchKey ? '' : 'up']">
                    <div class="main-search-title">筛选查询</div>
                    <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                    <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                    <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                        <FormItem label="用户" prop="name" >
                            <Input v-model.trim="formSearch.name" placeholder="用户昵称" :maxlength='20' style=''></Input>
                        </FormItem>
                        <form-item label="类型" prop="studis">
                            <i-select v-model="formSearch.studis" placeholder="商品类型">
                                <i-option value="0"></i-option>
                                <i-option value="1"></i-option>
                                <i-option value="2"></i-option>
                            </i-select>
                        </form-item>
                        <FormItem label="售价">
                            <Input v-model.trim="formSearch.minPrice" placeholder="最低价" style='width:80px' > </Input>
                            <Input v-model.trim="formSearch.maxPrice" placeholder="最高价" style='width:80px' > </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="ghost" class='refresh' @click="refresh('formSearch')">重置</Button>
                            <Button type="primary" @click="handleSubmit('formSearch')">检索</Button>
                        </FormItem>
                    </Form>
                </div> -->
                <div class="container-main">
                    <Table :columns="col" :data="data"></Table>
                </div>
            </TabPane>
            <TabPane :label="label2">
              
                <div class="container-main">
                    <Table :columns="col2" :data="data2"></Table>
                </div>
            </TabPane>
            <TabPane :label="label3">
                <div class="container-main">
                    <Table :columns="col3" :data="data3"></Table>
                </div>
            </TabPane>
               <TabPane :label="label4">
                <div class="container-main">
                    <Table :columns="col4" :data="data4"></Table>
                </div>
            </TabPane>
               <TabPane :label="label5">
                <div class="container-main">
                    <Table :columns="col5" :data="data5"></Table>
                </div>
               </TabPane>
        </Tabs>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>确定下架商品?</p>
            <p>商品名称：{{productInfo.name}}</p>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchKey: true,
      modal: false,
      loading: true,
      // 显示条数
      numList: [
        {
          value: 10,
          label: 10
        },
        {
          value: 20,
          label: 20
        },
        {
          value: 50,
          label: 50
        },
        {
          value: 100,
          label: 100
        },
        {
          value: 200,
          label: 200
        }
      ],
      // 更多操作
      moreList: [
        {
          value: 102,
          label: 1
        },
        {
          value: 10,
          label: 2
        },
        {
          value: 10,
          label: 3
        }
      ],
      //  排序方式
      rankList: [
        {
          value: "价格从低到高",
          label: 1
        },
        {
          value: "价格从高到低",
          label: 2
        },
        {
          value: "销量从低到高",
          label: 3
        },
        {
          value: "销量从高到低",
          label: 4
        }
      ],
      formSearch: {
        name: "",
        minPrice: null,
        maxPrice: null,
        studis: ""
      },
      productInfo: {
        productGoodId: "",
        name: ""
      },
      typeList: [
        {
          id: 0,
          name: "草稿"
        },
        {
          id: 1,
          name: "上架中"
        },
        {
          id: 2,
          name: "审核中"
        },
        {
          id: 4,
          name: "已下架"
        },
        {
          id: 5,
          name: "审核失败"
        }
      ],
      typeList2:[
          {
          id: 0,
          name: "草稿"
        },
        {
          id: 1,
          name: "已审核"
        },
        {
          id: 2,
          name: "审核中"
        },
        {
          id: 4,
          name: "已审核"
        },
        {
          id: 5,
          name: "审核失败"
        }
      ],
      col: [
        {
          title: "编号",
          key: "productGood"
        },
        {
          title: "产品",
          width: 300,
          render: (h, params) => {
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
          key: "categoryName"
        },
        {
          title: "售价",
          key: "price"
        },
        {
          title: "审核状态",
          render: (h, params) => {
            const _text = this.typeList2.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        {
          title: "销量",
          key: "saleCount"
        },
        {
          title: "商品状态",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "已使用",
        //   key: "useCount"
        // },
        // {
        //     title: '退单',
        //     key: 'cancelOrderCount'
        // },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            const _display = params.row.status === 1 ? "inline-block" : "none" 
      
            // if(params.row.status === 4){
            //     const _display ='none'
            // }
            return h("div", [
              h("div", {
                class: "record-btn",
                style: {
                  marginRight: "14px"
                },
                on: {
                  click: () => {
                    this.toRecord(params.row);
                  }
                }
              }),
              h("div", {
                class: "undercarriage-btn",
                style: {
                  display: _display
                },
                on: {
                  click: () => {
                    this.downSale(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      col2: [
        {
          title: "编号",
          key: "productGood"
        },
        {
          title: "产品",
          width: 300,
          render: (h, params) => {
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
          key: "categoryName"
        },
        {
          title: "售价",
          key: "price"
        },
        // {
        //   title: "审核状态",
        //   render: (h, params) => {
        //     const _text = this.typeList.filter(
        //       item => item.id === params.row.status
        //     )[0].name;
        //     return h("span", _text);
        //   }
        // },
        {
          title: "销量",
          key: "saleCount"
        },
        {
          title: "商品状态",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "已使用",
        //   key: "useCount"
        // },
        // {
        //     title: '退单',
        //     key: 'cancelOrderCount'
        // },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            const _display = params.row.status === 1 ? "inline-block" : "none";
            return h("div", [
              h("div", {
                class: "record-btn",
                style: {
                  marginRight: "14px"
                },
                on: {
                  click: () => {
                    this.toRecord(params.row);
                  }
                }
              }),
              h("div", {
                class: "undercarriage-btn",
                style: {
                  display: _display
                },
                on: {
                  click: () => {
                    this.downSale(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      col3: [
        {
          title: "编号",
          key: "productGood"
        },
        {
          title: "产品",
          width: 300,
          render: (h, params) => {
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
          key: "categoryName"
        },
        {
          title: "售价",
          key: "price"
        },
        // {
        //   title: "审核状态",
        //   render: (h, params) => {
        //     const _text = this.typeList.filter(
        //       item => item.id === params.row.status
        //     )[0].name;
        //     return h("span", _text);
        //   }
        // },
        {
          title: "销量",
          key: "saleCount"
        },
        {
          title: "商品状态",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "已使用",
        //   key: "useCount"
        // },
        // {
        //     title: '退单',
        //     key: 'cancelOrderCount'
        // },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            const _display = params.row.status === 4 ? "none" : "inline-block";
            return h("div", [
              h("div", {
                class: "record-btn",
                style: {
                  marginRight: "14px"
                },
                on: {
                  click: () => {
                    this.toRecord(params.row);
                  }
                }
              }),
              h("div", {
                class: "undercarriage-btn",
                style: {
                  display: _display
                },
                on: {
                  click: () => {
                    this.downSale(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      col4: [
        {
          title: "编号",
          key: "productGood"
        },
        {
          title: "产品",
          width: 300,
          render: (h, params) => {
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
          key: "categoryName"
        },
        {
          title: "售价",
          key: "price"
        },
        // {
        //   title: "审核状态",
        //   render: (h, params) => {
        //     const _text = this.typeList.filter(
        //       item => item.id === params.row.status
        //     )[0].name;
        //     return h("span", _text);
        //   }
        // },
        {
          title: "销量",
          key: "saleCount"
        },
        {
          title: "商品状态",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "已使用",
        //   key: "useCount"
        // },
        // {
        //     title: '退单',
        //     key: 'cancelOrderCount'
        // },
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 80,
        //   align: "center",
        //   render: (h, params) => {
        //     const _display = params.row.status === 4 ? "none" : "inline-block";
        //     return h("div", [
        //       h("div", {
        //         class: "record-btn",
        //         style: {
        //           marginRight: "14px"
        //         },
        //         on: {
        //           click: () => {
        //             this.toRecord(params.row);
        //           }
        //         }
        //       }),
        //       h("div", {
        //         class: "undercarriage-btn",
        //         style: {
        //           display: _display
        //         },
        //         on: {
        //           click: () => {
        //             this.downSale(params.row);
        //           }
        //         }
        //       })
        //     ]);
        //   }
        // }
      ],
      col5: [
        {
          title: "编号",
          key: "productGood"
        },
        {
          title: "产品",
          width: 300,
          render: (h, params) => {
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
          key: "categoryName"
        },
        {
          title: "售价",
          key: "price"
        },
        // {
        //   title: "审核状态",
        //   render: (h, params) => {
        //     const _text = this.typeList.filter(
        //       item => item.id === params.row.status
        //     )[0].name;
        //     return h("span", _text);
        //   }
        // },
        {
          title: "销量",
          key: "saleCount"
        },
        {
          title: "商品状态",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "已使用",
        //   key: "useCount"
        // },
        // {
        //     title: '退单',
        //     key: 'cancelOrderCount'
        // },
        // {
        //   title: "操作",
        //   key: "action",
        //   width: 80,
        //   align: "center",
        //   render: (h, params) => {
        //     const _display = params.row.status === 4 ? "none" : "inline-block";
        //     return h("div", [
        //       h("div", {
        //         class: "record-btn",
        //         style: {
        //           marginRight: "14px"
        //         },
        //         on: {
        //           click: () => {
        //             this.toRecord(params.row);
        //           }
        //         }
        //       }),
        //       h("div", {
        //         class: "undercarriage-btn",
        //         style: {
        //           display: _display
        //         },
        //         on: {
        //           click: () => {
        //             this.downSale(params.row);
        //           }
        //         }
        //       })
        //     ]);
        //   }
        // }
      ],
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: []
    };
  },
  computed: {
    baseImgURL() {
      return this.$store.getters.getBaseImgURL;
    },
    label1() {
      const _text = this.data.length > 0 ? `全部(${this.data.length})` : "全部";
      return _text;
    },
    label2() {
      const _text =
        this.data2.length > 0 ? `上架中(${this.data2.length})` : "上架中";
      return _text;
    },
    label3() {
      const _text =
        this.data3.length > 0 ? `已下架(${this.data3.length})` : "已下架";
      return _text;
    },
    label4() {
      const _text =
        this.data4.length > 0 ? `审核中(${this.data4.length})` : "审核中";
      return _text;
    },
    label5() {
      const _text =
        this.data5.length > 0 ? `未通过(${this.data5.length})` : "未通过";
      return _text;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let _vm = this;
      _vm.$http.get({
        url: "doct-webManager/productGood/saleList.jhtml",
        data: {
          pageNumber: 1,
          pageSize: 999
        },
        success: function(res) {
          if (res.code === 0) {
            const _id = sessionStorage.getItem("companyId") * 1;
            const _data =
              res.content.page.content.filter(item => item.company === _id) ||
              [];
            _vm.data = _data || [];
            _vm.data2 = _data.filter(item => item.status === 1) || [];
            _vm.data3 = _data.filter(item => item.status === 4) || [];
            _vm.data4 = _data.filter(item => item.status === 2) || [];
            _vm.data5 = _data.filter(item => item.status === 5) || [];

            //  console.log(    _vm.data4 )
          } else {
            // console.log(res.data.desc);
          }
        }
      });
    },
    changeSearch(bool) {
      this.searchKey = bool;
    },
    downSale(data) {
      this.productInfo.productGoodId = data.productGood;
      this.productInfo.name = data.name;
      this.modal = true;
    },
    ok() {
      let _vm = this;
      _vm.$http.post({
        url: "doct-webManager/productGood/unOnSale.jhtml",
        data: _vm.productInfo,
        success: function(res) {
          if (res.code === 0) {
            _vm.$Notice.success({
              title: "系统提示！",
              desc: "操作成功！"
            });
            _vm.getList();
          } else {
            _vm.$Notice.error({
              title: "系统提示！",
              desc: res.desc
            });
          }
          _vm.modal = false;
        }
      });
    },
    toRecord(data) {
      this.$router.push({
        path: "/productRecord",
        query: {
          id: data.productGood
        }
      });
    },
    //搜索按钮
    handleSubmit() {},
    //重置搜索
    refresh() {
      this.$refs.formSearch.resetFields();
      this.formSearch.minPrice = null;
      this.formSearch.maxPrice = null;
    },
    // 显示条数
    changeRow() {},
    // 排序方式
    changeRank() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-product {
  margin-bottom: 21px;
  text-align: right;
}
.main-search-box {
  margin: 20px 40px;
}
.data-list {
  margin: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.data-list span {
  font-size: 14px;
  color: #333333;
}
</style>
