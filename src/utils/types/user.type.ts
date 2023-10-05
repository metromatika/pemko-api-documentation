export interface IRole {
  id: string
  name: string
  alias: 'administrator' | 'programmer' | 'regular_user'
}

export interface IUser {
  id: string
  role_id: string
  name: string
  office: string
  email: string
  role: IRole
}

export interface IAuthResponse {
  message: string
  data: {
    access_token: string
    token_type: string
    expires_in: number
  }
}

export interface IErrorResponse {
  message: string
  errors: {
    [key: string]: string[]
  }
}
