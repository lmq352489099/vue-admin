<template>
    <div class="view-container home">
        <h2 class="view-title">首页</h2>
        <h3 class="title-b">请联系管理员进行配置或联系客服：0592-6212592</h3>
        <div class="container-main">
            <Row :gutter="24" class="card-box">
                <Col :sm="12" :md="8" :lg="6">
                    <div class="card-item">
                        <p>今日订单总数</p>
                        <h3>124单</h3>
                        <div class="aaa">
                        <span class='up'><em class='home-up-icon'></em>123单</span>
                        <div id="main" style=""></div>
                        </div>
                    </div>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <div class="card-item">
                        <p>今日销售总数</p>
                        <h3>￥60000</h3>
                        <div class="aaa">
                            <span><em class='home-down-icon'></em>123单</span>
                            <div id="main2" style=""></div>
                        </div>
                      
                    </div>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <div class="card-item">
                        <p>昨日销售总数</p>
                        <h3>￥60000</h3>
                         <div class="aaa">
                          <span><em class='home-down-icon'></em>￥60000</span>
                            <div id="main3" style=""></div>
                        </div>
                    </div>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <div class="card-item">
                        <p>近7天销售额</p>
                        <h3>￥60000</h3>
                          <div class="aaa">
                            <span><em class='home-down-icon'></em>￥60000</span>
                            <div id="main4" style=""></div>
                        </div>
                     
                    </div>
                </Col>
            </Row>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">待处理事项</h3>
                <div class="main-message-list">
                    <ul class="main-message-list-tit wait">
                        <li>待支付订单</li>
                        <li>可使用订单</li>
                        <li>已完成订单</li>
                        <li>已评价订单</li>
                        <li>待确认订单</li>
                        <li>待处理订单</li>
                    </ul>
                    <ul class="main-message-list-main wait">
                        <li>2900</li>
                        <li>2323</li>
                        <li>2323</li>
                        <li>2323</li>
                        <li>2323</li>
                        <li>2323</li>
                    </ul>
                    
                </div>
            </div>
            <Row :gutter="24">
                <Col :md="12">
                    <div class="main-content-item">
                        <h3 class="main-content-item-tit">商品总览</h3>
                        <div class="preview">
                            <p>全部商品</p>
                            <h4>18,000,000</h4>
                            <div class="preview-table">
                                <ul class="preview-row">
                                    <li>
                                        <p>已上架</p>
                                        <p class="con">100</p>
                                    </li>
                                    <li class="diff">
                                        <p>待审核</p>
                                        <p class="con">100</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col :md="12">
                    <div class="main-content-item">
                        <h3 class="main-content-item-tit">用户总览</h3>
                        <div class="preview user">
                            <p>用户总数</p>
                            <h4>18,000,000</h4>
                            <div class="preview-table">
                                <ul class="preview-row">
                                    <li>
                                        <p>今日新增</p>
                                        <p class="con">100</p>
                                    </li>
                                    <li>
                                        <p>昨日新增</p>
                                        <p class="con">100</p>
                                    </li>
                                    <li class="diff">
                                        <p>本月新增</p>
                                        <p class="con">100</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">订单统计</h3>
            </div>
            <div class="main-content-item">
                <h3 class="main-content-item-tit">销售统计</h3>
            </div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
        data1:[200, 2000, 901]
    };
  },
  mounted() {
    // this.hh();
      console.log(1+1)
  },
  methods: {
    hh() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      var myChart2 = echarts.init(document.getElementById("main2"));
      var myChart3 = echarts.init(document.getElementById("main3"));
      var myChart4 = echarts.init(document.getElementById("main4"));

      // 绘制图表
      myChart.setOption({
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["", "", ""],
          axisLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            show: false
          }
        },
        color: ["#7BDEA8"],
        series: [
          {
            data:this.data1,
            type: "line",
            areaStyle: {
              normal: {
                lineStyle: {
                  color: "#6FBAE2"
                }
              }
            }
          }
        ]
      });
      // 绘制图表
      myChart2.setOption({
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Wed", "Wed", "Wed"],
          axisLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            show: false
          }
        },
        color: ["#6EB4FB"],
        series: [
          {
            data: [200, 389, 901, 901, 901, 21],
            type: "line",
            areaStyle: {
              normal: {
                lineStyle: {
                  color: "#6FBAE2"
                }
              }
            }
          }
        ]
      });

      // 绘制图表
      myChart3.setOption({
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed"],
          axisLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            show: false
          }
        },
        color: ["#6EB4FB"],
        series: [
          {
            data: [200, 389, 901],
            type: "line",
            areaStyle: {
              normal: {
                lineStyle: {
                  color: "#6FBAE2"
                }
              }
            }
          }
        ]
      });

      // 绘制图表
      myChart4.setOption({
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed"],
          axisLine: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            show: false
          }
        },
        color: ["#6EB4FB"],
        series: [
          {
            data: [200, 389, 901],
            type: "line",
            areaStyle: {
              normal: {
                lineStyle: {
                  color: "#6FBAE2"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.home h3 {
  font-size: 20px;
  color: #333333;
  font-weight: normal;
  text-align: center;
  margin-top: 260px;
}
.card-box {
  padding: 24px 0;
}
.card-item {
  min-height: 150px;
  padding: 13px 5.7%;
  padding-left: 7%;
  margin-bottom: 16px;
  border: 1px solid #f0f0f1;
  border-radius: 4px;
}
.card-item p {
  font-size: 14px;
  line-height: 20px;
  color: #757575;
}
.card-item h3 {
  margin: 3px 0 0;
  font-size: 40px;
  line-height: 56px;
  font-weight: normal;
  color: #263238;
  word-break: break-all;
}
.card-item span {
  display: inline-block;
  font-size: 12px;
  line-height: 17px;
  color: #ff486f;
}
.card-item .up {
  color: #56d48f;
}
.wait li {
  width: 16.66%;

}
.main-message-list-main li {
 text-align: left;
 text-indent: 12px;
}
.preview {
  min-height: 240px;
  padding: 22px 20px 32px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
}
.preview p {
  font-size: 14px;
  line-height: 20px;
  color: #757575;
  text-align: center;
}
.preview h4 {
  padding-bottom: 21px;
  border-bottom: 2px solid #e5e5e5;
  margin-bottom: 32px;
  font-size: 40px;
  line-height: 56px;
  font-weight: normal;
  color: #55a8fd;
  word-break: break-all;
  text-align: center;
}
.preview.user h4 {
  color: #ffc14a;
}
.preview-table {
  display: table;
  width: 100%;
}
.preview-row {
  display: table-row;
}
.preview li {
  float: left;
  display: table-cell;
  width: 50%;
  border-right: 1px solid #e5e5e5;
}
.preview.user li {
  width: 33.3%;
}
.preview .diff {
  border-right: none;
}
.preview .con {
  font-size: 24px;
  line-height: 33px;
  word-break: break-all;
}
#main,
#main2,
#main3,
#main4 {
  height: 94px;
  width: 170px;
}

.aaa {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>

