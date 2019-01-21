<template>
  <div class="view-container">
    <h2 class="view-title">接入小程序</h2>
    <div class="container-main">
      <!-- 接入小程序 -->
      <div class="app-box">
        <p class="app-box-p1">接入后，可给顾客提供账户余额、券、积分查询及项目治疗预约功能</p>
        <Button type="primary" @click="join">接入悦完美小程序</Button>
        <p class="app-box-p2" style="margin-bottom:10px;font-size:14px;">关联流程（需要公众号和小程序管理员双方确认）：</p>
        <p class="app-box-p2">1.平台调用接口发起关联</p>
        <p class="app-box-p2">2.公众号管理员收到模板消息，同意关联小程序。</p>
        <p class="app-box-p2">3.小程序管理员收到模板消息，同意关联公众号</p>
        <p class="app-box-p2">4.关联成功</p>
      </div>
      <!--小程序 -->
      <div>
        <p class="view-title apps">已绑定小程序</p>
        <div>
          <div class="modol-appbox miniapps">
            <img src="" alt="">
            <span>悦完美</span>
            <p class="relieve" @click="relieveBtn">
              解除绑定
            </p>
          </div>

        </div>
      </div>
    </div>
    <!-- 提示框 -->
    <Modal v-model="modal1" title="关联悦完美小程序" okText='提交申请' cancelText='返回' @on-ok="ok" @on-cancel="cancel" :closable="true" :mask-closable="false" width="700" :styles="{top: '220px'}">
      <p class="modol-appid">APPID：
        <span>wx3bf33f34a706f917</span>
      </p>
      <div class="modol-appbox">
        <img src="" alt="">
        <span>悦完美</span>
      </div>
      <div class="modol-checkbox">
        <Checkbox v-model="single">关联后展示在公众号资料页</Checkbox><br>
        <Checkbox v-model="single2">关联后给已关注公众号用户发送通知</Checkbox>
      </div>
    </Modal>
    <Modal v-model="modal2" title="解除绑定" okText='确定' cancelText='取消' @on-ok="ok2" @on-cancel="cancel" :closable="true" :mask-closable="false" :styles="{top: '220px'}">
      <p class="modol-appid">确定解除绑定【XXXXX】吗？</p>
    </Modal>
    <Modal v-model="modal3" cancelText='' ok-text='关闭' :closable="true" :mask-closable="false" :styles="{top: '220px'}">
      <p class="modol-appid">提交成功</p>
      <p>您还需要同意绑定操作：</p>
      <p>公众号管理员将收到绑定消息，请同意小程序关联</p>
    </Modal>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      single: false,
      single2: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    join() {
      this.modal1 = true;
    },
    ok() {
      this.modal3 = true;
    },
    ok2() {
      let _vm = this;
      _vm.$http.get({
        url: "",
        success: function() {}
      });
    },
    cancel() {},
    relieveBtn() {
      this.modal2 = true;
    }
  }
};
</script>

<style scoped>
.app-box {
  margin: 60px 80px 0px;
}
.app-box-p1 {
  font-size: 14px;
  color: black;
}
.app-box button {
  width: 240px;
  height: 40px;
  font-size: 16px;
  margin: 20px 0px;
}
.app-box-p2 {
  color: #959595;
  font-size: 12px;
  line-height: 24px;
}
.modol-appid {
  text-align: center;
  font-size: 14px;
  margin: 15px 0px;
}
.modol-appbox {
  border: 1px solid #c8c8c9;
  height: 120px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  color: black;
  margin-bottom: 60px;
  border-radius: 10px;
}
.modol-appbox img {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  background-color: red;
  margin-right: 10px;
}
.modol-checkbox {
  width: 300px;
  margin: 10px auto;
  line-height: 20px;
}
.apps {
  box-shadow: none;
  margin-top: 100px;
  background-color: #e4e4e4;
  height: 50px;
  line-height: 50px;
}
.miniapps {
  border: none;
  margin: 0px 80px;
}
.relieve {
  position: relative;
  left: 300px;
  font-size: 14px;
  color: #14a4d9;
  cursor: pointer;
}
</style>
