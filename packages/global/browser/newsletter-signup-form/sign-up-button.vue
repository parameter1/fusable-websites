<template>
  <button
    class="text-nowrap"
    type="submit"
    :disabled="isLoading || disabled"
  >
    <div class="d-flex align-items-center">
      <div
        v-show="isLoading"
        class="spinner-border spinner-border-sm text-light mr-1"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <span>{{ label }}</span>
    </div>
  </button>
</template>


<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Sign Up',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
