<template>
  <div>
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

      <div :class="`${blockName}__complete-signup-form-group`">
        <label :class="`${blockName}__form-label`" for="newsletter-form-primary-role">
          Your primary role? *
        </label>
        <select
          id="newsletter-form-primary-role"
          class="custom-select custom-select--bg-white"
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
        </select>
      </div>

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

      <div>
        <newsletter-checkbox
          v-for="newsletter in newsletters"
          :key="newsletter.deploymentTypeId"
          :deployment-type-id="newsletter.deploymentTypeId"
          :name="newsletter.name"
          :description="newsletter.description"
        />
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
import SignUpButton from './sign-up-button.vue';

export default {
  components: {
    InputFormGroup,
    NewsletterCheckbox,
    PrivacyPolicy,
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
