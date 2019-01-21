<template>
    <div class="view-container">
        <h2 class="view-title">医生列表</h2>
        <div class="container-main">
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">筛选查询</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='120' v-show='searchKey'>
                    <!-- <FormItem label="用户账号" prop="nameid">
                        <Input v-model.trim="formSearch.nameid" placeholder="用户ID/账号" :maxlength='20' style='width:120px'></Input>
                    </FormItem> -->
                   <FormItem label="用户昵称" prop="name">
                        <Input v-model.trim="formSearch.name" placeholder="用户昵称" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                      <FormItem label="手机" prop="phone">
                        <Input v-model.trim="formSearch.phone" placeholder="手机" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                    <FormItem>
                          <Button type="ghost" class='refresh' @click='refresh'>重置</Button>
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
                          </Select>   -->
                          <!-- <Select class="margin_right" v-model="model3" style="width:100px"  @on-change='changeWay' :label-in-value = "true" placeholder="排序方式">
                            <Option v-for="item in sortList" :value="item.value" :key="item.value"></Option>
                          </Select>   -->
                        </div>
             </div>
               <Table border :columns="columns" :data="data"></Table>
                <!-- <Page :total="totalAll" :current='pageNumberAll' :page-size='pageSize' @on-change='changePage' @on-page-size-change=' changeRow'></Page> -->
      <Modal
        title="确认删除"
        v-model="modal"
        class-name="vertical-center-modal">
        <p>用户已经删除</p>
    </Modal>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: 10,
      pageNumberAll: 1,
      totalAll: 0,
      modal: false,
      searchKey: true,
      formSearch: {
        phone: null,
        nameid: null,
        name: null
        // minPrice: null,
        // maxPrice: null
      },
      auditStatusp:[
        {
           id: 0,
          name: "待审核"
        },
        {
           id: 1,
          name: "审核中"
        },
        {
           id: 2,
          name: "审核成功"
        },
        {
           id: 3,
          name: "审核失败"
        },
         {
           id: 4,
          name: "未审核"
        },
      ],
       ifSuthentication:[
        {
           id: 0,
          name: ""
        },
        {
           id: 1,
          name: ""
        },
        {
           id: 2,
          name: ""
        },
        {
           id: 3,
          name: ""
        },
         {
           id: 4,
          name: "认证"
        },
      ],
      genderList: [
        {
          id: 0,
          name: "女"
        },
        {
          id: 1,
          name: "男"
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
      // sortList: [
      //   {
      //     value: "时间从远到近",
      //     label: ""
      //   },
      //   {
      //     value: "时间从近到远",
      //     label: ""
      //   }
      // ],
      model2: "",
      model3: "",
      //列表
      columns: [
        {
          title: "ID",
          align: "center",
          key: "id"
        },
        {
          title: "头像",
          width: 150,
          align: "center",
          key: "portrait",
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: "http://www.hellodoctor.com.cn/" + params.row.image_path
                },
                style: {
                  width: "48px",
                  height: "48px"
                }
              })
            ]);
          }
        },
        {
          title: "姓名",
          align: "center",
          key: "name"
        },
        {
          title: "性别",
          align: "center",
          // key: "gender"
          render: (h, params) => {
            const _text = this.genderList.filter(
              item => item.id === params.row.gender
            )[0].name;
            return h("span", _text);
          }
        },
        {
          title: "手机号码",
          align: "center",
          key: "mobile"
        },
        {
          title: "认证状态",
          // key: "gender",
          align: "center",
         render: (h, params) => {
            const _text = this.auditStatusp.filter(
              item => item.id === params.row.audit_status
            )[0].name;
            return h("span", _text);
          }
        },
        {
          title: "创建时间",
          align: "center",
          key: "create_date",
          sortable: true
        },
        {
          title: "操作",
          align: "center",
          width: 100,
          key: "action",
          render: (h, params) => {
             const _text = this.ifSuthentication.filter(
              item => item.id === params.row.audit_status
            )[0].name;
            return h("div", [
              // h(
              //   "span",
              //   {
              //     class: "redact",
              //     on: {
              //       click: () => {
              //         this.toRecord(params.row);
              //       }
              //     }
              //   },
              //   "查看"
              // ),
              // h(
              //   "span",
              //   {
              //     class: "redact",
              //     on: {
              //       click: () => {
              //         this.modal = true;
              //       }
              //     }
              //   },
              //   "删除"
              // ),
              h(
                "span",
                {
                  class: "redact",
                  on: {
                    click: () => {
                      this.toRecords(params.row);
                    }
                  }
                },
              _text
              ),
         
            ]);
          }
        }
      ],
      huakou: [
        {
          id: 0,
          name: "1"
        },
        {
          id: 1,
          name: "2"
        },
        {
          id: 2,
          name: "3"
        },
        {
          id: 3,
          name: "4"
        }
      ],
      data: []
    };
  },
  created() {
    this.doctorlist();

  },
  methods: {
    doctorlist() {
      var self = this;
      self.$http.get({
        url: "/doct-webManager/staff/search_staffs.jhtml",
        data: {
          name: self.formSearch.name,
          mobile: self.formSearch.phone
        },
        success: function(res) {
          // console.log(res.content[0].gender);

          if (res.code === 0) {
            self.data = res.content;
          } else {
          }
        }
      });
    },
    //重置搜索
    refresh() {
      this.$refs.formSearch.resetFields();
      this.doctorlist() 
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
      this.doctorlist();
    },

    //显示条数
    changeRow() {},
    //排序方式
    changeWay() {},
    toRecord(data) {
      this.$router.push({
        path: "/doctorDetails"
      });
    },
    toRecords(data) {
      this.$router.push({
        path: "/doctorCertified",
        query: {
                    id: data.id,
                    name:data.name
                }
      });
    },
    // 分页
    changePage(index) {
      this.pageNumber = index;
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
  /* margin-left: 20px; */
  cursor: pointer;
}
</style>

