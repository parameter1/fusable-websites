<template>
  <form-group
    :field="field"
    :block-name="blockName"
    :label="label"
    :required="required"
  >
    <template #default="{ id }">
      <input
        :id="id"
        class="form-control form-control--bg-white"
        :required="required"
        :disabled="disabled"
      >
    </template>
  </form-group>
</template>

<script>
import FormGroup from './form-group.vue';

export default {
  components: {
    FormGroup,
  },

  props: {
    field: {
      type: String,
      required: true,
    },
    blockName: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
