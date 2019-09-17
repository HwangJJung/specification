import { checkStringLength } from '@src/utils/validationUtils'
import Specification from '@src/specification/Specification'
import { getProperty } from '@src/specification/utils'
type NameLengthSpecConfig = {
  label: string
  min: number
  max?: number
  error?: string
}

export const nameLegnthSpecification = (
  config: NameLengthSpecConfig = {
    label: '이름',
    min: 2,
  }
) => {
  return new Specification<String, NameLengthSpecConfig>({
    config,
    validator: (candidate, config) => {
      const { min, max } = config
      if (!checkStringLength(candidate, min, max)) {
        return false
      } else {
        return true
      }
    },
    errorMessenger: (candidate, config) => {
      const { label, min, max, error } = config
      return error || `${label}은 ${min}~${max}자 내로 입력해주세요.`
    },
    name: 'nameLegnthSpec',
  })
}
type IsSameStringSpecConfig = {
  oldString: string
  label?: string
}
export const isSameStringSpecification = (config: IsSameStringSpecConfig) => {
  const { oldString, label = '이름' } = config
  return new Specification<String, IsSameStringSpecConfig>({
    config: { oldString, label },
    validator: (candidate, config) => {
      const { oldString } = config
      if (oldString === candidate) {
        return false
      }
      return true
    },
    errorMessenger: (candidate, config) => {
      const { label } = config
      return `${label}이 이전과 같지 않아야합니다.`
    },
    name: 'isSameStringSpec',
  })
}

type QuerySpecConfig<T> = {
  query: string
  key: keyof T
}
export const querySpecification = <T>(config: QuerySpecConfig<T>) => {
  const { query, key } = config
  return new Specification<T, QuerySpecConfig<T>>({
    config: { query, key },
    validator: (target, config) => {
      const { query, key } = config
      let name: string = getProperty<T, string>(target, key).toLowerCase()
      name = name.toLowerCase()
      return name.includes(query.toLowerCase())
    },
    name: 'querySpec',
  })
}
