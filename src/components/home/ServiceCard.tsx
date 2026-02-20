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
        rounded-[32px]
        border border-[#C0C0C0]
        p-6
        transition-all duration-300
      "
    >
      <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-black/25">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-black">
          {title}
        </h4>

        <p className="text-sm font-medium text-[#8E8E8E] leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
