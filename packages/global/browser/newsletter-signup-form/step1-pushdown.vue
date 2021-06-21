<template>
  <div>
    <div :class="`${blockName}__name`">
      {{ title }}
    </div>
    <div :class="`${blockName}__description`" v-html="description" />

    <form :class="`${blockName}__form`" @submit.prevent="submit">
      <label for="newsletter-menu-email" class="sr-only">Email</label>
      <input
        id="newsletter-menu-email"
        v-model="email"
        class="form-control"
        :disabled="isLoading"
        placeholder="example@gmail.com"
        type="email"
        name="em"
        required
      >
      <privacy-policy :block-name="blockName" :disabled="isLoading" :label="buttonLabel" />
      <sign-up-button />
    </form>

    <div v-if="error" class="alert alert-danger mt-3" role="alert">
      <strong>An error ocurred.</strong>
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import PrivacyPolicy from './privacy-policy.vue';
import SignUpButton from './sign-up-button.vue';

export default {
  components: {
    PrivacyPolicy,
    SignUpButton,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Error,
      default: null,
    },
  },

  data: () => ({
    blockName: 'site-newsletter-menu',
    email: null,
  }),

  computed: {
    buttonLabel() {
      if (this.isLoading) return 'Signing Up...';
      return 'Sign Up';
    },
    imageSrcSet() {
      const { imageSrc } = this;
      if (!imageSrc) return null;
      return `${imageSrc}&dpr=2 2x`;
    },
  },

  methods: {
    submit() {
      const { email } = this;
      this.$emit('submit', { email });
    },
  },
};
</script>
