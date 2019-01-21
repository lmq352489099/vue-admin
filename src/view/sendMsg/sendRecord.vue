<template>
    <div class="view-container">
        <div class="container-main send-record">
            <div class="record-main">
                <transition name="fade">
                    <div class="record-action" v-show='detailKey'>
                        <div class="tit">
                            <h3>消息详情</h3>
                            <Button type="ghost">删除</Button>
                        </div>
                        <div class="record-box">
                            <div class="record-box-item" v-show='userList.length'>
                                <h4>顾客：</h4>
                                <p>{{userName}}</p>
                            </div>
                            <div class="record-box-item" v-show='docList.length'>
                                <h4>医生：</h4>
                                <p>{{docName}}</p>
                            </div>
                            <div class="record-box-item">
                                <h4>{{hospName}}  {{time}}</h4>
                                <p class="content">{{content}}</p>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="record-banner">
                <div class="tit">
                    <span>推送记录（最近30天）</span>
                    <em>10条</em>
                </div>
                <ul class="record-list">
                    <li v-for='(item, index) in recordList' :key='index' @click='getRecordDetail(item.id)'>
                        <p>{{item.actionTime}}</p>
                        <p class="mes">{{item.content}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            hospName: sessionStorage.getItem('companyName'),
            recordList: [],
            detailKey: false,
            userList: [],
            docList: [],
            time: '',
            content: '',
        }
    },
    computed: {
        userName () {
            return this.userList.join('、')
        },
        docName () {
            return this.docList.join('、')
        },
    },
    created () {
        this.getRecordList()
    },
    mounted () {

    },
    methods: {
        getRecordList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/sendMessage/getSendHistory.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.recordList = res.content || []
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
        getRecordDetail (id) {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/sendMessage/getSendDetail.jhtml',
                data: {recordId: id},
                success: function(res){
                    if(res.code === 0 ){
                        _vm.content = res.content.content || ''
                        _vm.time = res.content.createDate || ''
                        _vm.userList = res.content.userNames || []
                        _vm.docList = res.content.staffNames || []
                        _vm.detailKey = true
                    } else {
                        console.log(res.data.desc)
                    }
                },
            })
        },
    }
}
</script>

<style scoped>
    .send-record {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    .record-main {
        position: relative;
        float: left;
        width: 100%;
        height: 100%;
        padding: 60px 0 0 300px;
    }
    .record-action {
        width: 100%;
        height: 100%;
    }
    .record-banner {
        position: relative;
        float: left;
        width: 300px;
        height: 100%;
        padding-top: 60px;
        margin-left: -100%;
        border-right: 1px solid #e5e5e5;
    }
    .record-banner .tit {
        position: absolute;
        left: 0;
        top: 0;
        height: 60px;
        width: 100%;
        padding: 16px 10px;
        border-bottom: 1px solid #e5e5e5;
    }
    .record-banner .tit em, 
    .record-banner .tit span {
        font-size: 16px;
        line-height: 27px;
        color: #757575;
    }
    .record-banner .tit em {
        float: right;
        font-style: normal;
    }
    .record-banner .tit span {
        float: left;    
    }
    .record-list {
        height: 100%;
        background-color: #fcfcfe;
        overflow-y: auto;
    }
    .record-list li {
        height: 88px;
        padding: 20px;
        cursor: pointer;
    }
    .record-list li:hover {
        background-color: #F2F3F5;
    }
    .record-list p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 24px;
        color: #757575;
    }
    .record-list .mes {
        color: #333;
    }
    .record-main .tit {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding: 0 20px 0 320px;
        box-shadow: inset 0 -1px 0 0 #E5E5E5;
    }
    .record-main .tit h3 {
        float: left;
        font-size: 16px;
        font-weight: normal;
        line-height: 60px;
        color: #111;
    }
    .record-main .tit button {
        float: right;
        margin-top: 16px;
    }
    .record-box {
        width: 100%;
        height: 100%;
        padding: 20px;
        overflow-y: auto;
    }
    .record-box-item {
        margin-bottom: 30px;
    }
    .record-box-item h4 {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: normal;
        line-height: 20px;
        color: #757575;
    }
    .record-box-item p {
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .record-box-item .content {
        padding: 14px 17px;
        background: #F6F7F9;
        border-radius: 4px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

