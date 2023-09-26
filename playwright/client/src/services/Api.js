import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://192.168.1.45:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
