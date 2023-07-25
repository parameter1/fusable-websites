<template>
  <div class="rigdig-modal">
    <div class="rigdig-modal__wrapper">
      <!-- @todo swap this for bootstrap modal? -->
      <div class="rigdig-modal__container">
        <button class="btn btn-text rigdig-modal__close" @click="$emit('cancel')">
          <icon-x />
        </button>
        <h1>Overdrive Truck History Reports</h1>
        <h2>Report found!</h2>
        <div class="rigdig-modal__promo">
          <img
            alt="Truck History Report Sample"
            src="https://img.overdriveonline.com/files/base/randallreilly/all/image/static/rigdigreport.jpg?w=150&blur=10"
          >
          <div>
            <dl>
              <dt>Truck</dt>
              <dd>{{ truckInfo || 'Truck details unavailable' }}</dd>
              <dt>VIN</dt>
              <dd>{{ vin }}</dd>
            </dl>
          </div>
        </div>
        <div class="rigdig-modal__teaser border">
          <icon-file-pdf class="mr-2" />
          <span>Truck History Reports are PDFs that you'll receive via email.</span>
        </div>
        <form :disabled="loading" @submit.prevent="handleSubmit">
          <!-- <div class="rigdig-modal__form_group">
            <label class="rigdig-modal__label">
              <div class="rigdig-widget__label-text">Vehicle Identification Number</div>
              <input
                ref="vin"
                :value="vin"
                class="form-control disabled rigdig-modal__vin"
                type="text"
                disabled
              >
            </label>
          </div> -->
          <div class="rigdig-modal__form_group">
            <label class="rigdig-modal__label">
              <div class="rigdig-widget__label-text">Email Address</div>
              <input
                v-if="email"
                ref="email"
                :value="email"
                class="form-control disabled rigdig-modal__email"
                type="email"
                disabled
              >
              <input
                v-else
                ref="email"
                v-model="userEmail"
                class="form-control rigdig-modal__email"
                type="email"
                required
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
                  <span class="sr-only">Processing…</span>
                </div>
              </div>
            </button>
          </div>
          <div v-if="error" class="rigdig-widget__error">
            <h4>Unable to purchase report.</h4>
            <p>
              The application encountered an error purchasing the Truck History Report.
              Please try again.
            </p>
            <span>
              {{ error }}
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import IconX from '@parameter1/base-cms-marko-web-icons/browser/x.vue';
import IconFilePdf from '@parameter1/base-cms-marko-web-icons/browser/file-pdf.vue';

export default {
  name: 'RigDigCheckoutModal',

  components: {
    IconX,
    IconFilePdf,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
    buttonLabel: {
      type: String,
      default: 'Pay now',
    },
    vin: {
      type: String,
      default: null,
    },
    truckInfo: {
      type: String,
      default: null,
    },
  },

  emits: ['close'],

  data: () => ({
    userEmail: null,
    error: null,
    loading: false,
  }),

  created() {
    if (this.email) {
      this.userEmail = this.email;
    }
  },
};
</script>
