webpackJsonp([45], {
  D5t3: function (t, e, a) {
    "use strict";
    var i = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", {
          staticClass: "view-container"
        }, [a("h2", {
          staticClass: "view-title"
        }, [t._v("员工数据统计")]), t._v(" "), a("div", {
          staticClass: "container-main"
        }, [t._m(0), t._v(" "), a("div", {
          staticClass: "table-box"
        }, [a("Table", {
          attrs: {
            columns: t.col,
            data: t.data,
            loading: t.tableLoad
          }
        })], 1)])])
      },
      s = [function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("div", {}, [a("div", [a("span", [t._v("在线医生："), a("span", {
          staticStyle: {
            color: "#8EC5FD"
          }
        }, [t._v("9")]), t._v(" 人")]), t._v(" "), a("span", [t._v("今日咨询顾客："), a("span", {
          staticStyle: {
            color: "#95E4B9"
          }
        }, [t._v("120")]), t._v(" 人")])]), t._v(" "), a("div")])
      }],
      n = {
        render: i,
        staticRenderFns: s
      };
    e.a = n
  },
  OoEt: function (t, e, a) {
    "use strict";
    e.a = {
      data: function () {
        return {
          tableLoad: !1,
          col: [{
            title: "#",
            key: "",
            width: "40px"
          }, {
            title: "姓名",
            key: ""
          }, {
            title: "职位",
            key: ""
          }, {
            title: "咨询数",
            key: "",
            sortable: "custom"
          }, {
            title: "回复数",
            key: "",
            sortable: "custom"
          }, {
            title: "响应时间",
            keyt: ""
          }],
          data: []
        }
      },
      computed: {},
      mounted: function () {},
      methods: {}
    }
  },
  abgc: function (t, e, a) {
    e = t.exports = a("FZ+f")(!1), e.push([t.i, ".table-box[data-v-5aee5e16]{margin-top:30px}", ""])
  },
  cESg: function (t, e, a) {
    var i = a("abgc");
    "string" == typeof i && (i = [
      [t.i, i, ""]
    ]), i.locals && (t.exports = i.locals);
    a("rjj0")("390c7f68", i, !0)
  },
  duB1: function (t, e, a) {
    "use strict";

    function i(t) {
      a("cESg")
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var s = a("OoEt"),
      n = a("D5t3"),
      c = a("VU/8"),
      o = i,
      l = c(s.a, n.a, o, "data-v-5aee5e16", null);
    e.default = l.exports
  }
});
