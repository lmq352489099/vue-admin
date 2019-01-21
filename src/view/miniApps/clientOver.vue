<template>
  <div class="view-container">
    <h2 class="view-title">客户总揽</h2>
    <div class="container-main">
      <!-- 总揽 -->
      <div class="overview">
        <h1 class="overview-title">总揽</h1>
        <div class="overview-box">
          <p>
            <span class="overview-box-sp1">{{totalUserCount}}</span><br>
            <span class="overview-box-sp2">客户总数</span>
          </p>
          <p>
            <span class="overview-box-sp1">{{viewCount}}</span><br>
            <span class="overview-box-sp2">浏览总数</span>
          </p>
          <p>
            <span class="overview-box-sp1">{{promoteCount}}</span><br>
            <span class="overview-box-sp2">转发总数</span>
          </p>
          <!-- <p>
            <span class="overview-box-sp1">80000</span><br>
            <span class="overview-box-sp2">点赞</span>
          </p> -->
        </div>
      </div>
      <!--新增客户-->
      <div class="new-client">
        <h1 class="overview-title">新增客户</h1>
        <div class="new-client-box">
          <div class="new-client-box-left">
            <p>
              <span class="new-client-box-left-sp1">本周新增</span><br>
              <span class="new-client-box-left-sp2">{{weekUserNum}}</span><br>
              <span>
                <em class='home-up-icon'></em>
                <span class='up'> {{wPercent}}%</span>&nbsp;&nbsp;
                <span class="new-client-box-left-sp3">同比上周</span>
              </span>
            </p>
            <p>
              <span class="new-client-box-left-sp1">本月新增</span><br>
              <span class="new-client-box-left-sp2">{{monthUserNum}}</span><br>
              <span>
                <em class='home-down-icon'></em>
                <span class='down'> {{mPercent}}%</span>&nbsp;&nbsp;
                <span class="new-client-box-left-sp3">同比上月</span>
              </span>
            </p>
          </div>
          <div></div>
          <div class="new-client-box-right">
            <div class="title-time">
              <DatePicker :open="open" type="daterange" placement='bottom-end' :value='timeBox' @on-change="setTime">
                <ButtonGroup>
                  <!-- <Button :type="changeTimeIndex === 1 ? 'primary' : 'ghost'" @click='changeTime(1)'>昨天</Button> -->
                  <Button :type="changeTimeIndex === 2 ? 'primary' : 'ghost'" @click='changeTime(2)'>一周</Button>
                  <Button :type="changeTimeIndex === 3 ? 'primary' : 'ghost'" @click='changeTime(3)'>一个月</Button>
                  <Button type="ghost" @click='changeTime(4)'>{{showTime}}</Button>
                </ButtonGroup>
              </DatePicker>
            </div>
            <div class="yg-chart">
              <div class="chart-box1" id="chart-box1"> </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 咨询客户 -->
      <div class="new-client">
        <h1 class="overview-title">咨询客户</h1>
        <div class="new-client-box">
          <div class="new-client-box-left" style="border:none">
            <!-- <p>
              <span class="new-client-box-left-sp1">本周新增</span><br>
              <span class="new-client-box-left-sp2">600</span><br>
              <span>
                <em class='home-up-icon'></em>
                <span class='up'> 12%</span>&nbsp;&nbsp;
                <span class="new-client-box-left-sp3">同比上周</span>
              </span>
            </p>
            <p>
              <span class="new-client-box-left-sp1">本月新增</span><br>
              <span class="new-client-box-left-sp2">6000</span><br>
              <span>
                <em class='home-down-icon'></em>
                <span class='down'> 12%</span>&nbsp;&nbsp;
                <span class="new-client-box-left-sp3">同比上周</span>
              </span>
            </p> -->
          </div>
          <div></div>
          <div class="new-client-box-right">
            <div class="title-time">
              <DatePicker :open="open2" type="daterange" placement='bottom-end' :value='timeBox2' @on-change="setTime2">
                <ButtonGroup>
                  <!-- <Button :type="changeTimeIndex === 1 ? 'primary' : 'ghost'" @click='changeTime(1)'>昨天</Button> -->
                  <Button :type="changeTimeIndex2 === 2 ? 'primary' : 'ghost'" @click='changeTime2(2)'>一周</Button>
                  <Button :type="changeTimeIndex2 === 3 ? 'primary' : 'ghost'" @click='changeTime2(3)'>一个月</Button>
                  <Button type="ghost" @click='changeTime2(4)'>{{showTime2}}</Button>
                </ButtonGroup>
              </DatePicker>
            </div>
            <div class="chart-box1" id="chart-box2"> </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      viewCount: "",
      totalUserCount: "",
      promoteCount: "",
      weekUserNum: "",
      monthUserNum: "",
      wPercent: "",
      mPercent: "",
      chart1: null,
      chart2: null,
      data1: [],
      changeTimeIndex: 2,
      changeTimeIndex2: 2,
      open: false,
      open2: false,
      timeBox: [
        moment()
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ],
      timeBox2: [
        moment()
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ]
    };
  },
  computed: {
    showTime() {
      this.newUserStatChart();
      return `${this.timeBox[0]} 至 ${this.timeBox[1]}`;
    },
    showTime2() {
      this.consultUserStat();
      return `${this.timeBox2[0]} 至 ${this.timeBox2[1]}`;
    }
  },
  mounted() {
    let _vm = this;
    _vm.userOverView();
    _vm.newUserStat();
    _vm.initChart();
    _vm.newUserStatChart();
    _vm.initChart2();
    _vm.consultUserStat();
  },
  methods: {
    // 客户总览
    userOverView() {
      let _vm = this;
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/userOverView.jhtml",
        success(res) {
          _vm.promoteCount = res.content.promoteCount;
          _vm.totalUserCount = res.content.totalUserCount;
          _vm.viewCount = res.content.viewCount;
        }
      });
    },

    // 新增客户
    newUserStat() {
      let _vm = this;
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/newUserStat.jhtml",
        success(res) {
          _vm.monthUserNum = res.content.monthUserNum;
          _vm.weekUserNum = res.content.weekUserNum;
          _vm.mPercent =
            res.content.lastmonthUserNum / res.content.monthUserNum;
          _vm.wPercent = res.content.lastWeekUserNum / res.content.weekUserNum;
        }
      });
    },
    // 新增客户 echart
    newUserStatChart() {
      let _vm = this;
      let _data = {};
      if (_vm.changeTimeIndex !== 1) {
        _data = {
          startTime: _vm.timeBox[0],
          endTime: _vm.timeBox[1]
        };
      }
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/newUserStatByDate.jhtml",
        data: _data,
        success(res) {
          const _xData = res.content.map(item => item.createDate);
          const _user = res.content.map(item => item.count);
          _vm.chart.setOption({
            xAxis: {
              data: _xData
            },
            series: [
              {
                data: _user
              }
            ]
          });
        }
      });
    },
    initChart() {
      let _vm = this;
      _vm.chart = echarts.init(document.getElementById("chart-box1"));
      _vm.chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "20px",
          right: "35px",
          // bottom: "2%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            areaStyle: {
              normal: {
                color: "#5cadff",
                opacity: 0.2
              }
            },
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: "#5cadff",
                shadowBlur: 40,
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#5cadff"
                  }
                }
              }
            }
            // data: []
          }
        ]
      });
    },

    // 咨询客户
    consultUserStat() {
      let _vm = this;
      let _data = {};
      if (_vm.changeTimeIndex2 !== 1) {
        _data = {
          startTime: _vm.timeBox2[0],
          endTime: _vm.timeBox2[1]
        };
      }
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/consultUserStat.jhtml",
        success(res) {
          console.log("2");
          console.log(res);
          console.log("2");
          const _xData = res.content.map(item => item.createDate);
          const _user = res.content.map(item => item.count);
          _vm.chart2.setOption({
            xAxis: {
              data: _xData
            },
            series: [
              {
                data: _user
              }
            ]
          });
        }
      });
    },
    initChart2() {
      let _vm = this;
      _vm.chart2 = echarts.init(document.getElementById("chart-box2"));
      _vm.chart2.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "20px",
          right: "35px",
          // bottom: "2%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            areaStyle: {
              normal: {
                color: "#5cadff",
                opacity: 0.2
              }
            },
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: "#5cadff",
                shadowBlur: 40,
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#5cadff"
                  }
                }
              }
            }
            // data: []
          }
        ]
      });
    },

    changeTime(val) {
      this.changeTimeIndex = val;
      if (val === 1) {
        this.setTime([
          moment()
            .subtract(1, "d")
            .format("YYYY-MM-DD"),
          moment()
            .subtract(1, "d")
            .format("YYYY-MM-DD")
        ]);
      } else if (val === 2) {
        this.setTime([
          moment()
            .startOf("isoWeek")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]);
      } else if (val === 3) {
        this.setTime([
          moment()
            .startOf("month")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]);
      } else if (val === 4) {
        this.open = !this.open;
      }
    },

    changeTime2(val) {
      this.changeTimeIndex2 = val;
      if (val === 1) {
        this.setTime2([
          moment()
            .subtract(1, "d")
            .format("YYYY-MM-DD"),
          moment()
            .subtract(1, "d")
            .format("YYYY-MM-DD")
        ]);
      } else if (val === 2) {
        this.setTime2([
          moment()
            .startOf("isoWeek")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]);
      } else if (val === 3) {
        this.setTime2([
          moment()
            .startOf("month")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ]);
      } else if (val === 4) {
        this.open2 = !this.open2;
      }
    },
    setTime(val) {
      this.timeBox.splice(0, 2, ...val);
      this.open = false;
    },
    setTime2(val) {
      this.timeBox2.splice(0, 2, ...val);
      this.open2 = false;
    }
  }
};
</script>

