#### 分析比写代码更重要

##### 仓位表格

数据接口：selectPosition

请求参数：

```js
params:{
  pageNum:'1',
  pageSize:'10000',
  position:'$positionId',
  $warehouseId:'$warehouseId',
}
```

数据接口：warehousePositions

请求参数:

```js
//path参数:$warehouseId
```

#### 表单

仓位下拉框，使用warehousePositions来获取，需要监听$warehouseId调用数据接口

数据表格，使用selectPosition来获取，需要传入$warehouseId,可以传入$positionId
