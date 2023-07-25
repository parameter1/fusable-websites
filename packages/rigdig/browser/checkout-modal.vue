<template>
  <div class="rigdig-modal">
    <div class="rigdig-modal__wrapper">
      <div class="rigdig-modal__container">
        <button class="btn btn-text rigdig-modal__close" @click="$emit('cancel')">
          <icon-x />
        </button>
        <h1>Checkout modal</h1>
        <p>Email: {{ email }}</p>
        <p>VIN: {{ vin }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import IconX from '@parameter1/base-cms-marko-web-icons/browser/x.vue';

export default {
  name: 'RigDigCheckoutModal',

  components: {
    IconX,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
    vin: {
      type: String,
      default: null,
    },
  },

  emits: ['close'],

  data: () => ({
    error: null,
    loading: false,
  }),
};
</script>
