export interface DropdownType {
  title: string
  alias: 'all' | 'self'
}

export const dataDropdown: DropdownType[] = [
  { title: 'All projects', alias: 'all' },
  { title: 'My Projects', alias: 'self' }
]

export const access = ['public', 'private'] as const
