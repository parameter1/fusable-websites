<template>
  <aside :class="classNames">
    <div :class="element('container')">
      <step-1
        v-if="step === 1"
        :block-name="blockName"
        :name="name"
        :description="description"
        :image-src="imageSrc"
        :image-srcset="imageSrcset"
        @submit="stepOneSubmit"
      />
      <step-2
        v-if="step === 2"
        :default-newsletter-name="defaultNewsletter.name"
        :newsletters="newsletters"
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
      this.step = 2;
      // this.isLoading = true;
    },
  },
};
</script>
