<template>
  <div class="inline-newsletter-form">
    <step-1
      v-if="step === 1"
      :deployment-type-id="defaultNewsletter.deploymentTypeId"
      :name="name"
      :description="description"
      :image-src="imageSrc"
      :image-srcset="imageSrcset"
      @submit="stepOneSubmit"
      @focus="$emit('focus', { step: 1 })"
    />
    <step-2
      v-if="step === 2"
      :email="email"
      :default-newsletter-name="defaultNewsletter.name"
      :newsletters="newsletters"
      :demographic="demographic"
      as-card
      @submit="$emit('submit', { step: 2 })"
      @focus="$emit('focus', { step: 2 })"
      @load="$emit('load', { step: 2 })"
    />
  </div>
</template>

<script>
import Step1 from './inline-newsletter-form/step1.vue';
import Step2 from './newsletter-signup-form/step2.vue';

export default {
  components: {
    Step1,
    Step2,
  },

  props: {
    name: {
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
    newsletters: {
      type: Array,
      default: () => [],
    },
    demographic: {
      type: Object,
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
    step: 1,
  }),

  mounted() {
    this.$emit('load', { step: 1 });
  },

  methods: {
    stepOneSubmit({ email }) {
      this.$emit('submit', { step: 1 });
      this.email = email;
      this.step = 2;
    },
  },
};
</script>
