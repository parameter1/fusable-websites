<template>
  <div id="content-meter" />
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
        const { dataLayerIdentityX, dataLayer } = window;
        const dl = dataLayerIdentityX || dataLayer;
        if (dl) {
          dl.push({
            event: 'content_meter_view',
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
