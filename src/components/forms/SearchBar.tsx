import { HiMagnifyingGlass } from 'react-icons/hi2'

interface SearchBarProps extends React.ComponentPropsWithRef<'input'> {
  placeholder: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function SearchBar({ placeholder, handleSubmit, ...rest }: SearchBarProps) {
  return (
    <form className="relative" onSubmit={(e) => handleSubmit(e)}>
      <HiMagnifyingGlass className="pointer-events-none absolute top-1/2 ml-3 -translate-y-1/2 text-lg text-gray-400 md:ml-4 md:text-xl" />
      <input
        {...rest}
        type="text"
        placeholder={placeholder}
        className="pl-10 xl:pl-12 outline-none text-title placeholder:text-gray-400 bg-title/5 py-3 rounded-lg xl:text-base text-sm w-full"
      />
    </form>
  )
}
