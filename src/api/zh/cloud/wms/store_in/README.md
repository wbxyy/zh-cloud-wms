## 分析比写代码更重要

### 如何优雅地映射接口字段

使用字典：创建新字典，记录项目字段和接口字段映射。

字典作为映射的持久化，前端项目应该保留对应的schema文件，提供字段映射

已知存在 reqMapping 和 resMapping 双函数，用于深度优先地映射请求体，响应体

### 方案

调用字典接口获取字典，只需调用一次即可保存该Promise供后续使用

用字典构造schema。字典是一个对象数组。先根据字典键进行数组去重，通过map映射为entries数组，构造mapping对象

在请求/响应拦截器中，使用mapping对象映射请求体/请求params，还有响应体

### 实践

实践发现：我的字段，对应着多个接口字段，单独一个mapping无法得知我的字段，应该转换为哪一个系统字段

观看接口文档可得新的已知条件：请求示例sample

通过请求示例sample，可以得知一个接口应该传递哪些字段。通过sample构成键串数组，锁定mapping中的映射范围。

我的字段虽然对应着多个接口字段，但这种1对多的关系，只会在同时处理多个接口时发生。

sample可以将mapping中的映射锁定于一个接口，这样就将1对多关系的mapping，锁定为1对1关系的mapping


### 全部接口(20)
### 已完成接口(8)
  添加
  审核
  驳回
  删除
  详细
  列表
  修改
  修改sku



### 未完成接口(12)
  导出
  历史记录
  新增货物
  总览
  打印
  已删除记录
  回收站列表
  回收站详细
  回收站还原
  预约入仓明细
  预约入仓选择
  预约入仓添加
