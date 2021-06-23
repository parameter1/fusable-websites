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
      />
    </div>
  </aside>
</template>

<script>
import Step1 from './site-newsletter-menu/step1.vue';

export default {
  components: {
    Step1,
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
  },
};
</script>
