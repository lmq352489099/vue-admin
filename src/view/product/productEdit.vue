<template>
    <div class="view-container">
        <h2 class="view-title">{{title}}</h2>
        <div class="container-main product">
            <Form ref="formProduct" :model="formProduct" :rules="ruleForm" :label-width="120" label-position="left">
                <div class="product-item" style='paddingTop:25px;'>
                    <h3 class="item-title">
                        基础信息
                    </h3>
                </div>
                <Form-item label="商品类型" required>
                    <span class='dot'>服务产品</span>
                </Form-item>
                <Form-item label="所属医院" required>
                    <span class='msg'>{{companyName}}</span>
                </Form-item>
                <Form-item label="项目类型" required prop='category'>
                    <Tag closable v-if='formProduct.category' @on-close="handleClose">{{categoryName}}</Tag>
                    <cmptProductChoose @setProductTree='setProductTree' :defaultValue='editCategory'></cmptProductChoose>
                    <span class='remark'>注：该商品所包含的项目</span>
                </Form-item>
                <Form-item label="产品名称" required prop='name'>
                    <Input v-model.trim="formProduct.name" placeholder="请输入名称，例如：【瑞白颜玻尿酸1ml】原装正品支持当场检验" :maxlength='40' style='width:368px'></Input>
                    <span class='alert'>{{count}}字</span>
                    <p class="example">示例：【瑞白颜玻尿酸1ml】原装正品支持当场检验</p>
                </Form-item>
                <Form-item label="产品规格"  prop='size'>
                    <Input v-model.trim="formProduct.size" placeholder="请输入产品规格" :maxlength='10' style='width:368px'></Input>
                </Form-item>
                <Form-item label="产品单位" required prop='unit'>
                    <Input v-model.trim="formProduct.unit" placeholder="请输入产品单位" :maxlength='10' style='width:368px'></Input>
                </Form-item>
                <div class="product-item">
                    <h3 class="item-title">
                        价格设置
                    </h3>
                </div>
                <Form-item label="原价" required prop='marketPrice'>
                    <InputNumber :max="1000000" :min="0" v-model="formProduct.marketPrice" style='width:150px' @on-change='setPrice'></InputNumber>
                    <span class='alert'>元</span>
                </Form-item>
                <Form-item label="售价" required prop='price'>
                    <InputNumber :max="1000000" :min="0" v-model="formProduct.price" style='width:150px'  @on-change='setPrice2'></InputNumber>
                    <span class='alert'>元</span>
                    <span class='remark'>注：售价应<=原价</span>
                </Form-item>
                <div class="product-item">
                    <h3 class="item-title">
                        医生设置
                    </h3>
                </div>
                <Form-item label="添加医生"  prop='staff' required>
                    <Select v-model="formProduct.staff" style="width:368px">
                        <Option v-for="item in doctorList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <p class="example diff">1.可选择项目治疗医生，顾客在APP中可直接查看；</p>
                <p class="example diff">2.医生可使用配套的医生APP注册认证使用，也可在员工管理中发送邀请短信；</p>
                <p class="example diff">3.医生选自员工列表；</p>
                <div class="product-item">
                    <h3 class="item-title">
                        展示图片
                    </h3>
                </div>
                <Form-item prop='productGoodImages'>
                    <cmptPhotoUpload @setPhotoList='setPhotoList' :defaultValue='editPhoto'></cmptPhotoUpload>
                </Form-item>
                <p class="example diff">1.请至少上传一张图片；</p>
                <p class="example diff">2.图片文件大小不能超过1M；</p>
                <p class="example diff">3.图片必须为正方形且大小必须大于或等于400*400；</p>
                <p class="example diff">4.支持jpg、png格式；</p>
                <p class="example diff">5.请上传具有版权的图片；</p>
                <div class="product-item">
                    <h3 class="item-title">
                        详情介绍
                    </h3>
                </div>
                <Form-item prop='descriptionNum'>
                    <cmptTinymce :height='200' v-model="formProduct.description" @valid='validDes'></cmptTinymce>
                </Form-item>
                <p class="example diff">1.禁止留微信、QQ、电话等联系方式；</p>
                <p class="example diff">2.产品详情如有价格应与提报价一致；</p>
                <p class="example diff">3.假体隆鼻或隆下巴隆胸等需放假体项目必须写明假体的品牌；</p>
                <p class="example diff">4.手术类项目必须写明提报价有无包含麻醉费用或其他隐形消费；</p>
                <p class="example diff">5.不能含有“最”字比如“最好”等字眼；</p>
                <p class="example diff">6.上传图片尺寸宽度为706px；</p>
                <div class="product-item">
                    <h3 class="item-title">
                        购买须知
                    </h3>
                </div>
                <Form-item label="1.消费流程">
                    <div class="step">
                        <span>①提交订单</span>
                        <span>②在线支付</span>
                        <span>③到院治疗</span>
                        <span>④评价分享</span>
                    </div>
                </Form-item>
                <Form-item label="2.有效期" prop='expiyTime'>
                    <RadioGroup v-model="formProduct.expiyTime">
                        <Radio :label="1">一个月</Radio>
                        <Radio :label="2">两个月</Radio>
                        <Radio :label="3">三个月</Radio>
                        <Radio :label="6">六个月</Radio>
                    </RadioGroup>
                </Form-item>
                <Form-item label="3.营业时间">
                    <span class='msg'>医院营业时间内皆可使用。</span>
                </Form-item>
                <Form-item label="3.消费须知">
                    <span class='msg' style='width:414px'>支持预约，请在“我的订单”中预约使用或到店告知手机号码使用如在使用过程中有任何疑问，请致电悦完美客服：0592-6212592，在不违反现行法律、法规要求前提下，本活动有医院方进行说明。</span>
                </Form-item>
            </Form>
            <div class="main-footer-btn">
                <!-- <Button type="ghost">预览</Button> -->
                <!-- <Button type="ghost" @click='save(1)' :loading='saveLoad'>保存草稿</Button> -->
                <Button type="primary" @click='save(2)' :loading='saveLoad'>提交审核</Button>
            </div>
        </div>
    </div>
