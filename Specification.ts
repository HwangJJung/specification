type SpecResult = {
  pass: boolean
  error?: string
  info?: string
}

type SpecOption<T, C> = {
  validator?(candidate: T, config: C): boolean
  errorMessenger?(candidate: T, config: C): string
  infoMessenger?(candidate: T, config: C): string
  name?: string
  config?: C
}
class Specification<T = any, C = any> {
  constructor(option?: SpecOption<T, C>) {
    if (option) {
      const { validator, config, name, errorMessenger, infoMessenger } = option
      if (validator) {
        this.validator = validator
      }
      if (errorMessenger) {
        this.errorMessenger = errorMessenger
      }
      if (infoMessenger) {
        this.infoMessenger = infoMessenger
      }
      if (config) {
        this.config = config
      }
      if (name) {
        this.name = name
      }
    }
  }
  validator = (candidate: T, config: C) => true
  config: any = {}
  name = 'anonymous'
  errorMessenger = (candidate: T, config: C) =>
    '예상치 못한 오류가 발생했습니다.'
  infoMessenger = (candidate: T, config: C) => ''
  isSatisfiedBy = (candidate: T): SpecResult => {
    const pass = this.validator(candidate, this.config)
    const info = this.infoMessenger(candidate, this.config)
    let error = ''
    if (!pass) {
      error = this.errorMessenger(candidate, this.config)
    }
    return {
      pass,
      error,
      info,
    }
  }

  setConfig = config => {
    this.config = config
  }
  setName = name => {
    this.name = name
  }
  setErrorMessenger = errorMessenger => {
    this.errorMessenger = errorMessenger
  }
  setInfoMessenger = infoMessenger => {
    this.infoMessenger = infoMessenger
  }

  and = <T2 = T>(specification: Specification<T2>, name?) => {
    return new AndSpecification<T, T2>(this, specification, name)
  }

  or = (specification, name?) => {
    if (!(specification instanceof Specification)) {
      console.error(
        'invalid input:: OrOperator require specification object. but you input ' +
          specification.constructor.name +
          'instance.'
      )
    } else {
      return new OrSpecification<T>(this, specification, name)
    }
  }
}

class AndSpecification<T, T2> extends Specification {
  constructor(x: Specification<T>, y: Specification<T2>, newName?: string) {
    let name = `(${x.name} && ${y.name})`
    if (newName) {
      name = newName
    }
    super({ name })
    this.isSatisfiedBy = (candidate: any): SpecResult => {
      const result1 = x.isSatisfiedBy(candidate)
      const result2 = y.isSatisfiedBy(candidate)
      let pass = result1.pass && result2.pass
      let error = ''
      const info = result1.info + '\n' + result2.info
      if (!pass) {
        error = result1.error + '\n' + result2.error
      }
      const result = {
        pass,
        error,
        info,
      }
      return result
    }
  }
}

class OrSpecification<T> extends Specification {
  constructor(x: Specification, y: Specification, newName?: string) {
    let name = `(${x.name} || ${y.name})`
    if (newName) {
      name = newName
    }
    super({ name }) //tslint-ignore-line
    this.isSatisfiedBy = (candidate: T): SpecResult => {
      const result1 = x.isSatisfiedBy(candidate)
      const result2 = y.isSatisfiedBy(candidate)
      let pass = result1.pass || result2.pass
      let error = ''
      let info = ''
      if (result1.pass) {
        return result1
      }
      if (result2.pass) {
        return result2
      }
      if (!pass) {
        error = result1.error + '\n' + result2.error
        info = result1.info + '\n' + result2.info
      }

      const result = {
        pass,
        error,
        info,
      }
      return result
    }
  }
}

export default Specification
