<template>
    <div id='photo-upload'>
        <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">图一(封面)</p>
            <div class="photo-list" v-show='urlList[0].length > 0'>
                <img :src='urlList[0]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(0)"></Icon>
                </div>
            </div>
        </div>
        <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload1"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">图二</p>
            <div class="photo-list" v-show='urlList[1].length > 0'>
                <img :src='urlList[1]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(1)"></Icon>
                </div>
            </div>
        </div>
        <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload2"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">图三</p>
            <div class="photo-list" v-show='urlList[2].length > 0'>
                <img :src='urlList[2]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(2)"></Icon>
                </div>
            </div>
        </div>
        <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload3"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">图四</p>
            <div class="photo-list" v-show='urlList[3].length > 0'>
                <img :src='urlList[3]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(3)"></Icon>
                </div>
            </div>
        </div>
        <div class="upload-photo-item">
            <Upload
                ref="upload"
                :before-upload="handleBeforeUpload4"
                type="drag"
                action="//"
                style="display: inline-block;width:96px;">
                <div class="photo-content">
                    <div class="photo-icon"></div>
                    <p>上传照片</p>
                </div>
            </Upload>
            <p class="photo-msg">图五</p>
            <div class="photo-list" v-show='urlList[4].length > 0'>
                <img :src='urlList[4]'>
                <div class="upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(4)"></Icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'photoUpload',
    props: {
        defaultValue: Array,
    },
    data () {
        return {
            urlList: ['','','','',''],
            dataList: ['','','','','']
        }
    },
    watch: {
        defaultValue (val) {
            if(val[0].length > 0) {
                this.dataList = val
                val.map((item, index) => {
                    if(item.length > 0) {
                        this.urlList.splice(index, 1, this.baseImgURL + item)
                    }
                })
                this.$emit('setPhotoList', this.dataList)
            }
            console.log(val)
        },
    },
    computed: {
        baseImgURL () {
            return this.$store.getters.getBaseImgURL
        },
    },
    methods: {
        getObjectURL (file) {
            let url = null
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file)
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        },
        saveFile (data, index) {
            let _vm = this,
                param = new FormData()
            param.append('file', data)
            param.append('chunks', '0')
            param.append('token', _vm.$token.readToken('adminToken'))
            param.append('fileType', 'image')
            _vm.$http.upload({
                url: 'doct-webManager/mutual/upload.jhtml',
                data: param,
                success: function(res){
                    if(res.code === 0) {
                        _vm.urlList.splice(index, 1, _vm.baseImgURL + res.content)
                        _vm.dataList.splice(index, 1, res.content)
                        _vm.$emit('setPhotoList', _vm.dataList)
                    } else {
                        _vm.$Notice.error({
                            title: '系统提示！',
                            desc: res.desc
                        })
                    }
                },
            })  
        },
        ruleUpload (data, index) {
            let translateBase = 1048576
            if(/\.(jpg|png)$/.test((data.name).toLowerCase())) {
                if(data.size <= translateBase) {
                    this.saveFile(data, index)
                } else {
                    this.$Notice.error({
                        title: '系统提示！',
                        desc: '图片大小不能超过1M！'
                    })
                }
            } else {
                this.$Notice.error({
                    title: '系统提示！',
                    desc: '请选择jpg、png图片！'
                })
            }
        },
        handleBeforeUpload (data) {
            this.ruleUpload(data, 0)
            return false
        },
        handleBeforeUpload1 (data) {
            this.ruleUpload(data, 1)
            return false
        },
        handleBeforeUpload2 (data) {
            this.ruleUpload(data, 2)
            return false
        },
        handleBeforeUpload3 (data) {
            this.ruleUpload(data, 3)
            return false
        },
        handleBeforeUpload4 (data) {
            this.ruleUpload(data, 4)
            return false
        },
        handleRemove (index) {
            this.urlList.splice(index, 1, '')
            this.dataList.splice(index, 1, '')
            this.$emit('setPhotoList', this.dataList)
        },
    }
}
</script>

