import { ReactNode } from 'react'

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <div>{children}</div>
}
