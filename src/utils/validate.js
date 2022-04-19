/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 邮箱校验
 */
export function validEmail(str){
  return /.+@.+\..+/.test(str)
}

/**
 * 限制为数字，并且数字最多带两位小数
 */
export function validAmount(str){
  return /^\d+(.\d{1,2})?$/.test(str)
}