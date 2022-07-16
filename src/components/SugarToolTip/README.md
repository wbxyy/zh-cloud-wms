分析比写代码更重要

今日课题：优化 SugarToolTip


### 初版的 SugarToolTip，是作为父组件的根元素，通过绝对定位来显示。

缺点是需要获取父元素的左上角坐标，即 getBoundingClientRect().top 和 getBoundingClientRect().left
然后在父元素中的某个子孙元素中产生点击事件 clickEvent，获取鼠标点击后的 pageX 和 pageY
最后再获取页面滚动距离 window.scrollX 和 window.scrollY

计算 pageX - left - scrollX 取得 SugarToolTip 需要显示的 left，同理取得 top

这种做法可以实现鼠标点击处产生toolTip的效果，但是计算比较复杂，且需要在父组件中计算后传入 SugarToolTip，使用起来不方便，无法作为一个合格的全局组件

### 新版 SugarToolTip 采用固定定位，通过在window上绑定点击事件决定显示位置；通过父组件调用show方法来控制显示;

思路就是位置和显示逻辑分开，由 SugarToolTip 自己决定位置，由父组件控制显示

固定定位配合window上的点击事件，只需要得到 clickEvent 的 clientX 和 clientY 就能定位 SugarToolTip

window上绑定点击事件，会让toolTip在任何位置上显示。其实我们只想通过父组件的子孙元素触发显示，并将显示范围限制在子孙元素内。

*思路* SugarToolTip 出现在页面时，此时 show 为 true，并且自身有 left 和 top

show 是由子孙元素触发，仅传入显示内容。

何时触发closeToolTip，只能由父组件控制

在父组件中绑定点击，如果点击到子孙元素以外，则closeToolTip，这是一种方案

能不能在showToolTip的时候就判断是否show？不行，showToolTip只由子孙元素触发，点击其他兄弟元素是无法处理已经显示成功的toolTip的。

这就是window上绑定点击事件的弊端，将无法限定toolTip的显示位置

*新的问题* 如何限定 toolTip 的显示位置

SugarToolTip 可以限制自己的显示位置吗？除非sugarToolTip内部可以得到dom结构，获取自己父级节点，然后将自己限定在父级节点内部

SugarToolTip 内部维护一个 $parentNode，其值为自己组件$el的 parentNode

将window上绑定点击事件，改成在 $parentNode 上绑定事件

将el-table使用一个div包裹，然后将SugarToolTip作为兄弟元素。

这样就能将 SugarToolTip 限制在 div 中，由于 SugarTollTip 脱离了文档流，el-table占据整个div，因此SugarToolTip 被限制在 el-table 中
