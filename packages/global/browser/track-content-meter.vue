<template>
  <div id="content-meter-gtm-event" />
</template>

<script>

export default {
  props: {
    contentMeterState: {
      type: Object,
      required: true,
    },
  },
  computed: {
    views() {
      return this.contentMeterState.views;
    },
    remaining() {
      const { viewLimit, views } = this.contentMeterState;
      return viewLimit - views;
    },
    overlayDispayed() {
      const { displayGate, displayOverlay } = this.contentMeterState;
      return displayGate && displayOverlay;
    },
  },
  created() {
    const { views, remaining, overlayDispayed } = this;
    this.observer = new IntersectionObserver((event) => {
      if (event[0].isIntersecting) {
        const { dataLayer } = window;
        if (dataLayer) {
          dataLayer.push({
            event: 'meter_view',
            views,
            remaining,
            overlayDispayed,
          });
        }
      }
    });
  },
  mounted() {
    this.observer.observe(this.$el);
  },
};
</script>
