import Vue from "vue";
import { debounce, throttle } from "lodash";
import { Table, TableColumn } from "element-ui";
const elTableHack = {
  install: (Vue) => {
    //ElementUI排序回调添加防抖
    const handleSortClick =
      Table.components.TableHeader.methods.handleSortClick;
    Object.assign(Table.components.TableHeader.methods, {
      //此方法为排序触发的事件，添加防抖，和search频率同步，
      handleSortClick: debounce(
        function (...args) {
          //调用原方法
          handleSortClick.apply(this, args);
          //模拟一个body上的点击事件，主动触发body上的委托 ，触发el-popover等组件的关闭
          //   DomUtils.bodyClick();
          document.querySelector("body").click();
        },
        300,
        {
          leading: true,
          trailing: false,
        }
      ),
    });

    Object.assign(TableColumn, {
      mixins: [
        {
          props: {
            maxWidth: {
              type: Number,
              default: 200,
            },
          },
          mounted() {
            this.columnConfig.maxWidth = this.maxWidth;
          },
        },
      ],
    });

    function getTextWidth(text, font = "12px") {
      var canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
    }

    Object.assign(Table.mixins, [
      ...Table.mixins,
      {
        watch: {
          data() {
            this.layout.updateColumnsWidth();
            this.$nextTick(() => {
              this.layout.updateElsHeight();
            });
          },
        },
        mounted() {
          const that = this;
          this.layout.updateColumnsWidth = throttle(
            function () {
              if (this.$isServer) return;
              const fit = this.fit;
              const bodyWidth = this.table.$el.clientWidth;
              let bodyMinWidth = 0;

              const flattenColumns = this.getFlattenColumns();
              let flexColumns = flattenColumns.filter(
                (column) => typeof column.width !== "number"
              );

              flexColumns.forEach((column) => {
                let minWidth = 0;
                let width = 0;
                let maxWidth = 200;
                if (column) {
                  minWidth = parseFloat(column.minWidth) || 0;
                  width = parseFloat(column.width) || 0;
                  maxWidth = parseFloat(column.maxWidth) || 200;
                }
                if (width) {
                  return;
                }
                const cells = [
                  ...that.$el.querySelectorAll(`td.${column.id}`),
                  ...that.$el.querySelectorAll(`th.${column.id}`),
                ];

                // 当前列最大cell
                const maxCell = cells.reduce(
                  (pre, cell) => {
                    const text = cell.innerText.replace(/\s/g, "");
                    const textWidth = getTextWidth(text);
                    if (textWidth > pre.textWidth) {
                      pre.text = text;
                      pre.cell = cell;
                      pre.textWidth = textWidth;
                    }
                    return pre;
                  },
                  {
                    cell: null,
                    text: "",
                    textWidth: 0,
                  }
                );
                let res = 0;
                if (maxCell.cell) {
                  maxCell.cell.classList.add("for-count-cell");
                  res = (maxCell.cell.scrollWidth || 0) + 20;
                  maxCell.cell.classList.remove("for-count-cell");
                }
                const max = Math.max(res, minWidth);
                const dist = Math.min(maxWidth, max);
                column.minWidth = dist;
              });

              flattenColumns.forEach((column) => {
                // Clean those columns whose width changed from flex to unflex
                if (typeof column.width === "number" && column.realWidth)
                  column.realWidth = null;
              });

              if (flexColumns.length > 0 && fit) {
                flattenColumns.forEach((column) => {
                  bodyMinWidth += column.width || column.minWidth || 80;
                });

                const scrollYWidth = this.scrollY ? this.gutterWidth : 0;

                if (bodyMinWidth <= bodyWidth - scrollYWidth) {
                  // DON'T HAVE SCROLL BAR
                  this.scrollX = false;

                  const totalFlexWidth =
                    bodyWidth - scrollYWidth - bodyMinWidth;

                  if (flexColumns.length === 1) {
                    flexColumns[0].realWidth =
                      (flexColumns[0].minWidth || 80) + totalFlexWidth;
                  } else {
                    const allColumnsWidth = flexColumns.reduce(
                      (prev, column) => prev + (column.minWidth || 80),
                      0
                    );
                    const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
                    let noneFirstWidth = 0;

                    flexColumns.forEach((column, index) => {
                      if (index === 0) return;
                      const flexWidth = Math.floor(
                        (column.minWidth || 80) * flexWidthPerPixel
                      );
                      noneFirstWidth += flexWidth;
                      column.realWidth = (column.minWidth || 80) + flexWidth;
                    });

                    flexColumns[0].realWidth =
                      (flexColumns[0].minWidth || 80) +
                      totalFlexWidth -
                      noneFirstWidth;
                  }
                } else {
                  // HAVE HORIZONTAL SCROLL BAR
                  this.scrollX = true;
                  flexColumns.forEach(function (column) {
                    column.realWidth = column.minWidth;
                  });
                }

                this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
                this.table.resizeState.width = this.bodyWidth;
              } else {
                flattenColumns.forEach((column) => {
                  if (!column.width && !column.minWidth) {
                    column.realWidth = 80;
                  } else {
                    column.realWidth = column.width || column.minWidth;
                  }

                  bodyMinWidth += column.realWidth;
                });
                this.scrollX = bodyMinWidth > bodyWidth;

                this.bodyWidth = bodyMinWidth;
              }

              const fixedColumns = this.store.states.fixedColumns;

              if (fixedColumns.length > 0) {
                let fixedWidth = 0;
                fixedColumns.forEach(function (column) {
                  fixedWidth += column.realWidth || column.width;
                });

                this.fixedWidth = fixedWidth;
              }

              const rightFixedColumns = this.store.states.rightFixedColumns;
              if (rightFixedColumns.length > 0) {
                let rightFixedWidth = 0;
                rightFixedColumns.forEach(function (column) {
                  rightFixedWidth += column.realWidth || column.width;
                });

                this.rightFixedWidth = rightFixedWidth;
              }

              this.notifyObservers("columns");
            }.bind(this.layout),
            100
          );
        },
      },
    ]);

    Vue.use(Table);
  },
};
Vue.use(elTableHack);
