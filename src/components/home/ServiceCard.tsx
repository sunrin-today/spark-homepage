import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: React.ReactNode;
  href: string;
  imageSrc?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  imageSrc = "/example-image/event1.png",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="
        block
        w-[315px] sm:w-[360px]
        rounded-[20px]
        border border-[#C0C0C0]
        p-6
        transition-all duration-300
      "
    >
      <div className="relative w-[312px] h-[147px] rounded-[25px] overflow-hidden border border-[rgba(0,0,0,0.25)]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="mt-5 flex flex-col gap-[5px]">
        <h4 className="text-xl font-semibold text-black leading-[24px]">
          {title}
        </h4>

        <p className="text-sm font-medium text-[#8E8E8E] leading-relaxed leading-[17px]">
          {description}
        </p>
      </div>
    </Link>
  );
}
