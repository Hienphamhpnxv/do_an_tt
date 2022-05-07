<template>
  <div v-if="isShow" class="spin">
    <div
      class="spinner-border text-success spin-icon"
      style="width: 4rem; height: 4rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
    <div
      class="spinner-grow text-success spin-icon"
      style="width: 4rem; height: 4rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.spin {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(3, 3, 3, 0.1);
  z-index: 99999;
}

.spin-icon {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
