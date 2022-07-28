import Vue from "vue";
import { debounce } from "lodash";
import { Pagination } from "element-ui";
const elPaginationHack = {
  install: (Vue) => {
    //ElementUI分页回调添加防抖
    const onPagerClick = Pagination.components.Pager.methods.onPagerClick;
    Object.assign(Pagination.components.Pager.methods, {
      onPagerClick: debounce(
        function (...args) {
          //调用原方法
          onPagerClick.apply(this, args);
        },
        300,
        {
          leading: true,
          trailing: false,
        }
      ),
    });

    Vue.use(Pagination);
  },
};
Vue.use(elPaginationHack);