<style scoped>
.overview {
  border: 1px solid #e4e4e4;
  width: 800px;
  height: 220px;
  margin-bottom: 30px;
}
.overview-title {
  font-size: 18px;
  background-color: #e4e4e4;

  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: 500;
}
.overview-box {
  display: flex;
  height: 160px;
  padding-top: 30px;
}
.overview-box p {
  width: 200px;
  text-align: center;
  line-height: 40px;
}
.overview-box-sp1 {
  font-size: 24px;
  font-weight: bold;
}
.overview-box-sp2 {
  font-size: 16px;
}
.new-client {
  margin-bottom: 30px;
}

.new-client .up {
  color: #56d48f;
}
.new-client .down {
  color: #ff486f;
}
.new-client-box {
  border: 1px solid #e4e4e4;
  padding-left: 20px;
  height: 300px;
  display: flex;
}
.new-client-box-left {
  width: 180px;
  height: 200px;
  border: 1px solid #e4e4e4;
  text-align: left;
  margin-top: 40px;
  padding-top: 10px;
  padding-left: 20px;
}
.new-client-box-left p {
  margin-top: 10px;
}
.new-client-box-left-sp1 {
  font-size: 14px;
}
.new-client-box-left-sp2 {
  font-size: 26px;
  font-weight: bold;
}
.new-client-box-right {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin-left: 10px;
}
.new-client-box-left-sp3 {
  font-size: 12px;
  color: #d8d8d8;
  font-weight: bold;
}
.title-time {
  text-align: right;
  margin-right: 10px;
}
.yg-chart {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.chart-box1 {
  width: 100%;
  height: 90%;
}
</style>
