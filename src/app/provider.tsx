'use client'

import { AuthContextProvider } from '@/context/AuthContext'
import { ReactNode } from 'react'

export function Provider({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
