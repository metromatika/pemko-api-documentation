import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'

import { LoginInput, loginValidation } from '@/utils/validations'
import { Input, Button, Password } from '@/components'
import { useToken } from '@/store/client'
import { useLogin } from '@/store/server'
import { useTitle } from '@/hooks'

export default function Login() {
  useTitle('Login')

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation)
  })

  const storeToken = useToken((state) => state.storeToken)
  const { mutate: login, isLoading } = useLogin()

  const handleLoginLocal = (values: LoginInput) => {
    login(values, {
      onSuccess: (data) => {
        storeToken(data.data.access_token)
      }
    })
  }

  return (
    <section className="gap-7 xl:w-[55%] xl:gap-8 flex w-full flex-col px-[18px] text-font xl:px-0">
      <div className="flex flex-col">
        <h1 className="text-[28px] text-title font-bold xl:text-[36px]">Login</h1>
        <p className="text-[15px] font-medium text-font/60 xl:text-sm">
          Welcome to the API Documentation, please fill in the required data to be able to enter the application.
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-6 xl:gap-7" onSubmit={methods.handleSubmit(handleLoginLocal)}>
          <Input id="email" label="Email" placeholder="name@email.com" />
          <Password id="password" label="Password" />
          {/* <DropZone
            id="source_code"
            label="Source code (max. 10)"
            accept={{ 'application/vnd.rar': ['.rar'], 'application/zip': ['.zip'] }}
            maxFiles={10}
            helperText="You can upload file with .zip or .rar extension."
          /> */}
          {/* <Select
            id="access_type"
            label="Access type"
            options={[
              { value: 'public', label: 'Public' },
              { value: 'private', label: 'Private' }
            ]}
            placeholder="Select access type"
          /> */}
          <Button variant="primary" loading={isLoading} className="mt-1">
            Login
          </Button>
        </form>
      </FormProvider>

      <div className="text-center text-font text-sm font-semibold xl:text-base">
        <span>Don't have an account yet? </span>
        <Link to="/register" className="text-primary hover:underline">
          Register now, it's free!
        </Link>
      </div>
    </section>
  )
}
