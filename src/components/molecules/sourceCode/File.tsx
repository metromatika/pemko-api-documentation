import { SourceCodeType } from '@/utils/types/sourceCode.type'
import { getFileName } from '@/utils/lib/services'
import { Button } from '@/components'

import { GoFileZip } from 'react-icons/go'
import * as React from 'react'
import { downloadSourceCodeFn } from '@/api/sourceCode.api'
import { HiArrowDownTray, HiOutlineTrash } from 'react-icons/hi2'
import { useDeleteSourceCode } from '@/store/server/useSourceCode'
import { useDialog } from '@/store/client'

interface SourceCodeProps {
  data: SourceCodeType
}

export default function File({ data }: SourceCodeProps) {
  const [loading, setLoading] = React.useState(false)
  const fileName = getFileName(data.file_path)

  const { dialog } = useDialog()
  const { mutate: deleteSourceCode, isLoading } = useDeleteSourceCode()

  const handleDownload = async (sourceCodeId: string, fileName: string) => {
    setLoading(true)
    await downloadSourceCodeFn(sourceCodeId, fileName)
    setLoading(false)
  }

  const handleDelete = async (sourceCodeId: string) => {
    dialog({
      title: 'Delete Source Code',
      description: `Are you sure you want to remove ${fileName} file from this collection?`,
      variant: 'danger',
      submitText: 'Delete'
    }).then(() => deleteSourceCode(sourceCodeId))
  }

  return (
    <div className="flex items-center bg-primary/20 justify-between py-2.5 px-3 rounded-md">
      <div className="flex items-center gap-2 xl:gap-3 text-title font-semibold truncate-1">
        <GoFileZip className="xl:text-xl text-lg" />
        <span className="xl:text-sm text-xs">{fileName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="base"
          loading={loading}
          className="px-3 xl:text-xs text-[10px] gap-2"
          onClick={() => handleDownload(data.id, fileName)}
        >
          <HiArrowDownTray />
          <span>Download</span>
        </Button>
        <Button
          variant="danger"
          loading={isLoading}
          className="px-3 xl:text-xs text-[10px] gap-2"
          onClick={() => handleDelete(data.id)}
        >
          <HiOutlineTrash />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  )
}
