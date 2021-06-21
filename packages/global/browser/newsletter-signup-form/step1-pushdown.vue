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
        placeholder="example@gmail.com"
        type="email"
        name="em"
        required
      >
      <privacy-policy :block-name="blockName" />
      <sign-up-button />
    </form>
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
    blockName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    email: null,
  }),

  methods: {
    submit() {
      const { email } = this;
      console.log({ email });
      this.$emit('submit', { email });
    },
  },
};
</script>
