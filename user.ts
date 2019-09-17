import { makeSelectUserInfo, selectUserInfo } from '@src/redux/selectors'
import { arrayContainSpecification } from '@src/specification/array'

export const USER = {
  GROUPS: (state, props) => {
    const user = selectUserInfo(state)
    const spec = arrayContainSpecification({
      array: user.groups,
      key: 'id',
    })
    return spec
  },
  CHANNELS: (state, props) => {
    const user = selectUserInfo(state)
    const spec = arrayContainSpecification({
      array: user.channels,
      key: 'id',
    })
    return spec
  },
}
