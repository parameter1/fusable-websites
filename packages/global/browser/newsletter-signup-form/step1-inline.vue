<template>
  <div :class="blockName">
    <div
      v-if="imageSrc"
      :class="`${blockName}__left-col`"
    >
      <img :src="imageSrc" :srcset="imageSrcSet" :alt="title">
    </div>
    <div :class="`${blockName}__right-col`">
      <div :class="`${blockName}__title`">
        {{ title }}
      </div>
      <div :class="`${blockName}__description`">
        {{ description }}
      </div>

      <form :class="`${blockName}__form`" @submit.prevent="submit">
        <div :class="`${blockName}__email-group`">
          <label for="inline-newsletter-email" class="sr-only">Email</label>
          <input
            id="inline-newsletter-email"
            v-model="email"
            :class="`${blockName}__email-input`"
            class="form-control"
            placeholder="Enter your email"
            type="email"
            required
          >
        </div>
        <sign-up-button :class="`${blockName}__form-button`" />
      </form>
    </div>
  </div>
</template>


<script>
import SignUpButton from './sign-up-button.vue';

export default {
  components: {
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
  },


  data: () => ({
    email: null,
    blockName: 'inline-newsletter-form-step1',
  }),

  computed: {
    imageSrcSet() {
      const { imageSrc } = this;
      if (!imageSrc) return null;
      return `${imageSrc}&dpr=2 2x`;
    },
  },

  methods: {
    submit() {
      const { email } = this;
      console.log({ email });
      this.$emit('submit', { email });
    },
  },
};
</script>
