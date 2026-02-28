import Image from 'next/image';

interface NoticeContentProps {
  content: string;
  imageUrls?: string[];
}

export default function NoticeContent({ content, imageUrls = [] }: NoticeContentProps) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-sm md:text-base text-[#505050] mb-3">내용</p>
        <p className="text-base text-[#010101] font-medium leading-relaxed whitespace-pre-wrap break-all">
          {content}
        </p>
      </div>

      {imageUrls.length > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-[#010101] mb-5">상세 이미지</h2>
          <div className="flex flex-col gap-6 md:flex-row md:overflow-x-auto md:pb-2 md:snap-x md:snap-mandatory">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex-shrink-0 md:snap-start rounded-[20px] overflow-hidden bg-lightgray
                  w-[327px] h-[192.35px] md:w-[343px] md:h-[202px]"
              >
                <Image
                  src={url}
                  alt={`공지 이미지 ${index + 1}`}
                  width={343}
                  height={202}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}