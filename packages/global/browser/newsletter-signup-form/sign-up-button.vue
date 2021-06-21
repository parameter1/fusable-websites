<template>
  <button class="btn btn-primary" type="submit">
    {{ label }}
  </button>
</template>


<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Sign Up',
    },
  },
};
</script>
