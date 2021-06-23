<template>
  <div class="row">
    <div :class="element('image-wrapper', ['d-none', 'd-md-flex', 'col-md-5', 'col-lg-4'])">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :srcset="imageSrcset"
        :alt="name"
        :class="element('image')"
      >
    </div>
    <div :class="element('form-wrapper', ['col-12', 'col-md-6', 'col-lg-5'])">
      <div :class="element('name')">
        {{ name }}
      </div>
      <div :class="element('description')" v-html="description" />

      <form :class="element('form')" @submit.prevent="submit">
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
        <privacy-policy :block-name="blockName" />
        <sign-up-button :is-loading="isLoading" />
      </form>

      <div v-if="error" class="alert alert-danger mt-3 mb-0" role="alert">
        <strong>An error ocurred.</strong>
        {{ error.message }}
      </div>
    </div>
    <div :class="element('close-container', ['d-none', 'd-md-flex', 'col-md-1', 'col-lg-3'])">
      <close-button
        :class-name="element('close').join(' ')"
        target-button=".site-navbar__newsletter-toggler"
        :icon-modifiers="['lg']"
      />
    </div>
  </div>
</template>

<script>
import CloseButton from '../newsletter-close-button.vue';
import PrivacyPolicy from '../newsletter-signup-form/privacy-policy.vue';
import SignUpButton from '../newsletter-signup-form/sign-up-button.vue';

export default {
  components: {
    CloseButton,
    PrivacyPolicy,
    SignUpButton,
  },
  props: {
    blockName: {
      type: String,
      required: true,
    },
    name: {
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
    imageSrcset: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    email: null,
    error: null,
    isLoading: false,
  }),

  methods: {
    element(elementName, classNames = []) {
      return [`${this.blockName}__${elementName}`, ...classNames];
    },

    submit() {
      const { email } = this;
      this.$emit('submit', { email });
    },
  },
};
</script>
