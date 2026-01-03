import Link from "next/link";
import Image from "next/image";

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
      className="
        flex flex-col items-center justify-center
        w-full h-[192px]
        rounded-[20px] bg-white
        hover:shadow-lg transition-all
        p-8
      "
    >
      <div className="mb-6">
        <Image src={iconSrc} alt={title} width={64} height={64} />
      </div>

      <div className="flex flex-col items-center text-center">
        <h4 className="font-bold text-[18px] text-black mb-3">{title}</h4>
        <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </Link>
  );
}
