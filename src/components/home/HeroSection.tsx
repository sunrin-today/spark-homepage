import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full px-[6px] pt-2 pb-[12px] lg:pb-2">
      <div className="relative w-full aspect-[375/213] lg:aspect-auto lg:h-[1080px] rounded-[24px] overflow-hidden">
        <Image
          src="/hero_background.svg"
          alt="SPARK Hero Image"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}