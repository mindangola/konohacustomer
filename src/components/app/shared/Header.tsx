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
  const { signOut, user } = useAuth()

  return (
    <header className="h-20 bg-gray-850 w-full ">
      <div className="w-full px-6 sm:container  mx-auto flex items-center h-full justify-between">
        <h1 className="text-3xl font-bold text-white">
          Konoha<span className="text-4xl text-orange-500">Cliente</span>
        </h1>

        <div className="flex flex-row justify-between items-center gap-2">
          <div className="hidden sm:flex flex-col items-end border-r border-newBlue-100 pr-2">
            <strong className="text-orange-500 font-semibold">
              {user?.name}
            </strong>
            <span className="text-xs text-gray-100"> {user?.email} </span>
          </div>

          <Menubar className="border-none bg-transparent focus:bg-transparent dark:bg-gray-850">
            <MenubarMenu>
              <MenubarTrigger
                asChild
                className="bg-transparent p-0 w-auto hover:bg-transparent flex-none focus:bg-transparent"
              >
                <div className="flex flex-row justify-between items-center">
                  <Avatar className="bg-transparent focus:bg-transparent w-12 h-12 border-2 border-orange-500">
                    <AvatarImage src={String(user?.url)} />
                    <AvatarFallback className="text-n font-bold">
                      MS
                    </AvatarFallback>
                  </Avatar>
                </div>
              </MenubarTrigger>
              <MenubarContent
                align="end"
                className="dark:border-gray-900 shadow-sm shadow-gray-600"
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
