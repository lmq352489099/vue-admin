<template>
    <div class="view-container">
            <h2 class="view-title">添加认证</h2>
            <div class="container-main">
        
            <h2 class="dcname">{{dcName}}</h2>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="160" >
                <FormItem label="身份证号码" prop="identity"  style="width:368px;marginLeft:-70px;"
                   :rules="[{ required: true, message: '请输入身份证号码!'},
                {validator(rule, value, callback, source, options) {
                var errors = [];
                if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
                        callback('请输入正确的身份证号码!');
                    } 
                      callback(errors);
                }}
              ]" >
                    <Input v-model="formValidate.identity" placeholder="请输入身份证号码" ></Input>
                </FormItem>
                 <br>
                <!-- <div class="next" @click="getStorage()">下一步</div> -->
            <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload1"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:96px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">职业医师资格证(1)</p>
                    <div class="photo-list" v-show='urlList[1]'>
                        <img :src='urlList[1]'>
                        <div class="upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(1)"></Icon>
                        </div>
                    </div>
             </div>
              <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload2"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:96px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">职业医师资格证(2)</p>
                    <div class="photo-list" v-show='urlList[2]'>
                        <img :src='urlList[2]'>
                        <div class="upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(2)"></Icon>
                        </div>
                    </div>
             </div>
             <br><br>
              <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload3"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:96px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">职业医师注册证(1)</p>
                    <div class="photo-list" v-show='urlList[3]'>
                        <img :src='urlList[3]'>
                        <div class="upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(3)"></Icon>
                        </div>
                    </div>
             </div>
              <div class="upload-photo-item">
                    <Upload
                        ref="upload"
                        :before-upload="handleBeforeUpload4"
                        type="drag"
                        action="//"
                        style="display: inline-block;width:96px;">
                        <div class="photo-content">
                            <div class="photo-icon"></div>
                            <p>上传照片</p>
                        </div>
                    </Upload>
                    <p class="photo-msg">职业医师注册证(2)</p>
                    <div class="photo-list" v-show='urlList[4]'>
                        <img :src='urlList[4]'>
                        <div class="upload-list-cover">
                            <Icon type="ios-trash-outline" @click.native="handleRemove(4)"></Icon>
                        </div>
                    </div>
        </div><br><br><br>
        <!-- 职称&nbsp;&nbsp;&nbsp;
        <Select v-model="model1" style="width:200px">
             <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select><br><br><br> -->
          <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload5"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">职称证</p>
            <div class="photo-list" v-show='urlList[5]'>
                <img :src='urlList[5]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(5)"></Icon>
                </div>
            </div>
        </div>
        <br><br>
        <p style="color:#999999">以上证书只做认证，不向用户展示</p>
                <!-- <FormItem>
                    <Button type="primary">提交认证</Button>
                </FormItem>
                -->
            </Form>
           
        <p class="step" style="marginTop:50px;">
            <span style="backgroundColor:#53a5f8; borderRadius:3px; " @click="handleSubmit('formValidate')">提交认证</span>
        </p>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      baseImgURL: "http://www.hellodoctor.com.cn/",
      dcName: "",
      cityList: [
        {
          value: 0,
          label: "住院医师"
        },
        {
          value: 1,
          label: "主治医师"
        },
        {
          value: 2,
          label: "副主任医师"
        },
        {
          value: 3,
          label: "主任医师"
        }
      ],
      model1: "",
      urlList: ["", "", "", "", "", ""],
      formValidate: {
        identity: ""
      },
      ruleValidate: {
        identity: [
          {
            required: true,
            message: "请输入身份证号码!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getStorage();
  },
  mounted: function() {
    //  = localStorage.name;
   this.dcName= this.$route.query.name
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
            _vm.$emit("setPhotoList", _vm.dataList);
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
    handleBeforeUpload1(data) {
      this.ruleUpload(data, 1);
      return false;
    },
    handleBeforeUpload2(data) {
      this.ruleUpload(data, 2);
      return false;
    },
    handleBeforeUpload3(data) {
      this.ruleUpload(data, 3);
      return false;
    },
    handleBeforeUpload4(data) {
      this.ruleUpload(data, 4);
      return false;
    },
    handleBeforeUpload5(data) {
      this.ruleUpload(data, 5);
      return false;
    },
    getStorage() {
      //   console.log(localStorage.allData.gender);
    },
    // 提交认证
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let _vm = this;
          _vm.$http.post({
            url: "doct-webManager/staff/addAuth.jhtml",
            data: {
                staffId:this.$route.query.id,
              idNumber: _vm.formValidate.identity,
              profDocterQualCer1:_vm.urlList[1],
              profDocterQualCer2:_vm.urlList[2],
              profDocterRegisterCer1:_vm.urlList[3],
              profDocterRegisterCer1:_vm.urlList[4],
              profTitleCer:_vm.urlList[5],
            },
            success: function(data) {}
          });
          this.$router.push("/doctorList");
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
     handleRemove(index) {
      this.urlList.splice(index, 1, "");
      this.dataList.splice(index, 1, "");
      this.$emit("setPhotoList", this.dataList);
    },
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

