## 分析比写代码更重要

### 将表单独自拆分成组件后，如何完成校验

将rules通过props传递到表单组件，然后在表单组件中用独立的form作用域包裹，以v-for完成form-item的注册，随后在组件内使用this.$refs.form.validate使用校验功能

SugarFieldsetCard构造自己的validate方法，其中调用this.$refs.form.validate，并将得到的promise的结果返回，或者将错误throw出

父组件调用sugarFieldsetCard时，通过调用this.$refs.sugarFieldsetCard.validate即可完成内部表单校验
rules规则放在formLabel中，在SugarFieldsetCard内部使用计算属性，将formLabel中的rule提取成entries，使用Object.fromEntries构造rules对象

表单优化：入仓日期默认是当天系统时间日期

## 分析比写代码更重要

SugarEditTable表格行的校验是否可以通过覆盖form-item完成

methodObj可以传递祖先方法，因为vue内部会对methods里的方法bind定义所在的vc实例

日期设置当天为默认值，是否可以在json中new Date()实现

选项的options如何传递，要不将options的接口放在data.js中

## 分析比写代码更重要

将这个组件融合到sugarForm中
