<template>
    <div>
        <vHead></vHead>
        <!-- content -->
            <router-view></router-view>
        <!-- content -->
        <vFooter></vFooter>
    </div>
</template>

<script>
import vHead from './BlogHeader.vue';
import vFooter from './BlogFooter.vue';
export default {
     components:{
            vHead,vFooter
     }
}
</script>

<style scoped>

</style>
