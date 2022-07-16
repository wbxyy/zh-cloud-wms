分析比写代码更重要

今日课题：实现多选框控制列显示

思路：
1、通过data保存列名
2、通过多选框实现computed过滤列名
3、模板中使用v-for渲染column项
4、通过v-if来确定显示的样式

结果：可以使用全局组件：RightToolbar 中定制的隐藏列名功能。我们父组件只要传columns数据，元素携带 visible 和 key 属性即可。

通过 RightToolbar 管理 visible 状态，使用 columns 动态渲染 table，使用计算属性对 columns 进行 filter 即可隐藏列

分析比写代码更重要

今日课题：实现自定义的贴底横向滚动条，该滚动条的值，与 table 的横向滚动条绑定

思路：
1、定义 sugarScrollBar 组件，写好样式和结构
2、组件内实现滚动条交互：

第一步：
轨道relative
滚轮absolute
控制滚轮的left属性，让滚轮在轨道上行走，设置min和max限制滚轮不要走出轨道

第二步：
mounted钩子中添加事件：mousedown,mouseup,mousemove
滚轮绑定mousedown,鼠标下落触发时，给window绑定mousemove。
给window绑定mouseup来移除mousemove事件

第三步：
mousedown后，确定轨道最左侧坐标
mousemove后，鼠标事件的pageX是鼠标在window上的坐标，pageX - 轨道最左侧坐标，得到滚轮在轨道中的left
