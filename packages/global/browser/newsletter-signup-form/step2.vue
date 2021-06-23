<template>
  <div :class="classNames">
    <div :class="`${blockName}__card-header`">
      <check-icon :class="`${blockName}__check-icon`" />
      Signed up for the {{ defaultNewsletterName }}
    </div>
    <form
      :class="`${blockName}__card-body`"
      @submit.prevent="submit"
    >
      <div :class="`${blockName}__header`">
        Complete your sign-up
      </div>
      <div :class="`${blockName}__about-you`">
        About you
      </div>
      <div :class="`${blockName}__form`">
        <input-form-group
          :block-name="blockName"
          :disabled="isLoading"
          field="company-name"
          label="Company Name"
          required
        />

        <select-form-group
          :block-name="blockName"
          :disabled="isLoading"
          field="primary-role"
          label="Your primary role?"
          required
        >
          <option value="">
            Select
          </option>
          <option value="1">
            Some thing
          </option>
          <option value="2">
            Some other thing
          </option>
        </select-form-group>

        <input-form-group
          :block-name="blockName"
          :disabled="isLoading"
          field="postal-code"
          label="Zip/Postal"
          required
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
            class="col-md-6"
          >
            <newsletter-checkbox
              :deployment-type-id="newsletter.deploymentTypeId"
              :name="newsletter.name"
              :description="newsletter.description"
              :disabled="isLoading"
              :in-pushdown="inPushdown"
            />
          </div>
        </div>
      </div>

      <div v-if="!isComplete" :class="`${blockName}__signup`">
        <div>
          <sign-up-button :is-loading="isLoading" />
        </div>
        <privacy-policy :block-name="blockName" />
      </div>
      <div v-else>
        <div :class="`${blockName}__header`">
          Thank you!
        </div>
        <p class="mb-0">
          Your submission has been received.
        </p>
      </div>

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
    defaultNewsletterName: {
      type: String,
      required: true,
    },
    newsletters: {
      type: Array,
      default: () => [],
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
    error: null,
    isComplete: false,
    isLoading: false,
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

  methods: {
    submit() {
      console.log('step2 submit!');
      this.error = null;
      this.isLoading = true;
    },
  },
};
</script>
