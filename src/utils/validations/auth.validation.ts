import * as Yup from 'yup'

export const registerValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  office: Yup.string().required('Agency is required'),
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/g, 'Password must contain lowercase letters')
    .matches(/[A-Z]/g, 'Password must contain uppercase letters')
    .matches(/[0-9]/g, 'Password must contain numbers')
    .matches(/^\S*$/g, 'Password must not contain spaces')
    .matches(/[^a-zA-Z0-9]/g, 'Passwords must contain special characters'),
  password_confirmation: Yup.string()
    .required('Confirmation password is required')
    .oneOf([Yup.ref('password')], 'Confirmation password does not match')
})

export const loginValidation = Yup.object({
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string().required('Password is required')
})

export const verifyValidation = Yup.object({
  verification_code: Yup.string()
    .required('Verification code is required')
    .max(6, 'Verification code must be 6 characters')
    .min(6, 'Verification code must be 6 characters')
})

export type RegisterInput = Yup.InferType<typeof registerValidation>
export type LoginInput = Yup.InferType<typeof loginValidation>
export type VerifyInput = Yup.InferType<typeof verifyValidation>
