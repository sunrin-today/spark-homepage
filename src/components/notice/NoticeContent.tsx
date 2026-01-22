import Image from "next/image";

interface NoticeContentProps {
  content: string;
  imageUrl?: string;
}

export default function NoticeContent({ content, imageUrl }: NoticeContentProps) {
  return (
    <div className="px-6 py-6">
      {imageUrl && (
        <div className="flex justify-center mb-10">
          <div className="relative w-[497px] h-[280px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="공지 이미지"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="text-xs leading-loose text-gray-700" 
             style={{ wordBreak: 'break-all' }}>
          {content}
        </div>
      </div>
    </div>
  );
}