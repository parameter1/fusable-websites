<template>
  <div :class="`${blockName}__privacy-policy`">
    By providing your email, you agree to our
    <a href="/termsandprivacy" target="_blank" rel="noopener">
      Terms &amp; Conditions and Privacy Policy</a>.
  </div>
</template>

<script>
export default {
  props: {
    blockName: {
      type: String,
      required: true,
    },
  },
};
</script>
