import { ItemType } from '../types'

export const countItemCollection = (data: ItemType[]) => {
  return data.reduce((total, item) => {
    if (item.name) total++
    if (item.item) total += countItemCollection(item.item)
    return total
  }, 0)
}

export const getFileName = (path: string) => {
  return path.replace('source-code/', '')
}
