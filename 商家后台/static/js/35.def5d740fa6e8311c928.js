webpackJsonp([35],{Byaw:function(t,e,a){e=t.exports=a("FZ+f")(!1),e.push([t.i,".add-product[data-v-4470885f]{margin-bottom:21px;text-align:right}.main-search-box[data-v-4470885f]{margin:20px 40px}.data-list[data-v-4470885f]{margin:20px 40px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.data-list span[data-v-4470885f]{font-size:14px;color:#333}",""])},NMEi:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"view-container"},[a("h2",{staticClass:"view-title"},[t._v("商品列表")]),t._v(" "),a("Tabs",{attrs:{type:"card",animated:!1}},[a("TabPane",{attrs:{label:t.label1}},[a("div",{staticClass:"container-main"},[a("Table",{attrs:{columns:t.col,data:t.data}})],1)]),t._v(" "),a("TabPane",{attrs:{label:t.label2}},[a("div",{staticClass:"container-main"},[a("Table",{attrs:{columns:t.col2,data:t.data2}})],1)]),t._v(" "),a("TabPane",{attrs:{label:t.label3}},[a("div",{staticClass:"container-main"},[a("Table",{attrs:{columns:t.col3,data:t.data3}})],1)]),t._v(" "),a("TabPane",{attrs:{label:t.label4}},[a("div",{staticClass:"container-main"},[a("Table",{attrs:{columns:t.col4,data:t.data4}})],1)]),t._v(" "),a("TabPane",{attrs:{label:t.label5}},[a("div",{staticClass:"container-main"},[a("Table",{attrs:{columns:t.col5,data:t.data5}})],1)])],1),t._v(" "),a("Modal",{attrs:{title:"系统提示",loading:t.loading,"class-name":"vertical-center-modal"},on:{"on-ok":t.ok},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("p",[t._v("确定下架商品?")]),t._v(" "),a("p",[t._v("商品名称："+t._s(t.productInfo.name))])])],1)},n=[],r={render:i,staticRenderFns:n};e.a=r},PdLA:function(t,e,a){var i=a("Byaw");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("bf73b316",i,!0)},Va5q:function(t,e,a){"use strict";function i(t){a("PdLA")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("nWcK"),r=a("NMEi"),l=a("VU/8"),o=i,s=l(n.a,r.a,o,"data-v-4470885f",null);e.default=s.exports},nWcK:function(t,e,a){"use strict";e.a={data:function(){var t=this;return{searchKey:!0,modal:!1,loading:!0,numList:[{value:10,label:10},{value:20,label:20},{value:50,label:50},{value:100,label:100},{value:200,label:200}],moreList:[{value:102,label:1},{value:10,label:2},{value:10,label:3}],rankList:[{value:"价格从低到高",label:1},{value:"价格从高到低",label:2},{value:"销量从低到高",label:3},{value:"销量从高到低",label:4}],formSearch:{name:"",minPrice:null,maxPrice:null,studis:""},productInfo:{productGoodId:"",name:""},typeList:[{id:0,name:"草稿"},{id:1,name:"上架中"},{id:2,name:"审核中"},{id:4,name:"已下架"},{id:5,name:"审核失败"}],typeList2:[{id:0,name:"草稿"},{id:1,name:"已审核"},{id:2,name:"审核中"},{id:4,name:"已审核"},{id:5,name:"审核失败"}],col:[{title:"编号",key:"productGood"},{title:"产品",width:300,render:function(e,a){return e("div",[e("img",{style:{float:"left",width:"48px",height:"48px",margin:"16px 10px 16px 0"},attrs:{src:t.baseImgURL+a.row.image}}),e("p",{style:{float:"left",height:"40px",width:"200px",marginTop:"20px",fontSize:"14px",lineHeight:"20px",color:"#757575",display:"-webkit-box",boxOrient:"vertical",lineClamp:2,overflow:"hidden"}},a.row.name)])}},{title:"商品分类",key:"categoryName"},{title:"售价",key:"price"},{title:"审核状态",render:function(e,a){return e("span",t.typeList2.filter(function(t){return t.id===a.row.status})[0].name)}},{title:"销量",key:"saleCount"},{title:"商品状态",render:function(e,a){return e("span",t.typeList.filter(function(t){return t.id===a.row.status})[0].name)}},{title:"操作",key:"action",width:80,align:"center",render:function(e,a){var i=1===a.row.status?"inline-block":"none";return e("div",[e("div",{class:"record-btn",style:{marginRight:"14px"},on:{click:function(){t.toRecord(a.row)}}}),e("div",{class:"undercarriage-btn",style:{display:i},on:{click:function(){t.downSale(a.row)}}})])}}],col2:[{title:"编号",key:"productGood"},{title:"产品",width:300,render:function(e,a){return e("div",[e("img",{style:{float:"left",width:"48px",height:"48px",margin:"16px 10px 16px 0"},attrs:{src:t.baseImgURL+a.row.image}}),e("p",{style:{float:"left",height:"40px",width:"200px",marginTop:"20px",fontSize:"14px",lineHeight:"20px",color:"#757575",display:"-webkit-box",boxOrient:"vertical",lineClamp:2,overflow:"hidden"}},a.row.name)])}},{title:"商品分类",key:"categoryName"},{title:"售价",key:"price"},{title:"销量",key:"saleCount"},{title:"商品状态",render:function(e,a){return e("span",t.typeList.filter(function(t){return t.id===a.row.status})[0].name)}},{title:"操作",key:"action",width:80,align:"center",render:function(e,a){var i=1===a.row.status?"inline-block":"none";return e("div",[e("div",{class:"record-btn",style:{marginRight:"14px"},on:{click:function(){t.toRecord(a.row)}}}),e("div",{class:"undercarriage-btn",style:{display:i},on:{click:function(){t.downSale(a.row)}}})])}}],col3:[{title:"编号",key:"productGood"},{title:"产品",width:300,render:function(e,a){return e("div",[e("img",{style:{float:"left",width:"48px",height:"48px",margin:"16px 10px 16px 0"},attrs:{src:t.baseImgURL+a.row.image}}),e("p",{style:{float:"left",height:"40px",width:"200px",marginTop:"20px",fontSize:"14px",lineHeight:"20px",color:"#757575",display:"-webkit-box",boxOrient:"vertical",lineClamp:2,overflow:"hidden"}},a.row.name)])}},{title:"商品分类",key:"categoryName"},{title:"售价",key:"price"},{title:"销量",key:"saleCount"},{title:"商品状态",render:function(e,a){return e("span",t.typeList.filter(function(t){return t.id===a.row.status})[0].name)}},{title:"操作",key:"action",width:80,align:"center",render:function(e,a){var i=4===a.row.status?"none":"inline-block";return e("div",[e("div",{class:"record-btn",style:{marginRight:"14px"},on:{click:function(){t.toRecord(a.row)}}}),e("div",{class:"undercarriage-btn",style:{display:i},on:{click:function(){t.downSale(a.row)}}})])}}],col4:[{title:"编号",key:"productGood"},{title:"产品",width:300,render:function(e,a){return e("div",[e("img",{style:{float:"left",width:"48px",height:"48px",margin:"16px 10px 16px 0"},attrs:{src:t.baseImgURL+a.row.image}}),e("p",{style:{float:"left",height:"40px",width:"200px",marginTop:"20px",fontSize:"14px",lineHeight:"20px",color:"#757575",display:"-webkit-box",boxOrient:"vertical",lineClamp:2,overflow:"hidden"}},a.row.name)])}},{title:"商品分类",key:"categoryName"},{title:"售价",key:"price"},{title:"销量",key:"saleCount"},{title:"商品状态",render:function(e,a){return e("span",t.typeList.filter(function(t){return t.id===a.row.status})[0].name)}}],col5:[{title:"编号",key:"productGood"},{title:"产品",width:300,render:function(e,a){return e("div",[e("img",{style:{float:"left",width:"48px",height:"48px",margin:"16px 10px 16px 0"},attrs:{src:t.baseImgURL+a.row.image}}),e("p",{style:{float:"left",height:"40px",width:"200px",marginTop:"20px",fontSize:"14px",lineHeight:"20px",color:"#757575",display:"-webkit-box",boxOrient:"vertical",lineClamp:2,overflow:"hidden"}},a.row.name)])}},{title:"商品分类",key:"categoryName"},{title:"售价",key:"price"},{title:"销量",key:"saleCount"},{title:"商品状态",render:function(e,a){return e("span",t.typeList.filter(function(t){return t.id===a.row.status})[0].name)}}],data:[],data2:[],data3:[],data4:[],data5:[]}},computed:{baseImgURL:function(){return this.$store.getters.getBaseImgURL},label1:function(){return this.data.length>0?"全部("+this.data.length+")":"全部"},label2:function(){return this.data2.length>0?"上架中("+this.data2.length+")":"上架中"},label3:function(){return this.data3.length>0?"已下架("+this.data3.length+")":"已下架"},label4:function(){return this.data4.length>0?"审核中("+this.data4.length+")":"审核中"},label5:function(){return this.data5.length>0?"未通过("+this.data5.length+")":"未通过"}},created:function(){this.getList()},methods:{getList:function(){var t=this;t.$http.get({url:"doct-webManager/productGood/saleList.jhtml",data:{pageNumber:1,pageSize:999},success:function(e){if(0===e.code){var a=1*sessionStorage.getItem("companyId"),i=e.content.page.content.filter(function(t){return t.company===a})||[];t.data=i||[],t.data2=i.filter(function(t){return 1===t.status})||[],t.data3=i.filter(function(t){return 4===t.status})||[],t.data4=i.filter(function(t){return 2===t.status})||[],t.data5=i.filter(function(t){return 5===t.status})||[]}}})},changeSearch:function(t){this.searchKey=t},downSale:function(t){this.productInfo.productGoodId=t.productGood,this.productInfo.name=t.name,this.modal=!0},ok:function(){var t=this;t.$http.post({url:"doct-webManager/productGood/unOnSale.jhtml",data:t.productInfo,success:function(e){0===e.code?(t.$Notice.success({title:"系统提示！",desc:"操作成功！"}),t.getList()):t.$Notice.error({title:"系统提示！",desc:e.desc}),t.modal=!1}})},toRecord:function(t){this.$router.push({path:"/productRecord",query:{id:t.productGood}})},handleSubmit:function(){},refresh:function(){this.$refs.formSearch.resetFields(),this.formSearch.minPrice=null,this.formSearch.maxPrice=null},changeRow:function(){},changeRank:function(){}}}}});