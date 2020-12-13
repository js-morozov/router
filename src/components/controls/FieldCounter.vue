<template>
  <div class="input-group input-group-sm">
    <slot name="button-decrease"></slot>
    <input type="number" class="form-control fix-rounded-right" />
    <slot name="button-increase"></slot>
  </div>
</template>
<script>
export default {};
</script>
