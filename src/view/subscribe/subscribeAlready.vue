<template>
    <div class="view-container">
        <h2 class="view-title">预约详情</h2>
        <div class="container-main">
            <div class="state"><span style="color:red; margin-right: 40px">预约状态：已上门</span> <span style="font-size:14px">上门时间：{{time}}</span></div>
            <table class="table1" >
                <tr v-for = "item in items" :key="item.id">
                    <td class="td-left">{{item.title}}</td>
                    <td class="td-right"> {{item.details}}</td>
                </tr>
            </table>
              <table class="table1" style="" >
                <tr v-for = "item in items2" :key="item.id">
                    <td class="td-left">{{item.title}}</td>
                    <td class="td-right"> {{item.details}}</td>
                </tr>
            </table>
        </div>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      time:"2018-5-7 13:29",
      items: [
        {
          title: "预约编号",
          details: "",
          id: 1
        },
        {
          title: "预约医院",
          details: "",
          id: 2
        },
        {
          title: "预约医生",
          details: "",
          id: 3
        },
        {
          title: "预约项目",
          details: "",
          id: 4
        },
        {
          title: "预约时间",
          details: "",
          id: 5
        },
        {
          title: "预约方式",
          details: "",
          id: 6
        }
      ],
      items2: [
        {
          title: "用户ID",
          details: "",
          id: 1
        },
        {
          title: "用户昵称",
          details: "",
          id: 2
        },
        {
          title: "创建时间",
          details: "",
          id: 3
        },
        {
          title: "取消时间",
          details: "",
          id: 4
        },
        {
          title: "取消原因",
          details: "",
          id: 5
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
.state {
  width: 100%;
  height: 60px;
  background-color: #f4f4f4;
  line-height: 60px;
  padding-left: 50px;
  box-sizing: border-box;
  font-size: 18px;
  margin-bottom: 60px;

}
.container-main {
  padding: 80px 40px 0 140px;
  margin-top: -60px;
  min-height: 100%;
}
.table1 {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}
.td-left {
  width: 25%;
  height: 40px;
  background-color: #f4f4f4;
  border: 1px solid #dcdcdc;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #666666;
}
.td-right {
  width: 75%;
  height: 40px;
  border: 1px solid #dcdcdc;
  text-align: left;
  line-height: 40px;
  font-size: 14px;
  color: #666666;
  text-indent: 30px;
}

</style>
