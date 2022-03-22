import http from './http'
// const api_key = '233d4cad34c34d343785s34dw3er3ds3234esd4'
// let sign = process.env.VUE_APP_SIGN
// if (process.env.NODE_ENV === 'production') {
//     sign = localStorage.getItem("sign")
// } else {
//     sign = '17a1920fdc3c3c25d1bf7c6dd724f5cf'
// }

const post = (url: any, data = {}) =>
    http.post(
        url,
        Object.assign({
            // api_key: api_key,
            // sign,
        },
            // {
            //   data: Object.assign({
            //       role_id: role_id //如果需要再包层data就这样写
            //     },
            //     data
            //   )
            // }
            data
        )
    )
const get = (url:any, params = {}) =>
    http.get(
        url,
        Object.assign({
            // api_key: api_key,
            // sign
        },
            params
        )
    )

// 接口说明
// const httpPost = (data: {} | undefined) => post('getFissionCourseList', data)

// const httpGet = (params: {} | undefined) => get('getFissionCourseList', params)
//接口导出
export {
    post,
    get
}
