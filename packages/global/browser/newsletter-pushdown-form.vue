<template>
  <div>
    <step-one
      v-if="step === 1"
      :title="title"
      :description="description"
      :block-name="blockName"
      @submit="step = 2"
    />
    <step-two
      v-if="step === 2"
      :block-name="blockName"
      :default-newsletter-name="defaultNewsletterName"
      :newsletters="newsletters"
    />
  </div>
</template>

<script>
import StepOne from './newsletter-pushdown-form/step1.vue';
import StepTwo from './newsletter-pushdown-form/step2.vue';

export default {
  components: {
    StepOne,
    StepTwo,
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
    step: 2,
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
