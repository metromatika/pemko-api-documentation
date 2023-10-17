import axios from 'axios'

import { LoginInput, RegisterInput } from '@/utils/validations'
import { IAuthResponse, IUser } from '@/utils/types'
import ENV from '@/utils/lib/environment'
import api from './axiosInstance'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  withCredentials: true
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const loginFn = async (fields: LoginInput): Promise<IAuthResponse> => {
  const response = await apiPublic.post('/auth/login', fields)
  return response.data
}

export const registerFn = async (fields: RegisterInput): Promise<IUser> => {
  const response = await apiPublic.post('/auth/register', fields)
  return response.data.data
}

export const getMeFn = async (): Promise<IUser> => {
  const response = await api.get('/auth/me')
  return response.data
}

export const logoutFn = async (): Promise<void> => {
  await api.post('/auth/logout')
}

type verifyFields = {
  verificationCode: string
  email: string
}

export const verifyFn = async ({ verificationCode, email }: verifyFields): Promise<IUser> => {
  const response = await api.post('/auth/verify-email', { verification_code: verificationCode, email: email })
  return response.data
}
