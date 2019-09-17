import Specification from '@src/specification/Specification'
import { USING_STATUS } from '@src/specification/constant'

export const DEFINED_STATUS: {
  [name: string]: Specification
} = {
  USING: new Specification({
    validator: data => {
      return data.status === USING_STATUS.USING
    },
    name: 'status-using',
  }),
  DELETED: new Specification({
    validator: data => data.status === USING_STATUS.DELETED,
    name: 'status-deleted',
  }),
}
