/**
 * passed -> True
 * failed -> False
 */
function checkNotNull(some) {
  // null, undefined, ""를 체크, 0은 제외
  let result = !!some || some === 0
  return result
}
function checkNonZero(number) {
  return number !== 0
}
function checkEmail(email) {
  let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  let result = emailRegex.test(email)
  return result
}
function checkPassword(password) {
  let passwordRegex = /[a-zA-Z_0-9@!#$^%&*()+=\-\[\]\\';,\.\/\{}\|":<>\?~` ]{9,}/
  let specialCharacterRegex = /[_@!#$^%&*()+=\-\[\]\\';,\.\/\{}\|":<>\?~` ]/
  let result = passwordRegex.test(password)
  let result2 = specialCharacterRegex.test(password)
  return result && result2
}
// 필수로 입력을 받는 폼에서는 StringLength를 체크
function checkStringLength(string, min = 2, max = 1000) {
  let trimmed = string.replace(/^\s+|\s+$/gm, '')
  let result = min <= trimmed.length && trimmed.length <= max
  return result
}
// 검색어 입력 등 비워질 수도 있고, 2자 이상이어야 하는 곳에서
function checkNameQuery(nameQuery, preventShort = true, max = 100) {
  let trimmed = nameQuery.replace(/^\s+|\s+$/gm, '')
  let result =
    trimmed.length <= max && (preventShort ? trimmed.length !== 1 : true)
  return result
}
// 0으로 시작하는지랑 숫자 수만 카운팅. 단순 점검 용도
function checkPhoneNumber(phone) {
  const noDash = phone.replace(/-/g, '')
  const simpleRegex = /^0[0-9]{8,10}$/
  let result = simpleRegex.test(noDash)
  return result
}
function checkUrl(url) {
  // https://gist.github.com/dperini/729294 + nullable "http://" + fail with IP
  let urlRegex = /(?:(?:https?|ftp):\/\/)?(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/
  let result = urlRegex.test(url)
  return result
}

/**
 * Check whether an object is a generator.
 *
 * @param  {Object}  obj
 * @return {Boolean}
 */
function isGenerator(obj) {
  return (
    obj && typeof obj.next === 'function' && typeof obj.throw === 'function'
  )
}

/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
function isGeneratorFunction(fn) {
  return (
    typeof fn === 'function' &&
    fn.constructor &&
    fn.constructor.name === 'GeneratorFunction'
  )
}

export {
  checkNotNull,
  checkNonZero,
  checkEmail,
  checkPassword,
  checkPhoneNumber,
  checkStringLength,
  checkNameQuery,
  checkUrl,
  isGenerator,
  isGeneratorFunction,
}
