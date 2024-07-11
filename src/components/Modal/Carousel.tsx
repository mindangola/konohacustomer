'use client'

import { Button } from '@/components/ui/button'
import generateRGBDataUrl from '@/utils/generateBlurPlaceholder'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { LucideChevronLeft, LucideChevronRight, LucideX } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import '../../styles/embla.css'
import { Thumb } from './Thumbnail'

type Image = {
  id: string
  name: string
  key_name: string
  size: number
  content_type: string
  tenant_id: string
  user_id: string
  created_at: Date
  updated_at: Date
  imageUrl: string
}

interface CarouselComponentProps {
  folderId?: string
  images: Image[]
  currentImage: string
}

export function CarouselComponent({
  images,
  currentImage,
}: CarouselComponentProps) {
  const options: EmblaOptionsType = {}
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)

  const image = images.find((image) => {
    return image.id === currentImage
  })

  const startIndexValue = images.indexOf(image as Image)

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    startIndex: startIndexValue,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev()
  }, [emblaMainApi])

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext()
  }, [emblaMainApi])

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

  function handleCloseModal() {
    const params = new URLSearchParams(searchParams)

    params.delete('modalOpen')

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="embla h-full w-full relative">
      <div className="h-screen w-screen top-0 absolute">
        <img
          src="/backgroundblur.png"
          width={40}
          height={40}
          className="w-full h-full filter blur-3xl"
          alt="Blur image"
          loading="lazy"
        />

        <Button
          onClick={handleCloseModal}
          className="absolute top-5 cursor-pointer z-50 bg-gray-950/40 hover:bg-gray-900  text-white flex items-center justify-center h-12 w-12 rounded-full right-8"
        >
          <LucideX />
        </Button>
      </div>

      <div className="embla__viewport  h-full" ref={emblaMainRef}>
        <div className="embla__container md:h-full">
          {images.map((value, index) => (
            <div className="embla__slide h-full" key={index}>
              <Image
                className="bg-slate-300 w-full h-auto md:h-full md:w-auto"
                alt="image"
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL={blurImagePromises[index]}
                src={value.imageUrl}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="absolute w-full top-1/2 ">
          <button
            className="embla__prev bg-gray-900/40 absolute text-white flex items-center justify-center h-12 left-10 w-12 rounded-full"
            onClick={scrollPrev}
          >
            <LucideChevronLeft />
          </button>
          <button
            className="embla__next bg-gray-900/40 absolute text-white flex items-center justify-center h-12 right-10 w-12 rounded-full"
            onClick={scrollNext}
          >
            <LucideChevronRight />
          </button>
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images.map((value, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
