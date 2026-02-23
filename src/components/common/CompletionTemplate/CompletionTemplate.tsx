"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
type CompletionTemplateProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  backPath: string;
};

export function CompletionTemplate({
  title,
  description,
  imageSrc,
  imageWidth,
  imageHeight,
  backPath,
}: CompletionTemplateProps) {
  const router = useRouter();

  return (
    <div className="w-fill justify-center items-center flex flex-col gap-9">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-base font-medium">{description}</p>

      <Image src={imageSrc} alt="위치 안내" width={imageWidth} height={imageHeight} className="object-cover" />    

      <button 
        onClick={() => router.push(backPath)}
        className="w-full max-w-[455px] px-6 py-3 rounded-2xl border border-[#505050]"
      >
        돌아가기
      </button>
    </div>
  );
}