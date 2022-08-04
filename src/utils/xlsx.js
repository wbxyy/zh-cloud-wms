import xlsx from 'node-xlsx'
import {s2ab} from '@/utils/sugar'
import { saveAs } from 'file-saver'
import {nanoid} from 'nanoid'


export async function buildXlsx(data,fileName) {
  fileName = `${fileName}_${nanoid()}.xlsx` || `${nanoid()}.xlsx`
  const newBuffer = xlsx.build(data)
 saveAs(new Blob([s2ab(newBuffer)],{type:'application/octet-stream'}),fileName)
}
