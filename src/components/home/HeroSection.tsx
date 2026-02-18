import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full px-[10px]" style={{ marginTop: "64px" }}>
      <div className="relative w-full h-[1080px] rounded-[24px] overflow-hidden">
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
