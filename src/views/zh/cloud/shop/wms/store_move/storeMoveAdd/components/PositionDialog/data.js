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
      if(typeof val === 'string'){
        const regExp = /(?<word>[\u4e00-\u9fa5]+)(?<number>[\d.]+)/
        const match = val.match(regExp)
        if(match && match.groups){
          const {word,number} = match.groups
          return `${word}${Math.round(Number(number||0)*100)/100}件`
        }
        return Math.round(Number(val||0))
      }
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

import _ from 'lodash'
export const formLabel = [
  {
    key:'position',
    label:'仓位',
    inputType:1,
    options:[],
    filterable:true,
  }
]
