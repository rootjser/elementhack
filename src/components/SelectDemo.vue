<script>
import { Select, Option } from "element-ui";
export default {
  comments: { Select, Option },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      value: "",
    };
  },
  render() {
    return (
      <Select
        v-model={this.value}
        rightScopedSlots={{
          render() {
            return <span>这是额外添加的内容</span>;
          },
        }}
      >
        {this.options.map((it) => (
          <Option key={it.label} value={it.value} label={it.label}></Option>
        ))}
      </Select>
    );
  },
};
</script>