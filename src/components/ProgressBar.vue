<template>
    <div>
        <b-progress :value="meter.value" :max="meter.max" :variant="meter.variant" show-progress animated>
        </b-progress>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        meter: Object
    }
}
</script>