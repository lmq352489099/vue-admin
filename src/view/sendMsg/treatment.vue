<template>
    <div class="view-container">
        <h2 class="view-title">疗程列表</h2>
        <div class="container-main">
                  <!-- 数据列表 -->
            <div class="data-list">
               <div>
                   <span style="margin-right:10px;">数据列表</span>
                   <Button type="ghost">邀请绑定</Button>
               </div>
            </div>
             <!-- 检索 -->
                  <div :class="['main-search-box', searchKey ? '' : 'up']">
                    <div class="main-search-title">筛选查询</div>
                    <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                    <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                    <Form ref="formSearch" :model="formSearch" inline :label-width='120' v-show='searchKey'>
                        <FormItem label="搜索" prop="serial" >
                            <Input v-model.trim="formSearch.serial" placeholder="商品名称、编号" :maxlength='20' style=''></Input>
                        </FormItem>
                         <form-item label="绑定状态" prop="userGrade">
                            <i-select v-model="formSearch.state" placeholder="绑定状态">
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
                </div>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Page :total="total" :current='pageNumber' :page-size='pageSize' @on-change='changePage'></Page>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p>您确定要邀请{{bindUser.name}}绑定医院吗？</p>
            <p>一天只能邀请一次！</p>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: true,
      formSearch: {
        serial: "",
        state: "",
        minPrice: "",
        maxPrice: ""
      },
      pageNumber: 1,
      total: 0,
      modal: false,
      loading: true,
      tableLoad: false,
      bindUser: {
        mobile: "",
        companyUserId: "",
        name: ""
      },
      col: [
        {
          title: "顾客姓名",
          render: (h, params) => {
            return h(
              "span",
              {
                on: {
                  click: () => {
                    this.toCusIndex(params.row);
                  }
                },
                style: {
                  cursor: "pointer",
                  color: "#55a8fd"
                }
              },
              [h("span", params.row.name)]
            );
          }
        },
        {
          title: "手机号码",
          key: "mobile"
        },
        {
          title: "项目名称",
          key: "treatName"
        },
        {
          title: "项目类型",
          key: "treatType"
        },
        {
          title: "规格",
          render: (h, params) => {
            if (params.row.treatSize) {
              return h("span", params.row.treatSize);
            } else {
              return h("span", "--");
            }
          }
        },
        {
          title: "数量",
          key: "treateNum"
        },
        {
          title: "指定医生",
          key: "treateUserName"
        },
        {
          title: "提交时间",
          key: "treatCreateTime"
        },
        {
          title: "同步时间",
          key: "modifyDate"
        },
        {
          title: "绑定状态",
          width: 110,
          render: (h, params) => {
            if (params.row.userBindStatus === 2) {
              return h(
                "div",
                {
                  class: "invited-word-btn"
                },
                "已邀请"
              );
            } else if (
              params.row.userBindStatus === 0 ||
              params.row.userBindStatus === 1
            ) {
              return h(
                "div",
                {
                  class: "invite-word-btn",
                  on: {
                    click: () => {
                      this.bind(params.row);
                    }
                  }
                },
                "邀请绑定"
              );
            } else if (params.row.userBindStatus === 5) {
              return h(
                "span",
                {
                  style: {
                    fontSize: "14px",
                    color: "#9e9e9e"
                  }
                },
                "已绑定"
              );
            }
          }
        }
      ],
      data: []
    };
  },
  computed: {
    pageSize() {
      return this.$store.getters.getPageSize;
    }
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    // 展开
    changeSearch(bool) {
      this.searchKey = bool;
    },
    //搜索按钮
    handleSubmit() {

    },
    //重置搜索
    refresh() {
      this.$refs.formSearch.resetFields();
      this.formSearch.minPrice = null;
      this.formSearch.maxPrice = null;
    },
    getList(pageNumber) {
      let _vm = this;
      _vm.tableLoad = true;
      _vm.$http.get({
        url: "doct-webManager/guardTreatment/getPage.jhtml",
        data: {
          pageNumber: pageNumber,
          pageSize: _vm.pageSize
        },
        success: function(res) {
          if (res.code === 0) {
            _vm.data = res.content.page.content || [];
            _vm.pageNumber = res.content.page.pageNumber || 1;
            _vm.total = res.content.page.total || 0;
          } else {
            console.log(res.data.desc);
          }
          _vm.tableLoad = false;
        }
      });
    },
    changePage(num) {
      this.getList(num);
    },
    bind(data) {
      this.bindUser.mobile = data.mobile;
      this.bindUser.companyUserId = data.companyCreateUserId;
      this.bindUser.name = data.name;
      this.modal = true;
    },
    ok() {
      let _vm = this;
      _vm.$http.post({
        url: "doct-webManager/guard_user/sendInvitedSmsByTreatmentOnce.jhtml",
        data: _vm.bindUser,
        success: function(res) {
          if (res.content.code === 0) {
            _vm.$Notice.success({
              title: "系统提示！",
              desc: "邀请成功！"
            });
            _vm.getList(_vm.pageNumber);
          } else {
            _vm.$Notice.error({
              title: "系统提示！",
              desc: res.content.desc
            });
          }
          _vm.modal = false;
        }
      });
    },
    toCusIndex(data) {
      const _userId = data.userId || "";
      this.$router.push({
        path: "/customerInfo",
        query: {
          name: data.name,
          id: data.companyCreateUserId,
          mobile: data.mobile,
          userId: _userId,
          status: data.userBindStatus
        }
      });
    }
  }
};
</script>
<style scoped>
.data-list {
  margin-bottom: 10px;
}
</style>

