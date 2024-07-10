import { FolderList } from '@/components/app/Home/FolderList'
import { Galery } from '@/components/app/Home/Galery'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: { folder: string }
}) {
  return (
    <main className="flex min-h-screen bg-gray-950 w-full flex-col items-center">
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
              <span className="text-xs text-gray-100">
                ramironzau@gmail.com
              </span>
            </div>

            <Avatar className="border border-newBlue-100">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback className="text-newBlue-100 font-bold">
                {`${String('Ramiro Nzau').split(' ')[0][0]}${String('Ramiro Nzau').split(' ')[1][0]}`}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <section className="w-full h-[500px]">
        <div className="relative h-full top-0">
          <div className="absolute w-full flex items-center justify-center h-full bg-black/60">
            <h2 className="text-white font-bold text-4xl mb-10">
              Casamento do Anifa
            </h2>
          </div>
          <Image
            src="/pro2/17.jpeg"
            alt=""
            width={2000}
            height={1800}
            className="h-full object-cover"
          />
        </div>
      </section>

      <section className="w-full ">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-gray-850 -mt-28 z-20 relative p-10 rounded-lg">
            {/* <FolderFilter /> */}
            <Suspense fallback="loading...">
              <FolderList />
            </Suspense>
            <Suspense fallback="loading...">
              <Galery folderId={searchParams.folder} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
