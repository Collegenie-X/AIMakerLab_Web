"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/data-display/carousel"

type MediaItem = { type: "image" | "video"; src: string; alt?: string }

export function ScheduleMediaGallery({ items }: { items: MediaItem[] }) {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((m, idx) => (
            <CarouselItem key={idx}>
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                {m.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.src} alt={m.alt ?? "gallery"} className="h-full w-full object-cover" />
                ) : (
                  <video controls className="h-full w-full">
                    <source src={m.src} />
                  </video>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}


