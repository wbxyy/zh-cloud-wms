分析比写代码更重要

校验 SugarEditTable
用 el-form 包裹 el-table，设置 el-form 的 :model 为 `tableData[currentIndex]`

分析比写代码更重要

table的列宽与单元格内元素宽度无关，只和column-width或页面宽度有关。必须在table组件中设置默认列宽，而不是在form-item中设置。
