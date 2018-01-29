<template lang="html">
<div class="demo-swiper">
    <swiper>
        <swiper-item v-for="(m, index) in images" :key="index">
            <img :src="m">
        </swiper-item>
    </swiper>
</div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/Swiper'
export default {
    components: {
        Swiper,
        SwiperItem
    },

    data () {
        return {
            images: [
                'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
                'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
                'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
            ]
        }
    }
}
</script>

<style lang="css">
</style>
