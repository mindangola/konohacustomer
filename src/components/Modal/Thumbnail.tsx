import Image from 'next/image'
import React from 'react'
import '../../styles/embla.css'

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

type PropType = {
  selected: boolean
  slide: Image
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, slide, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? 'embla-thumbs__slide--selected' : '',
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img
          width={500}
          height={500}
          className="bg-slate-300 h-full w-auto"
          alt="image"
          src={slide.imageUrl}
          loading="lazy"
        />
      </button>
    </div>
  )
}
