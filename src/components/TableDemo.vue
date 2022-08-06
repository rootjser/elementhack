<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.tableData = [
        {
          date: "2016-05-02",
          name: "海市金沙",
          address: "上海市普陀区金沙江路 1518 弄",
          address1: "陀区金沙",
          address2: "陀区金沙",
          address3: "陀区金沙金沙",
          address4: "陀区金沙金沙金沙",
          address5: "陀区金沙",
          address6: "陀区金沙金沙",
          address7: "陀区金沙金沙金沙金金沙金沙金金沙金沙金金沙",
          address8: "陀区金沙22",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          address1: "陀区金沙",
          address2: "陀区金沙",
          address3: "陀区金沙金沙",
          address4: "陀区金沙金沙金沙",
          address5: "陀区金沙",
          address6: "陀区金沙金沙金沙金金沙金沙金金沙",
          address7: "陀区金沙金沙",
          address8: "陀区金沙22",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address:
            "上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路",
          address1: "陀区金沙",
          address2: "陀区金沙",
          address3: "陀区金沙金沙金沙金金沙金沙金金沙金沙金金沙",
          address4: "陀区金沙金沙金沙",
          address5: "陀区金沙",
          address6: "陀区金沙金沙",
          address7: "陀区金沙金沙",
          address8: "陀区金沙22",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          address1: "陀区金沙",
          address2: "陀区金沙",
          address3: "陀区金沙金沙",
          address4: "陀区金沙金沙金金沙金沙金金沙金沙金金沙金沙金沙",
          address5: "陀区金沙",
          address6: "陀区金沙金沙",
          address7: "陀区金沙金沙",
          address8: "陀区金沙22",
          dom: (
            <div>
              海市普陀区金沙海市普陀区金沙海市普陀区金沙海市普陀区金沙
              <div>
                海市普陀区金沙海市普陀区金沙海市普陀区金沙海市普陀区金沙
              </div>
              <div>
                海市普陀区金沙海市普陀区金沙海市普陀区金沙海市普陀区金沙
              </div>
            </div>
          ),
        },
      ];
    });
  },
  render(h) {
    return (
      <el-table data={this.tableData} style="width: 100%">
        <el-table-column
          sortable
          prop="date"
          label="日期"
          width="180"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address1" label="地址1"></el-table-column>
        <el-table-column prop="address2" label="地址2"></el-table-column>
        <el-table-column prop="address3" label="地址3"></el-table-column>
        <el-table-column prop="address4" label="地址4"></el-table-column>
        <el-table-column prop="address5" label="地址5"></el-table-column>
        <el-table-column prop="address6" label="地址6"></el-table-column>
        <el-table-column prop="address7" label="地址7"></el-table-column>
        <el-table-column prop="address8" label="地址8"></el-table-column>
        <el-table-column prop="dom" label="备注"></el-table-column>
      </el-table>
    );
  },
};
</script>

<style>
/** 用于不换行计算最大宽度 */
.for-count-cell {
  display: inline-block !important;
  white-space: nowrap !important;
  width: auto !important;
  overflow: auto !important;
}
/** 最多两行 */
.el-table__cell .cell {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  font-weight: 400;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}
</style>