分析比写代码更重要

SugarEditTable校验问题
其中使用的表单式填写，在编辑时应该校验`tableData[index]`，在新增时应该校验`row`
table行内表单应该时刻校验`tableData[index]`

分析比写代码更重要

todo:table的列宽与cell内元素宽度无关，只和column-width或页面宽度有关。要想根据表单元素设置默认列宽，必须在table组件中设置默认的table-column，而不是在form-item中设置。
