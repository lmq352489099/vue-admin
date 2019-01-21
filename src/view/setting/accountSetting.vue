<template>
    <div class="view-container">
        <h2 class="view-title">帐号设置</h2>
        <div class="container-main">
            <div class="view-title-second">
                <h3>信息同步</h3>
            </div>
            <Form :label-width="120" label-position="left">
                <FormItem label="绑定锦医卫" >
                    <p class="message">绑定“锦医卫”后，您将可以在“悦完美管理后台”“管理操作医生状态等信息”
                        <span class='bind' v-if='isApiEnable' @click='edit(3)'>取消绑定</span>
                        <span class='bind' v-else @click='edit(2)'>立即绑定</span>
                    </p>
                </FormItem>
                <FormItem label="同步顾客" v-if='isApiEnable'>
                    <p class="message">“锦衣卫”内的顾客的信息将会与你好医生管理后台同步，方便你进行管理操作。
                        <i-switch style='marginLeft:20px;' @on-change='setSync' :value='isSync'>
                            <Icon type="android-done" slot="open"></Icon>
                            <Icon type="android-close" slot="close"></Icon>
                        </i-switch>
                    </p>
                </FormItem>
            </Form>
            <div class="view-title-second">
                <h3>登录密码</h3>
            </div>
            <Form :label-width="120" label-position="left">
                <FormItem label="记得旧密码" >
                    <p class="message">修改管理端登录密码<span class='bind' @click='edit(1)'>修改</span></p>
                </FormItem>
                <FormItem label="忘记旧密码" >
                    <p class="message diff">请发送帐号和医院职业资格证书至<em class='mail-icon'>xuzy@easyhoms.com</em>的企业邮箱，我们的7*24小时客服将尽快审核您的信息后为你修改密码。</p>
                </FormItem>
            </Form>
        </div>
        <Modal
            :title='modalTit'
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <Form ref="formEdit" :model="formEdit" :rules="ruleForm" :label-width="120" label-position="left">
                <Form-item label="旧密码" prop="oldPasswd" required v-if='key === 1'>
                    <Input type="password" v-model.trim="formEdit.oldPasswd"></Input>
                </Form-item>
                <Form-item label="新密码" prop="newPasswd" required v-if='key === 1'>
                    <Input type="password" v-model.trim="formEdit.newPasswd"></Input>
                </Form-item>
                <Form-item label="确认密码" prop="newPasswd1" required v-if='key === 1'>
                    <Input type="password" v-model.trim="formEdit.newPasswd1"></Input>
                </Form-item>
                <Form-item v-if='key === 3'>
                    <p style='paddingRight:120px;textAlign:center'>确定要解除绑定锦医卫吗？</p>
                </Form-item>
                <Form-item label="serverUrl" prop="apiServerUrl" required v-if='key === 2'>
                    <Input v-model.trim="formEdit.apiServerUrl" :maxlength='50'></Input>
                </Form-item>
                <Form-item label="appId" prop="apiAppId" required v-if='key === 2'>
                    <Input v-model.trim="formEdit.apiAppId" :maxlength='50'></Input>
                </Form-item>
                <Form-item label="appsecret" prop="apiAppsecret" required v-if='key === 2'>
                    <Input v-model.trim="formEdit.apiAppsecret" :maxlength='50'></Input>
                </Form-item>
                <Form-item label="grantType" prop="apiGrantType" required v-if='key === 2'>
                    <Input v-model.trim="formEdit.apiGrantType" :maxlength='50'></Input>
                </Form-item>
                <Form-item label="signkey" prop="apiSignkey" required v-if='key === 2'>
                    <Input v-model.trim="formEdit.apiSignkey" :maxlength='50'></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.formEdit.newPasswd1 !== '') {
                    this.$refs.formEdit.validateField('newPasswd1')
                }
                console.log(value)
                console.log(/^[0-9a-zA-Z]{6,20}$/.test(value))
                if(/^[0-9a-zA-Z]{6,20}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入密码长度为6-20的英文字母或数字！'))
                }
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.formEdit.newPasswd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        const validateText = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'))
            } else {
                callback()
            }
        }
        const validateBind = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入绑定信息'))
            } else {
                callback()
            }
        }
        return {
            modalTit: '',
            key: 1,
            isApiEnable: false,
            isSync: false,
            modal: false,
            loading: true,
            formEdit: {
                oldPasswd: '',
                newPasswd: '',
                newPasswd1: '',
                apiServerUrl: '',
                apiAppId: '',
                apiAppsecret: '',
                apiGrantType: '',
                apiSignkey: ''
            },
            ruleForm: {
                newPasswd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                newPasswd1: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                oldPasswd: [
                    { validator: validateText, trigger: 'blur' }
                ],
                apiServerUrl: [
                    { validator: validateBind, trigger: 'blur' }
                ],
                apiAppId: [
                    { validator: validateBind, trigger: 'blur' }
                ],
                apiAppsecret: [
                    { validator: validateBind, trigger: 'blur' }
                ],
                apiGrantType: [
                    { validator: validateBind, trigger: 'blur' }
                ],
                apiSignkey: [
                    { validator: validateBind, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
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
                        _vm.isApiEnable = res.content.isApiEnable || false
                        _vm.isSync = res.content.isSync || false
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        setSync (val) {
            console.log(val)
            let _vm = this
            _vm.$http.post({
                url: 'doct-webManager/company/setCompanySync.jhtml',
                data: {isSync: val},
                success: function(res){
                    if(res.code === 0) {
                        const _text = res.content ? '成功开启同步顾客！' : '成功关闭同步顾客！'
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: _text
                        })
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                }
            })
        },
        edit (val) {
            if(val === 1) {
                this.modalTit = '修改密码'
            } else if(val === 3) {
                this.modalTit = '取消绑定锦医卫'
            } else if(val === 2) {
                this.modalTit = '绑定锦医卫'
            }
            this.key = val
            this.$refs.formEdit.resetFields()
            this.modal = true
        },
        ok () {
            let _vm = this,
                _url = ''
            if(_vm.key === 1) {
                _url = 'doct-webManager/passwd/oldpasswd_reset.jhtml'
            } else if(_vm.key === 2) {
                _url = 'doct-webManager/company/set_companyApiInfo.jhtml'
            } else if(_vm.key === 3) {
                _url = 'doct-webManager/company/disConnApiInfo.jhtml'
            }
            console.log(12)
            _vm.$refs.formEdit.validate((valid) => {
                console.log(123)
                if(valid) { 
                    console.log(1234)
                    _vm.$http.post({
                        url: _url,
                        data: _vm.formEdit,
                        success: function(res){
                            if(res.code === 0) {
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '修改成功'
                                })
                                _vm.getList()
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.desc
                                })
                            }
                            _vm.modal = false
                        }
                    })
                } else {
                    _vm.loading = false
                    _vm.$nextTick(() => {
                        _vm.loading = true
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    .message {
        font-size: 14px;
        color: #333;
    }
    .bind {
        padding-left: 20px;
        color: #55A8FD;
        cursor: pointer;
    }
    .message em {
        font-style: normal;
        color: #55A8FD;
    }
    .diff {
        width: 512px;
    }
</style>
