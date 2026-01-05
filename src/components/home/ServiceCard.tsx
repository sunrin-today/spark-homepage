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
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-gray-50 group min-w-0"
    >
      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
        <Image 
          src={iconSrc} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[17px] text-[#1a1a1a] mb-0.5">
          {title}
        </h4>
        <p className="text-[13px] text-[#767676] leading-snug">
          {description}
        </p>
      </div>

      <div className="flex-shrink-0">
        <ChevronRight
          className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}