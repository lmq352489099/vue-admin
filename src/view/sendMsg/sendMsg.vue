<template>
    <div class="view-container">
        <h2 class="view-title">推送消息</h2>
        <div class="container-main send">
            <div class="send-content">
                <div class="send-main">
                    <div class="send-tags-box">
                        <div class="all">
                            <div class="all-item" @click.capture='changeAll(1)' v-if='allUserKey'>
                                <Tag closable>全部顾客</Tag>
                            </div>
                            <div class="all-item" @click.capture='changeAll(2)' v-if='allDocKey'>
                                <Tag closable>全部医生</Tag>
                            </div>
                        </div>
                        <div class="tags-list">
                            <div class="tags-list-item" v-for='(item, index) in tagsList' :key='index' @click='remove(index)'>
                                <img :src="defaultSrc" alt="" />
                                <p>{{item.name}}</p>
                                <Icon type="close-round"></Icon>
                            </div>
                        </div>
                    </div>
                    <Form ref="formSend" :model="formSend" :rules="ruleForm" :label-width="120" label-position="right" class='send-form'>
                        <Form-item>
                            <img :src="hospSrc" alt="" />
                            <span class='hosp-name'>{{hospName}}</span>
                        </Form-item>
                        <Form-item label="标题：" required prop='title'>
                            <Input v-model.trim="formSend.title" placeholder="请输入标题" :maxlength='14'></Input>
                        </Form-item>
                        <Form-item label="推送标题：" required prop='title1'>
                            <Input v-model.trim="formSend.title1" placeholder="请输入推送标题" :maxlength='14'></Input>
                        </Form-item>
                        <Form-item label="推送内容：" required prop='content'>
                            <Input v-model.trim="formSend.content" type="textarea" placeholder="请输入推送内容" :maxlength='600' :autosize="{minRows: 9,maxRows: 9}"></Input>
                        </Form-item>
                        <Form-item style='textAlign:right'>
                            <Button type="primary">推送消息</Button>
                        </Form-item>
                    </Form>
                </div>
            </div>
            <div class="search-banner">
                <div class="search-filter">
                    <div class="search-tabs">
                        <p :class="[tabKey ? 'choose' : '']" @click='changeTabs(true)'>顾客({{totalUser}})</p>
                        <p :class="[!tabKey ? 'choose' : '']" @click='changeTabs(false)'>医生(120)</p>
                    </div>
                    <CheckboxGroup v-model="type" class='check-box'>
                        <Checkbox :label="1">全部顾客</Checkbox>
                        <Checkbox :label="2">全部医生</Checkbox>
                    </CheckboxGroup>
                    <Input v-model="name" placeholder="请输入..." class='search-input'></Input>
                </div>
                <div class="search-main">
                    <ul class="search-scroll" ref='searchScroll'>
                        <li v-for='(item, index) in data' v-if='tabKey' @click='chooseUser(item)'>
                            <img :src="defaultSrc" alt="" />
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultSrc: require('assets/images/user-default.png'),
            hospName: sessionStorage.getItem('companyName'),
            tabKey: true,
            pageNumberUser: 1,
            totalUser: 0,
            name: '',
            type: [],
            data: [],
            tagsList: [],
            formSend: {
                title: '',
                title1: '',
                content: '',
            },
            ruleForm: {}
        }
    },
    computed: {
        hospSrc () {
            if(this.$store.getters.getHospLogo === '') {
                this.$store.dispatch('setHospLogo', sessionStorage.getItem('logo'))
            }
            return this.$store.getters.getBaseImgURL + this.$store.getters.getHospLogo
        },
        allUserKey () {
            const _index = this.type.findIndex(item => item === 1)
            return _index < 0 ? false : true
        },
        allDocKey () {
            const _index = this.type.findIndex(item => item === 2)
            return _index < 0 ? false : true
        },
    },
    created () {
        this.getUserList()
    },
    mounted () {
        const _srcoll = this.$refs.searchScroll
        _srcoll.addEventListener('scroll', () => {
            this.scrollAsyn()
        }, false)
    },
    methods: {
        changeTabs (bool) {
            this.tabKey = bool
        },
        scrollAsyn () {
            let _vm = this,
                _srcollTop = _vm.$refs.searchScroll.scrollTop,
                _srcollHeight = _vm.$refs.searchScroll.scrollHeight,
                _srcollH = _vm.$refs.searchScroll.offsetHeight
            if(_srcollTop + _srcollH === _srcollHeight) {
                _vm.handleReachBottom()
            }
            console.log(_srcollTop)
            console.log(_srcollHeight)
            console.log(_srcollH)
        },
        handleReachBottom () {
            return new Promise(resolve => {
                this.pageNumberUser++
                this.getUserList()
                resolve()
            })
        },
        getUserList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/user/get_page.jhtml',
                data: {pageNumber: _vm.pageNumberUser},
                success: function(res){
                    if(res.code === 0 ){
                        console.log(123)
                        const _data = res.content.content || []
                        _vm.totalUser = res.content.total || 0
                        _vm.data.push(..._data)
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        changeAll (type) {
            const _index = this.type.findIndex(item => item === type)
            this.type.splice(_index, 1)
        },
        chooseUser (data) {
            const _index = this.tagsList.findIndex(item => item.id === data.id)
            if(_index < 0) {
                this.tagsList.push(data)
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '该人员已添加！'
                })
            }
        },
        remove (index) {
            this.tagsList.splice(index, 1)
        }
    }
}
</script>

