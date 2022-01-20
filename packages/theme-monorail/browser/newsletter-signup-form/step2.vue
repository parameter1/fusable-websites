<template>
  <div :class="classNames">
    <div :class="`${blockName}__card-header`">
      <check-icon :class="`${blockName}__check-icon`" />
      Signed up for the {{ defaultNewsletter.name }}
    </div>
    <form
      :class="`${blockName}__card-body`"
      @submit.prevent="submit"
    >
      <transition
        :leave-active-class="`${blockName}__slide-out`"
        @after-leave="formHidden = true"
      >
        <div v-show="!isComplete">
          <div :class="`${blockName}__header`">
            Complete your sign-up
          </div>
          <div :class="`${blockName}__about-you`">
            About you
          </div>
          <div :class="`${blockName}__form`">
            <input-form-group
              v-model="companyName"
              :block-name="blockName"
              :disabled="isLoading"
              field="company-name"
              label="Company Name"
              required
              @focus="didFocus = true"
            />

            <select-form-group
              v-model="demographicValue"
              :block-name="blockName"
              :disabled="isLoading"
              field="primary-role"
              :label="demographic.label"
              required
              @focus="didFocus = true"
            >
              <option value="">
                Select
              </option>
              <option
                v-for="value in demographic.values"
                :key="value.id"
                :value="value.id"
              >
                {{ value.label }}
              </option>
            </select-form-group>

            <input-form-group
              v-model="postalCode"
              :block-name="blockName"
              :disabled="isLoading"
              field="postal-code"
              label="Zip/Postal"
              required
              @focus="didFocus = true"
            />
          </div>

          <div v-if="newsletters.length">
            <div :class="`${blockName}__subscriptions-header`">
              Choose your subscriptions
            </div>

            <div :class="`${blockName}__subscriptions row`">
              <div
                v-for="newsletter in newsletters"
                :key="newsletter.deploymentTypeId"
                class="col-12 col-md-6"
              >
                <newsletter-checkbox
                  :newsletter="newsletter"
                  :disabled="isLoading"
                  :in-pushdown="inPushdown"
                  @change="selectNewsletter"
                  @focus="didFocus = true"
                />
              </div>
            </div>
          </div>

          <div :class="`${blockName}__signup`">
            <div>
              <sign-up-button
                :class="`${blockName}__form-button`"
                :is-loading="isLoading"
                :disabled="isComplete"
              />
            </div>
            <privacy-policy :block-name="blockName" />
          </div>
        </div>
      </transition>

      <transition
        :enter-active-class="`${blockName}__slide-in`"
      >
        <div v-show="formHidden">
          <div :class="`${blockName}__thank-you-header`">
            Thank you for subscribing!
          </div>
          <p class="mb-0">
            You should start receiving your subscription in the next 24 hours
            along with a special welcome from the experts at <em>{{ siteName }}</em>.
          </p>
        </div>
      </transition>

      <div v-if="error" class="alert alert-danger mt-3 mb-0" role="alert">
        <strong>An error ocurred.</strong>
        {{ error.message }}
      </div>
    </form>
  </div>
</template>


<script>
import CheckIcon from './check-icon.vue';
import InputFormGroup from './input-form-group.vue';
import NewsletterCheckbox from './newsletter-checkbox.vue';
import PrivacyPolicy from './privacy-policy.vue';
import SelectFormGroup from './select-form-group.vue';
import SignUpButton from './sign-up-button.vue';

import getRecaptchaToken from './get-recaptcha-token';

export default {
  components: {
    CheckIcon,
    InputFormGroup,
    NewsletterCheckbox,
    PrivacyPolicy,
    SelectFormGroup,
    SignUpButton,
  },

  props: {
    siteName: {
      type: String,
      required: true,
    },
    recaptchaSiteKey: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    defaultNewsletter: {
      type: Object,
      required: true,
      validate: o => (o && o.name && o.deploymentTypeId),
    },
    newsletters: {
      type: Array,
      default: () => [],
    },
    demographic: {
      type: Object,
      required: true,
      validate: demo => (demo && demo.id && demo.label && demo.values),
    },
    asCard: {
      type: Boolean,
      default: false,
    },
    inPushdown: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    blockName: 'complete-newsletter-signup',
    didFocus: false,
    error: null,
    formHidden: false,
    isComplete: false,
    isLoading: false,

    companyName: null,
    demographicValue: null,
    postalCode: null,
    selectedNewsletters: [],
  }),

  computed: {
    classNames() {
      const { blockName } = this;
      const classNames = [blockName];
      if (this.asCard) classNames.push(`${blockName}--as-card`);
      if (this.inPushdown) classNames.push(`${blockName}--in-pushdown`);
      return classNames;
    },
  },

  watch: {
    didFocus(value) {
      if (value) this.$emit('focus');
    },
  },

  mounted() {
    this.$emit('load');
  },

  methods: {
    selectNewsletter({ newsletter, checked }) {
      if (checked) {
        this.selectedNewsletters.push(newsletter);
      } else {
        this.selectedNewsletters = this.selectedNewsletters
          .filter(nl => nl.deploymentTypeId !== newsletter.deploymentTypeId);
      }
    },

    async submit() {
      try {
        this.error = null;
        this.isLoading = true;
        const { email, selectedNewsletters } = this;
        if (!email) throw new Error('Unable to submit: no email address found.');
        const token = await getRecaptchaToken(this.recaptchaSiteKey);
        const payload = {
          token,
          email,
          companyName: this.companyName,
          postalCode: this.postalCode,
          deploymentTypeIds: selectedNewsletters.map(nl => nl.deploymentTypeId),
          demographics: [
            { id: this.demographic.id, values: [this.demographicValue] },
          ],
        };
        const res = await fetch('/__omeda/newsletter-signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        this.$emit('submit');
        selectedNewsletters.forEach((newsletter) => {
          this.$emit('subscribe', { newsletter });
        });
        this.isComplete = true;
      } catch (e) {
        this.error = e;
        this.$emit('error', e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
