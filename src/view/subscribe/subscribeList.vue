<template>
    <div class="view-container">
        <h2 class="view-title">预约列表</h2>
        <div class="container-main">
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">筛选查询</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                    <!-- <FormItem label="编号" prop="name">
                        <Input v-model.trim="formSearch.name" placeholder="预约编号" :maxlength='20' style='width:120px'></Input>
                    </FormItem> -->
                    <FormItem label="用户" prop="namee" >
                        <Input v-model.trim="formSearch.namee" placeholder="用户昵称" :maxlength='20' style=''></Input>
                    </FormItem>
                    <FormItem label="项目" prop="items" >
                        <Input v-model.trim="formSearch.items" placeholder="预约项目" :maxlength='20' style=''></Input>
                    </FormItem>
                    <form-item label="状态" prop="studis">
                        <i-select v-model="formSearch.studis" placeholder="状态">
                            <i-option value="0">待上门</i-option>
                            <i-option value="1">已上门</i-option>
                            <i-option value="2">已取消</i-option>
                        </i-select>
                    </form-item>
                    <!-- <FormItem label="时间" prop="startTime">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="提交订单时间" style="width: 200px" :value='timeBox' @on-change='setTime' :clearable='false'></DatePicker>
                    </FormItem> -->
                    <!-- <FormItem label="售价">
                        <Input v-model.trim="formSearch.minPrice" placeholder="最低价" style='width:80px' > </Input>
                        <Input v-model.trim="formSearch.maxPrice" placeholder="最高价" style='width:80px' > </Input>
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
                          <!-- <Select class="margin_right" v-model="model2" style="width:100px" @on-change='changeRow' placeholder="显示条数">
                            <Option v-for="item in numList" :value="item.value" :key="item.value" ></Option>
                          </Select> -->
                          <Select @on-change='changepize' v-model="model1" placeholder="显示条数" style="width:100px;margin:0 8px 0 0;">
                              <Option v-for="item in numList" :key="item.value" :value="item.value"></Option>
                          </Select>
                          <!-- <Select class="margin_right" v-model="model3" style="width:100px"  @on-change='changeWay' :label-in-value = "true" placeholder="排序方式">
                            <Option v-for="item in formSearchsortList" :value="item.value" :key="item.value"></Option>
                          </Select>   -->
                        </div>
             </div>
             <!-- <i-table :columns="columns" ref="table" :data="data"></i-table> -->
               <Table border :columns="columns" :data="data"></Table>
                   <!-- <Table ref='selection' :columns="col" :data="data" ></Table> -->
                <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-total :page-size-opts='pageSizeList' class="paging" @on-page-size-change="changepize" @on-change="changepage"></Page>

    </Modal>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tt:'',
      companyId: "",
      ajaxHistoryData: [], // 初始化分页数组
      dataCount: 0, // 初始化信息总条数
      pageNum: 1, // 页数
      pageSize: 10,
      pageSizeList: [10, 20, 50, 100, 200],

      searchKey: true,
      formSearch: {
        studis: '',
        name: "",
        namee: "",
        items: null,
        minPrice: null,
        maxPrice: null,
        startTime: moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      },
      timeBox: [
        moment()
          .startOf("month")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ],
      formSearchsortList: [],
      typeList: [
        {
          id: 0,
          name: "待上门"
        },
        {
          id: 1,
          name: "已上门"
        },
        {
          id: 2,
          name: "已取消"
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
      model1: "",
      model3: "",
      //列表
      columns: [
        {
          title: "预约编号",
          align: "center",
          key: "id"
        },
         
        // {
        //   title: "预约医院",
        //   align: "center",
        //   key: "guardHospitalName"
        // },
        {
          title: "用户昵称",
          align: "center",
          key: "customerName"
        },
        {
          title: "预约项目",
          align: "center",
          key: "guardChargeName"
        },
        // {
        //   title: "预约医生",
        //   align: "center",
        //   key: "dc"
        // },
        {
          title: "预约方式",
          align: "center",
          key: "away",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    // type: 'info',
                    size: "small"
                  }
                },
                "APP预约"
              )
            ]);
          }
        },
        {
          title: "预约状态",
          align: "center",
          key: "status",
          render: (h, params) => {
            const _text = this.typeList.filter(
              item => item.id === params.row.status
            )[0].name;
            return h("span", _text);
          }
        },
         {
          title: "项目预约日期",
          align: "center",
          key: "appointDate",
          sortable: true
        },
        {
          title: "项目预约时间",
          align: "center",
          key: "appointStartTime",
          
        },
        {
          title: "操作",
          align: "center",
          key: "action",
          render: (h, params) => {
          return h('div', [
              h('Button', {
                  props: {
                      type: 'warning',
                      size: 'small'
                  },
                  style: {
                      marginRight: '10px',
                  },
                  on: {
                      click: () => {
                          this.examine(params.row)
                      }
                  }
              }, '确认到院'),
          ]);

          }
        }
      ],
      data: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    examine(data) {
      let _vm = this;
      _vm.$http.post({
        url: "doct-webManager/treatment/completeAppt.jhtml",
        data: {
          apptId : data.id
        },
        success: function(res) {
          if(res.code == 0) {
              _vm.getList();
            _vm.$Notice.success({
              title: '系统提示！',
              desc: res.desc
          })
          } else {
            //  console.log(this.tt)
                _vm.$Notice.error({
                  title: '系统提示！',
                  desc: res.desc
              })
          }
        }
      });
    },
    //重置搜索
    refresh() {
      this.$refs.formSearch.resetFields();
      this.getList();
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
      this.getList();
    },
    //显示条数
    changeRow() {},
    //排序方式
    changeWay() {},
    toRecord(data) {
      this.$router.push({
        path: "/subscribeAwait"
      });
    },
    // 分页
    changepage(index) {
      this.pageNum = index;
      this.getList();
    },
    // 显示条数
    changepize(val) {
      this.pageSize = val;
      this.getList();
    },
    getList() {
      let _vm = this;
      _vm.$http.get({
        url: "doct-webManager/treatment/getAppointments.jhtml",
        data: {
          pageNumber: _vm.pageNum,
          customerName: _vm.formSearch.namee,
          guardChargeName: _vm.formSearch.items,
          status: _vm.formSearch.studis,
          pageSize:_vm.pageSize
        },
        success: function(res) {
          
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
  /* display: flex; */
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
  margin-left: 20px;
  cursor: pointer;
}
.add-product {
  margin-bottom: 21px;
  text-align: right;
}

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
.main-search-box {
  margin: 20px 0px;
}
</style>

