import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[1080px]">
      <Image
        src="/hero_background.svg"
        alt="SPARK 배경"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src="/logo/logo.svg"
          alt="SPARK 로고"
          width={274}
          height={144}
          className="mb-4"
        />
        <p className="text-white text-[32px] font-bold">
          모든 목소리를 하나로, SPARK!
        </p>
      </div>
    </div>
  );
}
