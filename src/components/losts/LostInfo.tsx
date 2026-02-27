import { Lost } from "@/types/losts"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { formatKoreanDate } from "@/utils/date"
import { useFindLostMutation } from "@/lib/queries/losts/mutations"

export const LostInfo = ({lost}: {lost: Lost}) => {
    const { mutate } = useFindLostMutation(lost.id)
    return (
        <div className="w-full flex flex-col justify-center lg:flex-row items-center md:items-start gap-5">
          <div className="relative w-full max-w-[516px] aspect-[516/315] rounded-[20px] overflow-hidden">
            <Image
              src={lost.thumbnailUrl.url}
              alt={lost.title}
              fill
              className="object-cover flex-shrink-0"
              priority
              unoptimized
            />
          </div>

        <div className="w-full lg:max-w-[300px] flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h2 className="text-base md:text-xl font-semibold text-[#010101]">
                {lost.title}
              </h2>
              <p className="text-xs md:text-sm font-medium text-[#767676]">
                {formatKoreanDate(lost.foundDate)}
              </p>
            </div>
            
            <p className="text-sm text-black">
              {lost.location}
            </p>
          </div>
            <button 
              disabled={lost.taker != null}
              onClick={() => mutate()}
              className={`px-[70px] py-[10px] md:py-[13px] rounded-[63px] text-sm md:text-lg flex items-center justify-center gap-2 bg-black text-white
                        ${lost.taker != null ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              분실물 찾으러 가기 <ArrowRight width={18} height={18}/>
            </button>
        </div>
      </div>
    )
}