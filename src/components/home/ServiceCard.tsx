import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  iconSrc: string;
}

export default function ServiceCard({
  title,
  description,
  href,
  iconSrc,
}: ServiceCardProps) {
  return (
    // TODO: UI 깨지는 거 수정하기
    <Link
      href={href}
      className="
        flex items-center
        w-full h-full
        bg-white
        group
      "
    >
      <div className="flex-shrink-0 mr-4">
        <Image src={iconSrc} alt={title} width={72} height={72} />
      </div>

      <div className="flex-1 flex flex-col justify-center min-w-0">
        <h4 className="font-semibold text-[18px] text-[#0d0d0d] mb-1">
          {title}
        </h4>
        <p className="font-regular text-[14px] text-[#767676] leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex-shrink-0 ml-3">
        <ChevronRight
          className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
        />
      </div>

    </Link>
  );
}