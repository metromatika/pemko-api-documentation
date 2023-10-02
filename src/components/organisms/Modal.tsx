import { FormProvider, useForm } from 'react-hook-form'
import { HiXMark } from 'react-icons/hi2'
import clsx from 'clsx'

import { Icon, Button, Checkbox } from '@/components'
import { useDisableBodyScroll } from '@/hooks'

interface ModalProps {
  isShow: boolean
  setIsShow: (isShow: boolean) => void
}

export default function Modal({ isShow, setIsShow }: ModalProps) {
  const methods = useForm()
  useDisableBodyScroll(isShow)

  const handleClose = () => {
    setIsShow(false)
  }

  return (
    <section
      className={clsx(
        'visible fixed inset-0 z-[9999999] flex items-center justify-center p-4 px-[18px] transition-colors md:px-0',
        isShow ? 'visible bg-gray-900/75' : 'invisible'
      )}
    >
      <article
        className={clsx(
          'w-full overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 md:max-w-xl',
          isShow ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex items-center justify-between  px-5 py-4">
          <h3 className="text-base font-bold leading-6 text-title md:text-lg">Filter</h3>
          <Icon className="h-9 w-9 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={handleClose}>
            <HiXMark className="text-lg text-font" />
          </Icon>
        </div>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-8">
              <Checkbox id="public" label="Public" />
              <Checkbox id="private" label="Private" />
            </div>
            <Button variant="primary" className="ml-auto px-5">
              Setup
            </Button>
          </form>
        </FormProvider>
      </article>
    </section>
  )
}
