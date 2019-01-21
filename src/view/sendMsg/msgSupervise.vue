<template>
    <div class="view-container">
        <div class="container-main supervise">
            <div class="supervise-main">
                <div class="talk-content" v-show='rightKey'>
                    <div class="talk-tit">
                        <h3>{{talkForm.talkTit}}记录</h3>
                        <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" class='time' :value='timeBox' :clearable='false' @on-change='setTime'></DatePicker>
                    </div>
                    <ul class="talk-list">
                        <li :class="[item.from.charAt(0) === 'u' ? 'talk-user' : 'talk-doc']" v-for='(item, index) in talkRecord' :key='index'>
                            <img :src="baseImgURL + item.headSrc" alt="" class="head" />
                            <p class="tit">{{item.name}} {{item.time}}</p>
                            <p class="con" v-if='item.type === 0'>{{item.body.msg}}</p>
                            <div class="pic" v-if='item.type === 1'>
                                <img :src="item.body.url" alt="" />
                            </div>
                            <div class="music" v-if='item.type === 2'>
                                <audio controls>
                                    <source :src='item.body.url'>
                                </audio>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="supervise-banner">
                <div class="banner-tit">
                    <Select v-model="superviseType" @on-change='changeType'>
                        <Option :value="1">医生</Option>
                        <Option :value="2">医生团队</Option>
                        <Option :value="3">顾客</Option>
                    </Select>
                </div>
                <div class="banner-box">
                    <transition name="slide-fade">
                        <div class="banner-left" v-show='leftKey'>
                            <div class="tit">
                                <span @click='close'>
                                    <Icon type="ios-arrow-left"></Icon>
                                    返回
                                </span>
                                <em>对话列表({{talkList.length}})</em>
                            </div>
                            <ul class="banner-left-scroll">
                                <li v-for='(item, index) in talkList' :key='index' @click='chooseTalk(item)'>
                                    <img :src="baseImgURL + item.imagePath" alt="" />
                                    <p>{{item.tname}}</p>
                                </li>
                            </ul>
                        </div>
                    </transition>
                    <div class="banner-search">
                        <Input v-model.trim="value" placeholder="快捷搜索"></Input>
                    </div>
                    <ul class="banner-scroll" v-show='superviseType === 1'>
                        <li v-for='(item, index) in docList' :key='index' @click='getTalkList(item.id)'>
                            <img :src="baseImgURL + item.image_path" alt="" />
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                    <div class="banner-card-scroll"  v-show='superviseType === 2'>
                        <div class="card-item" v-for='(item, index) in teamList' :key='index'>
                            <p class="tit" @click='getTeamUser(item.id, index)'>
                                {{item.name}}
                                <Icon type="ios-arrow-down"></Icon>
                            </p>
                            <ul v-show='teamUserKey === index'>
                                <li v-for='(item1, index1) in teamUserList' :key='index1' @click='getTalkList(item1.user)'>
                                    <img :src="baseImgURL + item1.imagePath" alt="" />
                                    <p>{{item1.name}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            leftKey: false,
            rightKey: false,
            superviseType: 1,
            teamUserKey: -1,
            value: '',
            timeBox: [moment().subtract(15, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            talkForm: {
                talkTit: '',
                teamId: '',
                beginTime: moment().subtract(15, 'd').format('x'),
                endTime: moment().format('x')
            },
            docList: [],
            teamList: [],
            teamUserList: [],
            talkList: [],
            talkRecord: [],
        }
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    mounted () {
        this.getDocList()
        this.getTeamList()
        console.log('abbaaaa'.charAt(0))
    },
    methods: {
        changeType (val) {
            this.leftKey = false
            this.rightKey = false
        },
        getDocList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staff/get_staffs.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.docList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                }
            })
        },
        getTeamList () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/staffGroup/get_groups.jhtml',
                success: function(res){
                    if(res.code === 0 ){
                        _vm.teamList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                }
            })
        },
        getTeamUser (id, index) {
            let _vm = this
            if(_vm.teamUserKey === index) {
                _vm.teamUserKey = -1
            } else {
                _vm.$http.get({
                    url: 'doct-webManager/staffGroup/get_groupMembers.jhtml',
                    data: {groupId: id},
                    success: function(res){
                        if(res.code === 0 ){
                            _vm.teamUserList = res.content || []
                            _vm.teamUserKey = index
                        } else {
                            console.log(res.desc)
                        }
                    }
                })
            }
        },
        getTalkList (id) {
            let _vm = this
            this.leftKey = true
            _vm.$http.get({
                url: 'doct-webManager/team/get_joinedTeams.jhtml',
                data: {staffId: id},
                success: function(res){
                    if(res.code === 0 ){
                        _vm.talkList = res.content || []
                    } else {
                        console.log(res.desc)
                    }
                }
            })
        },
        close () {
            this.leftKey = false
            this.rightKey = false
        },
        setTime (date) {
            this.talkForm.beginTime = moment(date[0]).format('x')
            this.talkForm.endTime = moment(date[1]).format('x')
            this.getTalkRecord()
        },
        chooseTalk (data) {
            this.talkForm.talkTit = data.tname
            this.talkForm.teamId = data.tid
            this.getTalkRecord()
            this.rightKey = true
        },
        getTalkRecord () {
            let _vm = this
            _vm.$http.get({
                url: 'doct-webManager/team/get_historymsgs.jhtml',
                data: _vm.talkForm,
                success: function(res){
                    if(res.code === 0 ){
                        const _data = JSON.parse(res.content) || []
                        _vm.talkRecord = _data.reverse().filter(item => {
                            if(item.type === 0 || item.type === 1 || item.type === 2) {
                                item.name = _vm.getTalkRecordName(item.from)
                                item.time = moment(item.sendtime).format('YYYY-MM-DD')
                                item.headSrc = _vm.getTalkHeadSrc(item.from)
                                return item
                            }
                        })
                        console.log(JSON.parse(res.content).reverse())
                    } else {
                        console.log(res.desc)
                    }
                }
            })
        },
        getTalkRecordName (id) {
            const _type = id.charAt(0)
            const _id = id.split('_')[1] * 1
            if(_type === 'u') {
                return this.talkList.filter(item => item.ownner_id === _id)[0].name
            } else if(_type === 's') {
                return this.docList.filter(item => item.id === _id)[0].name
            }
        },
        getTalkHeadSrc (id) {
            const _type = id.charAt(0)
            const _id = id.split('_')[1] * 1
            if(_type === 'u') {
                return this.talkList.filter(item => item.ownner_id === _id)[0].imagePath
            } else if(_type === 's') {
                return this.docList.filter(item => item.id === _id)[0].image_path
            }
        }
    }
}
</script>

