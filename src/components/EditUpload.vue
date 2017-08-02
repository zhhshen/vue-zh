<template lang="html">
<div>
    <div class="upload-image-wrap" ref="uploadImage">
        <ul class="upload-image-items" v-if="currImages.length">
            <li class="upload-image-item" v-for="(item, inx) in currImages">
                <div class="image-inner" :style="item.style"></div>
                <span class="image-after" @click="deleteImage(inx)">&times;</span>
            </li>
        </ul>
        <div class="upload-icon">
            <upload-img @upload-img="onUpload" @uploaded="onUploaded" @error="onUploadError"></upload-img>
        </div>
    </div>
</div>
</template>

<script>
import UploadImg from '@/components/UploadImgBox'
export default {
    data () {
        return {
            content: [],
            currImages: []
        }
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        radio: {
            type: Number,
            default: 1
        }
    },
    computed: {
        imgRadio () {
            return this.radio
        },

        result () {
            let images = [...this.value]
            this.content = []
            this.currImages = []
            let arr = []
            if (images.length) {
                for (var i = 0; i < images.length; i++) {
                    let image = images[i]
                    arr.push(this.getBgSize(image))
                }
            }
            Promise.all(arr).then(res => {
                console.log(res)
            })
            return null
        }
    },
    watch: {
        content (newVal) {
            this.$emit('input', newVal)
        }
    },
    methods: {
        // 获取图片宽高
        getBgSize (src) {
            return new Promise((resolve, reject) => {
                const img = new window.Image()
                img.onload = function () {
                    resolve(img)
                }
                img.onerror = reject
                img.src = src
                if (img.complete) img.onload()
            })
        },
        getBgStyle (image) {
            this.getBgSize(image).then(res => {
                let url = res.src
                let perImage = { url: url }
                let naturalWH = res.naturalWidth / res.naturalHeight
                let radio = this.imgRadio
                if (naturalWH > radio) {
                    perImage.style = {
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover'
                    }
                } else {
                    perImage.style = {
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'contain'
                    }
                }
                this.content.push(url)
                this.currImages.push(perImage)
            })
        },
        // 上传中...
        onUpload (res) {
            if (!res.data.file_url) return
            this.content.push(res.data.file_url)
        },
        // 上传完成
        onUploaded (res) {
        },

        onUploadError (error) {
            console.log(error)
        },

        deleteImage (inx) {
            this.content.splice(inx, 1)
        }
    },
    components: {
        UploadImg
    }
}
</script>

<style lang="less">
.upload-image-wrap {
    .upload-image-items {
        float: left;
        li {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
            border-radius: 3px;
            margin-bottom: 10px;
            margin-right: 10px;
            .image-inner {
                width: 100%;
                height: 100%;
                background-size: cover;
            }
            .image-after {
                position: absolute;
                display: inline-block;
                top: -5px;
                right: -5px;
                width: 18px;
                height: 18px;
                color: #fff;
                font-size: 14px;
                text-align: center;
                line-height: 16px;
                border-radius: 0px;
                vertical-align: middle;
                background-color: rgba(0, 0, 0, 1);
                cursor: pointer;
            }
        }
    }
    .upload-icon {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .webuploader-container {
        display: inline-block;
        .webuploader-pick {
            width: 80px;
            height: 80px ;
            padding: 0;
            border-radius: 0;
            font-size: 12px;
            background: url(../../../assets/image/upload-btn.png) no-repeat;
            background-size: cover;
            border: 0;
        }
    }
}
</style>
