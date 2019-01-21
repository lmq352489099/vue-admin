<template>
  <div class="view-container">

    <h2 class="view-title">添加医生</h2>
    <div class="container-main">
      <div class="step">
        <span style="backgroundColor:#53a5f8">1.基本资料</span>
        <span>2.认证信息</span>
        <span>3.添加完成</span>
      </div>

      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160">
        <FormItem label="医生照片" prop="logo" required>
          <div class="upload-photo-item">
            <Upload ref="upload" :before-upload="handleBeforeUpload" type="drag" action="//" style="display: inline-block;width:96px;">
              <div class="photo-content">
                <div class="photo-icon"></div>
                <p>上传头像</p>
              </div>
            </Upload>
            <p class="photo-msg"></p>
            <div class="photo-list" v-show='urlList[0].length > 0'>
              <img :src='urlList[0]'>
              <div class="upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(0)"></Icon>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem label="医生姓名" prop="name" style="width:368px">
          <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="1">男</Radio>
            <Radio label="0">女</Radio>
          </RadioGroup>
        </FormItem>
        <!-- <FormItem label="医院名称" prop="hpname"  style="width:368px">
            <Input v-model="formValidate.hpname" placeholder="请输入医院名称" > </Input>
        </FormItem> -->
        <!-- <FormItem label="职业医师职业编码" prop="profession"  style="width:368px">
            <Input v-model="formValidate.profession" placeholder="请输入职业医师职业编码" ></Input>
        </FormItem>
           <div class="upload-photo-item">
       <Upload
                ref="upload"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="//"
                style="display: inline-block;width:500px;height:150px;">
                <div class="photo-content photo-content2">
                    <div class="photo-icon"></div>
                    <p>职业医师职业证书照片</p>
                </div>
            </Upload>
            <p class="photo-msg"></p>
            <div class="photo-list" v-show='urlList[1].length > 0'>
                <img :src='urlList[1]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(1)"></Icon>
                </div>
            </div>
        </div> -->
        <FormItem label="电话号码" prop="phone" style="width:368px" :rules="[{ required: true, message: '请输入电话号码!'},
                {validator(rule, value, callback, source, options) {
                var errors = [];
                if (!/^\d{11}$/.test(value)) {
                        callback('请输入正确的电话号码！');
                    } 
                      callback(errors);
                }}
              ]">
          <Input v-model="formValidate.phone" placeholder="请输入电话号码"></Input>
        </FormItem>
        <FormItem label="个人简介" prop="synopsis" style="width:368px">
          <Input v-model="formValidate.synopsis" type="textarea" :rows="4" placeholder=""></Input>
          <p style="    text-align: right">{{formValidate.synopsis.length}}/100</p>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
        </FormItem>
      </Form>
      <!-- <router-link to="/addDoctors">   
     <div class="next" @click="setStorage()">下一步</div>
    </router-link> -->
    </div>

  </div>
</template>
<script>
export default {
  props: {
    defaultValue: Array
  },
  data() {
    return {
      baseImgURL: "http://www.hellodoctor.com.cn/",
      urlList: ["", "", "", "", ""],
      dataList: ["", "", "", "", ""],
      allData: [],
      formValidate: {
        name: "",
        gender: "",
        phone: "",
        synopsis: "",
        logo: ""
      },
      ruleValidate: {
        logo: [
          {
            required: true,
            message: "请上传照片!",
            trigger: "blur"
          }
        ],

        name: [
          {
            required: true,
            message: "请输入姓名!",
            trigger: "blur"
          }
        ],
        gender: [
          { required: true, message: "请选择性别！", trigger: "change" }
        ],
        hpname: [
          {
            required: true,
            message: "请输入医院名称！",
            trigger: "blur"
          }
        ],
        profession: [
          {
            required: true,
            message: "请输入职业医师职业编码!",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入电话号码!",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {
   
  },
  methods: {
    saveFile(data, index) {
      let _vm = this,
        param = new FormData();
      param.append("file", data);
      param.append("chunks", "0");
      param.append("token", _vm.$token.readToken("adminToken"));
      param.append("fileType", "image");
      _vm.$http.upload({
        url: "doct-webManager/mutual/upload.jhtml",
        data: param,
        success: function(res) {
          if (res.code === 0) {
            _vm.urlList.splice(index, 1, _vm.baseImgURL + res.content);
            _vm.dataList.splice(index, 1, res.content);
            _vm.$emit("urlList", _vm.dataList);
          } else {
            _vm.$Notice.error({
              title: "系统提示！",
              desc: res.desc
            });
          }
        }
      });
    },
    ruleUpload(data, index) {
      let translateBase = 1048576;
      if (/\.(jpg|png)$/.test(data.name.toLowerCase())) {
        if (data.size <= translateBase) {
          this.saveFile(data, index);
        } else {
          this.$Notice.error({
            title: "系统提示！",
            desc: "图片大小不能超过1M！"
          });
        }
      } else {
        this.$Notice.error({
          title: "系统提示！",
          desc: "请选择jpg、png图片！"
        });
      }
    },

    handleBeforeUpload(data) {
      this.ruleUpload(data, 0);
      return false;
    },
    handleRemove(index) {
      this.urlList.splice(index, 1, "");
      this.dataList.splice(index, 1, "");
      this.$emit("setPhotoList", this.dataList);
    },
    handleSubmit(name) {

      this.formValidate.logo = this.urlList[0];
      // console.log( this.formValidate.logo)
      this.$refs[name].validate(valid => {
        if (valid) {
          //  let _vm = this;
          // _vm.$http.post({
          //   url: "doct-webManager/staff/registerStaff.jhtml",
          //   data: {
          //     name: localStorage.name,
          //     genderType: localStorage.gender,
          //     mobile: localStorage.phone,
          //     memo: localStorage.synopsis,
          //     imageHead:localStorage.urlList0.slice(30),
          //   },
          //   success: function(data) {

          //   }
          // });
          this.setStorage();
          this.$router.push("/addDoctors");
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 本地储存
    setStorage() {
      let _vm = this;
      localStorage.setItem("name", _vm.formValidate.name);
      localStorage.setItem("gender", _vm.formValidate.gender);
      localStorage.setItem("phone", _vm.formValidate.phone);
      localStorage.setItem("synopsis", _vm.formValidate.synopsis);
      localStorage.setItem("urlList0", _vm.urlList[0]);
    }
  }
};
</script>
<style scoped>
.container-main {
  padding-left: 230px;
  padding-top: 200px;
}
.ivu-input {
  width: 200px;
}
.photo-content2 {
  width: 500px;
  height: 150px;
}
.next {
  width: 100px;
  height: 30px;
  background-color: #53a5f8;
  text-align: center;
  line-height: 30px;
  border-radius: 7px;
  cursor: pointer;
  color: #ffffff;
  margin-top: 100px;
  margin-left: 20%;
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
  border-radius: 3px;
}
</style>
