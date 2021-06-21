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
            :disabled="isLoading"
            class="form-control"
            placeholder="Enter your email"
            type="email"
            required
          >
        </div>
        <sign-up-button
          :class="`${blockName}__form-button`"
          :is-loading="isLoading"
        />
      </form>

      <div v-if="error" class="alert alert-danger mt-3 mb-0" role="alert">
        <strong>An error ocurred.</strong>
        {{ error.message }}
      </div>
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
    blockName: 'inline-newsletter-form-step1',
    email: null,
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
      this.$emit('submit', { email });
    },
  },
};
</script>
