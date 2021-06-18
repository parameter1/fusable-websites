<template>
  <div :class="`${blockName}__step-two-container`">
    <div :class="`${blockName}__signed-up-to`">
      Signed up for the {{ defaultNewsletterName }}
    </div>
    <div :class="`${blockName}__complete-signup-header`">
      Complete your sign-up
    </div>
    <div :class="`${blockName}__about-you-header`">
      About you
    </div>
    <div :class="`${blockName}__complete-signup-form`">
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

      <div :class="`${blockName}__subscriptions-header row`">
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

    <div>
      <sign-up-button />
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
    blockName: {
      type: String,
      required: true,
    },
    defaultNewsletterName: {
      type: String,
      required: true,
    },
    newsletters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
