export const tableColumns = [
  {
    key: 'warehouse',
    label: '仓库',
    width: '120px',
  },
  {
    key: 'position',
    label: '仓位',
    width: '100px',
  },
  {
    key: 'rest',
    label: '仓位剩余',
    width: '160px',
    filter(val){
      const regExp = /(?<word>[\u4e00-\u9fa5]+)(?<number>[\d.]+)/
      const match = val.match(regExp)
      if(match && match.groups){
        const {word,number} = match.groups
        return `${word}${Math.round(Number(number||0)*100)/100}件`
      }
      return val
    }
  },
  {
    key: 'warehouseRemark',
    label: '仓库备注',
     width: '120px',
  },
  {
    key: 'positionRemark',
    label: '仓位备注',
     width: '120px',
  }
]

import {warehousePositions} from '@api/wms/store_in'
import _ from 'lodash'
export function getPositionsOptions(id){
  return warehousePositions(id).then(res => {
    console.log(res);
    return res.data.map(item=>({
      label: item.position,
      value: item.position
    }))
  })
}
export const formLabel = [
  {
    key:'position',
    label:'仓位',
    inputType:1,
    options:{
      trigger:'$warehouseId',
      resolve(id){
        if(id){
          return getPositionsOptions(id)
        }
      }
    },
    filterable:true,
  }
]
