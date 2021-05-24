<template>
	<span v-show="message" class="error invalid-feedback">{{ message }}</span>
</template>

<script>
    export default {
        props: ['message']
    }
</script>
