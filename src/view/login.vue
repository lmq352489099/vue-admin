<template>
    <div class="login-warp">
        <div class="login-container">
            <div class="login-title">
                <div class="logo"></div>
                <div class="login">
                    <span></span>
                    医院登录
                </div>
            </div>
            <div class="login-main" id='login-box'>
                <h2>悦完美医院账号</h2>
                <Form ref="formLogin" :model="formLogin" :rules="rule">
                    <FormItem prop="name" label='账号'>
                        <Input type="text" v-model.trim="formLogin.name" placeholder="账号" :maxlength='20'></Input>
                    </FormItem>
                    <FormItem prop="password" label='密码'>
                        <Input type="password" v-model.trim="formLogin.password" placeholder="密码" :maxlength='20' @on-enter='handleSubmit'></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" long @click="handleSubmit" :loading='saveLoad'>登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            saveLoad: false,
            formLogin: {
                name: '',
                password: '',
            },
            rule: {
                name: [
                        { required: true, message: '请填写账号', trigger: 'blur' }
                    ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                ]
            },
        }
    },
    methods: {
        handleSubmit () {
            let _vm = this
            _vm.$refs.formLogin.validate((valid) => {
                if (valid) {
                    _vm.saveLoad = true
                    _vm.$http.post({
                        url: 'doct-webManager/companyAdmin/login.jhtml',
                        data: _vm.formLogin,
                        success (res) {
                            if(res.code === 0) {
                                _vm.getCompanyInfo()
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.desc
                                })
                            }
                            _vm.saveLoad = false
                        }
                    })
                }
            })
        },
        getCompanyInfo () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/company/get_companyInfo.jhtml',
                success (res) {
                    if(res.code == 0) {
                        window.sessionStorage.setItem('companyId', res.content.id);
                        window.sessionStorage.setItem('companyName', res.content.companyName)
                        window.sessionStorage.setItem('logo', res.content.logo)
                        _vm.$store.dispatch('setHospLogo', res.content.logo)
                        _vm.$router.push('/home')
                    }else{
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    } 
                }
            })
        }
    }
}
</script>

<style scoped>
    .login-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .login-title {
        padding: 16px 135px;
        height: 64px;
    }
    .login-title .login {
        float: left;
        height: 32px;
        padding-left: 48px;
        font-size: 16px;
        line-height: 32px;
        color: #333;
    }
    .login-main {
        width: 400px;
        padding: 0 20px;
        margin: 96px auto 0;
    }
    .login-main h2 {
        margin-bottom: 40px;
        font-size: 20px;
        font-weight: normal;
        line-height: 28px;
        text-align: center;
        color: #333;
    }
</style>

<style type="text/css">
    #login-box .ivu-form-item-label {
        padding: 0 0 10px;
        font-size: 14px;
        line-height: 20px;
        color: #757575;
    }
    #login-box .ivu-form-item-label:before {
        display: none;
    }
    #login-box .ivu-input {
        height: 52px;
        padding: 15px 16px;
        font-size: 16px;
        color: #151515;
    }   
    #login-box .ivu-btn {
        padding: 13px 0;
        margin-top: 36px;
        font-size: 16px;
    }
</style>
