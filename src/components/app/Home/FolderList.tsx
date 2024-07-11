import { FetchApi } from '@/services/fetch'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface FolderListProps {
  activeFolder: string
}

export async function FolderList({ activeFolder }: FolderListProps) {
  const fetchApi = new FetchApi()
  const folders = await fetchApi.getFolder()

  console.log(folders)

  return (
    <div className="flex items-center border-gray-500 gap-4 border-b-2 pb-4 ">
      {folders.map((value) => (
        <Link href={`/?folder=${value.id}`} className="">
          <div
            key={value.id}
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
          </div>
        </Link>
      ))}
    </div>
  )
}
