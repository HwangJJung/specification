import Specification from '@src/specification/Specification'

type ContainSpecConfig<T> = {
  array: T[]
  key: keyof T
}

const containValidator = <T>(candidate, config) => {
  const { array, key } = config
  if (!candidate) {
    return false
  }
  return array.includes(candidate[key])
}

const notContainValidator = <T>(candidate, config) => {
  return !containValidator<T>(candidate, config)
}

export const arrayContainSpecification = <T>(config: ContainSpecConfig<T>) => {
  return new Specification<T, ContainSpecConfig<T>>({
    config,
    validator: containValidator,
    name: 'array-contain',
  })
}

export const arrayNotContainSpecification = <T>(
  config: ContainSpecConfig<T>
) => {
  return new Specification<T, ContainSpecConfig<T>>({
    config,
    validator: notContainValidator,
    name: 'array-contain',
  })
}
