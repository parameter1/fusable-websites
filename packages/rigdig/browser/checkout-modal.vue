<template>
  <div class="rigdig-modal">
    <div class="rigdig-modal__wrapper">
      <!-- @todo swap this for bootstrap modal? -->
      <div class="rigdig-modal__container">
        <h1 class="rigdig-modal__title">
          Overdrive Truck History Report
          <button class="btn btn-text rigdig-modal__close" @click="$emit('cancel')">
            <icon-x />
          </button>
        </h1>
        <template v-if="complete">
          <checkout-header
            :truck-info="truckInfo"
            :vin="vin"
            title="Report sent!"
            :email="userEmail"
          />
          <p>
            The truck history report you requested has been sent to your email.
          </p>
        </template>
        <template v-else-if="transactionId">
          <checkout-header
            :truck-info="truckInfo"
            :vin="vin"
            title="Report generating!"
            :email="userEmail"
          />
          <p>Your payment was processed successfully.</p>
          <p>Your transaction ID was {{ transactionId }}.</p>
          <p class="mb-0">
            We're sending your truck history report now!
          </p>

          <div class="rigdig-modal__buttons mt-1">
            <button
              type="submit"
              class="btn btn-secondary rigdig-widget__generate"
              :disabled="loading"
              @click="generate"
            >
              <div class="d-flex align-items-center">
                <span>Send Report</span>
                <div
                  v-show="loading"
                  class="spinner-border spinner-border-sm text-light ml-1"
                  role="status"
                >
                  <span class="sr-only">Sending report…</span>
                </div>
              </div>
            </button>
          </div>

          <alert-error v-if="error" title="Unable to send report.">
            <p>We weren't able to send the Truck History Report.</p>
          </alert-error>
        </template>
        <template v-else>
          <checkout-header
            :truck-info="truckInfo"
            :vin="vin"
            title="Report found!"
            :email="transactionToken ? userEmail : ''"
          />

          <template v-if="!transactionToken">
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
                  <template v-if="email">
                    <div class="rigdig-modal__label-text">
                      Email Address
                      <span class="rigdig-modal__signout-link">
                        Not you?&nbsp;
                        <a class="my-2" href="/user/logout">Click here to sign out</a>.
                      </span>
                    </div>
                    <input
                      ref="email"
                      :value="email"
                      class="form-control disabled rigdig-modal__email"
                      type="email"
                      disabled
                    >
                  </template>
                  <template v-else>
                    <div class="rigdig-widget__label-text">Email Address</div>
                    <input
                      ref="email"
                      v-model="userEmail"
                      class="form-control rigdig-modal__email"
                      type="email"
                      required
                    >
                  </template>
                </label>
              </div>

              <div class="rigdig-modal__buttons">
                <button
                  type="submit"
                  class="btn btn-primary rigdig-widget__submit"
                  :disabled="loading"
                >
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
            </form>
            <alert-error v-if="error" title="Unable to start checkout.">
              <p>We weren't able to start the checkout process.</p>
              <p><a href="javascript:void(0)" @click="handleSubmit">Click here</a> to retry.</p>
            </alert-error>
          </template>

          <!-- The PayFabric render target -->
          <div id="payfabricTarget" ref="payfabricTarget" />

          <alert-error v-if="transactionToken && error" title="Unable to purchase report.">
            <p>We weren't able to purchase the Truck History Report.</p>
            <p>
              Review the form above, or
              <a href="javascript:void(0)" @click="handleSubmit">click here</a> to start over.
            </p>
          </alert-error>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import IconX from '@parameter1/base-cms-marko-web-icons/browser/x.vue';
import AlertError from './alert-error.vue';
import CheckoutHeader from './checkout-header.vue';

export default {
  name: 'RigDigCheckoutModal',

  components: {
    AlertError,
    CheckoutHeader,
    IconX,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
    buttonLabel: {
      type: String,
      default: 'Start checkout',
    },
    vin: {
      type: String,
      default: null,
    },
    truckInfo: {
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

  emits: ['close'],

  data: () => ({
    userEmail: null,
    error: null,
    loading: false,
    complete: false,
    transactionToken: null,
    transactionId: null,
    client: null,
  }),

  created() {
    if (this.email) {
      this.userEmail = this.email;
    }
  },

  methods: {
    /**
     *
     */
    async handleSubmit() {
      this.error = null;
      this.loading = true;
      this.complete = false;

      // Create a transaction
      try {
        const token = await this.createTransaction();
        this.transactionToken = token;
      } catch (e) {
        this.error = `Unable to create a transaction: ${e.message}.`;
        return false;
      } finally {
        this.loading = false;
      }

      // access payfabric sdk client and perform checkout
      try {
        await this.startCheckout();
      } catch (e) {
        this.error = e.message;
        this.loading = false;
      } finally {
        this.loading = false;
      }
      return true;
    },

    /**
     *
     */
    async createTransaction() {
      const response = await fetch('/__payfabric/create-transaction-token', {
        method: 'post',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          vin: this.vin,
          email: this.userEmail,
        }),
      });
      if (!response.ok) {
        let message = `PayFabric Purchase failure: ${response.status} ${response.statusText}`;
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
      const { Token } = await response.json();
      return Token;
    },

    /**
     *
     */
    async startCheckout() {
      // eslint-disable-next-line new-cap, no-new, no-undef
      this.client = new payfabricpayments({
        debug: this.debug,
        environment: this.environment,
        target: 'payfabricTarget',
        displayMethod: 'IN_PLACE',
        useDefaultWallet: false,
        acceptedPaymentMethods: this.paymentMethods,
        session: this.transactionToken,
        disableCancel: true,
        successCallback: (...args) => this.handleSuccess(args),
        failureCallback: (e) => {
          if (e.ResponseMsg === 'JWT token has expired.') {
            // Clear the client session, crete a new token, and re-start checkout
            this.client.destroy();
            this.transactionToken = null;
            this.loading = true;
            this.handleSubmit();
          } else {
            // Undo SDK opacity/pointer change. Why isn't the SDK calling this?
            this.client.transactionStoppedProcessing(this.client, e);
            this.error = e.ResponseMsg;
          }
        },
        cancelCallback: () => {
          // Clear the transaction to start fresh.
          this.client.destroy();
          this.transactionToken = null;
        },
      });
    },

    /**
     * Send completed transaction id to endpoint, trigger email send
     * Update messaging, display thankyou/etc.
     */
    async handleSuccess([{ TrxKey: transactionId }]) {
      this.error = null;
      this.complete = false;
      this.transactionId = transactionId;
      return this.generate();
    },

    /**
     *
     */
    async generate() {
      this.error = null;
      this.complete = false;
      this.loading = true;
      try {
        const email = this.userEmail;
        const { vin, transactionId } = this;
        const r = await fetch('/__rigdig/complete', {
          headers: { 'content-type': 'application/json' },
          method: 'post',
          body: JSON.stringify({ vin, email, transactionId }),
        });
        if (!r.ok) {
          let message = `RigDig generation failure: ${r.status} ${r.statusText}`;
          try {
            const { error } = await r.json();
            if (error) message = error;
          } catch (e) {
            // noop
          }
          const error = new Error(message);
          error.code = r.status;
          throw error;
        }
        this.complete = true;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
