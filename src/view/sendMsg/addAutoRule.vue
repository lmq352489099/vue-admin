<template>
    <div class="view-container">
        <h2 class="view-title">添加疗程消息</h2>
        <div class="container-main rule">
            <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="90" label-position="left">
                <div class="rule-item">
                    <h3>一、规则名称</h3>
                    <Form-item label="规则名称" prop='name'>
                        <Input v-model.trim="formAdd.name" placeholder="请输入规则名称" style='width:272px'></Input>
                    </Form-item>
                    <Form-item label="规则描述" prop='description'>
                        <Input v-model.trim="formAdd.description" placeholder="请输入规则描述" style='width:272px'></Input>
                        <span class='prompt'>(选填)</span>
                    </Form-item>
                </div>
                <div class="rule-item">
                    <h3>二、规则设置</h3>
                    <p class="tit">1.选择项目分类<span class='prompt'>（最多添加5个分类）</span></p>
                    <Form-item label="项目类型" prop='categoryIds'>
                        <Select v-model="category" style="width:160px" @on-change='setCategory'>
                            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <div class="category-tags">
                            <div class="tag-item" v-for='(item, index) in tagsBox' :key='item.id' @click.capture='remove(index)'>
                                <Tag closable>{{item.name}}</Tag>
                            </div>
                        </div>
                    </Form-item>
                    <p class="tit">2.设置消息模版<span class='prompt'>（至少填写一个模版）</span></p>
                    <Form-item prop='newMessage' :label-width="30">
                        <Checkbox v-model="formAdd.newStatus" :true-value='1' :false-value='0'><span class='check'>顾客购买项目后，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='prompt'>发送时间：</span>
                            <RadioGroup v-model="formAdd.newTime" class='radio'>
                                <Radio :label="0">立即发送</Radio>
                                <Radio :label="1440">24小时后</Radio>
                                <Radio :label="2880">48小时后</Radio>
                                <Radio :label="4320">72小时后</Radio>
                                <Radio :label="7200">120小时后</Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <Input v-model.trim="formAdd.newMessage" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="请输入消息内容..." :maxlength='600' style='width:568px'></Input>
                        </div>
                    </Form-item>
                    <Form-item prop='operationMessage' :label-width="30">
                        <Checkbox v-model="formAdd.operationStatus" :true-value='1' :false-value='0'><span class='check'>顾客上门治疗后(治疗未完成)，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='prompt'>发送时间：</span>
                            <RadioGroup v-model="formAdd.operationTime" class='radio'>
                                <Radio :label="0">立即发送</Radio>
                                <Radio :label="1440">24小时后</Radio>
                                <Radio :label="2880">48小时后</Radio>
                                <Radio :label="4320">72小时后</Radio>
                                <Radio :label="7200">120小时后</Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <Input v-model.trim="formAdd.operationMessage" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="请输入消息内容..." :maxlength='600' style='width:568px'></Input>
                        </div>
                    </Form-item>
                    <Form-item prop='completeMessage' :label-width="30">
                        <Checkbox v-model="formAdd.completeStatus" :true-value='1' :false-value='0'><span class='check'>全部疗程完成后，推送消息</span></Checkbox>
                        <div class="diff">
                            <span class='prompt'>发送时间：</span>
                            <RadioGroup v-model="formAdd.completeTime" class='radio'>
                                <Radio :label="0">立即发送</Radio>
                                <Radio :label="1440">24小时后</Radio>
                                <Radio :label="2880">48小时后</Radio>
                                <Radio :label="4320">72小时后</Radio>
                                <Radio :label="7200">120小时后</Radio>
                            </RadioGroup>
                        </div>
                        <div>
                            <Input v-model.trim="formAdd.completeMessage" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="请输入消息内容..." :maxlength='600' style='width:568px'></Input>
                        </div>
                    </Form-item>
                </div>
            </Form>
            <div class="main-footer-btn">
                <Button type="primary" @click='save'>下一步</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        const validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入规则名称！'))
            } else {
                callback()
            }
        }
        const validateCategory = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择项目分类！'))
            } else {
                callback()
            }
        }
        const validateMes = (rule, value, callback) => {
            let _prop = ''
            if(rule.field === 'newMessage') {
                _prop = 'newStatus'
            } else if(rule.field === 'operationMessage') {
                _prop = 'operationStatus'
            } else if(rule.field === 'completeMessage') {
                _prop = 'completeStatus'
            }
            if(this.formAdd[_prop]) {
                if (value === '') {
                    callback(new Error('请输入消息内容！'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
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
            category: '',
            categoryList: [],
            tagsBox: [],
            ruleForm: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                completeMessage: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                operationMessage: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                newMessage: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                categoryIds: [
                    { validator: validateCategory, trigger: 'change' }
                ]
            },
        }
    },
    beforeRouteLeave (to, from, next) {
        console.log(to.path)
        from.meta.keepAlive = true
        next()
    },
    computed: {
        setCategoryId () {
            const _idBox = this.tagsBox.map(item => item.id)
            return _idBox.join(',')
        },
        setCategoryName () {
            const _nameBox = this.tagsBox.map(item => item.name)
            return _nameBox.join(',')
        },
    },
    mounted () {
        this.getCategoryList()
    },
    methods: {
        getCategoryList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/ruleMessage/getCategoryList.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.categoryList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                },
            })
        },
        setCategory (id) {
            const _index = this.tagsBox.findIndex(item => item.id === id)
            const _data = this.categoryList.filter(item => item.id === id)
            if(_index < 0 && this.tagsBox.length < 5) {
                this.tagsBox.push(..._data)
                this.formAdd.categoryIds = this.setCategoryId
                this.$refs.formAdd.validateField('categoryIds')
            }
        },
        remove (index) {
            this.tagsBox.splice(index, 1)
            this.category = ''
        },
        save () {
            if(this.formAdd.newStatus || this.formAdd.completeStatus || this.formAdd.operationStatus) {
                this.formAdd.categoryIds = this.setCategoryId
                this.formAdd.categoryNames = this.setCategoryName
                this.$refs.formAdd.validate((valid) => {
                    if (valid) {
                        this.$router.push({
                            path: '/previewAutoRule',
                            query: {
                                data: JSON.stringify(this.formAdd)
                            }
                        })
                    }
                })
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '请至少填写一个消息模板！'
                })
            }
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
    .category-tags {
        margin-top: 20px;
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
</style>

