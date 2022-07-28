import Vue from "vue";
import { Tree } from "element-ui";
import { merge } from "lodash";

const elTreeHack = {
  install: (Vue) => {
    const TreeBeforeClickHack = {
      props: {
        beforeClick: {
          type: Function,
          default: () => true,
        },
      },
    };

    const handleClick = Tree.components.ElTreeNode.methods.handleClick;
    merge(Tree.components.ElTreeNode, {
      methods: {
        /**
         * 重写handleClick给点击添加拦截
         */
        async handleClick(e) {
          const result = await this.tree.beforeClick({
            event: e,
            context: this,
          });
          if (!result) return;
          handleClick.apply(this, arguments);
        },
      },
    });

    merge(Tree, {
      mixins: [...(Tree.mixins || []), TreeBeforeClickHack],
    });

    Vue.use(Tree);
  },
};

Vue.use(elTreeHack);
