<template>
    <div id='productChoose'>
        <div class="add-charge" @click='open'>
            <Icon type="plus-round"></Icon>
            标签
        </div>
        <Modal
            v-model="modal"
            title="项目类型"
            :width='600'
            class-name="vertical-center-modal productChoose">
            <div class='productChoose-main'>
                <div class="productChoose-nav">
                    <ul>
                        <li v-for='(item, index) in productList' :key='index' @click='filterSecond(index)' :class="[navIndex === index ? 'active' : '']">{{item.name}}</li>
                    </ul>
                </div>
                <div class="productChoose-con">
                    <div class="product-item" v-for='(item, index) in mainList' :key='index'>
                        <p>{{item.name}}</p>
                        <div class="product-list">
                            <span v-for='(item1, index1) in item.children' :key='index1' @click='chooseTree(item1)'>{{item1.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'productChoose',
    props: {
        defaultValue: String
    },
    data () {
        return {
            modal: false,
            defaultList: [],
            productList: [],
            navIndex: 0,
            mainList: [],
        }
    },
    watch: {
        defaultValue (val) {
            if(this.defaultList.length > 0) {
                const _data = this.defaultList.filter(item => item.id === val.split(',')[3] * 1)
                console.log(_data)
                console.log('+++++++')
                this.$emit('setProductTree', {
                    name: _data[0].name,
                    id: val
                })
            }
        },
        defaultList (val) {
            console.log(val)
            if(this.defaultValue.length > 0) {
                const _data = this.defaultList.filter(item => item.id === this.defaultValue.split(',')[3] * 1)
                console.log(this.defaultValue.split(','))
                console.log(_data)
                console.log('-------')
                this.$emit('setProductTree', {
                    name: _data[0].name,
                    id: val
                })
            }
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/productGoodCategory/getCategory.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.defaultList = res.content || []
                        _vm.productList = _vm.setTreeData(_vm.defaultList)
                        if(_vm.productList.length) {
                            _vm.filterSecond(0)
                        }
                        _vm.navIndex = 0
                    } else {
                        // console.log(res.data.desc)
                    }
                },
            })
        },
        setTreeData (data) {
            let _tree = data.filter(item => item.grade === 0)
            _tree.map(item => {
                let _second = data.filter(list => {
                    if(list.grade === 1 && list.treePath.split(',')[1] === item.id + '') {
                        return list
                    }
                })
                _second.map(second => {
                    let _three =  data.filter(list => {
                        if(list.grade === 2 && list.treePath.split(',')[2] === second.id + '') {
                            return list
                        }
                    })
                    second.children = _three
                })
                item.children = _second
            })
            return _tree
        },
        filterSecond (index) {
            this.navIndex = index
            this.mainList = this.productList[index].children
        },
        chooseTree (data) {
            console.log(data)
            this.$emit('setProductTree', {
                name: data.name,
                id: data.treePath + data.id + ','
            })
            this.modal = false
        },
        open () {
            this.modal = true
        },
    }
}
</script>

<style scoped>
#productChoose {
    display: inline-block;
}
#productChoose .add-charge {
    display: inline-block;
    vertical-align: middle;
    width: 56px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    color: #55A8FD;
    border: 1px solid #55A8FD;
    border-style: dashed;
    border-radius: 4px;
    cursor: pointer;
}
.productChoose-main {
    position: relative;
    overflow: hidden;
}
.productChoose-nav {
    width: 110px;
    background-color: #fff;
}
.productChoose-nav, 
.productChoose-con {
    float: left;
    height: 369px;
    overflow-y: auto;
}
.productChoose-con {
    width: 490px;
    padding: 0 15px;
}
.productChoose-nav ul {
    list-style: none;
}
.productChoose-nav li {
    position: relative;
    padding: 13px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.45px;
    color: #333;
    cursor: pointer;
}
.productChoose-nav .active, 
.productChoose-nav li:hover {
    color: #55A8FD;
    background: #E3F1FF;
    box-shadow: inset 2px 0 0 0 #55A8FD;
}
.product-item {
    padding: 5px 0;
    border-bottom: 1px solid #E5E5E5;
}
.product-item p {
    font-size: 12px;
    line-height: 32px;
    letter-spacing: 0.39px;
    color: #333;
}
.product-item span {
    display: inline-block;
    padding: 3.5px 12px;
    margin: 0 10px 10px 0;
    border: 1px solid #E5E5E5;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.33px;
    color: #757575;
    background: #FFFFFF;
    border-radius: 4px;
    cursor: pointer;
}
.product-item span:hover {
    color: #55A8FD;
    border: 1px solid #55A8FD;
}
</style>

<style type="text/css">
.productChoose .ivu-modal-body {
    padding: 0;
}
.productChoose .ivu-modal-footer {
    display: none;
}
</style>
