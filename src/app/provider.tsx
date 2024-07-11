'use client'

import { AuthContextProvider } from '@/context/AuthContext'
import { ModalContextProvider } from '@/context/ModalContext'
import { ReactNode } from 'react'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthContextProvider>
  )
}
