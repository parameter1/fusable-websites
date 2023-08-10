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
            :show-price="false"
          />
          <p>
            The truck history report you requested has been sent to your email.
          </p>
        </template>
        <template v-else-if="generating">
          <checkout-header
            :truck-info="truckInfo"
            :vin="vin"
            title="Report generating!"
            :show-price="false"
          />
          <p>Your payment was processed successfully.</p>
          <p>We're sending your truck history report now!</p>
        </template>
        <template v-else>
          <checkout-header
            :truck-info="truckInfo"
            :vin="vin"
            title="Report found!"
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
          </template>
        </template>

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
        <!-- The PayFabric render target -->
        <div id="payfabricTarget" ref="payfabricTarget" />
      </div>
    </div>
  </div>
</template>

<script>
import IconX from '@parameter1/base-cms-marko-web-icons/browser/x.vue';
import CheckoutHeader from './checkout-header.vue';

export default {
  name: 'RigDigCheckoutModal',

  components: {
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
  },

  emits: ['close'],

  data: () => ({
    userEmail: null,
    error: null,
    loading: false,
    generating: false,
    complete: false,
    transactionToken: null,
  }),

  created() {
    if (this.email) {
      this.userEmail = this.email;
    }
  },

  methods: {
    async handleSubmit() {
      this.error = null;
      this.loading = true;
      this.complete = false;
      this.generating = false;
      try {
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
        this.transactionToken = Token;

        // console.log('initiating pf');
        // access payfabric client and perform checkout
        // eslint-disable-next-line new-cap, no-new, no-undef
        const client = new payfabricpayments({
          // debug: true,
          environment: 'SANDBOX',
          target: 'payfabricTarget',
          displayMethod: 'IN_PLACE',
          useDefaultWallet: false,
          // displayMethod: 'DIALOG',
          acceptedPaymentMethods: ['CreditCard', 'ApplePay'],
          session: Token,
          disableCancel: true,
          successCallback: (...args) => this.handleSuccess(args),
          failureCallback: (e) => {
            this.error = e.ResponseMsg;
            this.transactionToken = null;
            // Hide the checkout page since it freezes? why?
            client.paymentCancel();
          },
          cancelCallback: () => {
            // Clear the transaction to start fresh.
            this.transactionToken = null;
          },
          // readyCallback: (...args) => console.log('ready!', args),
        });
        // console.log('initiated pf', client);
      } catch (e) {
        this.error = e.message;
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    // 5555 5555 5555 4444
    // Send completed transaction id to endpoint, trigger email send
    // Update messaging, display thankyou/etc.
    async handleSuccess([{ TrxKey: transactionId }]) {
      this.error = null;
      this.complete = false;
      this.generating = true;
      try {
        const email = this.userEmail;
        const { vin } = this;
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
      }
    },
  },
};
</script>
