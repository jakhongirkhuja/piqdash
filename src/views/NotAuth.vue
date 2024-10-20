<template>
    <div>
        <h4>Your are not logged In, redirecting to login page.... </h4>
    </div>
</template>
<script>
    export default{
        created() {
            setTimeout(() => {
                window.location.href = 'https://go.pharmiq.uz/';
            }, 4000);
           
        },
    }

</script>