<template>
  <div>
    <h2 class="rigdig-modal__subtitle">
      {{ title }}
    </h2>
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
      <span style="flex-grow: 1">
        Truck History Reports are PDFs that you'll receive via email.
      </span>
    </div>
    <div class="rigdig-modal__teaser border">
      <icon-credit-card class="mr-2" />
      <span style="flex-grow: 1">Single Report</span>
      <span>$34.99</span>
    </div>
    <div v-if="email" class="rigdig-modal__teaser border">
      <icon-email class="mr-2" />
      <span style="flex-grow: 1">Email Address</span>
      <span>{{ email }}</span>
    </div>
  </div>
</template>

<script>
import IconFilePdf from '@parameter1/base-cms-marko-web-icons/browser/file-pdf.vue';
import IconCreditCard from '@parameter1/base-cms-marko-web-icons/browser/credit-card.vue';
import IconEmail from '@parameter1/base-cms-marko-web-icons/browser/mail.vue';

export default {
  name: 'CheckoutHeader',

  components: {
    IconCreditCard,
    IconEmail,
    IconFilePdf,
  },

  props: {
    truckInfo: {
      type: String,
      required: true,
    },
    vin: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
