/**
 * 将所有的Ajax Http封装成函数统一管理
 */

import apis from '../api'
import http from '../http'

// 示例, 可以被删除
export function example (params) {
  return http.post(apis.example, params)
}
