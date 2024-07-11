'use client'

import { useModal } from '@/context/ModalContext'
import { Image as ImageType } from '@/services/fetch'
import Image from 'next/image'

interface NewImages extends ImageType {
  blurDataUrl: string
}

interface GaleryProps {
  images: NewImages[]
}

export function Galery({ images: ImagesResponse }: GaleryProps) {
  const { handleOpenModal } = useModal()

  const images = ImagesResponse?.length ? ImagesResponse : []

  return (
    <>
      <div className="">
        {images?.length ? (
          <div className="grid grid-cols-4 gap-4 mt-10">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={handleOpenModal}
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
              </button>
            ))}
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <h3 className="text-white text-3xl">Pasta Vazia</h3>
          </div>
        )}
      </div>
    </>
  )
}
