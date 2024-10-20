<template>
    <router-link :to="{ name: urlName}" class="btn btn-primary" >
    <i class="ti ti-plus"></i> {{btnName}}
    </router-link>
</template>

<script>
export default {
 props: ['urlName','btnName']
}
</script>