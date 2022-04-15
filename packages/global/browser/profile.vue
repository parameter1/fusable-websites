<template>
  <div v-if="hasActiveUser">
    <p>{{ callToAction }}</p>
    <form @submit.prevent="handleSubmit">
      <fieldset :disabled="isLoading">
        <div class="row">
          <div class="col-md-12">
            <organization
              v-model="user.organization"
              required
            />
          </div>
        </div>
        <div v-if="customSelectFieldAnswers.length" class="row">
          <custom-select
            v-for="fieldAnswer in customSelectFieldAnswers"
            :id="fieldAnswer.field.id"
            :key="fieldAnswer.id"
            class="col-md-12"
            :label="fieldAnswer.field.label"
            :required="fieldAnswer.field.required"
            :multiple="fieldAnswer.field.multiple"
            :selected="fieldAnswer.answers"
            :options="fieldAnswer.field.options"
            @change="onCustomSelectChange(fieldAnswer.answers, $event)"
          />
        </div>
        <div class="row">
          <postal-code
            v-model="user.postalCode"
            required
          />
        </div>

        <div v-if="customBooleanFieldAnswers.length" class="row">
          <div
            v-for="fieldAnswer in customBooleanFieldAnswers"
            :key="fieldAnswer.id"
            class="col-12"
          >
            <custom-boolean
              :id="fieldAnswer.id"
              :message="fieldAnswer.field.label"
              :required="fieldAnswer.field.required"
              :value="fieldAnswer.answer"
              @input="onCustomBooleanChange(fieldAnswer.id)"
            />
          </div>
        </div>

        <div v-if="emailConsentRequest" class="row mt-3">
          <div class="col-md-6">
            <receive-email
              v-model="user.receiveEmail"
              :email-consent-request="emailConsentRequest"
            />
          </div>
        </div>

        <div v-if="regionalPolicyFields.length" class="row mt-3">
          <div class="col-12">
            <regional-policy
              v-for="policy in regionalPolicyFields"
              :id="policy.id"
              :key="policy.id"
              :message="policy.message"
              :required="policy.required"
              :value="getRegionalPolicyAnswerValue(policy.id)"
              @input="setPolicyAnswer(policy.id, $event)"
            />
          </div>
        </div>

        <small
          v-if="consentPolicy"
          class="text-muted mb-3"
          v-html="consentPolicy"
        />

        <div class="d-flex align-items-center">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <span v-if="didSubmit" class="ml-2">
            {{ submitMessage }}
          </span>
        </div>
      </fieldset>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred: {{ error }}
      </p>
    </form>
  </div>
  <div v-else>
    <p>You must be logged-in to modify your user profile.</p>
    <login
      :endpoints="endpoints"
      :app-context-id="appContextId"
      :consent-policy="consentPolicy"
      :regional-consent-policies="regionalConsentPolicies"
      :required-fields="requiredLoginFields"
    />
  </div>
</template>

<script>
import post from '@parameter1/base-cms-marko-web-identity-x/browser/utils/post';
import cookiesEnabled from '@parameter1/base-cms-marko-web-identity-x/browser/utils/cookies-enabled';
import CustomBoolean from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/custom-boolean.vue';
import CustomSelect from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/custom-select.vue';
import Organization from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/organization.vue';
import PostalCode from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/postal-code.vue';
import ReceiveEmail from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/receive-email.vue';
import RegionalPolicy from '@parameter1/base-cms-marko-web-identity-x/browser/form/fields/regional-policy.vue';
import Login from '@parameter1/base-cms-marko-web-identity-x/browser/login.vue';
import FeatureError from '@parameter1/base-cms-marko-web-identity-x/browser/errors/feature';
import FormError from '@parameter1/base-cms-marko-web-identity-x/browser/errors/form';

const { isArray } = Array;

