import { HiMagnifyingGlass } from 'react-icons/hi2'

interface DashboardSearchProps {
  keyword: string
  setKeyword: (value: string) => void
}

export default function DashboardSearch({ keyword, setKeyword }: DashboardSearchProps) {
  return (
    <div className="flex items-center gap-3 xl:gap-5 bg-white/10 py-3 xl:py-4 px-4 xl:px-6 rounded-lg overflow-hidden mt-7 xl:mt-10">
      <HiMagnifyingGlass className="pointer-events-none text-lg text-white/40 xl:text-2xl" />
      <input
        type="text"
        placeholder="Search for projects"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="outline-none text-white placeholder:text-white/30 rounded-lg xl:text-xl text-sm w-full bg-transparent"
      />
    </div>
  )
}
