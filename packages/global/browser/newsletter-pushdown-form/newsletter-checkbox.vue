<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="id"
      type="checkbox"
      class="custom-control-input"
    >
    <label
      class="custom-control-label"
      :for="id"
    >
      {{ name }}
      <br>
      {{ description }}
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
  },

  computed: {
    id() {
      return `deployment-type-id-${this.deploymentTypeId}`;
    },
  },
};
</script>
