import { getDicts } from "@/api/system/dict/data"
import _ from 'lodash'
const dictPromise = getDicts('store_in_schema').then(res => res.data)

//?传入一个字符串控制变量flag：值可以是response，控制map是否反转
export async function createMapping(flag){
  const dict  = await dictPromise

  function getSampleField(sample){
    const fields = []
    for(const key in sample){
      fields.push(key)
    }
    return fields
  }

  function getObjectMapping(sample){
    const fields = getSampleField(sample)
    const map = Object.fromEntries(dict.filter(f => fields.find(i => i === f.dictLabel)).map(m => ([m.dictValue, m.dictLabel])))
    if(flag === 'response'){
      return reverse(map)
    }else{
      return map
    }
  }

  //?map要不能一传到底，而要在判断出src是对象时动态生成
  function handler(src,sample){
    let dst = src
    //将map的键值里的值，作为新数据的键
    //进来先改字段名
    if(src instanceof Object && sample){
      // 借用源对象构造器，创建相同类型的新对象
      const constructor = Object.getPrototypeOf(src).constructor
      dst = new constructor()
      if(Array.isArray(src)){
        src.forEach((item,index)=>{
          dst[index] = handler(item,sample[0])
        })
      }else{
        //?动态生成map
        //?根据当前src来生成map
        const map = getObjectMapping(sample)

        for(const key in src){
          if(map[key]){
            dst[map[key]] = handler(src[key],sample[map[key]])
          }else{
            dst[key] = handler(src[key],sample[key])
          }
        }
      }
    }
    return dst
  }

  function reverse(mapping){
    const map = {}
    for(const key in mapping){
      const value = mapping[key]
      map[value] = key
    }
    return map
  }

  function map(data,sample){
    const result = handler(data,sample)
    return result
  }

  return _.curry(map)
}
