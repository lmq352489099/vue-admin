<template>
  <div class="view-container">
    <h2 class="view-title">员工分析</h2>
    <div class="container-main">
      <!-- 客户量 -->
      <div>
        <h1 class="subtitle">客户量</h1>
        <div class="subtitle-box">
          <table>
            <tr>
              <th>员工</th>
              <th>直接客户量</th>
              <th>渗透客户量</th>
              <th>合计</th>
            </tr>
            <tr v-for=" item in staffList" :key='item.index'>
              <td>{{item.name}}</td>
              <td>{{item.one}}</td>
              <td>{{item.two}}</td>
              <td>{{item.two + item.one}}</td>
            </tr>
            <tr>
              <td class="all">合计</td>
              <td class="all">{{oneAll}}</td>
              <td class="all">{{twoAll}}</td>
              <td class="all">{{oneAll + twoAll}}</td>
            </tr>

          </table>
        </div>
      </div>
      <!-- 顾客脉络图 -->
      <div>
        <h1 class="subtitle">顾客脉络图</h1>
        <Select v-model="model1" style="width:200px" @on-change='doMore'>
          <Option v-for="item in doclist" :value="item.id" :key="item.index">{{item.name}}</Option>
        </Select>
        <div id="chart-box">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  data() {
    return {
      staffList: [],
      oneAll: "",
      twoAll: "",
      doclist: [],
      model1: "",
      staffId: "",
      userId: "",
      deepValue: 0,
      chart: null,
      children1: [],
      data: {
        name: "",
        children: []
      },
      presentNode: null
    };
  },
  computed: {},
  mounted() {
    this.getStaffUserNums();
    // this.userRelate();
    this.docid();
  },
  methods: {
    doMore(value) {
      let _vm = this;
      var valuee = value;
      var t = _vm.doclist.filter(value => {
        return value.id == valuee;
      });
      _vm.staffId = value;
      _vm.deepValue = 0;

      _vm.data = {
        name: t[0].name
        // children: []
      };
      localStorage.setItem("data", _vm.data.name);
      _vm.userRelate();
      console.log(_vm.data);
    },
    getStaffUserNums() {
      let _vm = this;
      _vm.$http.get({
        url: "doct-webManager/api/xcx/message/getStaffUserNums.jhtml",
        success(res) {
          _vm.staffList = res.content;
          // 一度客户量合计
          var oneAll = _vm.staffList.map(item => item.one);
          var summary = 0;
          for (var i = 0; i < oneAll.length; i++) {
            summary += parseFloat(oneAll[i]);
            _vm.oneAll = summary;
          }
          // 二度客户量合计
          var twoAll = _vm.staffList.map(item => item.two);
          var summary = 0;
          for (var i = 0; i < twoAll.length; i++) {
            summary += parseFloat(twoAll[i]);
            _vm.twoAll = summary;
          }
        }
      });
    },
    // 医生id
    docid() {
      let _vm = this;
      _vm.$http.get({
        url: "/doct-webManager/staff/get_staffs.jhtml",
        data: {
          companyId: 1
        },
        success(res) {
          _vm.doclist = res.content;
        }
      });
    },
    userRelate() {
      let _vm = this;
      let _data = {};
      _data = {
        deepValue: _vm.deepValue,
        staffId: _vm.staffId,
        userId: _vm.userId
      };
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/userRelate.jhtml",
        data: _data,
        success(res) {
          localStorage.setItem(
            "children",
            JSON.stringify(res.content.children)
          );
          _vm.data.children = JSON.parse(localStorage.children);
          _vm.chart = echarts.init(document.getElementById("chart-box"));
          _vm.chart.on("click", function(param) {
            // console.log(param.dataIndex);
            _vm.presentNode = param;
            _vm.id = param.data.id;
            var n = res.content.children.filter(value => {
              return value.id == param.data.id;
            });
            if (n.length == 0) {
            } else {
              _vm.deepValue = n[0].deepValue + 1;
              _vm.userId = n[0].userId;
              _vm.staffId = _vm.staffId;
              _vm.next();
            }
          });
          _vm.chart.setOption({
            tooltip: {
              triggerOn: "mousemove"
            },
            series: [
              {
                type: "tree",
                data: [_vm.data],
                top: "1%",
                left: "7%",
                bottom: "1%",
                right: "20%",
                symbolSize: 7,
                label: {
                  normal: {
                    position: "left",
                    verticalAlign: "middle",
                    align: "right",
                    fontSize: 9
                  }
                },

                leaves: {
                  label: {
                    normal: {
                      position: "right",
                      verticalAlign: "middle",
                      align: "left"
                    }
                  }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }
            ]
          });
        }
      });
    },
    next() {
      let _vm = this;
      let _data = {};
      _data = {
        deepValue: _vm.deepValue,
        staffId: _vm.staffId,
        userId: _vm.userId
      };
      _vm.$http.get({
        url: "/doct-webManager/api/xcx/message/userRelate.jhtml",
        data: _data,
        success(res) {
          _vm.children1 = res.content;
          var c1 = _vm.data.children.filter(value => {
            return value.userId == _vm.userId;
          });

          c1[0].children = _vm.children1;
          _vm.chart.setOption({
            series: [
              {
                data: [_vm.data]
              }
            ]
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.subtitle {
  font-size: 18px;
  background-color: #e4e4e4;
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}
.subtitle-box {
  /* height: 400px; */
  border: 1px solid #e4e4e4;
  margin-bottom: 30px;
}
.subtitle-box table {
  border: 1px solid #c9c9c9;
  border-collapse: collapse;
  margin: 60px;
}
.subtitle-box table tr th {
  border: 1px solid #c9c9c9;
  background-color: #f2f2f2;
  width: 140px;
  height: 50px;
}
.subtitle-box table tr td {
  border: 1px solid #c9c9c9;
  height: 30px;
  text-align: center;
}
.all {
  background-color: #a1a1a1;
  height: 40px !important;
}
#chart-box {
  /* padding-left: 20px; */
  height: 500px;
}
</style>
