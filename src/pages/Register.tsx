import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'

import { RegisterInput, registerValidation } from '@/utils/validations'
import { Input, Password, Button } from '@/components'
import { useRegister } from '@/store/server'
import { useTitle } from '@/hooks'

export default function Register() {
  const navigate = useNavigate()
  useTitle('Register')

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation)
  })

  const { mutate: register, isLoading } = useRegister()

  const handleRegister = (values: RegisterInput) => {
    register(
      { ...values, office: values.office.toUpperCase() },
      {
        onSuccess: (data) => {
          navigate('/verify?email=' + data.email)
        }
      }
    )
  }

  return (
    <section className="gap-7 xl:w-[55%] xl:gap-8 flex w-full flex-col px-[18px] text-font xl:px-0">
      <div className="flex flex-col">
        <h1 className="text-[28px] text-title font-bold xl:text-4xl">Register</h1>
        <p className="text-sm font-medium text-font/50 xl:text-[15px]">
          Please fill in the required data below to create an account.
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-6 xl:gap-7" onSubmit={methods.handleSubmit(handleRegister)}>
          <div className="flex items-center gap-6 xl:gap-4 flex-col xl:flex-row">
            <Input id="name" label="Name" placeholder="John Doe" />
            <Input id="office" label="Agency" placeholder="DINAS SOSIAL" />
          </div>
          <Input id="email" label="Email" placeholder="name@email.com" />
          <Password id="password" label="Password" />
          <Password id="password_confirmation" label="Confirm Password" />
          <Button variant="primary" loading={isLoading} className="mt-1">
            Register
          </Button>
        </form>
      </FormProvider>

      <div className="text-center text-sm font-semibold text-font xl:text-base">
        <span>Already have an account? Let's </span>
        <Link to="/login" className="text-primary hover:underline">
          Login!
        </Link>
      </div>
    </section>
  )
}
