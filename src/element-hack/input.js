/**
 * 重写elementui中input组件
 */
import Vue from "vue";
import { Input } from "element-ui";
import { removeClass, addClass, on } from "element-ui/lib/utils/dom";
const elInputHack = {
  install: (Vue) => {
    const autoCompleteHack = {
      props: {
        /**控制初始是否默认关闭密码框密码填充功能
         * 传false时即可关闭mounted中dom操作的逻辑
         * 如登录页面的填充还是有必要
         */
        defaultOffAutoCompletionPassword: {
          type: Boolean,
          default: true,
        },
      },
      mounted() {
        if (this.defaultOffAutoCompletionPassword && this.type == "password") {
          this.$refs?.input.setAttribute("autocomplete", "new-password");
        }
      },
    };

    const handlePasswordVisible = Input.methods.handlePasswordVisible;

    const ClassMap = {
      open: "my-icon-eyes-open",
      close: "my-icon-eyes-close",
    };
    const passwordEyeIconHack = {
      props: {
        changePasswordEyeIcon: {
          type: Boolean,
          default: true,
        },
      },
      mounted() {
        if (this.toggleEyeIcon) {
          on(this.getInput(), "focus", () => {
            this.innerEyeDomHack();
          });
        }
      },
      computed: {
        toggleEyeIcon: {
          get() {
            return (
              this.showPassword &&
              this.changePasswordEyeIcon &&
              this.type !== "textarea"
            );
          },
        },
      },
      methods: {
        innerEyeDomHack(element) {
          this.$nextTick(() => {
            element =
              element ||
              this.$el.querySelector(
                ".el-input__suffix-inner .el-input__icon.el-icon-view"
              );
            if (this.toggleEyeIcon) {
              const type = this.getInput().getAttribute("type");
              if (type === "password") {
                removeClass(element, ClassMap.open);
                addClass(element, ClassMap.close);
              } else {
                removeClass(element, ClassMap.close);
                addClass(element, ClassMap.open);
              }
            }
          });
        },
      },
    };

    Object.assign(Input, {
      mixins: [...(Input.mixins || []), autoCompleteHack, passwordEyeIconHack],
    });
    Object.assign(Input.methods, {
      handlePasswordVisible(...args) {
        handlePasswordVisible.apply(this, args);
        this.innerEyeDomHack(args[0].target);
      },
    });

    Vue.use(Input);
  },
};
Vue.use(elInputHack);
