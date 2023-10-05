import { HiBars3, HiChevronDown, HiChevronRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import * as React from 'react'
import clsx from 'clsx'

import { CurlIcon, JavaIcon, JavascriptIcon, Logo, PhpIcon, PythonIcon, RubyIcon } from '@/assets'
import { useDisableBodyScroll, useOutsideClick } from '@/hooks'
import { BgAbsolute, Icon } from '..'
import { useCode } from '@/store/client'
import { LanguagesVariant } from './Header'
import clsxm from '@/utils/lib/clsxm'

interface HeaderMobileProps {
  action: (value: boolean) => void
}

type codeType = (typeof LanguagesVariant)[number]

const LanguageData: { icon: string; label: codeType }[] = [
  { icon: CurlIcon, label: 'curl' },
  { icon: JavascriptIcon, label: 'javascript' },
  { icon: PythonIcon, label: 'python' },
  { icon: RubyIcon, label: 'ruby' },
  { icon: PhpIcon, label: 'php' },
  { icon: JavaIcon, label: 'java' }
]

export default function HeaderMobile({ action }: HeaderMobileProps) {
  const [isShow, setIsShow] = React.useState(false)
  const ref = useOutsideClick(() => setIsShow(false))
  useDisableBodyScroll(isShow)

  const { code, setCode } = useCode((state) => ({
    code: state.code,
    setCode: state.setCode
  }))

  const handleUpdateCode = (label: codeType) => {
    setCode(label)
    setIsShow(false)
  }

  return (
    <header className="h-20 bg-dark xl:hidden flex items-center px-4 fixed inset-x-0 top-0 z-30">
      <nav className="flex items-center justify-between w-full">
        <HiBars3 className="w-7 h-5 text-white" onClick={action} />
        <Link to="/" className="h-10 -mr-7">
          <img src={Logo} alt="api doc logo" className="h-full object-contain" />
        </Link>
        <button
          className="text-sm text-font-dark font-semibold flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"
          onClick={() => setIsShow(!isShow)}
        >
          <span className="uppercase">{code === 'javascript' ? 'JS' : code}</span>
          <HiChevronDown className="text-sm" />
        </button>
      </nav>

      <div
        ref={ref}
        className={clsx(
          'flex flex-col fixed z-50 inset-y-0 right-0 bg-sideBar w-8/12 px-10 py-8 gap-4 transition-all',
          isShow ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {LanguageData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleUpdateCode(item.label)}
            className={clsxm(
              'flex gap-3 justify-center w-full items-center border py-4 rounded-lg cursor-pointer border-font-dark/40 text-font-dark',
              code === item.label.toLowerCase() && 'bg-primary border-primary text-white ring-2 ring-primary/30'
            )}
          >
            <img src={item.icon} alt="curl" className="h-4" />
            <span className="text-sm uppercase">{item.label}</span>
          </div>
        ))}
        <Icon
          onClick={() => setIsShow(false)}
          className={clsx(
            'absolute top-1/2 -translate-x-1/2 left-0 w-10 h-10 bg-sideBar shadow-lg',
            !isShow && 'hidden'
          )}
        >
          <HiChevronRight />
        </Icon>
      </div>
      <BgAbsolute isShow={isShow} />
    </header>
  )
}
