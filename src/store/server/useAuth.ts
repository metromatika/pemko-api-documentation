import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { getMeFn, loginFn, logoutFn, registerFn } from '@/api/auth.api'
import { useToken, useUserInfo } from '@/store/client'
import { IErrorResponse } from '@/utils/types'

export const useLogin = () => {
  return useMutation(loginFn, {
    onSuccess: () => {
      toast.success('Login success!')
    },
    onError: (error: AxiosError) => {
      console.log(error)
    }
  })
}

export const useRegister = () => {
  return useMutation(registerFn, {
    onSuccess: () => {
      toast.success('Register success!')
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data.message)
    }
  })
}

export const useGetMe = () => {
  return useQuery('user', getMeFn, {
    onSuccess: (data) => {
      useUserInfo.getState().storeUserInfo(data)
    }
  })
}

export const useLogout = () => {
  return useMutation(logoutFn, {
    onSuccess: () => {
      useToken.getState().removeToken()
      toast.success('Successfully Logout!')
      window.location.href = '/'
    }
  })
}
