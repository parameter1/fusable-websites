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
        @focus="$emit('focus', { step: 1 })"
      />
      <step-2
        v-if="step === 2"
        :email="email"
        :default-newsletter-name="defaultNewsletter.name"
        :newsletters="newsletters"
        :demographic="demographic"
        in-pushdown
        @submit="$emit('submit', { step: 2 })"
        @focus="$emit('focus', { step: 2 })"
        @load="$emit('load', { step: 2 })"
      />
    </div>
  </aside>
</template>

<script>
import Step1 from './site-newsletter-menu/step1.vue';
import Step2 from './newsletter-signup-form/step2.vue';

export default {
  inject: ['EventBus'],
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
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    didLoad: false,
    email: null,
    expanded: undefined,
    step: 1,
  }),

  computed: {
    currentlyExpanded() {
      if (this.expanded != null) return this.expanded;
      return this.initiallyExpanded;
    },

    classNames() {
      const { blockName } = this;
      const classes = [blockName];
      if (this.currentlyExpanded) classes.push(`${blockName}--open`);
      return classes;
    },
  },

  watch: {
    didLoad(value) {
      if (value) this.$emit('load', { step: 1 });
    },
  },

  mounted() {
    if (this.initiallyExpanded) this.didLoad = true;
    this.EventBus.$on('newsletter-menu-expanded', (expanded) => {
      this.expanded = expanded;
      if (expanded) this.didLoad = true;
    });
  },

  methods: {
    element(elementName) {
      return `${this.blockName}__${elementName}`;
    },

    stepOneSubmit({ email }) {
      this.$emit('submit', { step: 1 });
      this.email = email;
      this.step = 2;
    },
  },
};
</script>
