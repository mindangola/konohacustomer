'use client'

import { useModal } from '@/context/ModalContext'
import { Image } from '@/services/fetch'
import { CarouselComponent } from './Carousel'

interface ModalProps {
  images: Image[]
}

export default function Modal({ images }: ModalProps) {
  const { isModalOpen } = useModal()

  return (
    <div
      className={`w-full z-50 ${isModalOpen ? 'block' : 'hidden'} fixed right-0 bottom-0 top-0 left-0 h-screen bg-black`}
    >
      <CarouselComponent
        currentImage={images[0]?.id}
        images={images}
        folderId={images[0]?.id}
      />
    </div>
  )
}
