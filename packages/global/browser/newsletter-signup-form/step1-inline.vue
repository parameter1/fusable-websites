<template>
  <div :class="blockName">
    <div :class="`${blockName}__left-col`">
      Image
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
  },


  data: () => ({
    email: null,
    blockName: 'inline-newsletter-form',
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
