<template>
  <button type="button" class="btn" :class="['btn', 'btn-' + color]">
    <slot name="iconBefore"></slot>
    <span class="mx-2">{{ title }}</span>
    <slot name="iconAfter"></slot>
  </button>
</template>

<script>
export default {};
</script>