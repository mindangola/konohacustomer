'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Folder = {
  id: string
  name: string
  user: {
    id: string
    name: string
  }
}

interface FolderListProps {
  activeFolder: string
  folders: Folder[]
}

export async function FolderList({ activeFolder, folders }: FolderListProps) {
  const [folderId, setFolderId] = useState(folders[0]?.id)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    function handleChangeFolder() {
      const params = new URLSearchParams(searchParams)

      if (folderId) {
        const fieldValue = folderId

        params.set('folder', fieldValue)
      } else {
        params.delete('folder')
      }

      replace(`${pathname}?${params.toString()}`)
    }

    handleChangeFolder()
  }, [folderId])

  return (
    <div className="flex items-center border-gray-500 gap-4 border-b-2 pb-4 ">
      {folders.map((value) => (
        <Button
          key={value.id}
          onClick={() => setFolderId(value.id)}
          className={clsx(
            'w-auto h-[40px] border flex-none px-4 py-2 gap-2 text-gray-100  flex bg-gray-700 items-center overflow-hidden rounded-md',
            {
              'boder-2 border-orange-500': activeFolder === value.id,
            },
          )}
        >
          <Image
            src={`/folder.svg`}
            alt="folder image"
            width={30}
            height={40}
            className="h-auto w-8 object-cover"
          />

          {value.name}
        </Button>
      ))}
    </div>
  )
}
