import type { Event } from "@/types/events"
import Image from "next/image"
import { copyLink, linkToEvent } from "@/utils/events"
import { ArrowRight, Share2 } from "lucide-react"
import { formatKoreanDate } from "@/utils/date"

export const EventInfo = ({ event }: { event: Event }) => {
  return (
      <div className="w-full flex flex-col justify-center lg:flex-row items-center lg:items-start gap-5">
          <div className="relative w-full max-w-[516px] aspect-[516/315] rounded-[20px] overflow-hidden">
            <Image
              src={event.thumbnail.url}
              alt={event.name}
              fill
              className="object-cover flex-shrink-0"
              priority
              unoptimized
            />
          </div>

        <div className="w-full lg:max-w-[384px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h2 className="text-base md:text-xl font-semibold text-[#010101]">
                {event.name}
              </h2>
              <p className="text-xs md:text-sm font-medium text-[#767676]">
                {formatKoreanDate(event.deadline)}
              </p>
            </div>
            
            <p className="text-sm text-[#505050] line-clamp-[8]">
              {event.description}
            </p>
          </div>
          <div className="flex sm:flex-row sm:items-center justify-between gap-6">
              <button 
                onClick={() => copyLink()}
                className="text-black"
                aria-label="Share event"
              >
                <Share2 className="w-6 h-6" />
              </button>
            
            <button 
              disabled={event.isLinkOn}
              onClick={() => linkToEvent(event.link)}
              className={`px-[70px] py-[10px] md:py-[13px] rounded-[63px] text-sm md:text-lg flex items-center justify-center gap-2 bg-black text-white
                        ${event.isLinkOn ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              참여하러가기 <ArrowRight width={18} height={18}/>
            </button>
          </div>
          <div>
            {event.isLinkOn && (
              <p className="text-xs w-full text-end">
                현재 참여할 수 없는 이벤트입니다.
              </p>
            )}
          </div>
        </div>
      </div>
  )
}