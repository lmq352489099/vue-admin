<template>
    <div class="nav-box">
        <div class="logo">
            <img :src="logoSrc" alt="" />
        </div>
        <div class="hosp-msg">
            <img :src="hospSrc" alt="" />
            <p>{{hospName}}</p>
        </div>
        <div class="navbar">
            <div class="navbar-scroll">
                <div class="nav-tree">
                    <ul class="nav-menu">
                        <li class='nav-menu-item' v-for='(item, index) in navList' :key='index'>
                            <div class="menu-item-title" @click='childMeunToggle($event, item.url)'>
                                <span :class='item.class'></span>
                                <h3>{{item.text}}</h3>
                                <em v-if='item.childrens.length > 0'></em>
                            </div>
                            <ul class="nav-menu" v-if='item.childrens.length > 0' @click='childNext()' >
                                <li class="nav-menu-item1" v-for='(item1, index1) in item.childrens' :key='index1'  @click='routerLinkTo($event, item1.url)'>
                                    <div class="menu-item-title1">
                                        <h3>{{item1.text}}</h3>
                                        <em></em>
                                    </div>
                                </li>    
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="login-out" @click='loginOut'>
            退出登录
            <span></span>
        </div>
    </div>
</template>

<script>
import logoImg from "assets/images/logo.png";
export default {
  name: "navBar",
  data() {
    return {
      logoSrc: logoImg,
      hospName: sessionStorage.getItem("companyName"),
      navList: [
        {
          text: "首页",
          url: "/home",
          class: "home",
          childrens: []
        },
        // {
        //   text: "消息",
        //   url: "",
        //   class: "msgList",
        //   childrens: [
        //     {
        //       text: "推送消息",
        //       url: "/sendMsg",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "推送记录",
        //       url: "/sendRecord",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "疗程消息",
        //       url: "/autoRule",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "消息监管",
        //       url: "/msgSupervise",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "黑名单",
        //       url: "/blackList",
        //       class: "",
        //       childrens: []
        //     }
        //   ]
        // },
        {
          text: "人员",
          url: "",
          class: "user",
          childrens: [
            // {
            //   text: "员工列表",
            //   url: "/userList",
            //   class: "",
            //   childrens: []
            // },
            {
              text: "申请列表",
              url: "/applyList",
              class: "",
              childrens: []
            },
            {
              text: "医生列表",
              url: "/doctorList",
              class: "",
              childrens: []
            },
            // {
            //   text: "医生详情",
            //   url: "/doctorDetails",
            //   class: "",
            //   childrens: []
            // },
            {
              text: "添加医生",
              url: "/addDoctor",
              class: "",
              childrens: []
            }
            // {
            //   text:"认证",
            //   url:"/addDoctors",
            //    class: "",
            //   childrens: []
            // }
          ]
        },
        // {
        //   text: "顾客",
        //   url: "",
        //   class: "customer",
        //   childrens: [
        //     {
        //       text: "顾客列表",
        //       url: "/appCusList",
        //       class: "",
        //       childrens: []
        //     },
        //     // {
        //     //   text: "锦医卫顾客",
        //     //   url: "/hrpCusList",
        //     //   class: "",
        //     //   childrens: []
        //     // },
        //     {
        //       text: "购买力筛选",
        //       url: "/cusFilter",
        //       class: "",
        //       childrens: []
        //     }
        //   ]
        // },
        {
          text: "商品",
          url: "",
          class: "product",
          childrens: [
            // {
            //     text: '商品发布上线',
            //     url: '/productAudit',
            //     class: '',
            //     childrens: []
            // },
            // {
            //     text: '商品上下架',
            //     url: '/productList',
            //     class: '',
            //     childrens: []
            // }
            {
              text: "商品列表",
              url: "/productList",
              class: "",
              childrens: []
            },
            // {
            //   text: "销售记录",
            //   url: "/salesRecord",
            //   class: "record",
            //   childrens: []
            // },
            {
              text: "添加商品",
              url: "/productEdit",
              class: "",
              childrens: []
            }
            // ,
            // {
            //   text: "草稿箱",
            //   url: "/productDrafts",
            //   class: "",
            //   childrens: []
            // }
          ]
        },
        {
          text: "订单",
          url: "",
          class: "count",
          childrens: [
            {
              text: "订单列表",
              url: "/orderList",
              class: "",
              childrens: []
            },
            // {
            //     text:'订单详情-待支付',
            //     url:'/orderRecord',
            //     class:'',
            //     childrens:[]
            // },
            //  {
            //   text: "治疗",
            //   url: "/cure",
            //   class: "",
            //   childrens: []
            // },
            {
              text: "治疗列表",
              url: "/cureList",
              class: "",
              childrens: []
            }
            // {
            //   text: "治疗详情",
            //   url: "/cureDetails",
            //   class: "",
            //   childrens: []
            // }
          ]
        },
        {
          text: "预约",
          url: "",
          class: "lacita",
          childrens: [
            {
              text: "预约列表",
              url: "/subscribeList",
              class: "",
              childrens: []
            }
            // {
            //   text: "预约详情-待上门",
            //   url: "/subscribeAwait",
            //   class: "",
            //   childrens: []
            // },
            // {
            //   text: "预约详情-已上门",
            //   url: "/subscribeAlready",
            //   class: "",
            //   childrens: []
            // },
            // {
            //   text: "预约详情-已取消",
            //   url: "/subscribeCancel",
            //   class: "",
            //   childrens: []
            // }
          ]
        },
        {
          text: "优选",
          url: "",
          class: "miniapps",
          childrens: [
            {
              text: "员工分析",
              url: "/staffAnalysis",
              class: "",
              childrens: []
            },
            {
              text: "客户总揽",
              url: "/clientOver",
              class: "",
              childrens: []
            },
            // {
            //   text: "绑定小程序",
            //   url: "/bindingApps",
            //   class: "",
            //   childrens: []
            // },
          ]
        },
        // {
        //   text: "统计",
        //   url: "",
        //   class: "statistics",
        //   childrens: [
        //     {
        //       text: "咨询量",
        //       url: "/consult",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "绑定量",
        //       url: "/bindCount",
        //       class: "",
        //       childrens: []
        //     },
        //     {
        //       text: "员工数据统计",
        //       url: "/staffStatistics",
        //       class: ""
        //     }
        //   ]
        // },
        {
          text: "设置",
          url: "",
          class: "hosp",
          childrens: [
            {
              text: "医院设置",
              url: "/hospSetting",
              class: "",
              childrens: []
            },
            {
              text: "账户设置",
              url: "/accountSetting",
              class: "",
              childrens: []
            }
          ]
        }
      ]
    };
  },
  computed: {
    hospSrc() {
      if (this.$store.getters.getHospLogo === "") {
        this.$store.dispatch("setHospLogo", sessionStorage.getItem("logo"));
      }
      return (
        this.$store.getters.getBaseImgURL + this.$store.getters.getHospLogo
      );
    }
  },
  methods: {
    childNext() {},
    childMeunToggle($event, url) {
      let $parent = $($event.currentTarget).parent(),
        $child = $($event.currentTarget).siblings(".nav-menu"),
        $this = $($event.currentTarget);
      $parent
        .siblings()
        .find(".menu-item-title")
        .find("em")
        .removeClass("down");
      if ($child.length) {
        if ($parent.hasClass("active")) {
          $this.find("em").removeClass("down");
          $parent.removeClass("active");
          $child.stop(true).animate({ height: 0 }, 200);
        } else {
          $this.find("em").addClass("down");
          $parent
            .addClass("active")
            .siblings()
            .removeClass("active");
          $parent
            .siblings()
            .find(".nav-menu")
            .stop(true)
            .animate({ height: 0 }, 200);
          const num = $child.find("li").length;
          $child.stop(true).animate({ height: num * 50 }, 200);
        }
      } else {
        $parent
          .addClass("open")
          .siblings()
          .removeClass("open")
          .removeClass("active");
        $parent
          .siblings()
          .find(".nav-menu")
          .stop(true)
          .animate({ height: 0 }, 200);
        $parent
          .siblings()
          .find(".nav-menu-item1")
          .removeClass("do");
        this.$router.push(url);
      }
    },
    routerLinkTo($event, url) {
      let $this = $($event.currentTarget);
      $this
        .addClass("do")
        .siblings()
        .removeClass("do");
      $this
        .parent()
        .parent()
        .siblings()
        .find(".nav-menu-item1")
        .removeClass("do");
      $this
        .parent()
        .parent()
        .siblings()
        .removeClass("open");
      console.log(url);
      this.$router.push(url);
    },
    loginOut() {
      this.$router.push("/login");
    }
  }
};
</script>

