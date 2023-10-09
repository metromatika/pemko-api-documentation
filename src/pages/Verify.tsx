import { useNavigate, useSearchParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { VerifyInput, verifyValidation } from '@/utils/validations'
import { Button, Input } from '@/components'
import { useVerify } from '@/store/server'
import { useTitle } from '@/hooks'

export default function Verify() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const navigate = useNavigate()
  useTitle('Email Verification')

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(verifyValidation)
  })

  const { mutate: verify, isLoading } = useVerify()

  const handleVerify = (values: VerifyInput) => {
    const fields = { verificationCode: values.verification_code, email: email as string }

    verify(fields, {
      onSuccess: () => {
        navigate('/login')
      }
    })
  }

  return (
    <section className="gap-7 xl:w-[55%] xl:gap-8 flex w-full flex-col px-[18px] text-font xl:px-0">
      <div className="flex flex-col">
        <h1 className="text-[28px] text-title font-bold xl:text-4xl">Email Verification</h1>
        <p className="text-sm font-medium text-font/50 xl:text-[15px]">
          We have sent the verification code in the email you have registered.
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-7 xl:gap-8" onSubmit={methods.handleSubmit(handleVerify)}>
          <Input id="verification_code" label="Verfication Code" placeholder="6548de" />
          <Button variant="primary" loading={isLoading}>
            Verify
          </Button>
        </form>
      </FormProvider>
    </section>
  )
}
