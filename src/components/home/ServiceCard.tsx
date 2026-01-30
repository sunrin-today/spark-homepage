import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  iconSrc?: string;
}

export default function ServiceCard({
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-4
        w-full min-h-[140px]
        rounded-[20px] bg-white
        hover:shadow-lg transition-all
        p-6
        group
      "
    >
      <div className="relative w-[120px] h-[100px] flex-shrink-0 rounded-[12px] overflow-hidden">
        <Image 
          src="/example-image/event1.png" 
          alt={title} 
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-[18px] text-black">{title}</h4>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <svg 
          className="w-6 h-6 text-gray-400 flex-shrink-0 ml-4 group-hover:text-gray-600 transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
