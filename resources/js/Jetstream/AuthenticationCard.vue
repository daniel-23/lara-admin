<template>
    <div class="login-box">
        <div class="login-logo">
            <slot name="logo" />
        </div>
        <slot />
    </div>
</template>
<script>
    export default {
        mounted(){
        	$('body').attr('class', 'hold-transition login-page');
            $('body').attr('style', 'min-height: 370.391px;');
        }
    }
</script>
