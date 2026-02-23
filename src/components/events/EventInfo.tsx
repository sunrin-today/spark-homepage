import type { Event } from "@/types/events"
import Image from "next/image"
import { copyLink, linkToEvent } from "@/utils/events"
import { ArrowRight, Share2 } from "lucide-react"
import { formatKoreanDate } from "@/utils/date"

export const EventInfo = ({ event }: { event: Event }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="w-full lg:w-[60%]">
          <div className="relative w-full aspect-[629/391] rounded-2xl overflow-hidden">
            <Image
              src={event.thumbnail.url}
              alt={event.name}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="w-full lg:max-w-[384px] flex flex-col">
          <div className="flex flex-col gap-2 pb-3 lg:pb-4">
            <h2 className="text-xl font-semibold text-[#010101]">
              {event.name}
            </h2>
            <p className="text-sm font-medium text-[#767676]">
              {formatKoreanDate(event.deadline)}
            </p>
          </div>
          
          <p className="text-sm text-black line-clamp-4 md:line-clamp-5 mb-4 lg:mb-6">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
              className={`px-[70px] py-[13px] rounded-[63px] text-lg flex items-center justify-center gap-2 bg-black text-white
                        ${event.isLinkOn ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              참여하러가기 <ArrowRight width={18} height={18}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}