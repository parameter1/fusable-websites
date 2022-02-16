<template>
  <div :class="`${blockName}__privacy-policy`">
    By providing your email, you agree to our
    <a :href="privacyPolicyLink.href" :target="privacyPolicyLink.target" rel="noopener">
      {{ privacyPolicyLink.label }}</a>.
    This site is protected by reCAPTCHA and the Google
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.
  </div>
</template>

<script>
export default {
  props: {
    blockName: {
      type: String,
      required: true,
    },
    privacyPolicyLink: {
      type: Object,
      required: true,
    },
  },
};
</script>
