import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getPageColor, textColorMap, type PageColor} from "@/utils/color";
const NAV_ITEMS = [
  { href: "/search", label: "검색", icon: "/search.svg" },
  { href: "/about", label: "학생회 서비스"},
  { href: "/schedule", label: "일정"  },
  { href: "/events", label: "이벤트" },
  { href: "/notice", label: "공지사항" },
];
export const Header = () => {
    const path = usePathname();
    const color : PageColor = getPageColor(path);
    console.log(color);
    return (
        <header className='sticky flex space-between h-[64px] top-0 left-0 right-0 justify-between items-center 
                            px-[50px] py-[5px] z-50
                            bg-white    '>
            <Link href="/about">
                <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
            </Link>
            {/* TODO : 검색 아이콘 색 조절되게 */}
            <div className="flex gap-[33.5px] items-center">
                <div className="flex gap-[33.5px] items-center">
                    {NAV_ITEMS.map((item) => (
                        <Link 
                            key={item.href}
                            href={item.href}
                            className={`font-semibold ${textColorMap[color]}`}
                        >
                        {item.icon ? (
                            <Image 
                                src={item.icon} 
                                alt={item.label} 
                                width={20} 
                                height={20}
                                className="inline-block"
                            />
                        ) : (
                            item.label
                        )}
                        </Link>
                    ))}
                </div>
                <Link href="/login" className={`bg-${color} text-${color == 'white' ? 'black' : 'white'} rounded-[100px] px-[22px] py-[10px] font-semibold`}>로그인</Link>
                <div className="sidebar">
                    
                </div>
            </div>

        </header>
    )


}