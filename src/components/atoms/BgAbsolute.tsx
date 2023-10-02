import clsx from 'clsx'

interface BgAbsoluteProps {
  isShow: boolean
}

export default function BgAbsolute({ isShow }: BgAbsoluteProps) {
  return (
    <div
      className={clsx(
        'fixed xl:hidden inset-0 bg-gray-900/70 transition-all duration-300',
        isShow ? 'opacity-100 z-40 visible' : 'opacity-0 z-0 invisible'
      )}
    />
  )
}
