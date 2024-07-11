'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useAuth } from '@/context/AuthContext'
import { Power, UserCircleGear } from '@phosphor-icons/react'
import Link from 'next/link'

export function Header() {
  const { signOut } = useAuth()

  return (
    <header className="h-20 bg-gray-850 w-full ">
      <div className="container mx-auto flex items-center h-full justify-between">
        <h1 className="text-3xl font-bold text-white">
          Konoha<span className="text-4xl text-orange-500">Cliente</span>
        </h1>

        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex flex-col items-end border-r border-newBlue-100 pr-2">
            <strong className="text-orange-500 font-semibold">
              Ramiro Nzau
            </strong>
            <span className="text-xs text-gray-100">ramironzau@gmail.com</span>
          </div>

          <Menubar className="border-none dark:bg-gray-850">
            <MenubarMenu>
              <MenubarTrigger
                asChild
                className="bg-transparent focus:bg-transparent"
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <Avatar className="bg-transparent border border-orange-500">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    <AvatarFallback className="text-n font-bold">
                      MS
                    </AvatarFallback>
                  </Avatar>
                </div>
              </MenubarTrigger>
              <MenubarContent
                align="end"
                className="  dark:border-gray-900 shadow-sm shadow-gray-600"
              >
                <MenubarItem
                  asChild
                  className="flex flex-row gap-2 cursor-pointer hover:bg-gray-200 text-gray-900 dark:text-gray-200 transition-colors dark:hover:text-gray-50"
                >
                  <Link href="/perfil">
                    <UserCircleGear size={18} />
                    Perfil de usuario
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="dark:bg-gray-900 bg-gray-300 px-2 h-[2px]" />
                <MenubarItem
                  onClick={signOut}
                  className="flex flex-row gap-2 cursor-pointer hover:bg-gray-200 text-gray-900 dark:text-gray-200 transition-colors dark:hover:text-gray-50"
                >
                  <Power size={18} />
                  Terminar sessão
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  )
}
