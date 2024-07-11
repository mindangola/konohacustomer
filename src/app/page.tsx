import Modal from '@/components/Modal'
import { FolderList } from '@/components/app/Home/FolderList'
import { Galery } from '@/components/app/Home/Galery'
import { Hero } from '@/components/app/Home/Hero'
import { Header } from '@/components/app/shared/Header'
import { FetchApi, Image as ImageType } from '@/services/fetch'
import generateRGBDataUrl from '@/utils/generateBlurPlaceholder'
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
  const imagesResponse = await fetchApi.getImages(searchParams.folder)

  const images = imagesResponse.length ? imagesResponse : []

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
      <Hero imageUrl={images[2]?.imageUrl} folderName="Casamento" />
      <div className="w-full ">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-gray-850 relative -mt-28  z-20  p-10 rounded-lg">
            {/* <FolderFilter /> */}
            <Suspense fallback="loading...">
              <FolderList activeFolder={searchParams.folder} />
            </Suspense>
            <Galery images={newImages} />
          </div>
          <Modal images={newImages} />
        </div>
      </div>
    </main>
  )
}
