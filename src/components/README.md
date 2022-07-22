### 分析比写代码更重要


### 前期概览

最开始的两周封装了6个自制组件，它们都是构成表格、表单的基础单位

SugarToolTip 是自制的气泡组件，用于对table单元格省略内容的气泡显示，后续可以考虑el-popper

SugarScrollBar 是自制的横向滚动条组件，用于实现table的固定横向滚动条，防止表格过长，需要滑动到页面底部才能看到横滚的情况

SugarForm 是自制的动态渲染表单，集成了响应式布局，数据驱动渲染，表单校验。通过传入特定 Json 即可生成表单

SugarFieldsetCard 是自制的动态渲染表单，后续考虑合并到 SugarForm

SugarTypeIn 是根据传入的 inputType 渲染不同类型 element-input 的组件

SugarEditTable 是自制的可编辑 table，有行内编辑和表单编辑两种模式。

### 后期考虑

封装 SugarTable，将气泡和横滚集成到 table 中

将 SugarFieldsetCard 的逻辑合并到 SugarForm 中

给 SugarEditTable 添加气泡校验信息（遇到坑了，el-table会渲染3次，导致3个气泡）

给 SugarEditTable 添加向下复制功能

给 SugarEditTable 添加键盘事件

为了方便前期开发，目前每个组件都共用一个全局样式文件 sugar.scss，后续将样式封装到各自组件中。

给 SugarTable 添加无缝滚动（虚拟数据切割）

### 实现难点

el-table会将数据渲染3遍，左右固定列，还有正常列

这样就导致了在el-table中使用带气泡的组件，例如el-select，popover会发出3个气泡，比如在通过指令，或者form-item校验这种脚本式交互时，很容易发生。





### 小剧场

SugarEditTable 的气泡校验信息要实现怎样的效果？

输入的时候不进行校验，只有提交时才进行校验
校验时，不符合要求的单元格全部放出气泡
鼠标移动到气泡上时，整行气泡要消失，鼠标移动开后要显示（给气泡添加hover事件，或者给气泡添加mouseenter，给表格行添加mouseleave）
