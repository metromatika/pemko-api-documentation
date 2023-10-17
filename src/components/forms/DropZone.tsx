import { Accept, FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import * as React from 'react'
import Label from './Label'
import clsx from 'clsx'

import { HiCloudArrowUp, HiOutlineDocument, HiTrash } from 'react-icons/hi2'

interface DropZoneProps {
  accept?: Accept
  id: string
  label?: string
  maxFiles?: number
  helperText?: string
  validation?: RegisterOptions
}

type FileWithPreview = FileWithPath & { preview: string }

export default function DropZone({ accept, id, label, maxFiles, helperText, validation }: DropZoneProps) {
  const { register, setValue, setError, clearErrors, formState, getValues } = useFormContext()
  const { errors } = formState

  const dropzoneRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    errors[id] && dropzoneRef.current?.focus()
  }, [errors, id])

  const fileValue = getValues(id)
  const [files, setFiles] = React.useState<FileWithPreview[]>(fileValue || [])

  React.useEffect(() => {
    setFiles(fileValue)
  }, [fileValue])

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null)
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message
        })
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )

        setFiles(files ? [...files, ...acceptedFilesPreview].slice(0, maxFiles) : acceptedFilesPreview)

        setValue(id, files ? [...files, ...acceptedFiles].slice(0, maxFiles) : acceptedFiles, {
          shouldValidate: true
        })
        clearErrors(id)
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  )

  React.useEffect(() => {
    return () => {
      ;() => {
        files.forEach((file) => URL.revokeObjectURL(file.preview))
      }
    }
  }, [files])

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: FileWithPreview) => {
    e.preventDefault()
    const newFiles = [...files]

    newFiles.splice(newFiles.indexOf(file), 1)

    if (newFiles.length > 0) {
      setFiles(newFiles)
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    } else {
      setFiles([])
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    maxFiles
  })

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5 relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative" {...getRootProps()}>
        <input {...register(id, validation)} id={id} {...getInputProps()} />
        <div
          className={clsx(
            'flex min-h-[140px] xl:min-h-[200px] w-full cursor-pointer rounded-lg border-2 border-dashed p-4',
            errors[id] ? 'border-red-400' : 'border-slate-300'
          )}
        >
          <div className="flex w-full flex-col items-center justify-center">
            <HiCloudArrowUp className="flex text-5xl text-slate-400 md:text-7xl" />
            <span className="mt-3 text-center text-sm text-slate-400 md:text-base">
              Drag and drop file here, or click to choose file
            </span>
            {helperText && <p className="mt-1 text-[10px] xl:text-xs text-slate-400">{helperText}</p>}
          </div>
        </div>
      </div>
      {!!files?.length && (
        <div className="mt-3 flex w-full flex-col gap-3">
          {files.map((file, id) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border border-slate-300 py-2.5 pl-4 pr-5"
            >
              <div className="flex items-center gap-2">
                <HiOutlineDocument className="text-slate-500" />
                <span className="truncate-1 text-sm text-slate-500">{file.name}</span>
              </div>

              <button
                className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                onClick={(e) => deleteFile(e, file)}
              >
                <HiTrash className="m-auto text-xl text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      {errors[id] && (
        <span className="mt-1 text-xs text-red-400 xl:text-sm absolute top-full left-0">
          {errors[id]?.message?.toString()}
        </span>
      )}
    </div>
  )
}
