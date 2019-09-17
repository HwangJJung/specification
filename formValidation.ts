export const required = (value: any) => (value ? undefined : '필수값입니다')
export const requiredMulti = (value: Array<any>) =>
  value && value.length ? undefined : '필수값입니다'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const email = (value: string) =>
  value && emailRegex.test(value)
    ? undefined
    : '이메일 형식이 올바르지 않습니다'

const passwordRegex = /[a-zA-Z0-9_@!#$^%&*()+=-[\]/\\';,.{}|":<>?~` ]{9,}/
const specialCharacterRegex = /[_@!#$^%&*()+=-[\]/\\';,.{}|":<>?~` ]/
export const password = (value: string) =>
  value && passwordRegex.test(value) && specialCharacterRegex.test(value)
    ? undefined
    : '비밀번호는 특수문자를 포함하여 9자 이상으로 설정해주세요'

export const equal = (...keyPath: string[]) => (value: any, allValues) => {
  const counterparts = keyPath.reduce((prev, curr) => prev[curr], allValues)
  return value === counterparts ? undefined : '비밀번호가 일치하지 않습니다'
}

export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const textLength = (min: number, max: number) => (value: string) =>
  maxLength(max)(value) || minLength(min)(value)

// 0으로 시작하는지랑 숫자 수만 카운팅. 단순 점검 용도
const phoneRegex = /^0[0-9]{8,10}$/
export const phone = (value: string) =>
  phoneRegex.test(value && value.replace(/-/g, ''))
    ? undefined
    : '전화번호 형식이 올바르지 않습니다'
