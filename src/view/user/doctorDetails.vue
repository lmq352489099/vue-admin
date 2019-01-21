<template>
    <div class="view-container">
        <h2 class="view-title">医生列表</h2>
        <div class="container-main">
            <div><span class="renovate">刷新</span><span class="renovate">返回</span></div> 
            <table border="1"  class="table1">
                <tr>
                    <td rowspan="4" class="dcimg">
                        <img src="../../assets/images/icon-btn.png" alt="">
                        <p>王强</p>
                    </td>
                    <td class="table-t">ID</td>
                    <td class="table-d">xxxxxxx</td>
                    <td class="table-t">职称</td>
                    <td class="table-d">副主任医师</td>
                </tr>
                 <tr>
                    <td class="table-t">姓名</td>
                    <td class="table-d">王强</td>
                    <td class="table-t">所属机构</td>
                    <td class="table-d">北京xxxxxxxxxxx</td>
                </tr>
                 <tr>
                    <td class="table-t">性别</td>
                    <td class="table-d">男</td>
                    <td class="table-t">注册时间</td>
                    <td class="table-d">12017-10-13</td>
                </tr>
                 <tr>
                    <td class="table-t">认证状态</td>
                    <td class="table-d">已认证</td>
                    <td class="table-t">认证时间</td>
                    <td class="table-d">12017-10-13</td>
                </tr>
            </table>
            <!-- <h3 class="box-title">认证信息</h3>
            <div class="certificationPictures">
              <div>
                <p></p>
                <img src="" alt="">
              </div>
              <div>
                <p></p>
                <img src="" alt="">
              </div>
              <div>
                <p></p>
                <img src="" alt="">
              </div>

            </div> -->
             <h3 class="box-title">统计信息</h3>
             <table border="1"  class="table1">
                 <tr>
                     <td class="table-t2 ">消费金额</td>
                     <td class="table-t2 ">订单数量</td>
                     <td class="table-t2 ">优惠券（张）</td>
                     <td class="table-t2 ">商品评价</td>
                     <td class="table-t2 ">预约次数</td>
                     <td class="table-t2 ">关注</td>
                     <td class="table-t2 ">粉丝</td>
                 </tr>
                 <tr>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                 </tr>
                 <tr>
                     <td class="table-t2 ">售后记录</td>
                     <td class="table-t2 ">登录次数</td>
                     <td class="table-t2 ">收藏商品</td>
                     <td class="table-t2 "></td>
                     <td class="table-t2 "></td>
                     <td class="table-t2 "></td>
                     <td class="table-t2 "></td> 
                 </tr>
                 <tr>
                    <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                     <td class="table-d2 "></td>
                 </tr>
             </table>
            <h3 class="box-title">预约记录</h3>
            <table border="1"  class="table1">
                <tr>
                   <td class="table-t2">预约编号</td>
                   <td class="table-t2">预约时间</td>
                   <td class="table-t2">预约医院</td>
                   <td class="table-t2">预约项目</td>
                   <td class="table-t2">预约医生</td>
                   <td class="table-t2">预约方式</td>
                   <td class="table-t2">预约状态</td>
                </tr>
                  <tr>
                   <td class="table-d2 ">20170001</td>
                   <td class="table-d2 ">2017-10-12 10:20:33</td>
                   <td class="table-d2 ">XXXXX医院</td>
                   <td class="table-d2 ">玻尿酸</td>
                   <td class="table-d2 ">张泽明医生</td>
                   <td class="table-d2 ">APP预约</td>
                   <td class="table-d2 ">待上门</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.container-main {
  padding: 80px 40px 0 40px;
  margin-top: -60px;
  min-height: 100%;
}
.renovate {
  display: inline-block;
  width: 80px;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  margin-bottom: 30px;
  margin-right: 20px;
  cursor: pointer;
  background-color: #f7f7f7;
}
.renovate:hover {
  background-color: white;
  border: 1px solid #55a8fd;
  color: #55a8fd;
}
.table1 {
  width: 80%;
  border-collapse: collapse;
  border: 1px solid #dddddd;
}
.dcimg {
  width: 20%;
  height: 140px;
  text-align: center;
}
.dcimg > img {
  width: 90px;
  height: 90px;
  background-color: red;
  border-radius: 50%;
  margin-bottom: 5px;
}
.dcimg > p {
  font-size: 16px;
  font-weight: bold;
}
.table-t {
  width: 14%;
  text-align: center;
  background-color: #f5f5f5;
}
.table-d {
  width: 26%;
  text-indent: 20px;
}
/* 统计信息 */
.box-title {
  font-size: 15px;
  margin-top: 50px;
  margin-bottom: 10px;
}
.table-t2 {
  width: 14%;
  height: 45px;
  text-align: center;
  background-color: #f5f5f5;
}
.table-d2 {
  height: 45px;
  text-align: center;
}
</style>
