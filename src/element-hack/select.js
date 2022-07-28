import Vue from "vue";
import { Select } from "element-ui";
const elSelectSuffixHack = {
  install: (Vue) => {
    const selectSuffixHack = {
      props: {
        rightScopedSlots: {
          type: Object,
        },
      },
      mounted() {
        if (this.rightScopedSlots) {
          this._selectSuffixTips = new Vue(this.rightScopedSlots).$mount();
          this.$el.appendChild(this._selectSuffixTips.$el);
        }
      },
      beforeDestroy() {
        const selectSuffixTips = this._selectSuffixTips;
        if (selectSuffixTips) {
          selectSuffixTips.$destroy();
          selectSuffixTips.$off();
          selectSuffixTips.$el.parentNode.removeChild(selectSuffixTips.$el);
        }
      },
    };

    Object.assign(Select, {
      mixins: [...(Select.mixins || []), selectSuffixHack],
    });

    Vue.use(Select);
  },
};
Vue.use(elSelectSuffixHack);