</template>

<script>
import cmptProductChoose from 'components/productChoose.vue'
import cmptPhotoUpload from 'components/photoUpload.vue'
import cmptTinymce from 'components/tinymce.vue'
export default {
    components: {cmptPhotoUpload, cmptTinymce, cmptProductChoose},
    data () {
        const validateMes = (rule, value, callback) => {
            if (value === '') {
                const _text = this.errorMsg.filter(item => item.field === rule.field)[0].text
                callback(new Error(_text))
            } else {
                callback()
            }
        }
        const validatePrice = (rule, value, callback) => {
            console.log(value)
            if (value > 0) {
                callback()
            } else {
                callback(new Error('请输入商品原价！'))
            }
        }
        const validateDes = (rule, value, callback) => {
            if (value > 0) {
                callback()
            } else {
                callback(new Error('请输入商品详情！'))
            }
        }
        const validatePrice2 = (rule, value, callback) => {
            if (value > 0) {
                if(value <= this.formProduct.marketPrice) {
                    callback()
                } else {
                    callback(new Error('商品售价应≦原价！'))
                }
            } else {
                callback(new Error('请输入商品售价！'))
            }
        }
        return {
            title: '',
            editKey: false,
            saveLoad: false,
            companyName: sessionStorage.getItem('companyName'),
            formProduct: {
                productGoodId: '',
                isAudit: '',
                name: '',
                price: 0,
                marketPrice: 0,
                description: '',
                descriptionNum: '',
                expiyTime: 1,
                category: '',
                staff: '',
                productGoodImages: '',
                size: '',
                unit: '',
            },
            categoryName: '',
            editCategory: '',
            editPhoto: ['','','','',''],
            doctorList: [],
            ruleForm: {
                name: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                // size: [
                //     { validator: validateMes, trigger: 'blur' }
                // ],
                unit: [
                    { validator: validateMes, trigger: 'blur' }
                ],
                price: [
                    { validator: validatePrice2, trigger: 'change' }
                ],
                marketPrice: [
                    { validator: validatePrice, trigger: 'change' }
                ],
                category: [
                    { validator: validateMes, trigger: 'change' }
                ],
                staff: [
                    { validator: validateMes, trigger: 'change' }
                ],
                productGoodImages: [
                    { validator: validateMes, trigger: 'change' }
                ],
                descriptionNum: [
                    { validator: validateDes, trigger: 'change' }
                ],
            },
            errorMsg: [
                {
                    field: 'name',
                    text: '请输入产品名称！'
                },
                {
                    field: 'size',
                    text: '请输入产品规格！'
                },
                {
                    field: 'unit',
                    text: '请输入产品单位！'
                },
                {
                    field: 'category',
                    text: '请选择项目类型！'
                },
                {
                    field: 'staff',
                    text: '请添加医生！'
                },
                {
                    field: 'productGoodImages',
                    text: '请添加产品展示图片！'
                },
                {
                    field: 'description',
                    text: '请输入产品详细介绍！'
                }
            ]
        }
    },
    computed: {
        count () {
            return 40 - this.formProduct.name.length
        },
    },
    created () {
        if(this.$route.query.id === 'add') {
            this.title = '发布商品'
            this.editKey = false
        } else {
            this.title = '编辑商品'
            this.editKey = true
            this.formProduct.productGoodId = this.$route.query.id
            this.getProductInfo()
        }
    },
    mounted () {
        this.getDoctorList()
    },
    methods: {
        getProductInfo () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/productGood/getProductGood.jhtml',
                data: {
                    productGoodId: _vm.$route.query.id
                },
                success: function(res){
                    let _obj = res.content.good || {},
                        _doc = res.content.staff || {}
                    _vm.editCategory = _obj.category || ''
                    _vm.formProduct.name = _obj.name || ''
                    _vm.formProduct.size = _obj.size || ''
                    _vm.formProduct.unit = _obj.unit || ''
                    _vm.formProduct.price = _obj.price || 0

                    _vm.formProduct.marketPrice = _obj.marketPrice || 0
                    _vm.formProduct.staff = _doc.id || ''
                    _obj.productGoodImages.map((item, index) => {
                        _vm.editPhoto.splice(index, 1, item.medium)
                    })
                    _vm.formProduct.description = _obj.description || ''
                    _vm.formProduct.expiyTime = _obj.expiyTime || 1
                },
            })
        },
        getDoctorList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staff/get_staffs.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.doctorList = res.content || []
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        setPrice (val) {
            this.$nextTick(() => {
                this.formProduct.marketPrice = parseFloat((val).toFixed(2))
            })
        },
        setPrice2 (val) {
            this.$nextTick(() => {
                this.formProduct.price = parseFloat((val).toFixed(2))
            })
        },
        setProductTree (data) {
            this.formProduct.category = data.id
            this.categoryName = data.name
            this.$refs.formProduct.validateField('category')
        },
        handleClose () {
            this.formProduct.category = ''
            this.categoryName = ''
        },
        setPhotoList (data) {
            let _data = data.filter(item => item.length > 0)
            this.formProduct.productGoodImages = _data.join(',')
            console.log(this.formProduct.productGoodImages)
            this.$refs.formProduct.validateField('productGoodImages')
        },
        validDes (val) {
            console.log(val)
            this.formProduct.descriptionNum = val
            this.$refs.formProduct.validateField('descriptionNum')
        },
        save (key) {
            let _vm = this,
                _url = '',
                _active = ''
            if(key === 1) {
                _vm.formProduct.isAudit = false
                _url = 'doct-webManager/productGood/saveDraft.jhtml'
                _active = 'draft'
            } else if(key === 2) {
                if(_vm.editKey) {
                    _vm.formProduct.isAudit = true
                    _url = 'doct-webManager/productGood/saveDraft.jhtml'
                } else {
                    _url = 'doct-webManager/productGood/create.jhtml'
                }
                _active = 'audit'
            }
            _vm.$refs.formProduct.validate((valid) => {
                if (valid) {
                    _vm.saveLoad = true
                    _vm.formProduct.description = _vm.formProduct.description.replace(/data-mce-src="([^"]*)"/g, "")
                    _vm.formProduct.name = _vm.formProduct.name.replace(/"/g, "'")
                    _vm.formProduct.size = _vm.formProduct.size.replace(/"/g, "'")
                    _vm.formProduct.unit = _vm.formProduct.unit.replace(/"/g, "'")
                    _vm.$http.post({
                        url: _url,
                        data: _vm.formProduct,
                        success: function(res) {
                            if(res.code === 0) {
                                _vm.$Notice.success({
                                    title: '系统提示！',
                                    desc: '操作成功！'
                                })
                                _vm.$store.dispatch('setProductTabs', _active)
                                _vm.$router.go(-1)
                            } else {
                                _vm.$Notice.error({
                                    title: '系统提示！',
                                    desc: res.desc
                                })
                            }
                        },
                    })
                }
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .product {
        padding-bottom: 90px;
    }
    .product .item-title {
        height: 52px;
        margin-bottom: 25px;
        font-size: 16px;
        line-height: 52px;
        font-weight: normal;
        color: #333;
        border-bottom: 1px solid #E5E5E5;
    }
    .product .dot {
        width: 80px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background: #f4f4f4;
        border-radius: 4px;
    }
    .product .alert, 
    .product .remark, 
    .product .dot, 
    .product .msg {
        display: inline-block;
        font-size: 14px;
        color: #333;
        vertical-align: middle;
    }
    .product .remark {
        margin-left: 13px;
        color: #9E9E9E;
    }
    .product .example {
        font-size: 14px;
        line-height: 20px;
        color: #9E9E9E;
    }
    .product .diff {
        padding-left: 120px;
    }
    .product .alert {
        margin-left: 10px;
        color: #757575;
    }
    .product .step {
        position: relative;
        display: inline-block;
        /*overflow: hidden;*/
        height: 33px;
        border-left: 1px solid #E0E6ED;
        border-top: 1px solid #E0E6ED;
        border-bottom: 1px solid #E0E6ED;
        border-radius: 4px;
    }
    .step span {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 31px;
        font-size: 14px;
        line-height: 31px;
        text-align: center;
        color: #333;
        background-color: #fbfbfb;
    }
    .step span:after {
        content: '';
        display: inline-block;
        position: absolute;
        background-color: #fbfbfb;
        width: 23px;
        height: 23px;
        transform: rotate(45deg);
        border-top: 1px solid #E0E6ED;
        border-right: 1px solid #E0E6ED;
        top: 4px;
        right: -9px;
        border-radius: 4px;
        z-index: 2;
    }
</style>
