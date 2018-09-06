import request from '@/utils/request'

export default function loginByUsername(name, password) {
    const data = {
      name,
      password
    }
    return request({
      url: '/user/login',
      method: 'post',
      params: {
          'name' : name,
          'password' : password
      },
      data
    })
  }