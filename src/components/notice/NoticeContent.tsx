import Image from "next/image";

interface NoticeContentProps {
  content: string;
  imageUrls?: string[];
}

export default function NoticeContent({ content, imageUrls = [] }: NoticeContentProps) {
  return (
    <div className="px-6 py-8">
      {imageUrls && imageUrls.length > 0 && (
        <div className="mb-8 bg-gray-50 rounded-lg p-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {imageUrls.map((url, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[500px] h-[350px] rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center"
              >
                <Image
                  src={url}
                  alt={`공지 이미지 ${index + 1}`}
                  width={500}
                  height={350}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-lg font-semibold leading-relaxed text-black whitespace-pre-wrap break-all">
        {content}
      </div>
    </div>
  );
}