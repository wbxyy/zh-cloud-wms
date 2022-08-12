import service from '@/utils/request'
import { transformData, transformSelect } from '@/utils/sugar'
import { createMapping } from '@/utils/createMapping'
import _ from 'lodash'

function getSchema(samplePair) {
  return {
    mapRequest: createMapping().then(map => map(_, samplePair.request)),
    mapResponse: createMapping('response').then(map => map(_, samplePair.response)),
    sample: samplePair.request
  }
}

const request = service.extend(service.defaults)

request.interceptors.request.use(async config => {
  // ? 允许重复提交
  // config.headers.repeatSubmit = false

  const schema = config.schema
  if (schema) {
    config.data = (await schema.mapRequest)(config.data)
    config.data = transformData(config.data, schema.sample)
  }
  config.data = transformSelect(config.data)
  config.params = transformSelect(config.params)
  return config
})

request.interceptors.response.unshift(async res => {
  const schema = res.config.schema
  if (schema) {
    res.data = (await schema.mapResponse)(res.data)
  }
  return res
})

export {
  getSchema,
  request
}
