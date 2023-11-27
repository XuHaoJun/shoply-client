// import { createAlova } from 'alova'
// import GlobalFetch from 'alova/GlobalFetch'
// import ReactHook from 'alova/react'

// export const alovaInstance = createAlova({
//   baseURL: 'http://localhost:5000',
//   requestAdapter: GlobalFetch(),
//   responded: (response) => response.json(),
//   statesHook: ReactHook,
//   localCache: null,
//   beforeRequest(method) {
//     if (!method.config.headers['Content-Type']) {
//       method.config.headers['Content-Type'] = 'application/json;charset=UTF-8'
//     }
//   },
// })

import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
})
