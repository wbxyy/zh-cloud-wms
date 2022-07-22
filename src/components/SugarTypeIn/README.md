## 分析比写代码更重要

### 将el-form-item引入SugarInput之后，出现了不同场景下样式不适配的问题

对于普通表单，el-form-item的默认样式能够使用，对于表格行中内嵌的表单，则

1. label是不需要的，找到label相关的标签去掉
2. 元素应该100%宽，自制的.param-input影响到了
3. el-form-item有一个向下，向右的margin，这个要去掉

## 分析比写代码更重要

SugarTypeIn 应该写为控件分发器，通过动态组件 `<component :is="elInput"> ` 来分发不同的表单控件

作为一个控件分发器，虽然是使用is-attribute来动态渲染组件，但是每个input组件需要的props是不同的

input 需要 v-model,placeholder,disabled,clearable,slot

select 需要 filterable,v-model,disabled,placeholder,v-on,clearable,还有options,getOptions,watch:item.options

其他的例如

el-switch 需要 v-model,activeValue,inactiveValue

el-date-picker 需要 v-model,type,placeholder,start-placeholder,end-placeholder,range-separator,value-format

el-button 需要 type,v-on

通过分析最常用的输入组件input和select，我们得到如下的配置对象

```js
{
  key:'',//无论是form-item校验，还是渲染el-table-column都需要
  label:'',//也是给form-item做控件标签，还有el-table-column做列名
  inputType:'',//动态分配组件的依据
  rule:'',//检验输入控件
  renderGroup:'',//用el-card对控件分块，
  fixed:'',//el-table-column专用
  align:'',//el-table-column专用
  labelWidth:'',//el-table-column专用
  unit:'',//sugarEditTable专用
  computed:'',//计算值，需要sugarInput拦截处理
  filter:'',//sugarEditTable回显时的filter
  props:{
    placeholder:'',//输入控件的提示信息，需要支持默认值，简易值，全量值
    disabled:false,//控件禁用
    clearable:false,//控件重置
    options:{
      trigger:'',//需要sugarInput，或sugarSelect拦截处理
      resolve(){}//获取选项的接口，支持静态数据，promise值，返回promise值的函数
    },
    activeValue:'',
    inactiveValue:'',
    type:'',
    startPlaceholder:'',
    endPlaceholder:'',
    rangeSeparator:'',
    valueFormat:'',
  }
}

```

有了配置对象的模板，现在就要考虑配置对象的默认值，可以模仿Dict中的mergeRecursive，通过建立一个默认配置模板，然后以default配置为底，写入custom配置

默认配置模板如下

假设
```js
{
  key:undefined,//key是必填项，没有默认值
  label:'',//label的默认值是动态的，和index有关，比如label1,label2,label3
  inputType:undefined，//默认值是undefined，文本显示
  rule:undefined,//默认下没有校验规则
  renderGroup:undefined,//默认下没有卡片分割
  fixed:false,//el-table-column的fixed很坑，会让数据渲染2-3次，影流之主了属于是
  align:undefined,//el-table-column的默认值就是left，这里跟着它
  labelWidth:undefined,//默认不设置el-table-column的列宽
  unit:undefined,//默认没有单位
  computed:undefined,//默认下不是计算属性
  filter:undefined,//默认下没有filter,
  props:{
    placeholder:'',//优先使用显式指定，没有则判断是否要简写，简写就用label作为占位，非简写用`请输入${item.label}`占位
    disabled:false,//默认下不禁用
    clearable:true,//默认下提供清除按钮
    options:undefined,//默认下没options（毕竟只有select才有嘛，写不了默认值）
    activeValue:true,
    inactiveValue:false,
    type:undefined,//select的type为是否多选，button的type是样式，date-picker的type可以触发date-range,每个组件都不同
    startPlaceholder:undefined,//都是el-date-range的属性
    endPlaceholder:undefined,//同上
    rangeSeparator:undefined,//同上
    valueFormat:undefined,//同上
  }
}
```

我们发现了，像label,placeholder这种需要根据组件的prop，或遍历的形参来指定，这样默认也许要写成函数形式

而且有很多第三方组件属性不需要显式指定，此时用的是第三方组件自己内置的默认值，如：fixed,align,labelWidth,disabled,type,startPlaceholder,endPlaceholder,rangeSeparator,valueFormat,activeValue,inactiveValue,options

一些自己的组件属性也不需要默认值，因为这些属性都在组件内部都有判空守卫，如：unit,renderGroup,computed,filter

这一顿分析下来，就几个属性需要默认值

```js
{
  label(index){
    return `label${index}`
  },
  props:{
    placeholder(label,simple){//默认值，简易值，全量值
      return simple ? label : `请输入${label}`
    },
    clearable:true
  }
}
```

上面的函数参数，仅仅代表着需要哪些参数来构造值，真实情况需要看实际的封装情形。

实践发现，el-input,el-select等组件必须接受String类型的placeholder
