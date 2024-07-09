import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

export default async function Home() {
  // const fetchApi = new FetchApi()
  // const folders = await fetchApi.getImages('')
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

      <section className="w-full">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-gray-850 -mt-28 z-20 relative p-10 rounded-lg">
            {/* <FolderFilter /> */}

            <div className="flex items-center gap-4">
              {Array.from({ length: 5 }).map((value, index) => (
                <div
                  key={index}
                  className="w-full h-[50px] px-4 py-2 gap-2 text-white  flex bg-gray-600 items-center overflow-hidden rounded-md"
                >
                  <Image
                    src={`/folder.svg`}
                    alt="folder image"
                    width={40}
                    height={100}
                    className="h-auto w-10 object-cover"
                  />

                  <p>Casamento {index + 1}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              {Array.from({ length: 24 }).map((value, index) => (
                <div
                  key={index}
                  className="w-full h-[300px] bg-white overflow-hidden rounded-md"
                >
                  <Image
                    src={`/pro2/${index + 1}.jpeg`}
                    alt=""
                    width={2000}
                    height={1800}
                    className="h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
