// 验证函数，true表示表单验证通过， String表示表单验证未通过，给出的提示文本。

/**
 * 用户名的表单校验
 */
export const validateUsername = (value) => {
  if (!value) {
    return '用户名为必填的'
  }

  if (value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}

/**
 * 密码的表单校验
 */
export const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}

/**
 * 确认密码的表单校验
 *
 * 参数二：表示关联表单值的数组
 */
export const validateConfirmPassword = (value, password) => {
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
