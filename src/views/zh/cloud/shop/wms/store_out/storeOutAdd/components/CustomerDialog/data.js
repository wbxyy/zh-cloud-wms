
import { customerStoreOutOptions, warehouseStoreOutOptions } from '@api/wms/preFetch'


export const tableColumns = [
  {
    key: 'customerName',
    label: '客户',
    align: 'left',
    fixed: false,
    width: '250px',
    renderGroup: '基本货物信息',
  },
  {
    key: 'number',
    label: '剩余件数',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'totalWeight',
    label: '剩余重量（吨）',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'lowerLimit',
    label: '锁仓线',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'pledgeAlert',
    label: '担保提示金额',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
  {
    key: 'pledgeTotal',
    label: '货物担保总金额',
    align: 'left',
    fixed: false,
    width: '120px',
    renderGroup: '基本货物信息',
    filter(val){
      return Math.round(val*100)/100
    }
  },
]

export const formLabel = [
  {
    key:'customerName',
    label:'客户',
    inputType:1,
    options:customerStoreOutOptions,
    filterable:true,
    // error:'客户没货时sql错误，佛山东源纺贸有限公司'
  },
  {
    key:'$warehouseId',
    label:'仓库',
    inputType:1,
    options:warehouseStoreOutOptions,
    filterable:true,
    // error:'仓库没有货时sql错误，禅城罗格仓'
  }
]
