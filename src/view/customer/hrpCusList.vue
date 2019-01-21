<template>
    <div class="view-container">
        <h2 class="view-title">锦医卫顾客</h2>
        <div class="container-main">
            <div :class="['main-search-box', searchKey ? '' : 'up']">
                <div class="main-search-title">筛选查询</div>
                <div class="search-show-btn-down" @click='changeSearch(false)' v-if='searchKey'>收起筛选<span></span></div>
                <div class="search-show-btn-up" @click='changeSearch(true)' v-if='!searchKey'>展开筛选<span></span></div>
                <Form ref="formSearch" :model="formSearch" inline :label-width='60' v-show='searchKey'>
                    <FormItem label="姓名" prop="name">
                        <Input v-model.trim="formSearch.name" placeholder="请输入姓名" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                    <!-- <FormItem label="性别" prop="sex">
                        <Select v-model="formSearch.sex" style="width:120px" :clearable='true'>
                            <Option :value="1">男</Option>
                            <Option :value="2">女</Option>
                        </Select>
                    </FormItem> -->
                    <FormItem label="手机" prop="mobile">
                        <Input v-model.trim="formSearch.mobile" placeholder="请输入手机" :maxlength='20' style='width:120px'></Input>
                    </FormItem>
                    <FormItem label="状态" prop="isBinded">
                        <Select v-model="formSearch.isBinded" style="width:120px" :clearable='true'>
                            <Option :value="1">已绑定</Option>
                            <Option :value="0">未绑定</Option>
                            <!-- <Option :value="3">已邀请</Option> -->
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="ghost" class='refresh' @click='refresh'>重置</Button>
                        <Button type="primary" class='search' @click='getList(1, formSearch)'>检索</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :columns="col" :data="data" :loading='tableLoad'></Table>
            <Button type="ghost" class='remove' @click='addMore'>全部邀请</Button>
            <Page :total="total" :current='pageNumber' @on-change='changePage' show-total show-sizer :page-size-opts='pageSizeList' @on-page-size-change='changePageSize'></Page>
        </div>
        <Modal
            title="系统提示"
            v-model="modal"
            @on-ok="ok"
            :loading='loading'
            class-name="vertical-center-modal">
            <p v-if='sendKey'>您确定要邀请{{bindUser.name}}绑定医院吗？</p>
            <p v-if='sendKey'>一天只能邀请一次！</p>
            <p v-if='!sendKey'>是否全部邀请！</p>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            modal: false,
            loading: true,
            sendKey: true,
            searchKey: true,
            total: 0,
            pageNumber: 1,
            pageSize: 10,
            tableLoad: false,
            bindUser: {
                companyUserId: '',
                name: '',
            },
            formSearch: {
                name: '',
                mobile: '',
                isBinded: '',
                show: ''
            },
            pageSizeList: [10, 20, 50, 100, 200],
            col: [
                {
                    title: '顾客',
                    key: 'name'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '同步时间',
                    key: 'createDate'
                },
                // {
                //     title: '性别',
                //     render: (h, params) => {
                //         const _text = params.row.gender === 0 ? '男' : '女'
                //         return h('ps')
                //     }
                // },
                {
                    title: '绑定状态',
                    width: 110,
                    render: (h, params) => {
                        if(params.row.bindStatus === 2) {
                            return h('div', {
                                class: 'invited-word-btn'
                            }, '已邀请')
                        } else if ( params.row.bindStatus === 0 || params.row.bindStatus === 1 ) {
                            return h('div', {
                                class: 'invite-word-btn',
                                on: {
                                    click: () => {
                                        this.bind(params.row)
                                    }
                                }
                            }, '邀请绑定')
                        } else if (params.row.bindStatus === 5) {
                            return h('span', {
                                style: {
                                    fontSize: '14px',
                                    color: '#9e9e9e'
                                }
                            }, '已绑定')
                        }
                    }
                },
            ],
            data: []
        }
    },
    created () {
        this.getList(1, this.formSearch)
    },
    methods: {
        getList (pageNumber, form) {
            let _vm = this
            console.log(111)
            form.pageSize = _vm.pageSize
            form.pageNumber = pageNumber
            _vm.tableLoad = true
            _vm.$http.get({
                url: 'doct-webManager/guard_user/get_page.jhtml',
                data: form,
                success: function(res){
                    if(res.code === 0 ){
                        _vm.data = res.content.page.content || []
                        _vm.pageNumber = res.content.page.pageNumber || 1
                        _vm.total = res.content.page.total || 0
                    } else {
                        console.log(res.data.desc)
                    }
                    _vm.tableLoad = false
                },
            })
        },
        refresh () {
            this.$refs.formSearch.resetFields()
            this.getList(1, this.formSearch)
        },
        changePage (num) {
            this.getList(num, this.formSearch)
        },
        changePageSize (val) {
            console.log(val)
            this.pageSize = val
            this.getList(1, this.formSearch)
        },
        addMore () {
            this.sendKey = false
            this.modal = true
        },
        bind (data) {
            this.bindUser.name = data.name
            this.bindUser.companyUserId = data.companyCreateUserId
            this.sendKey = true
            this.modal = true
        },
        ok () {
            let _vm = this,
                _url = _vm.sendKey ? 'doct-webManager/guard_user/sendInvitedSmsByCompanyUserIdOnce.jhtml' : 'doct-webManager/guard_user/sendInvitedSmsAll.jhtml'
            _vm.$http.post({
                url: _url,
                data: _vm.bindUser,
                success: function(res) {
                    if(res.content.code === 0 ) {
                        _vm.$Notice.success({
                            title: '系统提示！',
                            desc: '邀请成功！'
                        })
                        _vm.getList(_vm.pageNumber, _vm.formSearch)
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                    _vm.modal = false
                },
            })
        },
        changeSearch (bool) {
            this.searchKey = bool
        },
    }
}
</script>

<style scoped>
    .add-product {
        margin-bottom: 21px;
        text-align: right;
    }
    .refresh, 
    .search {
        margin: 0px 8px 0 0;
    }
    .refresh {
        margin-left: -40px;
    }
    .remove {
        margin-top: 16px;
    }
</style>
