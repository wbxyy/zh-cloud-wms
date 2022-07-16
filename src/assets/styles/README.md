分析比写代码更重要

默认下el-form-item包裹不同表单控件时，其高度会产生1px的误差，这会导致下一个el-row的el-form-item错位。

出现情况有：包裹el-button,el-switch,带prefix的el-input

解决方案：在全局样式sugar.scss中强制指定 .el-form-item--small .el-form-item--mini .el-form-item--medium 中的 .el-form-item__content 高度，如下

```scss
::v-deep .el-form-item--mini {
  margin-bottom: 10px;
  .el-form-item__content{
    height: 29px;
  }
}
```
