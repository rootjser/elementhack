import Vue from "vue";
import { Form } from "element-ui";
const elFormHack = {
  install: (Vue) => {
    /**
     * 给ElementUI from组件添加 阻止原生提交事件逻辑
     *
     * @see {@ https://element.eleme.io/#/zh-CN/component/form#form-item-methods}
     *
     */
    const eventPrevent = (e) => {
      e.preventDefault();
    };
    const autoPreventFormSubmitHack = {
      mounted() {
        this.$el.addEventListener("submit", eventPrevent);
      },
      beforeDestroy() {
        this.$el.removeEventListener("submit", eventPrevent);
      },
    };

    Object.assign(Form, {
      mixins: [...(Form.mixins || []), autoPreventFormSubmitHack],
    });

    Vue.use(Form);
  },
};
Vue.use(elFormHack);
