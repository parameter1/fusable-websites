<template>
  <div class="rigdig-widget__container">
    <h1 class="rigdig-widget__title">
      {{ title }}
    </h1>
    <p class="rigdig-widget__call-to-action">
      {{ callToAction }}
    </p>
    <form
      ref="form"
      class="rigdig-widget__form"
      :disabled="loading"
      @submit.prevent="handleSubmit"
    >
      <div class="rigdig-widget__form-group">
        <label class="rigdig-widget__label">
          <div v-if="inputLabel" class="rigdig-widget__label-text">{{ inputLabel }}</div>
          <input
            ref="input"
            v-model="vin"
            class="form-control rigdig-widget__vin"
            type="text"
            :readonly="loading"
            :placeholder="placeholder"
            required
            @paste="handlePaste"
          >
        </label>
      </div>

      <div class="rigdig-widget__buttons">
        <button type="submit" class="btn btn-primary rigdig-widget__submit" :disabled="loading">
          <div class="d-flex align-items-center">
            <span>{{ buttonLabel }}</span>
            <div
              v-show="loading"
              class="spinner-border spinner-border-sm text-light ml-1"
              role="status"
            >
              <span class="sr-only">Loading…</span>
            </div>
          </div>
        </button>
        <button
          v-if="vin && attempted"
          type="reset"
          class="btn btn-secondary ml-1 rigdig-widget__reset"
          :disabled="loading"
          @click="reset"
        >
          Reset
        </button>
      </div>
      <alert-error v-if="error" title="Unable to look up VIN.">
        <p>We couldn't find the Vehicle Identification Number you supplied.</p>
      </alert-error>
    </form>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <checkout-modal
        v-if="verified"
        :email="email"
        :vin="vin"
        :truck-info="truckInfo"
        :environment="environment"
        :payment-methods="paymentMethods"
        :debug="debug"
        @cancel="reset"
      />
    </transition>
  </div>
</template>

<script>
import CheckoutModal from './checkout-modal.vue';
import AlertError from './alert-error.vue';

export default {
  name: 'RigDigWidget',

  components: {
    AlertError,
    CheckoutModal,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: 'Overdrive Truck History Reports',
    },
    callToAction: {
      type: String,
      default: 'Look up the full history of any truck, including reported accidents, inspection violations, insurance claims, owner history, and more.',
    },
    placeholder: {
      type: String,
      default: 'Enter Truck VIN',
    },
    buttonLabel: {
      type: String,
      default: 'Look up VIN',
    },
    inputLabel: {
      type: String,
      default: null,
    },
    environment: {
      type: String,
      default: 'SANDBOX',
      validator(v) {
        return ['SANDBOX', 'LIVE'].includes(v);
      },
    },
    paymentMethods: {
      type: Array,
      default: () => ['CreditCard', 'ApplePay'],
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    attempted: false,
    error: null,
    loading: false,
    vin: null,
    verified: false,
    truckInfo: null,
  }),

  methods: {
    reset() {
      this.vin = null;
      this.error = null;
      this.attempted = false;
      this.verified = false;
      this.$refs.input.focus();
    },
    handlePaste($event) {
      this.vin = $event.clipboardData.getData('text/plain');
      this.handleSubmit();
    },
    async handleSubmit() {
      this.error = null;
      this.loading = true;
      try {
        const response = await fetch('/__rigdig/verify', {
          method: 'post',
          headers: { 'content-type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ vin: [this.vin] }),
        });
        if (!response.ok) {
          let message = `RigDig Lookup failure: ${response.status} ${response.statusText}`;
          // 5TEVL52N0YZ700762
          try {
            const { error } = await response.json();
            if (error) message = error;
          } catch (e) {
            // noop
          }
          const error = new Error(message);
          error.code = response.status;
          throw error;
        }
        const { PoweredByVinLink: { year, make, model } } = await response.json();
        this.truckInfo = `${year} ${make} ${model}`;
        this.verified = true;
      } catch (e) {
        this.error = e.message;
        this.loading = false;
        this.$refs.input.focus();
      } finally {
        this.attempted = true;
        this.loading = false;
      }
    },
  },

};
</script>
