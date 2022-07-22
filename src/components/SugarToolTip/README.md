分析比写代码更重要

今日课题：优化 SugarToolTip


### 初版的 SugarToolTip，是作为父组件的根元素，通过绝对定位来显示。

缺点：计算复杂，父组件中需要做不必要的计算

获取父元素的左上角坐标，getBoundingClientRect().top 和 getBoundingClientRect().left

在父元素中产生 clickEvent，鼠标点击位置 pageX 和 pageY

再获取页面滚动距离 window.scrollX 和 window.scrollY

计算 pageX - left - scrollX 取得 SugarToolTip 需要显示的 left，同理取得 top

这样可以实现鼠标点击处产生toolTip的，但是需要在父组件中计算后传入 SugarToolTip，使用起来不方便，无法作为一个合格的组件

### 新版 SugarToolTip 采用固定定位，在window上绑定 clickEvent 决定显示位置，父组件调用 show() 控制显示;

由 SugarToolTip 决定位置，由父组件控制显示。

position:fixed 配合window上的点击事件，得到鼠标 clientX 和 clientY 就能定位 SugarToolTip

window上绑定点击事件，会让toolTip在任何位置上显示。但我们只想通过父组件触发显示，并限制显示范围。

*思路* SugarToolTip 出现时， show 为 true，自身有 left 和 top

show 是由子孙元素触发，仅传入显示内容。

closeToolTip() 由父组件控制

父组件中绑定 clickEvent，如果点击到子孙元素以外，则 closeToolTip()，这是一种方案(bushi)

能不能在showToolTip的时候就判断是否show？不行，showToolTip只由子孙元素触发，点击其他兄弟元素是无法处理已经显示成功的toolTip的。

这就是window上绑定点击事件的弊端，将无法限定toolTip的显示位置

*新的问题* 如何限定 toolTip 的显示位置

SugarToolTip 可以限制自己的显示位置吗？除非sugarToolTip内部可以得到dom结构，获取自己父级节点，然后将自己限定在父级节点内部

SugarToolTip 内部维护一个 $parentNode，其值为自己组件$el的 parentNode

将window上绑定点击事件，改成在 $parentNode 上绑定事件

将el-table使用一个div包裹，然后将SugarToolTip作为兄弟元素。

这样就能将 SugarToolTip 限制在 div 中，由于 SugarTollTip 脱离了文档流，el-table占据整个div，因此SugarToolTip 被限制在 el-table 中
