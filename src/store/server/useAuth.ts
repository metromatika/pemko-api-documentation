import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { getMeFn, loginFn, logoutFn, registerFn, verifyFn } from '@/api/auth.api'
import { useToken, useUserInfo } from '@/store/client'
import { IErrorResponse } from '@/utils/types'

export const useLogin = () => {
  return useMutation(loginFn, {
    onSuccess: () => {
      toast.success('Login success!')
    },
    onError: (error: AxiosError) => {
      if (error) toast.error('Email or password is incorrect')
    }
  })
}

export const useRegister = () => {
  return useMutation(registerFn, {
    onSuccess: () => {
      toast.success('Register success!')
      setTimeout(() => {
        toast.info('We have sent a verification code to your email')
      }, 500)
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
    }
  })
}

export const useVerify = () => {
  return useMutation(verifyFn, {
    onSuccess: () => {
      toast.success('Successfully verified, Please Login!')
    }
  })
}
