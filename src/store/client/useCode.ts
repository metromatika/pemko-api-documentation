import { create } from 'zustand'
import { LanguagesVariant } from '@/components/organisms/Header'

interface CodeStore {
  code: (typeof LanguagesVariant)[number]
  setCode: (code: (typeof LanguagesVariant)[number]) => void
}

export const useCode = create<CodeStore>((set) => ({
  code: 'curl',
  setCode: (code) => set({ code })
}))
