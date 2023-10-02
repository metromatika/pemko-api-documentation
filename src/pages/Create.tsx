import { useNavigate } from 'react-router-dom'
import * as React from 'react'

import { useCreateCollection } from '@/store/server'
import { Back, Button } from '@/components'
import { UploadImg } from '@/assets'

export default function Create() {
  const navigate = useNavigate()
  const { mutateAsync: createCollection, isLoading } = useCreateCollection()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await createCollection({ access_type: 'private', json_file: file })
      navigate('/')
    }
  }

  return (
    <section className="flex flex-col p-4 xl:p-10">
      <Back />
      <h1 className="text-3xl font-bold uppercase text-dark hidden xl:flex mx-auto">✨ Create a new project ✨</h1>
      <div className="flex flex-col min-h-[calc(100vh-40px-80px-26px)] xl:min-h-[calc(100vh-100px-60px)] justify-center items-center gap-5 xl:gap-8">
        <img src={UploadImg} alt="upload illustration" className="xl:w-[300px] w-8/12" />
        <span className="text-center w-10/12 xl:w-1/2 font-semibold text-font text-sm xl:text-base">
          Please upload the file extension <span className="text-primary font-bold">*.json</span> or export file from
          postman by pressing the button below
        </span>
        <input type="file" accept=".json" hidden name="json_file" id="json_file" onChange={(e) => handleUpload(e)} />
        <Button variant="primary" className="p-0 xl:p-0" loading={isLoading}>
          <label htmlFor="json_file" className="px-4 py-2 md:py-[9px] cursor-pointer">
            Import JSON
          </label>
        </Button>
      </div>
    </section>
  )
}
