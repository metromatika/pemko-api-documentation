import * as Yup from 'yup'

export const registerValidation = Yup.object({
  name: Yup.string().required('Nama harus diisi'),
  username: Yup.string().required('Username harus diisi'),
  email: Yup.string().required('Email harus diisi').email('Email tidak valid'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Kata sandi minimal 8 karakter')
    .matches(/[a-z]/g, 'Kata sandi harus mengandung huruf kecil')
    .matches(/[A-Z]/g, 'Kata sandi harus mengandung huruf besar')
    .matches(/[0-9]/g, 'Kata sandi harus mengandung angka')
    .matches(/^\S*$/g, 'Kata sandi tidak boleh mengandung spasi')
    .matches(/[^a-zA-Z0-9]/g, 'Kata sandi harus mengandung karakter spesial'),
  password_confirmation: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Konfirmasi kata sandi tidak cocok')
})

export const loginValidation = Yup.object({
  email: Yup.string().required('Email harus diisi').email('Email tidak valid'),
  password: Yup.string().required('Kata sandi harus diisi')
})

export type RegisterInput = Yup.InferType<typeof registerValidation>
export type LoginInput = Yup.InferType<typeof loginValidation>
