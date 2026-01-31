import type { Event } from "@/types/events"
import Image from "next/image"
import { copyLink, linkToEvent } from "@/utils/events"
import { Share2 } from "lucide-react"
import { formatKoreanDate } from "@/utils/date"

export const EventInfo = ({ event }: { event: Event }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="w-full lg:w-[60%]">
          <div className="relative w-full aspect-[16/10] lg:aspect-[629/391] rounded-2xl overflow-hidden">
            <Image
              src={event.thumbnail.url}
              alt={event.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col">
          <div className="flex flex-col gap-2 pb-3 lg:pb-4">
            <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-gray-900">
              {event.name}
            </h2>
            <p className="text-xs md:text-sm text-[#767676]">
              {formatKoreanDate(event.deadline)}
            </p>
          </div>
          
          <p className="text-sm text-black line-clamp-4 md:line-clamp-5 mb-4 lg:mb-6">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => copyLink()}
                className="text-black"
                aria-label="Share event"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
            
            <button 
              disabled={event.isLinkOn}
              onClick={() => linkToEvent(event.link)}
              className={`w-[234px] h-[49px] bg-black text-white rounded-[63px] text-lg text-center 
                        ${event.isLinkOn ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              참여하러가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}