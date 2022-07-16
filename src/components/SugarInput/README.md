分析比写代码更重要

将el-form-item引入SugarInput之后，出现了不同场景下样式不适配的问题

对于普通表单，el-form-item的默认样式能够使用，对于表格行中内嵌的表单，则

1. label是不需要的，找到label相关的标签去掉
2. 元素应该100%宽，自制的.param-input影响到了
3. el-form-item有一个向下，向右的margin，这个要去掉
