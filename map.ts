import Specification from '@src/specification/Specification'
import { getProperty } from '@src/specification/utils'
interface Map<T> {
  [key: number]: T
}
type ContainSpecConfig<T> = {
  map: Map<T>
  key: keyof T
}

const containValidator = <T>(candidate, config) => {
  const { map, key } = config
  if (!candidate) {
    return false
  }
  const result: T = getProperty<Map<T>, T>(map, candidate[key])
  if (result) {
    return true
  }
  return false
}

const notContainValidator = <T>(candidate, config) => {
  return !containValidator<T>(candidate, config)
}

export const containSpecification = <T>(config: ContainSpecConfig<T>) => {
  return new Specification<T, ContainSpecConfig<T>>({
    config,
    validator: containValidator,
    name: 'contain',
  })
}

export const notContainSpecification = <T>(config: ContainSpecConfig<T>) => {
  return new Specification<T, ContainSpecConfig<T>>({
    config,
    validator: notContainValidator,
    name: 'notContain',
  })
}
