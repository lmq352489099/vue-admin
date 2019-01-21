<template>
    <div class="view-container">
        <h2 class="view-title">确认疗程消息</h2>
        <div class="container-main rule">
            <Form ref="formAdd" :label-width="90" label-position="left">
                <div class="rule-item">
                    <h3>一、规则名称</h3>
                    <Form-item label="规则名称" prop='name'>
                        <span class='message'>{{formAdd.name}}</span>
                    </Form-item>
                    <Form-item label="规则描述" prop='description'>
                        <span class='message'>{{formAdd.description}}</span>
                    </Form-item>
                </div>
                <div class="rule-item">
                    <h3>二、规则设置</h3>
                    <p class="tit">1.选择项目分类</p>
                    <Form-item :label-width="1">
                        <div class="category-tags">
                            <div class="tag-item" v-for='(item, index) in tagsBox' :key='item'>
                                <Tag>{{item}}</Tag>
                            </div>
                        </div>
                    </Form-item>
                    <p class="tit">2.设置消息模版</p>
                    <Form-item :label-width="30" v-show='formAdd.newStatus'>
                        <Checkbox v-model="formAdd.newStatus" :true-value='1' :false-value='0' disabled><span class='check'>顾客购买项目后，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='time'>{{newTime}}</span>
                        </div>
                        <p class="content">{{formAdd.newMessage}}</p>
                    </Form-item>
                    <Form-item :label-width="30" v-show='formAdd.operationStatus'>
                        <Checkbox v-model="formAdd.operationStatus" :true-value='1' :false-value='0' disabled><span class='check'>顾客上门治疗后(治疗未完成)，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='time'>{{operationTime}}</span>
                        </div>
                        <div>
                            <p class="content">{{formAdd.operationMessage}}</p>
                        </div>
                    </Form-item>
                    <Form-item :label-width="30" v-show='formAdd.completeStatus'>
                        <Checkbox v-model="formAdd.completeStatus" :true-value='1' :false-value='0' disabled><span class='check'>全部疗程完成后，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='time'>{{completeTime}}</span>
                        </div>
                        <div>
                            <p class="content">{{formAdd.completeMessage}}</p>
                        </div>
                    </Form-item>
                </div>
            </Form>
            <div class="main-footer-btn">
                <Button type="ghost" @click='back'>返回修改</Button>
                <Button type="primary" @click='save' :loading='saveLoad'>确认并开启</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            saveLoad: false,
            formAdd: {
                name: '',
                description: '',
                categoryIds: '',
                categoryNames: '',
                newStatus: 0,
                newTime: 0,
                newMessage: '',
                operationStatus: 0,
                operationTime: 0,
                operationMessage: '',
                completeStatus: 0,
                completeTime: 0,
                completeMessage: '',
            },
            timeList: [
                {
                    id: 0,
                    name: '立即发送'
                },
                {
                    id: 1440,
                    name: '24小时后'
                },
                {
                    id: 2880,
                    name: '48小时后'
                },
                {
                    id: 4320,
                    name: '72小时后'
                },
                {
                    id: 7200,
                    name: '120小时后'
                }
            ]
        }
    },
    computed: {
        tagsBox () {
            return this.formAdd.categoryNames.split(',')
        },
        newTime () {
            return this.timeList.filter(item => item.id === this.formAdd.newTime)[0].name
        },
        operationTime () {
            return this.timeList.filter(item => item.id === this.formAdd.operationTime)[0].name
        },
        completeTime () {
            return this.timeList.filter(item => item.id === this.formAdd.completeTime)[0].name
        },
    },
    created () {
        this.formAdd = JSON.parse(this.$route.query.data)
    },
    methods: {
        back () {
            this.$router.go(-1)
        },
        save () {
            let _vm = this
            _vm.saveLoad = true
            _vm.$http.post({
                url: 'doct-webManager/ruleMessage/add.jhtml',
                data: _vm.formAdd,
                success: function(res) {
                    if(res.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '添加成功！'
                        })
                        _vm.$router.push('/autoRule')
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                    _vm.saveLoad = false
                },
            })
        }
    }
}
</script>

<style scoped>
    .rule {
        padding-top: 100px;
        padding-bottom: 70px;
    }
    .rule-item {
        margin-bottom: 30px;
    }
    .rule-item h3 {
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 30px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #333;
    }
    .prompt {
        font-size: 14px;
        color: #9e9e9e;
    }
    .tit {
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .tag-item {
        display: inline-block;
        vertical-align: top;
        margin: 0 20px 10px 0;
    }
    .radio label {
        margin-left: 10px;
    }
    .check {
        display: inline-block;
        vertical-align: top;
        padding-left: 8px;
        font-size: 14px;
        line-height: 28px;
        color: #333;
    }
    .diff {
        margin: 5px 0;
    }
    .message {
        font-size: 14px;
        color: #333;
    }
    .time {
        font-size: 14px;
        color: rgba(0,0,0,0.65);
    }
    .content {
        width: 568px;
        padding: 6px 8px;
        border: 1px solid #D9D9D9;
        font-size: 12px;
        line-height: 18px;
        color: #333;
        border-radius: 4px;
    }
</style>

