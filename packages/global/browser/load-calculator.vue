<template>
  <div class="load-calc-widget__container">
    <div>
      <div class="load-calc-widget__website-section-name">
        <a href="https://truckhistory.overdriveonline.com/">
          New
        </a>
      </div>
      <div class="load-calc-widget__header">
        <div class="load-calc-widget__copy">
          <h1 class="load-calc-widget__title">
            {{ title }}
          </h1>
          <p class="load-calc-widget__call-to-action">
            {{ description }}
          </p>
        </div>
      </div>
      <form
        ref="form"
        class="load-calc-widget__form"
        :disabled="loading"
        @submit.prevent="handleSubmit"
      >
        <div class="load-calc-widget__form-group">
          <label class="load-calc-widget__label">
            <div class="load-calc-widget__label-text">Fixed cost per day under load</div>
            <input
              ref="input"
              v-model="fixedCost"
              class="form-control load-calc-widget__fixedCost"
              type="text"
              :readonly="loading"
              :placeholder="placeholder"
              required
            >
          </label>
        </div>

        <div class="load-calc-widget__form-group">
          <label class="load-calc-widget__label">
            <div class="load-calc-widget__label-text">Salary per day under load</div>
            <input
              ref="input"
              v-model="salary"
              class="form-control load-calc-widget__salary"
              type="text"
              :readonly="loading"
              :placeholder="placeholder"
              required
            >
          </label>
        </div>

        <div class="load-calc-widget__form-group">
          <label class="load-calc-widget__label">
            <div class="load-calc-widget__label-text">Vairable cost per mile</div>
            <input
              ref="input"
              v-model="varCostPerMile"
              class="form-control load-calc-widget__varCostPerMile"
              type="text"
              :readonly="loading"
              :placeholder="placeholder"
              required
            >
          </label>
        </div>

        <hr>

        <h2>Loads</h2>
        <div
          v-for="(load, index) in loads"
          :key="index"
          class="load"
        >
          <h2>
            Load {{ index + 1 }}
            <span
              v-if="index !== 0"
            >
              <a
                href="javascript:void(0)"
                role="button"
                @click="removeLoad(index)"
              >
                Remove
              </a>
            </span>
          </h2>
          <div class="load-calc-widget__form-group">
            <label class="load-calc-widget__label">
              <div class="load-calc-widget__label-text">Days to haul the load(in 1/4 days)</div>
              <input
                ref="input"
                v-model="load.quarterMile"
                class="form-control load-calc-widget__quarterMile"
                type="text"
                :readonly="loading"
                :placeholder="placeholder"
                required
              >
            </label>
          </div>

          <div class="load-calc-widget__form-group">
            <label class="load-calc-widget__label">
              <div class="load-calc-widget__label-text">Deadhead Miles</div>
              <input
                ref="input"
                v-model="load.deadheadMiles"
                class="form-control load-calc-widget__deadheadMiles"
                type="text"
                :readonly="loading"
                :placeholder="placeholder"
                required
              >
            </label>
          </div>

          <div class="load-calc-widget__form-group">
            <label class="load-calc-widget__label">
              <div class="load-calc-widget__label-text">Loaded Miles</div>
              <input
                ref="input"
                v-model="load.loadedMiles"
                class="form-control load-calc-widget__loadedMiles"
                type="text"
                :readonly="loading"
                :placeholder="placeholder"
                required
              >
            </label>
          </div>

          <div class="load-calc-widget__form-group">
            <label class="load-calc-widget__label">
              <div class="load-calc-widget__label-text">Total miles</div>
              <input
                ref="input"
                v-model="load.totalMiles"
                class="form-control load-calc-widget__totalMiles"
                type="text"
                :readonly="loading"
                :placeholder="placeholder"
                required
              >
            </label>
          </div>

          <div class="load-calc-widget__form-group">
            <label class="load-calc-widget__label">
              <div class="load-calc-widget__label-text">Gross Rate</div>
              <input
                ref="input"
                v-model="load.grossRate"
                class="form-control load-calc-widget__grossRate"
                type="text"
                :readonly="loading"
                :placeholder="placeholder"
                required
              >
            </label>
          </div>
        </div>

        <button
          v-if="hasUserInput"
          type="add"
          class="btn btn-secondary ml-1 load-calc-widget__add-load"
          :disabled="loading"
          @click="addLoad"
        >
          Add Load
        </button>

        <div class="load-calc-widget__buttons">
          <button
            type="submit"
            class="btn btn-primary load-calc-widget__submit"
            :disabled="loading"
          >
            <div class="d-flex align-items-center">
              <span>{{ buttonLabel }}</span>
              <div
                v-show="loading"
                class="spinner-border spinner-border-sm text-light ml-1"
                role="status"
              >
                <span class="sr-only">Loading…</span>
              </div>
            </div>
          </button>
          <button
            v-if="hasUserInput"
            type="reset"
            class="btn btn-secondary ml-1 load-calc-widget__reset"
            :disabled="loading"
            @click="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutCalculatorWidget',

  props: {
    title: {
      type: String,
      default: 'Look up a report by VIN',
    },
    description: {
      type: String,
      default: 'asfddg',
    },
    placeholder: {
      type: Number,
      default: 0,
    },
    buttonLabel: {
      type: String,
      default: 'Calculate Results',
    },
  },

  emits: ['thr_lookup', 'thr_error', 'thr_purchase', 'thr_generate'],

  data: () => ({
    cookieName: 'loadCalculator',
    attempted: false,
    error: null,
    status: null,
    loading: false,
    fixedCost: 0,
    salary: 0,
    varCostPerMile: 0,
    verified: false,
    truckInfo: null,
    loads: [],
    defaultLoad: {
      quarterDays: 0,
      deadheadMiles: 0,
      loadedMiles: 0,
      totalMiles: 0,
      grossRate: 0,
    },
    fieldsToCheck: [
      'fixedCost',
      'salary',
      'varCostPerMile',
    ],
  }),

  computed: {
    hasUserInput() {
      let hasInput = false;
      this.fieldsToCheck.forEach((field) => {
        if (this[field] !== this.placeholder) hasInput = true;
      });
      return hasInput;
    },
  },

  created() {
    const cookie = this.getCookie();
    if (cookie) {
      const { payload } = JSON.parse(cookie);
      Object.entries(payload).forEach(([key, value]) => {
        if ((this[key] === this.placeholder || key === 'loads') && value) {
          this[key] = value;
        }
      });
    }
    if (this.loads.length === 0) {
      this.loads.push(this.defaultLoad);
    }
  },
  methods: {
    async setCookie(payload) {
      const expires = '';
      const value = JSON.stringify({payload});
      document.cookie = `${this.cookieName}=${(value || '')} ${expires}`;
    },
    addLoad() {
      this.loads.push(this.defaultLoad);
    },
    removeLoad(index) {
      this.loads = this.loads.splice(index, 1);
    },
    getCookie() {
      const nameEQ = `${this.cookieName}=`;
      const ca = document.cookie.split(';');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    reset() {
      this.fieldsToCheck.forEach((field) => { this[field] = 0; });
    },
    async handleSubmit() {
      this.error = null;
      this.status = null;
      this.loading = true;
      const { fixedCost, salary, varCostPerMile, loads } = this;
      const payload = { fixedCost, salary, varCostPerMile, loads };
      await this.setCookie(payload);
      this.loading = false;
      window.location = '/load-calculator/submit';
    },
  },

};
</script>
