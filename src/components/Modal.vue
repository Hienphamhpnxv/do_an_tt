<template>
  <transition name="fade-in">
    <div
      v-if="value"
      :class="['modal backdrop vw-100', modalClass]"
      ref="modal"
    >
      <div :class="[bodyClass]">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    modalClass: {
      type: [Array, Object, String],
      default() {
        return "flex-center";
      },
    },
    bodyClass: {
      type: [Array, Object, String],
      default() {
        return "";
      },
    },
  },
  watch: {
    value(val) {
      if (val) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    },
  },
};
</script>
