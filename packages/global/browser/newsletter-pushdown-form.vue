<template>
  <div>
    <step-one
      v-if="step === 1"
      :title="title"
      :description="description"
      :image-src="imageSrc"
      :is-loading="isLoading"
      @submit="stepOneSubmit"
    />
    <step-two
      v-if="step === 2"
      :default-newsletter-name="defaultNewsletter.name"
      :newsletters="newsletters"
    />
  </div>
</template>

<script>
import StepOne from './newsletter-signup-form/step1-pushdown.vue';
import StepTwo from './newsletter-signup-form/step2.vue';

export default {
  components: {
    StepOne,
    StepTwo,
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
    defaultNewsletter: {
      type: Object,
      required: true,
      validate: o => (o && o.name && o.deploymentTypeId),
    },
    imageSrc: {
      type: String,
      default: null,
    },
    newsletters: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    isLoading: false,
    step: 1,
  }),

  methods: {
    stepOneSubmit({ email }) {
      console.log(this.defaultNewsletter);
      console.log({ stepOneSubmit: email });
      this.isLoading = true;
      // this.step = 2;
    },
  },
};
</script>
