分析比写代码更重要

默认下el-form-item包裹多种el控件时，存在高度误差bug，导致下一行el控件摆放错误。

触发情景：el-button,el-switch,带prefix的el-input处于同一行时

解决方案：在全局样式sugar.scss中强制指定 .el-form-item--small .el-form-item--mini .el-form-item--medium 中的 .el-form-item__content 高度，如下

```scss
::v-deep .el-form-item--mini {
  margin-bottom: 10px;
  .el-form-item__content{
    height: 29px;
  }
}
```
