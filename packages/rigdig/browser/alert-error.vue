<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div class="rigdig-alert__wrapper">
      <div class="rigdig-alert__header">
        {{ title }}
      </div>
      <div class="rigdig-alert__content">
        <slot />
        <p v-if="showHelp">
          Please try the previous action again, or
          <a :href="`mailto:${supportEmail}`">contact us</a>
          for assistance.
        </p>
      </div>
      <!-- buttons/actions? -->
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RigDigAlert',
  props: {
    title: {
      type: String,
      default: 'An error was encountered.',
    },
    showHelp: {
      type: Boolean,
      default: true,
    },
    supportEmail: {
      type: String,
      default: 'support@rigdig.com',
    },
  },
};
</script>
