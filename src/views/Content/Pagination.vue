<template lang="html">
<div class="page-center">
    <ms-pagination :length="10" v-model="page"></ms-pagination>
</div>
</template>

<script>
import MsPagination from '@/components/Pagination'
export default {
    data () {
        return {
            page: 1
        }
    },
    components: {
        MsPagination
    }
}
</script>

<style lang="css">
</style>
