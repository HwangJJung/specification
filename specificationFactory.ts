import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import invariant from 'invariant'
import Specification from '@src/specification/Specification'
import { SPECS } from '@src/specification'

type makeSpecBySelectorType = {
  state?: any
  props?: any
  specType?: any
}

const makeSpecBySelector = ({
  state,
  props,
  specType,
}: makeSpecBySelectorType): Specification => {
  if (isArray(specType)) {
    return getSpec({ state, props, specTypes: specType })
  }
  if (isString(specType)) {
    const spec = get(SPECS, `${specType}`)
    invariant(spec, `${specType} specType 선언이 잘못되었습니다.`)
    if (isFunction(spec)) {
      return spec(state, props)
    }
    return spec
  }
  if (specType instanceof Specification) {
    return specType
  }
  return SPECS.DEFAULT
}

type getSpecTypes = {
  state?: any
  props?: any
  specTypes?: any[]
}
const getSpec = ({ state, props, specTypes }: getSpecTypes): Specification => {
  let specList = specTypes
  if (!isArray(specTypes)) {
    specList = [specTypes]
  }
  return specList.reduce((accumulator: Specification, specType) => {
    const nextSpec = makeSpecBySelector({ state, props, specType })
    return accumulator.and(nextSpec)
  }, SPECS.DEFAULT)
}

const create = option => {
  return new Specification(option)
}

const init = () => SPECS.DEFAULT

export default {
  getSpec,
  init,
  create,
}
