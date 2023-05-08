import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/3593bfc663bff4f91b367442dce23233/jd',
  timeout: 10000
})
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}

// export const post = (url, data = {}) => {
//   return new Promise((resolve, reject) => {
//     axios.post(url, data, {
//       baseURL: 'https://www.fastmock.site/mock/3593bfc663bff4f91b367442dce23233/jd',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then((response) => {
//       resolve(response.data)
//     }, (err) => {
//       reject(err)
//     })
//   })
// }
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, (err) => {
      reject(err)
    })
  })
}
