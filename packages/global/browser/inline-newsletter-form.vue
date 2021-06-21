<template>
  <div class="inline-newsletter-form">
    <step-one
      v-if="step === 1"
      :title="title"
      :description="description"
      :image-src="imageSrc"
      @submit="step = 2"
    />
    <step-two
      v-if="step === 2"
      :default-newsletter-name="defaultNewsletterName"
      :newsletters="newsletters"
      as-card
    />
  </div>
</template>

<script>
import StepOne from './newsletter-signup-form/step1-inline.vue';
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
    imageSrc: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    step: 1,
    // @todo these shoud be a props
    defaultNewsletterName: 'CCJ Daily',
    newsletters: [
      {
        deploymentTypeId: 1,
        name: 'CCJ Equipment Weekly',
        description: 'Roundup of trucking equipment news and reviews',
      },
      {
        deploymentTypeId: 2,
        name: 'CCJ Technology Weekly',
        description: 'Top tech developments in the trucking industry',
      },
      {
        deploymentTypeId: 3,
        name: 'CCJ Weekend Newsletter',
        description: 'The top news of the week in the trucking industry',
      },
    ],
  }),
};
</script>
