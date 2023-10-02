import { useCode } from '@/store/client'
import clsx from 'clsx'

export const LanguagesVariant = ['curl', 'javascript', 'python', 'ruby', 'php', 'java'] as const

interface SupportedProps {
  name: string
  onClick: () => void
  isActive: boolean
}

const Supported = ({ name, onClick, isActive }: SupportedProps) => {
  return (
    <button
      className={clsx(
        'border-b-2 hover:text-white uppercase',
        isActive ? 'border-primary pb-1 text-white' : 'text-font-dark pb-1 border-transparent'
      )}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default function Header() {
  const { setCode, code } = useCode((state) => ({ code: state.code, setCode: state.setCode }))

  const handleClick = (name: (typeof LanguagesVariant)[number]) => {
    setCode(name)
  }

  return (
    <header className="h-[50px] grid-cols-5 grid-flow-row-dense xl:grid hidden">
      <div className="col-span-3" />
      <div className="col-span-2 bg-dark text-white flex items-center justify-between px-9 font-semibold text-sm">
        {LanguagesVariant.map((name, index) => (
          <Supported key={index} name={name} onClick={() => handleClick(name)} isActive={name === code} />
        ))}
      </div>
    </header>
  )
}
