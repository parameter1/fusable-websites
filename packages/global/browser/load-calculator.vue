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
        <div class="cost">
          <legend class="load-calc-widget__title h3 w-auto">Cost</legend>
          <legend class="p small info w-auto">Enter cost information</legend>
          <fieldset class="border mb-3 cost-block">
            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Fixed cost per day under load</div>
                <input
                  ref="input"
                  v-model="fixedCost"
                  class="form-control load-calc-widget__fixedCost"
                  type="number"
                  min="0.00"
                  max="250000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Salary per day under load</div>
                <input
                  ref="input"
                  v-model="salary"
                  class="form-control load-calc-widget__salary"
                  type="number"
                  min="0.00"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Vairable cost per mile</div>
                <input
                  ref="input"
                  v-model="varCostPerMile"
                  class="form-control load-calc-widget__varCostPerMile"
                  type="number"
                  min="0.00"
                  step="0.05"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>
          </fieldset>
        </div>
        <legend class="load-calc-widget__title h3 w-auto">
          Load Information
        </legend>
        <legend class="p small info w-auto">
          Enter Load Information for one or more loads
        </legend>
        <div
          v-for="(load, index) in loads"
          :key="index"
          class="load border mb-3"
        >
          <legend class="load-calc-widget__title h6 w-auto">
            Load {{ index + 1 }}
            <span
              v-if="index !== 0"
              class="load-calc-widget__remove-btn"
            >
              <a
                href="javascript:void(0)"
                role="button"
                @click="removeLoad(index)"
              >
                Remove
              </a>
            </span>
          </legend>
          <fieldset class="load-block">
            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Days to haul the load(in 1/4 days)</div>
                <input
                  ref="input"
                  v-model="load.quarterDays"
                  class="form-control load-calc-widget__quarterDays"
                  type="number"
                  min="0.00"
                  step="0.25"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Deadhead Miles</div>
                <input
                  ref="input"
                  v-model="load.deadheadMiles"
                  class="form-control load-calc-widget__deadheadMiles"
                  type="number"
                  min="1"
                  step="1"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Loaded Miles</div>
                <input
                  ref="input"
                  v-model="load.loadedMiles"
                  class="form-control load-calc-widget__loadedMiles"
                  type="number"
                  min="1"
                  step="1"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Total miles</div>
                <div class="load-calc-widget__totalMiles">
                  {{ Number(load.loadedMiles) + Number(load.deadheadMiles) }}
                </div>
              </label>
            </div>

            <div class="load-calc-widget__form-group">
              <label class="load-calc-widget__label p-3">
                <div class="load-calc-widget__label-text">Gross Rate</div>
                <input
                  ref="input"
                  v-model="load.grossRate"
                  class="form-control load-calc-widget__grossRate"
                  type="number"
                  min="0.00"
                  max="2500000"
                  :readonly="loading"
                  :placeholder="placeholder"
                  required
                >
              </label>
            </div>
          </fieldset>
        </div>
        <div class="load-calc-widget__buttons">
          <a
            v-if="hasUserInput"
            href="javascript:void(0)"
            role="button"
            class="btn btn-secondary ml-1 load-calc-widget__add-load"
            :disabled="loading"
            @click="addLoad()"
          >
            Add Load
          </a>
        </div>

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
      default: 'Load Analyzer',
    },
    description: {
      type: String,
      default: '',
    },
    placeholder: {
      type: Number,
      default: 0.00,
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
      const newLoad = { ...this.defaultLoad };
      this.loads.push(newLoad);
    }
  },
  methods: {
    async setCookie(payload) {
      const expires = '';
      const value = JSON.stringify({payload});
      document.cookie = `${this.cookieName}=${(value || '')} ${expires}`;
    },
    addLoad() {
      const newLoad = { ...this.defaultLoad };
      this.loads.push(newLoad);
    },
    removeLoad(index) {
      this.loads.splice(index);
    },
    getCookie() {
      const nameEQ = `${this.cookieName}=`;
      const ca = document.cookie.split(';');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    reset() {
      this.fieldsToCheck.forEach((field) => { this[field] = 0; });
      this.loads = [this.defaultLoad];
    },
    async handleSubmit() {
      this.error = null;
      this.status = null;
      this.loading = true;
      const {
        fixedCost,
        salary,
        varCostPerMile,
        loads,
      } = this;
      await this.setCookie({
        fixedCost,
        salary,
        varCostPerMile,
        loads,
      });
      this.loading = false;
      window.location = '/load-calculator/submit';
    },
  },

};
</script>
