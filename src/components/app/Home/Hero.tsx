import Image from 'next/image'

interface HeroProps {
  folderName: string
  imageUrl: string
}

export function Hero({ folderName, imageUrl }: HeroProps) {
  return (
    <section className="w-full h-[280px] sm:h-[300px] md:h-[500px]">
      <div className="relative h-full top-0">
        <div className="absolute w-full flex items-center justify-center h-full bg-black/60">
          <h2 className="text-white font-bold text-4xl mb-10">{folderName}</h2>
        </div>
        <Image
          src={imageUrl}
          alt="banner"
          placeholder="blur"
          blurDataURL="/backgroundblur.png"
          width={2000}
          height={1800}
          className="h-full object-cover"
        />
      </div>
    </section>
  )
}
