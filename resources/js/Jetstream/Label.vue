<template>
	<label v-if="value">{{ value }}</label>
    <label v-else><slot></slot></label>
</template>

<script>
    export default {
        props: ['value']
    }
</script>
