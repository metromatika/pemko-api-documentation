import { DialogOptions } from '@/components/organisms/Dialog'
import { create } from 'zustand'

interface DialogState {
  dialogOptions: DialogOptions | null
  awaitingPromiseRef: {
    resolve: () => void
    reject: () => void
  } | null
  dialog: (options: DialogOptions) => Promise<void>
  handleClose: () => void
  handleSubmit: () => void
  setLoadingDialog: (loading: boolean) => void
}

const useDialogStore = create<DialogState>((set) => ({
  dialogOptions: null,
  awaitingPromiseRef: null,
  dialog: (options: DialogOptions) =>
    new Promise<void>((resolve, reject) => {
      set(() => ({
        dialogOptions: options,
        awaitingPromiseRef: { resolve, reject }
      }))
    }),
  handleClose: () => {
    set((state) => {
      if (state.dialogOptions?.catchOnCancel && state.awaitingPromiseRef) {
        state.awaitingPromiseRef.reject()
      }
      return {
        dialogOptions: null,
        awaitingPromiseRef: null
      }
    })
  },
  handleSubmit: () => {
    set((state) => {
      if (state.awaitingPromiseRef) {
        state.awaitingPromiseRef.resolve()
      }
      return {
        dialogOptions: null,
        awaitingPromiseRef: null
      }
    })
  },
  setLoadingDialog: (loading: boolean) =>
    set((state) => ({
      dialogOptions: state.dialogOptions ? { ...state.dialogOptions, isLoading: loading } : null
    }))
}))

export const useDialog = () => {
  const { dialogOptions, dialog, handleClose, handleSubmit, setLoadingDialog } = useDialogStore((state) => ({
    dialogOptions: state.dialogOptions,
    dialog: state.dialog,
    handleClose: state.handleClose,
    handleSubmit: state.handleSubmit,
    setLoadingDialog: state.setLoadingDialog
  }))

  return {
    dialogOptions,
    dialog,
    handleClose,
    handleSubmit,
    setLoadingDialog
  }
}
