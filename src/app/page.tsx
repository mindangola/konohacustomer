import { FolderList } from '@/components/app/Home/FolderList'
import { Galery } from '@/components/app/Home/Galery'
import { Header } from '@/components/app/shared/Header'
import { FetchApi, Image as ImageType } from '@/services/fetch'
import generateRGBDataUrl from '@/utils/generateBlurPlaceholder'
import Image from 'next/image'
import { Suspense } from 'react'

interface NewImages extends ImageType {
  blurDataUrl: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: { folder: string }
}) {
  const fetchApi = new FetchApi()
  const images = await fetchApi.getImages(searchParams.folder)

  const blurImagePromises = images?.map(() => {
    function getRandomRGB() {
      const r = Math.floor(Math.random() * 256) // Gera um valor entre 0 e 255
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return { r, g, b }
    }

    const { r, g, b } = getRandomRGB()

    return generateRGBDataUrl(r, g, b)
  })

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  const newImages = [...images] as NewImages[]

  for (let i = 0; i < images.length; i++) {
    newImages[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return (
    <main className="flex min-h-screen bg-gray-950 w-full flex-col items-center">
      <Header />
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

      <div className="w-full ">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-gray-850  z-20  p-10 rounded-lg">
            {/* <FolderFilter /> */}
            <Suspense fallback="loading...">
              <FolderList />
            </Suspense>
            <Galery images={newImages} />
          </div>
        </div>
      </div>
    </main>
  )
}
