<template>
    <div class="view-container">
        <h2 class="view-title">治疗列表</h2>
        <div class="container-main">
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">筛选查询</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                    <FormItem label="用户" prop="name">
                        <Input v-model.trim="formSearch.name" placeholder="用户名称" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                     <FormItem label="商品" prop="items">
                        <Input v-model.trim="formSearch.items" placeholder="商品名称" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                    <!-- <FormItem label="时间">
                        <Input v-model.trim="formSearch.startDate" placeholder="开始时间" style='width:80px' > </Input>
                        <Input v-model.trim="formSearch.endDate" placeholder="结束时间" style='width:80px' > </Input>
                    </FormItem> -->
                    <FormItem>
                         <Button type="ghost" class='refresh' @click="refresh('formSearch')">重置</Button>
                         <Button type="primary" @click="handleSubmit('formSearch')">检索</Button>
                    </FormItem>
                </Form>
            </div>
             <div class="dataList">
                    <span class=" dataList_p">数据列表</span> 
                        <div class="dataList-ringht"> 
                            <!-- <Button class="margin_right" style='' type="ghost">导出数据</Button> -->
                          <Select class="margin_right" v-model="model2" style="width:100px" @on-change='changeRow' placeholder="显示条数">
                            <Option v-for="item in numList" :value="item.value" :key="item.value" ></Option>
                          </Select>  
                          <!-- <Select class="margin_right" v-model="model3" style="width:100px"  @on-change='changeWay' :label-in-value = "true" placeholder="排序方式">
                            <Option v-for="item in sortList" :value="item.value" :key="item.value"></Option>
                          </Select>   -->
                        </div>
             </div>
               <Table border :columns="columns" :data="data"></Table>
                <!-- <Page :total="totalAll" :current='pageNumberAll' :page-size='pageSize' @on-change='changePage' @on-page-size-change=' changeRow'></Page> -->
                 <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-total :page-size-opts='numList' @on-page-size-change="changeRow" @on-change="changepage"></Page>
      <Modal
        title="确认上门"
        v-model="modal"
        class-name="vertical-center-modal">
        <p>用户已经上门</p>
    </Modal>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      ajaxHistoryData: [], // 初始化分页数组
      dataCount: 0, // 初始化信息总条数
      pageNum: 1, // 页数
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100, 200],
      totalAll: 0,
      modal: false,
      searchKey: true,
      formSearch: {
        name: null,
        items:null,
        commodity:null,
        startDate: null,
        endDate: null
      },
         typeList: [
        {
          id: 0,
          name: "已划扣"
        },
        {
          id: 1,
          name: "划扣待确认"
        }
      ],
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
      // 排序方式
      model2: "",
      model3: "",
      //列表
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户昵称",
          align: "center",
          key: "customerName"
        },
        {
          title: "商家",
          width: 200,
          align: "center",
          key: "companyName"
        },
        {
          title: "商品名称",
          width: 230,
          align: "center",
          key: "productName"
        },
        {
          title: "治疗时间",
          width: 200,
          align: "center",
          sortable: true,
          key: "createDate"
        },
        // {
        //   title: "治疗医生",
        //   align: "center",
        //   key: "dc"
        // },
        {
          title: "治疗数量",
          align: "center",
          key: "num"
        },
        {
          title: "订单状态",
          align: "center",
          key: "states",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
        // {
        //   title: "操作",
        //   align: "center",
        //   width: 200,
        //   key: "action",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "span",
        //         {
        //           class: "redact",
        //           on: {
        //             click: () => {
        //               this.toRecord(params.row);
        //             }
        //           }
        //         },
        //         "查看"
        //       )
        //     ]);
        //   }
        // }
      ],
      data: [
      ]
    };
  },
    created() {
    this.getList();
  },
  methods: {
    //重置搜索
    refresh() {
         this.$refs.formSearch.resetFields();
          this.getList()
        this.formSearch.minPrice = null;
      this.formSearch.maxPrice = null;
    },
    //搜索开关
    changeSearch(bool) {
      this.searchKey = bool;
    },
    //获取时间
    setTime(date) {
      this.formSearch.startTime = date[0];
      this.formSearch.endTime = date[1];
    },
      //搜索按钮
    handleSubmit() {
      this.getList()
    },
    //排序方式
    changeWay() {},
    toRecord(data) {
      this.$router.push({
        path: "/cureDetails"
      });
    },
  // 分页
    changepage(index) {
      this.pageNum = index;
      this.getList();
    },
    // 显示条数
    changeRow(val) {
      this.pageSize = val;
      this.getList();
    },
    getList() {
      let _vm = this;
      _vm.$http.post({
        url: "doct-webManager/treatment/getOperations.jhtml",
        data: {
          pageNumber:_vm.pageNum,
          customerName : _vm.formSearch.name,
          productName: _vm.formSearch.items,
          pageSize:_vm.pageSize,
          startDate:_vm.formSearch.startDate,
          endDate:_vm.formSearch.endDate
        },
        success: function(res) {
          console.log(res)
          if (res.code == 0) {
            // _vm.end()
            _vm.ajaxHistoryData = res.content.content;
            _vm.dataCount = res.content.total;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (res.content.total < _vm.pageSize) {
              _vm.data = _vm.ajaxHistoryData;
            } else {
              _vm.data = _vm.ajaxHistoryData.slice(0, _vm.pageSize);
            }
          } else {
          }
        }
      });
    }
  }
};
</script>
<style>
.dataList {
  height: 50px;
  display: flex;
  align-items: center;
}
.dataList_p {
  font-size: 14px;
  color: #333333;
  margin-right: 16px;
}
.margin_right {
  margin-right: 10px;
}
.dataList-ringht {
  position: absolute;
  right: 30px;
}
table {
  border-collapse: collapse;
}
.ivu-table-column-center {
  border: 1px solid #e9eaec;
}
.redact {
  color: #2daaf0;
  cursor: pointer;
}
</style>

