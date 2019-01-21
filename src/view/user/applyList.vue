<template>
    <div class="view-container">
        <h2 class="view-title">员工申请</h2>
        <div class="container-main user-list">
            <div class="apply-title">
                <Button class='del' @click='applySave(1)' :loading='applyLoad'>删除</Button>
                <Button type="primary" @click='applySave(2)' :loading='applyLoad'>全部同意</Button>
                <Button type="ghost" @click='applySave(3)' :loading='applyLoad'>清空列表</Button>
                <Select v-model="formApply.auditStatus" @on-change='getListApply(1, formApply)'>
                    <Option :value="1">全部</Option>
                    <Option :value="0">未处理</Option>
                    <Option :value="2">已同意</Option>
                    <Option :value="3">已拒绝</Option>
                </Select>
            </div>
            <Table :columns="colApply" :data="dataApply" :loading='tableApplyLoad' @on-selection-change='setChange'></Table>
            <Page :total="totalApply" :current='pageNumberApply' :page-size='pageSize' @on-change='changePageApply'></Page>
        </div>
        <Modal
            title="系统提示"
            v-model="modalApply"
            @on-ok="okApply"
            :loading='loadingApply'
            class-name="vertical-center-modal">
            <p v-if='applyStatus === 2'>确定要同意全部申请吗？</p>
            <p v-if='applyStatus === 3'>确定要清空全部申请吗？</p>
            <p v-if='applyStatus === 1'>确定要删除选中的申请吗？</p>
            <p v-if='applyStatus === 4'>确定要同意{{formAgree.name}}的申请吗？</p>
            <p v-if='applyStatus === 5'>确定要拒绝{{formAgree.name}}的申请吗？</p>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumberApply: 1,
      totalApply: 0,
      tableApplyLoad: false,
      applyLoad: false,
      modalApply: false,
      loadingApply: true,
      applyStatus: 2,
      applyChangeList: [],
      formApply: {
        auditStatus: 1,
        actionType: 0
      },
      formAgree: {},
      colApply: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          render: (h, params) => {
            const _url = this.baseImgURL + params.row.imagePath;
            return h("div", [
              h("img", {
                style: {
                  display: "inline-block",
                  width: "30px",
                  height: "30px",
                  marginRight: "8px",
                  verticalAlign: "top"
                },
                attrs: {
                  src: _url
                }
              }),
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    height: "30px",
                    lineHeight: "30px",
                    verticalAlign: "top"
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "申请时间",
          key: "actionTime"
        },
        {
          title: "操作",
          width: 170,
          render: (h, params) => {
            if (params.row.auditStatus === 0) {
              return h("div", [
                h(
                  "span",
                  {
                    class: "agree-word-btn",
                    on: {
                      click: () => {
                        this.applySave(4, params.row);
                      }
                    }
                  },
                  "同意"
                ),
                h(
                  "span",
                  {
                    class: "refuse-word-btn",
                    on: {
                      click: () => {
                        this.applySave(5, params.row);
                      }
                    }
                  },
                  "拒绝"
                )
              ]);
            } else if (params.row.auditStatus === 2) {
              return h(
                "span",
                {
                  style: {
                    fontSize: "14px",
                    color: "#9e9e9e"
                  }
                },
                "已同意"
              );
            } else if (params.row.auditStatus === 3) {
              return h(
                "span",
                {
                  style: {
                    fontSize: "14px",
                    color: "#9e9e9e"
                  }
                },
                "已拒绝"
              );
            }
          }
        }
      ],
      dataApply: []
    };
  },
  computed: {
    pageSize() {
      return this.$store.getters.getPageSize;
    },
    baseImgURL() {
      return this.$store.getters.getBaseImgURL;
    }
  },
  mounted() {
    this.getListApply(1, this.formApply);
  },
  methods: {
    getListApply(pageNumber, form) {
      let _vm = this,
        _form = Object.assign({}, form);
      _form.pageNumber = pageNumber;
      _vm.tableApplyLoad = true;
      if (_form.auditStatus === 1) {
        _form.auditStatus = null;
      }
      _vm.$http.get({
        url: "doct-webManager/staffAction/get_page.jhtml",
        data: _form,
        success: function(res) {
          if (res.code === 0) {
            _vm.dataApply = res.content.content || [];
            _vm.pageNumberApply = res.content.pageNumber || 1;
            _vm.totalApply = res.content.total || 0;
          } else {
            console.log(res.data.desc);
          }
          _vm.tableApplyLoad = false;
        }
      });
    },
    changePageApply(num) {
      this.getListApply(num, this.formApply);
    },
    setChange(data) {
      this.applyChangeList = data;
    },
    applySave(bool, data) {
      this.applyStatus = bool;
      if (bool === 1) {
        if (this.applyChangeList.length) {
          this.modalApply = true;
        } else {
          this.$Notice.error({
            title: "系统提示！",
            desc: "请选择要删除的数据！"
          });
        }
      } else {
        if (bool === 4 || bool === 5) {
          this.formAgree = {
            records: data.id,
            name: data.name,
            auditStatus: bool === 4 ? 2 : 3
          };
        }
        this.modalApply = true;
      }
    },
    okApply() {
      let _vm = this,
        _url = "",
        _data = {},
        _idBox = _vm.applyChangeList.map(item => item.id);
      console.log(_idBox);
      if (_vm.applyStatus === 2) {
        _url = "doct-webManager/staffAction/allpass.jhtml";
      } else if (_vm.applyStatus === 3) {
        _url = "doct-webManager/staffAction/allclear.jhtml";
      } else if (_vm.applyStatus === 1) {
        _url = "doct-webManager/staffAction/clear.jhtml";
        _data = {
          records: _idBox.join(",")
        };
      } else {
        _url = "doct-webManager/staffAction/audit.jhtml";
        _data = _vm.formAgree;
      }
      _vm.$http.post({
        url: _url,
        data: _data,
        success: function(res) {
          if (res.code === 0) {
            _vm.$Notice.success({
              title: "系统提示！",
              desc: "操作成功！"
            });
            _vm.getListApply(_vm.pageNumberApply, _vm.formApply);
          } else {
            _vm.$Notice.error({
              title: "系统提示！",
              desc: res.content.desc
            });
          }
          _vm.modalApply = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.user-list .apply-title,
.user-list .search-title {
  height: 28px;
  margin-bottom: 16px;
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(150px);
  opacity: 0;
}
</style>
<style type="text/css">
.user-list .search-title .ivu-select {
  float: right;
  width: 160px;
}
.user-list .search-title .ivu-btn {
  float: right;
  margin-left: 10px;
}
.user-list .apply-title .ivu-btn {
  float: right;
  margin: 0px 0 0 8px;
}
.user-list .apply-title .del {
  float: left;
  margin: 0px 0 0 0px;
}
.user-list .apply-title .ivu-select {
  float: right;
  width: 160px;
  margin-right: 12px;
}
</style>
