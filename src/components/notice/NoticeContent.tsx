import Image from 'next/image';

interface NoticeContentProps {
  content: string;
  imageUrls?: string[];
}

export default function NoticeContent({ content, imageUrls = [] }: NoticeContentProps) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-base text-[#505050] mb-3">내용</p>
        <p className="text-base text-[#010101] font-medium leading-relaxed whitespace-pre-wrap break-all">
          {content}
        </p>
      </div>

      {imageUrls.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[#010101] mb-5">상세 이미지</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start w-[343px] h-[202px] rounded-[20px] overflow-hidden bg-lightgray"
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