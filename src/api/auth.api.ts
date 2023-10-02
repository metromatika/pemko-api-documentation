import { LoginInput, RegisterInput } from '@/utils/validations'
import { IAuthResponse, IUser } from '@/utils/types'
import api from './axiosInstance'

export const loginFn = async (fields: LoginInput): Promise<IAuthResponse> => {
  const response = await api.post('/auth/login', fields)
  return response.data
}

export const registerFn = async (fields: RegisterInput): Promise<IAuthResponse> => {
  const response = await api.post('/auth/register', fields)
  return response.data
}

export const getMeFn = async (): Promise<IUser> => {
  const response = await api.get('/auth/me')
  return response.data
}

export const logoutFn = async (): Promise<void> => {
  await api.post('/auth/logout')
}
