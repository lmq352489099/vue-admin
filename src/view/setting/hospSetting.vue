<template>
    <div class="view-container">
        <h2 class="view-title">医院资料</h2>
        <div class="container-main">
            <div class="view-title-second">
                <h3>基础信息</h3>
                <Button type="primary" @click='edit' v-if='key'>编辑</Button>
            </div>
            <Form ref="formMes" :model="formMes" :rules="ruleForm" :label-width="120" label-position="left">
                <FormItem label="医院照片" prop="logo" required>
                    <img :src="showLogo" alt="" class="hosp-logo" v-if='key'/>
                    <div class="upload-photo-item" v-else>
                        <Upload
                            ref="upload"
                            :before-upload="handleBeforeUpload"
                            type="drag"
                            action="//"
                            style="display: inline-block;width:90px;">
                            <div class="photo-content">
                                <div class="photo-icon"></div>
                                <p>上传照片</p>
                            </div>
                        </Upload>
                        <p class="photo-msg">推荐jpg.png尺寸640*640,不超过1M的图像</p>
                        <div class="photo-list" v-show='formMes.logo.length > 0'>
                            <img :src='baseImgURL + formMes.logo'>
                            <div class="upload-list-cover">
                                <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                            </div>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="医院名称" required>
                    <p class="message">{{formShow.name}}</p>
                </FormItem>
                <FormItem label="医院地址" required prop="areaAddress">
                    <p class="message" v-show='key'>{{formShow.areaAddress + " " + formShow.address}}</p>
                    <Select v-show='!key' v-model="provinceId" style="width:160px;marginRight:13px;" @on-change='getCityList'>
                        <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-show='!key' v-model="cityId" style="width:160px;marginRight:13px;" @on-change='getArea'>
                        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-show='!key' v-model="areaId" style="width:160px;" @on-change='setArea'>
                        <Option v-for="(item, index) in areaList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem v-if='!key' prop="address">
                    <Input v-model.trim="formMes.address" placeholder="请输入详细地址" :maxlength='200' style='width:512px'></Input>
                </FormItem>
                <FormItem label="联系方式" required prop="phone">
                    <p class="message" v-if='key'>{{formShow.phone}}</p>
                    <Input v-model.trim="formMes.phone" placeholder="请输入联系方式" :maxlength='20' style='width:160px' v-else></Input>
                </FormItem>
                <FormItem label="营业时间" required prop="serviceTime">
                    <p class="message"  v-if='key'>{{formShow.serviceTime}}</p>
                    <TimePicker v-else format="HH:mm" type="timerange" placement="bottom-start" placeholder="选择时间" style="width: 160px" @on-change='setTime' :clearable='false' :value='timeBox'></TimePicker>
                </FormItem>
                <FormItem label="医院简介" required prop="memo">
                    <p class="message" v-if='key'>{{formShow.memo}}</p>
                    <Input v-else v-model.trim="formMes.memo" type="textarea" :autosize="{minRows: 4,maxRows: 7}" placeholder="请输入医院简介" :maxlength='200' style="width: 512px"></Input>
                </FormItem>
                <FormItem v-if='!key'>
                    <Button type="primary" @click='save' style='marginRight: 8px'>保存</Button>
                    <Button @click='cancle'>取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        const validateMes = (rule, value, callback) => {
            if (value === '') {
                const _text = this.errorMsg.filter(item => item.field === rule.field)[0].text
                callback(new Error(_text))
            } else {
                callback()
            }
        }
        return {
            key: true,
            timeBox: [],
            provinceId: '',
            cityId: '',
            areaId: '',
            provinceList: [],
            cityList: [],
            areaList: [],
            asynAreaAddress: '',
            formMes: {
                logo: '',
                name: sessionStorage.getItem('companyName'),
                area: '',
                address: '',
                areaAddress: '',
                memo: '',
                phone: '',
                serviceTime: '',
            },
            formShow: {},
            ruleForm: {
                address: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                memo: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                phone: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                logo: [
                    { validator: validateMes, trigger: 'change' }
                ],
                areaAddress: [
                    { validator: validateMes, trigger: 'change' }
                ],
                serviceTime: [
                    { validator: validateMes, trigger: 'change' }
                ],
            },
            errorMsg: [
                {
                    field: 'logo',
                    text: '请选择医院logo！'
                },
                {
                    field: 'address',
                    text: '请输入详细地址！'
                },
                {
                    field: 'memo',
                    text: '请输入医院简介！'
                },
                {
                    field: 'areaAddress',
                    text: '请选择医院地址！'
                },
                {
                    field: 'phone',
                    text: '请输入联系方式！'
                },
                {
                    field: 'serviceTime',
                    text: '请选择营业时间！'
                },
            ]
        }
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
        showLogo () {
            if(this.formShow.logo) {
                return this.baseImgURL + this.formShow.logo
            } else {
                return ''
            }
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/company/get_companyInfo.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.formMes.logo = res.content.logo || ''
                        _vm.formMes.area = res.content.area || ''
                        _vm.formMes.address = res.content.address || ''
                        _vm.formMes.areaAddress = res.content.areaAddress || ''
                        _vm.asynAreaAddress = res.content.areaAddress || ''
                        _vm.formMes.phone = res.content.phone || ''
                        _vm.formMes.memo = res.content.memo || ''
                        _vm.formMes.serviceTime = res.content.serviceTime || ''
                        _vm.timeBox = _vm.formMes.serviceTime.split('-')
                        _vm.formShow = Object.assign({}, _vm.formMes)
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        getProvinceList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/common/getArea.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.provinceList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                },
            })
        },
        getCityList (val) {
            let _vm = this
            _vm.areaList = []
            _vm.formMes.areaAddress = ''
            _vm.$http.get({
                url: 'doct-webManager/common/getArea.jhtml',
                data: {areaId: val},
                success: function(res){
                    if(res.code === 0 ){
                        _vm.cityList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                },
            })
        },
        getArea (val) {
            if(val) {
                let _vm = this
                _vm.$http.get({
                    url: 'doct-webManager/common/getArea.jhtml',
                    data: {areaId: val},
                    success: function(res){
                        if(res.code === 0 ){
                            _vm.areaList = res.content || []
                            if(_vm.areaList.length === 0 && _vm.cityList.length) {
                                const _data = _vm.cityList.filter(item => item.id === val)
                                _vm.formMes.areaAddress = _data[0].fullName
                                _vm.formMes.area = _data[0].treePath + _data[0].id
                                _vm.$refs.formMes.validateField('areaAddress')
                            }
                            if(_vm.asynAreaAddress && _vm.areaList.length === 0) {
                                _vm.formMes.areaAddress = _vm.asynAreaAddress
                                _vm.asynAreaAddress = ''
                                _vm.$refs.formMes.validateField('areaAddress')
                            }
                        } else {
                            console.log(res.desc)
                        }
                    },
                })
            }
        },
        setArea (val) {
            console.log(val)
            console.log(typeof val)
            if(val && this.areaList.length) {
                const _data = this.areaList.filter(item => item.id === val)
                console.log(this.areaList)
                this.formMes.areaAddress = _data[0].fullName
                this.formMes.area = _data[0].treePath + _data[0].id
            }
            if(this.asynAreaAddress) {
                this.formMes.areaAddress = this.asynAreaAddress
                this.asynAreaAddress = ''
            }
        },
        handleBeforeUpload (data) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.saveFile(data)
                } else {
                    this.$Notice.error({
                        title: '系统提示！',
                        desc: '图片大小不能超过1M！'
                    })
                }
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '请选择jpg、png图片！'
                })
            }
            return false
        },
        saveFile (data) {
            let _vm = this,
                param = new FormData()
            param.append('file', data)
            param.append('chunks', '0')
            param.append('token', _vm.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            _vm.$http.upload({
                url: 'doct-webManager/mutual/upload.jhtml',
                data: param,
                success: function(res){
                    if(res.code === 0) {
                        _vm.formMes.logo = res.content || ''
                        _vm.$refs.formMes.validateField('logo')
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                },
            })  
        },
        handleRemove () {
            this.formMes.logo = ''
        },
        setTime (data) {
            console.log(data.join('-'))
            this.formMes.serviceTime = data.join('-')
        },
        edit () {
            this.getProvinceList()
            this.key = false
            this.provinceId = this.formMes.area.split(',')[1] * 1
            this.cityId = this.formMes.area.split(',')[2] * 1
            this.areaId = this.formMes.area.split(',')[3] * 1 || ''
        },
        cancle () {
            this.key = true
        },
        save () {
            let _vm = this
            _vm.$refs.formMes.validate((valid) => {
                if (valid) {
                    _vm.formMes.address = _vm.formMes.address.replace(/"/g, "'")
                    _vm.formMes.memo = _vm.formMes.memo.replace(/"/g, "'")
                    _vm.formMes.phone = _vm.formMes.phone.replace(/"/g, "'")
                    _vm.$http.post({
                        url: 'doct-webManager/company/set_companyInfo.jhtml',
                        data: _vm.formMes,
                        success: function(res){
                            if(res.code === 0 ){
                                _vm.formShow = Object.assign({}, _vm.formMes)
                                sessionStorage.setItem('logo', _vm.formMes.logo)
                                _vm.$store.dispatch('setHospLogo', _vm.formMes.logo)
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '修改成功'
                                })
                                _vm.key = true
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.desc
                                })
                                console.log(res.desc)
                            }
                        },
                    })
                }
            })
        },
    }
}
</script>

<style scoped>
    .view-title-second {
        overflow: hidden;
        margin: 9px 0 24px;
        padding: 12px 0;
        border-bottom: 1px solid #e5e5e5;
    }
    .view-title-second h3 {
        float: left;
        height: 28px;
        font-size: 16px;
        font-weight: normal;
        line-height: 28px;
        color: #333;

    }
    .view-title-second button {
        float: right;
    }
    .hosp-logo {
        display: inline-block;
        width: 90px;
        height: 90px;
        margin-top: 9px;
        border-radius: 4px;
    }
    .message {
        width: 512px;
        font-size: 14px;
        color: #333;
    }
    .upload-photo-item {
        margin: 9px 0 0;
    }
    .upload-photo-item .photo-content {
        width: 90px;
        height: 90px;
    }
    .upload-photo-item .photo-list {
        width: 90px;
        bottom: 25px;
    }
    .upload-photo-item .upload-list-cover i {
        line-height: 90px;
    }
    .photo-msg {
        margin-top: -5px;
        color: rgba(0,0,0,0.43);
    }
</style>
