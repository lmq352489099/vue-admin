<template>
    <div class="view-container">
        <h2 class="view-title">员工数据统计</h2>
        <div class="container-main">
         <div class="">
            <div>
                <span>在线医生：<span style="color:#8EC5FD" >9</span>&nbsp;人</span>
                <span>今日咨询顾客：<span style="color:#95E4B9">120</span>&nbsp;人</span>
            </div>
            <div>

            </div>
        </div>
           <div class="table-box">
                <Table :columns="col" :data="data" :loading='tableLoad'></Table> 
            </div>       
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoad: false,
      col: [
        {
          title: "#",
          key: "",
          width: "40px"
        },
        {
          title: "姓名",
          key: ""
        },
        {
          title: "职位",
          key: ""
        },
        {
          title: "咨询数",
          key: "",
          sortable: "custom"
        },
        {
          title: "回复数",
          key: "",
          sortable: "custom"
        },
        {
          title: "响应时间",
          keyt: ""
        }
      ],
      data: []
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.table-box {
  margin-top: 30px;
}
</style>

