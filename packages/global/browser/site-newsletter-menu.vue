<template>
  <aside :class="classNames">
    <div :class="element('container')">
      <step-1
        v-if="step === 1"
        :deployment-type-id="defaultNewsletter.deploymentTypeId"
        :block-name="blockName"
        :name="name"
        :description="description"
        :image-src="imageSrc"
        :image-srcset="imageSrcset"
        @submit="stepOneSubmit"
      />
      <step-2
        v-if="step === 2"
        :email="email"
        :default-newsletter-name="defaultNewsletter.name"
        :newsletters="newsletters"
        :demographic="demographic"
        in-pushdown
      />
    </div>
  </aside>
</template>

<script>
import Step1 from './site-newsletter-menu/step1.vue';
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
    blockName: {
      type: String,
      required: true,
    },
    modifiers: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    step: 1,
    email: null,
  }),

  computed: {
    classNames() {
      const { blockName } = this;
      const classes = [blockName];
      this.modifiers.forEach(mod => classes.push(`${blockName}--${mod}`));
      return classes;
    },
  },

  methods: {
    element(elementName) {
      return `${this.blockName}__${elementName}`;
    },

    stepOneSubmit({ email }) {
      this.email = email;
      this.step = 2;
    },
  },
};
</script>
