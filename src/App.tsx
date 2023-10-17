import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthLayout, DashboardLayout, Dialog, ProtectedAuth, ProtectedRoute } from '@/components'
import { Create, Dashboard, Detail, Login, NotFound, Register, SourceCode, Verify } from '@/pages'

import { DialogOptions } from '@/components/organisms/Dialog'
import { useDialog } from '@/store/client'

import 'react-toastify/dist/ReactToastify.css'
import '@/utils/styles/toast-custom.css'

export default function App() {
  const { dialogOptions, handleClose, handleSubmit } = useDialog()

  return (
    <>
      <Dialog
        open={Boolean(dialogOptions)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...(dialogOptions as DialogOptions)}
      />
      <ToastContainer className="max-w-[70%] xl:max-w-none" />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path=":collectionId" element={<Detail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="create" element={<Create />} />
            <Route path="update/:collectionId" element={<Create />} />
            <Route path="source-code/:collectionId" element={<SourceCode />} />
          </Route>
        </Route>

        <Route element={<ProtectedAuth />}>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
