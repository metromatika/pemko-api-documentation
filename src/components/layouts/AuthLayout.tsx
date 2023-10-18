import { Outlet } from 'react-router-dom'
import { Brand } from '@/components'
import { LoginBg } from '@/assets'

export default function AuthLayout() {
  return (
    <section className="relative flex py-[40px] text-font xl:max-h-screen xl:px-0 xl:py-0 xl:flex-row-reverse">
      <div className="relative flex flex-1 flex-col items-center justify-center xl:flex-row">
        <Brand
          width="h-7 w-7"
          containerClass="static left-8 top-8 z-50 mb-[40px] gap-1 text-lg xl:absolute xl:mb-0 xl:text-xl xl:hidden"
        />
        <Outlet />
      </div>
      <div className="hidden min-h-screen flex-1 xl:flex">
        <Brand
          width="h-7 w-7"
          containerClass="static left-8 top-8 z-50 mb-[40px] gap-1 text-lg xl:absolute xl:mb-0 xl:text-xl"
        />
        <img src={LoginBg} alt="login-bg" className="h-full w-full object-cover brightness-50" />
        {/* <img
          src="https://source.unsplash.com/random?indonesia"
          alt="login-bg"
          className="h-full w-full object-cover brightness-50"
        /> */}
      </div>
    </section>
  )
}
