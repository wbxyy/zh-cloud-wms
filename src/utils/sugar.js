
import _ from 'lodash'

//? 转换函数，将组件formData和接口的sample融合，组合出带有幽灵属性的formData
//? 幽灵属性是指没有实际用处，但是必须传入的属性，通常为项目迭代时，数据库写好，后来废弃的属性。
/**
 *
 * @param {*} src 原formData
 * @param {*} sample swagger接口的请求示例sample
 * @returns 融合了幽灵属性的formData
 */
export function transformData(src,sample) {
  //普通类型或函数直接返回
  if (typeof src !== 'object' || src === null) {
    return src = src == null ? '' : src
  }

  // 借用源对象构造器，创建相同类型的新对象
  const constructor = Object.getPrototypeOf(src).constructor
  const dst = new constructor()


  // 如果遇到对象，将 sample 的同级对象作为火锅底料
  if(!Array.isArray(dst)){
    Object.assign(dst,sample)
  }

  // 递归：普通数据类型会直接返回，对象或数组则继续遍历复制
  Object.keys(src).forEach(k => {
    //如果遍历到数组，将sample[0]作为下一层递归的火锅底料，否则在火锅底料上加牛肉
    if(Array.isArray(dst)){
      dst[k] = transformData(src[k],sample[0])
    }else{
      if(sample.hasOwnProperty(k)){
        dst[k] = transformData(src[k],sample[k])
      }
    }
  })
  return dst
}

//select控件得到的数据是Object,包含了value和label，传给服务器只需要value，此时需要对所有select数据进行转换
export function transformSelect(target,key,value){
  //如果是数组，就遍历深入
  if(Array.isArray(value)){
    value.forEach((item,index)=>{
      transformSelect(value,index,item)
    })
  }

  //如果是对象，就检查，如果是select控件的数据就转换，其他的对象遍历深入
  if(typeof value === 'object'){
    //如果能取到label和value，则这是个select控件的数据，后期要增加特殊的属性sugarSelect，来标记这类数据
    if(_.get(value,'label') && _.get(value,'value')){
      //把select控件里的数据改成数据里面的value
      //第一层对象没有target和key，改不了
      console.log(target,key,value);

      target[key] = value.value

    }else{
      for(const key in value){
        transformSelect(value,key,value[key])
      }
    }
  }
  //其他数据return
  return

}

export function deepCopy(src){
  //普通类型或函数直接返回
  if (typeof src !== 'object' || src==null) {
    return src
  }

  // 借用源对象构造器，创建相同类型的新对象
  const constructor = Object.getPrototypeOf(src).constructor
  const dst = new constructor()

  // 递归：普通数据类型会直接返回，对象或数组则继续遍历复制
  Object.keys(src).forEach(k => {
    dst[k] = deepCopy(src[k])
  })

  return dst
}

function handler(data,map){
  //进来先改字段名
  if(Array.isArray(data)){
    data.forEach(item=>{
      handler(item,map)
    })
  }
  if(typeof data === 'object'){
    for(const key in data){
      if(map[key]){
        data[map[key]] = data[key]
        //把原来的键值删除
        // delete data[key]
        if(typeof data[key] !== 'object'){
          delete data[key]
        }
      }
      handler(data[key],map)
    }
  }

  return
}

export function resMapping(data,mapping){
  //对象反转,获得mapping
  const map = {}
  for(const key in mapping){
    const value = mapping[key]
    map[value] = key
  }
  //一个递归mapping的函数
  handler(data,map)
  return data
}

export function reqMapping(data,mapping){
  handler(data,mapping)
  return data
}
