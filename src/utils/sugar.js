
import _ from 'lodash'

//? 转换函数，将组件formData和接口的sample融合，组合出带有幽灵属性的formData
//? 幽灵属性是指没有实际用处，但是必须传入的属性，通常为项目迭代时，数据库写好，后来废弃的属性。
/**
 * 此方法不修改原对象
 * @param {*} src 请求体对象
 * @param {*} sample swagger接口的请求示例sample
 * @returns 融合了幽灵属性的请求体对象
 */
export function transformData(src,sample) {
  let dst = src??""
  if(src instanceof Object && sample instanceof Object){
    // 借用源对象构造器，创建相同类型的新对象
    const constructor = Object.getPrototypeOf(src).constructor
    dst = new constructor()

    // 如果遇到对象，将 sample 的同级对象作为火锅底料
    if(!Array.isArray(src)){
      Object.assign(dst,sample)
    }

    // 递归：普通数据类型会直接返回，对象或数组则继续遍历复制
    Object.keys(src).forEach(k => {
      //如果遍历到数组，将sample[0]作为下一层递归的火锅底料，否则在火锅底料上加牛肉
      if(Array.isArray(src)){
        dst[k] = transformData(src[k],sample[0])
      }else if(sample.hasOwnProperty(k)){
        //sample有这个属性，且sample也是对象，才深入探索
        dst[k] = transformData(src[k],sample[k])
      }
    })
  }

  return dst
}

//select控件得到的数据是Object,包含了value和label，传给服务器只需要value，此时需要对所有select数据进行转换
/**
 * 此方法不修改原对象
 * @param {*} src 源数据
 * @param {*} target 源数据所在对象
 * @param {*} key  源数据在所在对象中的Key
 * @returns
 */
export function transformSelect(src,target,key){
  let dst = src
  if(src instanceof Object){
     // 借用源对象构造器，创建相同类型的新对象
    const constructor = Object.getPrototypeOf(src).constructor
    dst = new constructor()

    //如果是数组，就遍历深入
    if(Array.isArray(src)){
      src.forEach((item,index)=>{
        dst[index] = transformSelect(item,src,index)
      })
    }else if(src.hasOwnProperty('label') && src.hasOwnProperty('value')){
      //如果是对象，就检查，如果是select控件的数据就转换，其他的对象遍历深入
      //如果能取到label和value，则这是个select控件的数据，后期要增加特殊的属性sugarSelect，来标记这类数据
      //把select控件里的数据改成数据里面的value
      //第一层对象没有target和key，改不了
      dst = src.value
    }else{
      for(const key in src){
        dst[key] = transformSelect(src[key],src,key)
      }
    }
  }
  //其他数据return
  return dst
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

function handler(src,map){
  let dst = src
  //将map的键值里的值，作为新数据的键
  //进来先改字段名
  if(src instanceof Object){
     // 借用源对象构造器，创建相同类型的新对象
    const constructor = Object.getPrototypeOf(src).constructor
    dst = new constructor()
    if(Array.isArray(src)){
      src.forEach((item,index)=>{
        dst[index] = handler(item,map)
      })
    }else{
      for(const key in src){
        if(map[key]){
          dst[map[key]] = handler(src[key],map)
        }else{
          dst[key] = handler(src[key],map)
        }
      }
    }
  }
  return dst
}

/**
 * 此方法会修改原对象
 * @param {*} data 响应体
 * @param {*} mapping 接口字段映射
 * @returns
 */
export function mapResponse(data,mapping){
  //对象反转,获得mapping
  const map = {}
  for(const key in mapping){
    const value = mapping[key]
    map[value] = key
  }
  //一个递归mapping的函数
  const result = handler(data,map)
  return result
}

/**
 * 此方法会修改原对象
 * @param {*} data 请求体
 * @param {*} mapping 接口字段映射
 * @returns
 */
export function mapRequest(data,mapping){
  const result = handler(data,mapping)
  return result
}

/**
 *
 * @param {*} sample swagger接口的请求示例sample
 * @returns sample里所有字段，数组结构
 */
export function getSampleField(sample){

  function dive(sample){
    let arr = []
    if(Array.isArray(sample)){
      //这里会要接住战场1的同学
      sample.forEach(item=>{
        arr = arr.concat(dive(item))
      })
    }else if(typeof sample === 'object' && sample!==null){
      //收集我的key
      //这里要接住战场2的同学
      Object.keys(sample).forEach(key=>{
        arr = arr.concat(key)
        //边收集还要边看看value，准备俯冲
        if(Array.isArray(sample[key])){
          //俯冲，进战场1
          arr = arr.concat(dive(sample[key]))
        }else if(typeof sample[key] === 'object'){
          //俯冲，进战场2
          arr = arr.concat(dive(sample[key]))
        }
      })
    }
    return arr
  }
  return [...new Set(dive(sample))]
}

/**
 *
 * @param {*} dict 字典
 * @param {*} sample swagger接口的请求示例sample
 * @returns 接口字段映射
 */
export function getSampleMapping(dict,sample){
  const fields = getSampleField(sample)
  return Object.fromEntries(dict.filter(f => fields.find(i => i === f.dictLabel)).map(m => ([m.dictValue, m.dictLabel])))
}


/**
 *
 * @param {*} target 对象
 * @param {*} key 函数名
 * @param {*} wrapper 包裹函数
 * @returns 包裹原函数的函数
 */
export function wrap(target,key,wrapper){
  const fn = target[key]
  return function(...args){
    args.unshift(fn);
    return wrapper.apply(this,args)
  }
}
