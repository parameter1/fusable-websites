<template>
  <div :class="blockName">
    <div :class="`${blockName}__default-newsletter`">
      Signed up for the {{ defaultNewsletterName }}
    </div>
    <div :class="`${blockName}__header`">
      Complete your sign-up
    </div>
    <div :class="`${blockName}__about-you`">
      About you
    </div>
    <div :class="`${blockName}__form`">
      <input-form-group
        :block-name="blockName"
        field="company-name"
        label="Company Name"
        required
      />

      <select-form-group
        :block-name="blockName"
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
          />
        </div>
      </div>
    </div>

    <div :class="`${blockName}__signup`">
      <div>
        <sign-up-button />
      </div>
      <privacy-policy :block-name="blockName" />
    </div>
  </div>
</template>


<script>
import InputFormGroup from './input-form-group.vue';
import NewsletterCheckbox from './newsletter-checkbox.vue';
import PrivacyPolicy from './privacy-policy.vue';
import SelectFormGroup from './select-form-group.vue';
import SignUpButton from './sign-up-button.vue';

export default {
  components: {
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
  },

  data: () => ({
    blockName: 'complete-newsletter-signup',
  }),
};
</script>