export default {
  components: {
    PostalCode,
    CustomBoolean,
    CustomSelect,
    Organization,
    ReceiveEmail,
    RegionalPolicy,
    Login,
  },

  /**
   *
   */
  props: {
    endpoints: {
      type: Object,
      required: true,
    },
    activeUser: {
      type: Object,
      default: () => ({}),
    },
    callToAction: {
      type: String,
      default: 'To complete your profile, please fill out the required fields.',
    },
    requiredServerFields: {
      type: Array,
      default: () => [],
    },
    requiredClientFields: {
      type: Array,
      default: () => [],
    },
    hiddenFields: {
      type: Array,
      default: () => [],
    },
    reloadPageOnSubmit: {
      type: Boolean,
      default: false,
    },
    consentPolicy: {
      type: String,
      default: null,
    },
    appContextId: {
      type: String,
      default: null,
    },
    emailConsentRequest: {
      type: String,
      default: null,
    },
    regionalConsentPolicies: {
      type: Array,
      default: () => [],
    },
    requiredLoginFields: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data() {
    return {
      error: null,
      isLoading: false,
      isReloadingPage: false,
      didSubmit: false,
      user: { ...this.activeUser },
    };
  },

  /**
   *
   */
  computed: {
    /**
     *
     */
    hasActiveUser() {
      return this.user && this.user.email;
    },

    /**
     *
     */
    requiredFields() {
      return [...this.requiredServerFields, ...this.requiredClientFields];
    },

    submitMessage() {
      const message = 'Profile updated.';
      if (this.isReloadingPage) return `${message} Reloading page...`;
      return message;
    },

    regionalPolicyFields() {
      const { regionalConsentPolicies, countryCode } = this;
      if (!regionalConsentPolicies.length || !countryCode) return [];
      return regionalConsentPolicies.filter((policy) => {
        const countryCodes = policy.countries.map(country => country.id);
        return countryCodes.includes(countryCode);
      });
    },

    /**
     *
     */
    customBooleanFieldAnswers() {
      const { customBooleanFieldAnswers } = this.user;
      return isArray(customBooleanFieldAnswers) ? customBooleanFieldAnswers : [];
    },

    /**
     *
     */
    customSelectFieldAnswers() {
      const { customSelectFieldAnswers } = this.user;
      return isArray(customSelectFieldAnswers) ? customSelectFieldAnswers : [];
    },

    /**
     * Field settings
     */
    organizationSettings() {
      return {
        required: this.requiredFields.includes('organization'),
        visible: !this.hiddenFields.includes('organization'),
      };
    },
    postalCodeSettings() {
      return {
        required: this.requiredFields.includes('postalCode'),
        visible: !this.hiddenFields.includes('postalCode'),
      };
    },
  },

  /**
   *
   */
  mounted() {
    if (!cookiesEnabled()) {
      const error = new FeatureError('Your browser does not support cookies. Please enable cookies to use this feature.');
      this.error = error.message;
    }
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    getRegionalPolicyAnswer(policyId) {
      return this.user.regionalConsentAnswers.find(a => a.id === policyId);
    },

    getRegionalPolicyAnswerValue(policyId) {
      const answer = this.getRegionalPolicyAnswer(policyId);
      if (answer) return answer.given;
      return false;
    },

    setPolicyAnswer(policyId, given) {
      const answer = this.getRegionalPolicyAnswer(policyId);
      if (answer) {
        answer.given = given;
      } else {
        this.user.regionalConsentAnswers.push({ id: policyId, given });
      }
    },

    onCustomBooleanChange(id) {
      const objIndex = this.customBooleanFieldAnswers.findIndex((obj => obj.id === id));
      const answer = !this.customBooleanFieldAnswers[objIndex].answer;
      this.customBooleanFieldAnswers[objIndex].answer = answer;

      this.user.customBooleanFieldAnswers = this.customBooleanFieldAnswers;
    },

    onCustomSelectChange(answers, ids) {
      answers.splice(0);
      answers.push(...ids.map(id => ({ id })));
    },

    /**
     *
     */
    async handleSubmit() {
      this.error = null;
      this.isLoading = true;
      this.didSubmit = false;
      try {
        const res = await post('/profile', this.user);
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);

        this.user = data.user;
        this.didSubmit = true;
        this.$emit('submit', data);

        if (this.reloadPageOnSubmit) {
          this.isReloadingPage = true;
          window.location.reload(true);
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
