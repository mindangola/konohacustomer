import { FetchApi, Image as ImageType } from '@/services/fetch'
import generateRGBDataUrl from '@/utils/generateBlurPlaceholder'
import Image from 'next/image'

interface NewImages extends ImageType {
  blurDataUrl: string
}

interface GaleryProps {
  folderId: string
}

export async function Galery({ folderId }: GaleryProps) {
  const fetchApi = new FetchApi()

  const images = await fetchApi.getImages(folderId)

  const blurImagePromises = images.map(() => {
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
    <div className="grid grid-cols-4 gap-4 mt-10">
      {newImages.map((image) => (
        <div
          key={image.id}
          className="w-full h-[260px] overflow-hidden rounded-md"
        >
          <Image
            src={image.imageUrl}
            alt=""
            width={2000}
            height={1800}
            placeholder="blur"
            blurDataURL={image.blurDataUrl}
            loading="lazy"
            sizes="(min-width: 1060px) calc(25vw - 83px), (min-width: 780px) 21.15vw, (min-width: 640px) calc(33.33vw - 32px), calc(50vw - 40px)"
            className="h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
