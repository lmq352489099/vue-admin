<template>
    <div id='shoppingFilter'>
        <div :class="['main-search-box', searchKey ? '' : 'up']">
            <div class="main-search-title">筛选查询</div>
            <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
            <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
            <Button type="ghost" class='search' @click='search'>查询结果</Button>
            <div class="result" v-if='searchKey'>
                <span class='label'>全部结果 / </span>
                <div class="result-item" v-for='(item, index) in resultData' :key='index' @click.capture='remove(item, index)'>
                    <Tag closable>{{item.text}}</Tag>
                </div>
            </div>
            <div class="filter-conditions" v-if='searchKey'>
                <div class="filter-item" v-for='item in filterData' :key='item.type' v-show='filterKey(item.type)'>
                    <span class='tit'>{{item.title}}</span>
                    <div class="other-change" @click='userDefined(item.type)'>自定义</div>
                    <ul>
                        <li v-for='(child, index) in item.children' :class="[index === 0 ? 'infinite' : '']">
                            <span @click='chooseSingleFilter(item.type, child)'>{{child.text}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal
            title="自定义筛选条件"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <Form :label-width="120" label-position="left" ref="formDefined" :model="formDefined" :rules="ruleForm">
                <Form-item label="最近消费：" v-if='userDefinedKey === 1' prop='startTime'>
                    <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" @on-change='setTime' ref='cleanDate'></DatePicker>
                </Form-item>
                <Form-item label="消费次数：" v-if='userDefinedKey === 2' prop='startNum'>
                    <Input v-model.trim="formDefined.startNum" placeholder="请输入消费次数" style="width: 100px"></Input> ——
                    <Input v-model.trim="formDefined.endNum" placeholder="请输入消费次数" style="width: 100px"></Input>
                </Form-item>
                <Form-item label="消费金额：" v-if='userDefinedKey === 3' prop='startPrice'>
                    <Input v-model.trim="formDefined.startPrice" placeholder="请输入消费金额" style="width: 100px"></Input> ——
                    <Input v-model.trim="formDefined.endPrice" placeholder="请输入消费金额" style="width: 100px"></Input>
                </Form-item>
                <Form-item label="订单均价：" v-if='userDefinedKey === 4' prop='startAmount'>
                    <Input v-model.trim="formDefined.startAmount" placeholder="请输入订单均价" style="width: 100px"></Input> ——
                    <Input v-model.trim="formDefined.endAmount" placeholder="请输入订单均价" style="width: 100px"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'shoppingFilter',
    data () {
        const validateTime = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请选择消费时间'))
            } else {
                callback()
            }
        }
        const validateNum = (rule, value, callback) => {
            if(value === '' || this.formDefined[this.validProp] === '') {
                callback(new Error('请填写筛选信息'))
            } else {
                if((/[^\d]/g).test(value) || (/[^\d]/g).test(this.formDefined[this.validProp])) {
                    callback(new Error('请输入数字'))
                } else if(value * 1 > 1000000 || this.formDefined[this.validProp] * 1 > 1000000) {
                    callback(new Error('请输入0-1000000'))
                } else if(value * 1 > this.formDefined[this.validProp] * 1) {
                    callback(new Error('请输入正确范围'))
                } else {
                    callback()
                }
            }
        }
        return {
            validProp: '',
            userDefinedKey: 1,
            modal: false,
            loading: true,
            searchKey: true,
            formSearch: {
                startTime: '',
                endTime: '',
                startNum: '',
                endNum: '',
                startPrice: '',
                endPrice: '',
                startAmount: '',
                endAmount: ''
            },
            formDefined: {
                startTime: '',
                endTime: '',
                startNum: '',
                endNum: '',
                startPrice: '',
                endPrice: '',
                startAmount: '',
                endAmount: ''
            },
            ruleForm: {
                startTime: [
                    { validator: validateTime, trigger: 'change' }
                ],
                startNum: [
                    { validator: validateNum, trigger: 'blur' }
                ],
                startPrice: [
                    { validator: validateNum, trigger: 'blur' }
                ],
                startAmount: [
                    { validator: validateNum, trigger: 'blur' }
                ]
            },
            resultData: [],
            filterData: [
                {
                    title: '最近消费：',
                    type: 1,
                    children: [
                        {
                            text: '不限',
                            startTime: '',
                            endTime: '',
                            id: 1
                        },
                        {
                            text: '1周内',
                            startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                            endTime: moment().format('YYYY-MM-DD'),
                            id: 2
                        },
                        {
                            text: '2周内',
                            startTime: moment().subtract(14, 'days').format('YYYY-MM-DD'),
                            endTime: moment().format('YYYY-MM-DD'),
                            id: 3
                        },
                        {
                            text: '1个月内',
                            startTime: moment().subtract(30, 'days').format('YYYY-MM-DD'),
                            endTime: moment().format('YYYY-MM-DD'),
                            id: 4
                        },
                        {
                            text: '1个月前',
                            startTime: '',
                            endTime: moment().subtract(30, 'days').format('YYYY-MM-DD'),
                            id: 5
                        },
                        {
                            text: '2个月前',
                            startTime: '',
                            endTime: moment().subtract(60, 'days').format('YYYY-MM-DD'),
                            id: 6
                        },
                        {
                            text: '3个月前',
                            startTime: '',
                            endTime: moment().subtract(90, 'days').format('YYYY-MM-DD'),
                            id: 7
                        },
                        {
                            text: '6个月前',
                            startTime: '',
                            endTime: moment().subtract(180, 'days').format('YYYY-MM-DD'),
                            id: 8
                        }
                    ]
                },
                {
                    title: '消费次数：',
                    type: 2,
                    children: [
                        {
                            text: '不限',
                            startNum: '',
                            endNum: '',
                            id: 1
                        },
                        {
                            text: '1次+',
                            startNum: 1,
                            endNum: '',
                            id: 2
                        },
                        {
                            text: '2次+',
                            startNum: 2,
                            endNum: '',
                            id: 3
                        },
                        {
                            text: '3次+',
                            startNum: 3,
                            endNum: '',
                            id: 4
                        },
                        {
                            text: '4次+',
                            startNum: 4,
                            endNum: '',
                            id: 5
                        },
                        {
                            text: '10次+',
                            startNum: 10,
                            endNum: '',
                            id: 6
                        },
                        {
                            text: '20次+',
                            startNum: 20,
                            endNum: '',
                            id: 7
                        },
                        {
                            text: '30次+',
                            startNum: 30,
                            endNum: '',
                            id: 8
                        }
                    ]
                },
                {
                    title: '消费金额：',
                    type: 3,
                    children: [
                        {
                            text: '不限',
                            startPrice: '',
                            endPrice: '',
                            id: 1
                        },
                        {
                            text: '0-1000',
                            startPrice: 0,
                            endPrice: 1000,
                            id: 2
                        },
                        {
                            text: '1001-2000',
                            startPrice: 1001,
                            endPrice: 2000,
                            id: 3
                        },
                        {
                            text: '2001-3000',
                            startPrice: 2001,
                            endPrice: 3000,
                            id: 4
                        },
                        {
                            text: '3001-4000',
                            startPrice: 3001,
                            endPrice: 4000,
                            id: 5
                        },
                        {
                            text: '4001-5000',
                            startPrice: 4001,
                            endPrice: 5000,
                            id: 6
                        },
                        {
                            text: '5001-8000',
                            startPrice: 5001,
                            endPrice: 8000,
                            id: 7
                        },
                        {
                            text: '8001+',
                            startPrice: 8001,
                            endPrice: '',
                            id: 8
                        }
                    ]
                },
                {
                    title: '订单均价：',
                    type: 4,
                    children: [
                        {
                            text: '不限',
                            startAmount: '',
                            endAmount: '',
                            id: 1
                        },
                        {
                            text: '0-100',
                            startAmount: 0,
                            endAmount: 100,
                            id: 2
                        },
                        {
                            text: '101-1000',
                            startAmount: 101,
                            endAmount: 1000,
                            id: 3
                        },
                        {
                            text: '1001-2000',
                            startAmount: 1001,
                            endAmount: 2000,
                            id: 4
                        },
                        {
                            text: '2001-3000',
                            startAmount: 2001,
                            endAmount: 3000,
                            id: 5
                        },
                        {
                            text: '3001-4000',
                            startAmount: 3001,
                            endAmount: 4000,
                            id: 6
                        },
                        {
                            text: '4001-5000',
                            startAmount: 4001,
                            endAmount: 5000,
                            id: 7
                        },
                        {
                            text: '5001-8000',
                            startAmount: 5001,
                            endAmount: 8000,
                            id: 8
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        timeKey () {
            const _index = this.resultData.findIndex(item => item.type === 1)
            return _index < 0 ? true : false
        },
        numKey () {
            const _index = this.resultData.findIndex(item => item.type === 2)
            return _index < 0 ? true : false
        },
        priceKey () {
            const _index = this.resultData.findIndex(item => item.type === 3)
            return _index < 0 ? true : false
        },
        amountKey () {
            const _index = this.resultData.findIndex(item => item.type === 4)
            return _index < 0 ? true : false
        },
    },
    methods: {
        changeSearch (bool) {
            this.searchKey = bool
        },
        filterKey (type) {
            if(type === 1) {
                return this.timeKey
            } else if(type === 2) {
                return this.numKey
            } else if(type === 3) {
                return this.priceKey
            } else if(type === 4) {
                return this.amountKey
            }
        },
        chooseSingleFilter (type, data) {
            const _text = this.filterData.filter(item => item.type === type)[0].title
            const _data = {
                type: type,
                id: data.id,
                text: _text + data.text
            }
            this.resultData.push(_data)
            if(type === 1) {
                this.formSearch.startTime = data.startTime
                this.formSearch.endTime = data.endTime
            } else if(type === 2) {
                this.formSearch.startNum = data.startNum
                this.formSearch.endNum = data.endNum
            } else if(type === 3) {
                this.formSearch.startPrice = data.startPrice
                this.formSearch.endPrice = data.endPrice
            } else if(type === 4) {
                this.formSearch.startAmount = data.startAmount
                this.formSearch.endAmount = data.endAmount
            }
        },
        remove (data, index) {
            this.resultData.splice(index, 1)
            if(data.type === 1) {
                this.formSearch.startTime = ''
                this.formSearch.endTime = ''
            } else if(data.type === 2) {
                this.formSearch.startNum = ''
                this.formSearch.endNum = ''
            } else if(data.type === 3) {
                this.formSearch.startPrice = ''
                this.formSearch.endPrice = ''
            } else if(data.type === 4) {
                this.formSearch.startAmount = ''
                this.formSearch.endAmount = ''
            }
        },
        userDefined (type) {
            this.userDefinedKey = type
            this.formDefined = {
                startTime: '',
                endTime: '',
                startNum: '',
                endNum: '',
                startPrice: '',
                endPrice: '',
                startAmount: '',
                endAmount: ''
            }
            if(type === 2) {
                this.validProp = 'endNum'
            } else if(type === 3) {
                this.validProp = 'endPrice'
            } else if(type === 4) {
                this.validProp = 'endAmount'
            }
            this.$refs.formDefined.resetFields()
            this.modal = true
            if(type === 1) {
                this.$nextTick(() => {
                    this.$refs.cleanDate.handleClear()
                    this.$refs.formDefined.resetFields()
                })
            }
        },
        setTime (date) {
            this.formDefined.startTime = date[0]
            this.formDefined.endTime = date[1]
        },
        ok () {
            this.$refs.formDefined.validate((valid) => {
                if (valid) {
                    let _data = {}
                    if(this.userDefinedKey === 1) {
                        _data = {
                            type: 1,
                            id: 100,
                            text: `最近消费：${this.formDefined.startTime} - ${this.formDefined.endTime}`
                        }
                        this.formSearch.startTime = this.formDefined.startTime
                        this.formSearch.endTime = this.formDefined.endTime
                    } else if(this.userDefinedKey === 2) {
                        _data = {
                            type: 2,
                            id: 100,
                            text: `消费次数：${this.formDefined.startNum} - ${this.formDefined.endNum}`
                        }
                        this.formSearch.startNum = this.formDefined.startNum
                        this.formSearch.endNum = this.formDefined.endNum
                    } else if(this.userDefinedKey === 3) {
                        _data = {
                            type: 3,
                            id: 100,
                            text: `消费金额：${this.formDefined.startPrice} - ${this.formDefined.endPrice}`
                        }
                        this.formSearch.startPrice = this.formDefined.startPrice
                        this.formSearch.endPrice = this.formDefined.endPrice
                    } else if(this.userDefinedKey === 4) {
                        _data = {
                            type: 4,
                            id: 100,
                            text: `订单均价：${this.formDefined.startAmount} - ${this.formDefined.endAmount}`
                        }
                        this.formSearch.startAmount = this.formDefined.startAmount
                        this.formSearch.endAmount = this.formDefined.endAmount
                    }
                    this.resultData.push(_data)
                    this.modal = false
                } else {
                    this.loading = false
                    this.$nextTick(() => {
                        this.loading = true
                    })
                }
            })
        },
        search () {
            this.$emit('search', this.formSearch)
        },
    }
}
</script>

<style scoped>
    .main-search-box {
        padding-right: 230px;
        background-color: #fff;
    }
    .main-search-box.up {
        background-color: #fdfdfd;
    }
    .search-show-btn-down, 
    .search-show-btn-up {
        right: 120px;
    }
    .search {
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .result {
        margin-bottom: 18px;
    }
    .result .label {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        font-size: 12px;
        line-height: 28px;
        color: #9e9e9e;
    }
    .result .result-item {
        display: inline-block;
        vertical-align: middle;
        padding: 1px 0;
        margin-right: 5px;
    }
    .filter-conditions .filter-item {
        position: relative;
        padding: 0 60px 0 110px;
        margin: 0 -220px 0 -80px;
        border-top: 1px dashed #e5e5e5;
    }
    .filter-item .other-change, 
    .filter-item .tit {
        position: absolute;
        top: 10px;
        font-size: 14px;
        line-height: 20px;
        color: #9e9e9e;
        cursor: pointer;
    }
    .filter-item .tit {
        left: 10px;  
    }
    .filter-item .other-change {
        right: 10px; 
    }
    .filter-item li {
        display: inline-block;
        vertical-align: middle;
        width: 130px;
        padding: 5px 20px 5px 0;
        margin: 5px 0;
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .filter-item li span {
        cursor: pointer;
    }
    .filter-item .infinite {
        color: #9e9e9e;
    }
</style>

