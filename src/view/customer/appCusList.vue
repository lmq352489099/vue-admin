<template>
  <div class="view-container">
    <h2 class="view-title">顾客列表</h2>
    <Tabs type="card">
      <TabPane label="APP用户">
        <!-- 数据列表 -->
        <div class="data-list">
          <div>
            <span style="margin-right:10px;">数据列表</span>
            <Button type="ghost">添加</Button>
            <Button type="ghost">删除</Button>
          </div>
          <div>
            <Select class="phcolor" style="width:100px" @on-change="changeRow" placeholder="显示条数">
              <!-- <Option v-for="item in numList" :value="item.value" :key="item.value" ></Option> -->
            </Select>
            <Select class="phcolor" style="width:100px" @on-change="changeRank" placeholder="排序方式">
              <!-- <Option v-for="item in rankList" :value="item.value" :key="item.value" ></Option> -->
            </Select>
          </div>
        </div>
        <!-- 检索 -->
        <div :class="['main-search-box', searchKey ? '' : 'up']">
          <div class="main-search-title">筛选查询</div>
          <div class="search-show-btn-down" @click="changeSearch(false)" v-if="searchKey">收起筛选
            <span></span>
          </div>
          <div class="search-show-btn-up" @click="changeSearch(true)" v-if="!searchKey">展开筛选
            <span></span>
          </div>
          <Form ref="formSearch" :model="formSearch" inline :label-width="120" v-show="searchKey">
            <FormItem label="用户账号" prop="userID">
              <Input v-model.trim="formSearch.userID" placeholder="用户ID账号" :maxlength="20" style></Input>
            </FormItem>
            <FormItem label="用户昵称" prop="userName">
              <Input v-model.trim="formSearch.userName" placeholder="用户昵称" :maxlength="20" style></Input>
            </FormItem>
            <FormItem label="手机" prop="phone">
              <Input v-model.trim="formSearch.phone" placeholder="手机" :maxlength="20" style></Input>
            </FormItem>
            <form-item label="会员等级" prop="userGrade">
              <i-select v-model="formSearch.userGrade" placeholder="请选择">
                <i-option value="0"></i-option>
                <i-option value="1"></i-option>
                <i-option value="2"></i-option>
              </i-select>
            </form-item>
            <FormItem>
              <Button type="ghost" class="refresh" @click="refresh('formSearch')">重置</Button>
              <Button type="primary" @click="handleSubmit('formSearch')">检索</Button>
            </FormItem>
          </Form>
        </div>
        <div class="container-main">
          <Table :columns="col" :data="data"></Table>
        </div>
      </TabPane>
      <TabPane label="锦医卫用户">
        <!-- 数据列表 -->
        <div class="data-list">
          <div>
            <span style="margin-right:10px;">数据列表</span>
            <Button type="ghost">全部邀请</Button>
          </div>
        </div>
        <!-- 检索 -->
        <div :class="['main-search-box', searchKey ? '' : 'up']">
          <div class="main-search-title">筛选查询</div>
          <div class="search-show-btn-down" @click="changeSearch(false)" v-if="searchKey">收起筛选
            <span></span>
          </div>
          <div class="search-show-btn-up" @click="changeSearch(true)" v-if="!searchKey">展开筛选
            <span></span>
          </div>
          <Form ref="formSearch" :model="formSearch" inline :label-width="110" v-show="searchKey">
            <FormItem label="姓名" prop="userID">
              <Input v-model.trim="formSearch.userID" placeholder="用户姓名" :maxlength="20" style></Input>
            </FormItem>
            <FormItem label="手机" prop="phone">
              <Input v-model.trim="formSearch.phone" placeholder="手机" :maxlength="20" style></Input>
            </FormItem>
            <FormItem label="绑定状态" prop="phone">
              <Input v-model.trim="formSearch.phone" placeholder="绑定状态" :maxlength="20" style></Input>
            </FormItem>
            <FormItem>
              <Button type="ghost" class="refresh" @click="refresh('formSearch')">重置</Button>
              <Button type="primary" @click="handleSubmit('formSearch')">检索</Button>
            </FormItem>
          </Form>
        </div>
        <div class="container-main">
          <Table :columns="col2" :data="data2"></Table>
        </div>
      </TabPane>
      <TabPane label="其他类别"></TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: true,
      formSearch: {
        userID: "",
        userName: "",
        phone: "",
        userGrade: ""
      },
      col: [
        {
          title: "用户ID",
          key: ""
        },
        {
          title: "用户账号",
          key: ""
        },
        {
          title: "用户昵称",
          key: ""
        },
        {
          title: "会员等级",
          key: ""
        },
        {
          title: "手机",
          key: ""
        },

        {
          title: "消费金额",
          key: ""
        },
        {
          title: "订单数量",
          key: ""
        },
        {
          title: "账号启用状态",
          key: ""
        },
        {
          title: "添加到锦衣卫",
          key: ""
        },
        {
          title: "操作"
        }
      ],
      col2: [
        {
          title: "顾客",
          key: ""
        },
        {
          title: "手机号",
          key: ""
        },
        {
          title: "性别",
          key: ""
        },
        {
          title: "绑定状态",
          key: ""
        }
      ],
      data: [],
      data2: []
    };
  },
  created() {},
  methods: {
    //显示条数
    changeRow() {},
    //排序方式
    changeRank() {},
    // 展开
    changeSearch(bool) {
      this.searchKey = bool;
    },
    //搜索按钮
    handleSubmit() {},
    //重置搜索
    refresh() {
      this.$refs.formSearch.resetFields();
    }
  }
};
</script>

<style scoped>
.data-list {
  margin: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-search-box {
  margin: 20px 40px;
}
</style>
