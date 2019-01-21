<template>
    <div class="view-container">
            <h2 class="view-title">添加医生</h2>
            <div class="container-main">
                <div class="step">
                <span style="backgroundColor:#53a5f8">1.基本资料</span>
                <span style="backgroundColor:#53a5f8">2.认证信息</span>
                <span style="backgroundColor:#53a5f8">3.添加完成</span>
            </div>
                <h2>添加成功！</h2>
                <h2>{{hint}}</h2>
                <br>
                <h3>医生姓名：{{dcName}}</h3>
                <br>
                  <p class="step" style="marginTop:50px;">
            <span style="backgroundColor:#53a5f8; borderRadius:3px; " @click="fulfill()">完成</span>
            <span style="backgroundColor:#53a5f8; borderRadius:3px;" @click="goOn()">继续添加</span>
        </p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dcName:'',
      hint:'',
    };
  },
  mounted :function(){
      this.dcName = localStorage.name
  },
  methods: {
    fulfill() {
    this.$router.push('/doctorList')

    },
    goOn() {
      this.$router.push('/addDoctor')

    }
  }
};
</script>
<style scoped>
.container-main {
  padding-left: 230px;
  padding-top: 200px;
}
.step > span {
  display: inline-block;
  width: 100px;
  height: 30px;
  background-color: #999999;
  color: #ffffff;
  line-height: 30px;
  text-align: center;
  margin-bottom: 100px;
  margin-right: 30px;
  cursor: pointer;
}
.dcname {
    margin-bottom: 30px;
}
</style>

