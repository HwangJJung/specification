import { DEFINED_STATUS } from '@src/specification/status'
import { USER } from '@src/specification/user'
import Specification from '@src/specification/Specification'

const DEFAULT = new Specification({ name: 'default' })

export default {
  STATUS: DEFINED_STATUS,
  DEFAULT,
  USER,
}
