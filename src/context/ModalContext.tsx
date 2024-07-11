import { ReactNode, createContext, useContext, useState } from 'react'

interface ModalContextProviderProps {
  children: ReactNode
}

interface ModalContextData {
  isModalOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}

const ModalContext = createContext({} as ModalContextData)

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{ handleOpenModal, handleCloseModal, isModalOpen }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
