<template>
  <form-group
    :field="field"
    :block-name="blockName"
    :label="label"
    :required="required"
  >
    <template #default="{ id, required }">
      <select
        :id="id"
        class="custom-select custom-select--bg-white"
        :required="required"
      >
        <option value="">
          Select
        </option>
        <option
          v-for="option in option"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
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
    options: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
