import { FetchApi } from '@/services/fetch'
import Image from 'next/image'
import Link from 'next/link'

export async function FolderList() {
  const fetchApi = new FetchApi()
  const folders = await fetchApi.getFolder()

  return (
    <div className="flex items-center border-gray-500 gap-4 border-b-2 pb-4 ">
      {folders.map((value, index) => (
        <Link href={`/?folder=${value.id}`} className="">
          <div
            key={index}
            className="w-auto h-[40px] flex-none px-4 py-2 gap-2 text-gray-100  flex bg-gray-700 items-center overflow-hidden rounded-md"
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
