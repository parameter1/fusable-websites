<template>
  <div class="newsletter-checkbox-group custom-control custom-checkbox">
    <input
      :id="id"
      type="checkbox"
      class="custom-control-input"
      :disabled="disabled"
    >
    <label
      class="custom-control-label custom-control-label--bg-white"
      :for="id"
    >
      <span class="newsletter-checkbox-group__name">
        {{ name }}
      </span>
      <span class="newsletter-checkbox-group__description">
        {{ description }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    deploymentTypeId: {
      type: [Number, String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inPushdown: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    id() {
      const id = `deployment-type-id-${this.deploymentTypeId}`;
      return this.inPushdown ? `pushdown-${id}` : id;
    },
  },
};
</script>