<style scoped>
    .supervise {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    .supervise-main {
        position: relative;
        float: left;
        width: 100%;
        height: 100%;
        padding: 60px 0 0 300px;
    }
    .supervise-banner {
        position: relative;
        overflow: hidden;
        float: left;
        width: 300px;
        height: 100%;
        padding-top: 60px;
        margin-left: -100%;
        box-shadow: inset -1px 0 0 0 #E5E5E5;
    }
    .banner-tit {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding: 16px 10px 0;
        box-shadow: inset 0 -1px 0 0 #E5E5E5;
    }
    .banner-box {
        position: relative;
        height: 100%;
        padding-top: 50px;
    }
    .banner-search {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        padding: 11px 10px 0;
        box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.04);
    }
    .banner-left-scroll, 
    .banner-card-scroll, 
    .banner-scroll {
        height: 100%;
        background-color: #fcfcfe;
        overflow-y: auto;
        box-shadow: inset -1px 0 0 0 #E5E5E5;
    }
    .banner-left-scroll li, 
    .card-item li, 
    .banner-scroll li {
        overflow: hidden;
        padding: 10px 20px;
        cursor: pointer;
    }
    .banner-left-scroll li:hover, 
    .card-item li:hover, 
    .card-item .tit:hover, 
    .banner-scroll li:hover {
        background: #F2F3F5;
    }
    .banner-left-scroll li img, 
    .card-item li img, 
    .banner-scroll img {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 16px;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
    }
    .banner-left-scroll li p, 
    .card-item li p, 
    .banner-scroll p {
        float: left;
        width: 200px;
        padding: 5px 0;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        word-break: break-all;
    }
    .card-item .tit {
        position: relative;
        padding: 15px 40px 15px 20px;
        font-size: 14px;
        line-height: 20px;
        color: #757575;
        background: #FFFFFF;
        word-break: break-all;
        box-shadow: 0 1px 0 0 #E5E5E5, inset -1px 0 0 0 #E5E5E5, inset 0 1px 0 0 #E5E5E5;
        cursor: pointer;
    }
    .card-item .tit i {
        position: absolute;
        right: 20px;
        top: 18px;
        font-size: 16px;
    }
    .banner-left {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        padding-top: 51px;
        background-color: #fff;
        box-shadow: inset -1px 0px 0 0 #E5E5E5;
        z-index: 10;
    }
    .banner-left .tit {
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
        height: 51px;
        width: 100%;
        padding: 15px 20px;
        border-bottom: 1px solid #e5e5e5;
        box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.04);
    }
    .banner-left .tit span {
        float: left;
        font-size: 14px;
        line-height: 20px;
        height: 20px;
        color: #55A8FD;
        cursor: pointer;
    }
    .banner-left .tit span i {
        position: relative;
        top: 1px;
        font-size: 18px;
        margin-right: 5px;
    }
    .banner-left .tit em {
        float: right;
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
        color: #757575;
    }
    .slide-fade-enter-active {
        transition: all .4s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-150px);
        opacity: 0;
    }
    .talk-content {
        width: 100%;
        height: 100%;
    }
    .talk-tit {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding: 16px 20px 16px 320px;
        box-shadow: inset 0px -1px 0 0 #E5E5E5;
    }
    .time {
        float: right;
        width: 231px;
    }
    .talk-tit h3 {
        float: left;
        font-size: 16px;
        font-weight: normal;
        line-height: 28px;
        color: #111;
    }
    .talk-list {
        width: 100%;
        height: 100%;
        padding: 30px 20px 0;
        overflow-y: auto;
    }
    .talk-user {
        position: relative;
        padding: 0 120px 0 40px;
        margin-bottom: 30px;
    }
    .talk-doc {
        position: relative;
        padding: 0 40px 0 120px;
        margin-bottom: 30px;
    }
    .talk-list .head {
        position: absolute;
        top: 0;
        display: block;
        width: 30px;
        height: 30px;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
    }
    .talk-user .head {
        left: 0;
    }
    .talk-doc .head {
        right: 0;
    }
    .talk-list .tit {
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 20px;
        color: #757575;
    }
    .talk-doc .music, 
    .talk-doc .tit {
        text-align: right;
    }
    .talk-list .con {
        padding: 14px 17px;
        font-size: 14px;
        line-height: 20px;
        color: #333;
        background: #F6F7F9;
        border-radius: 4px;
        word-break: break-all;
    }
    .talk-list .pic img {
        display: inline-block;
        max-width: 300px;
        max-height: 300px;
        border-radius: 4px;
    }
    .talk-doc .pic {
        text-align: right;
    }
</style>

<style type="text/css">
    .banner-search .ivu-input {
        text-align: center;
        border: none;
        outline: none;
        background: #F6F7F9;
        border-radius: 4px;
        box-shadow: none;
    }
</style>