<style scoped>
    .send {
        height: 100%;
        padding: 60px 0 0;
    }
    .search-banner {
        position: relative;
        float: left;
        width: 300px;
        height: 100%;
        border-right: 1px solid #E5E5E5;
        margin-left: -100%;
    }
    .search-filter {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.04);
    }
    .search-tabs {
        overflow: hidden;
        padding: 15px 20px;
        box-shadow: 0 1px 0 0 #E5E5E5;
    }
    .search-tabs p {
        float: left;
        width: 50%;
        font-size: 14px;
        text-align: center;
        color: #757575;
        word-break: break-all;
        cursor: pointer;
    }
    .search-tabs p:first-child {
        box-shadow: inset -1px 0 0 0 #E5E5E5;
    }
    .search-tabs .choose {
        color: #55A8FD;
    }
    .check-box {
        margin: 12px 0;
        text-align: center;
    }
    .check-box label {
        margin-right: 30px;
    }
    .search-input {
        width: 280px;
        margin: 0 10px 12px;
    }
    .search-main {
        height: 100%;
        padding-top: 136px;
    }
    .search-scroll {
        width: 100%;
        height: 100%;
        background-color: #fcfcfe;
        overflow-y: auto;
    }
    .search-scroll li {
        overflow: hidden;
        padding: 10px 20px;
        cursor: pointer;
    }
    .search-scroll li:hover {
        background: #F2F3F5;
    }
    .search-scroll img {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 16px;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
    }
    .search-scroll p {
        float: left;
        width: 200px;
        padding: 5px 0;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        word-break: break-all;
    }
    .send-content {
        float: left;
        width: 100%;
        height: 100%;
        padding: 40px 16.86% 0 345px;
        overflow-y: auto;
    }
    .send-main {
        position: relative;
        width: 100%;
        padding-bottom: 470px;
    }
    .send-form {
        position: absolute;
        left: -20px;
        bottom: 0;
        width: 100%;
    }
    .send-form img {
        display: inline-block;
        width: 56px;
        height: 56px;
        margin-right: 10px;
        border-radius: 4px;
    }
    .hosp-name {
        font-size: 14px;
        color: #333;
    }
    .send-tags-box {
        width: 100%;
        height: 360px;
        overflow-y: auto;
    }
    .send-tags-box .all {
        margin-bottom: 20px;
    }
    .all .all-item {
        display: inline-block;
    }
    .tags-list-item {
        position: relative;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        min-width: 120px;
        padding: 5px 25px 5px 5px;
        border: 1px solid #e5e5e5;
        margin: 0px 10px 10px 0;
        border-radius: 4px;
        cursor: pointer;
    }
    .tags-list-item img {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
    }
    .tags-list-item p {
        float: left;
        padding: 5px 0;
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .tags-list-item i {
        position: absolute;
        right: 5px;
        top: 14px;
    }
</style>

<style type="text/css">
    .search-input .ivu-input {
        text-align: center;
        border: none;
        outline: none;
        background: #F6F7F9;
        border-radius: 4px;
        box-shadow: none;
    }
</style>

