import Link from "next/link";
import Image from "next/image";
export const Header = () => {
    return (
        <header className="sticky flex space-between h-[64px] top-0 left-0 right-0 justify-between items-center px-[50px] py-[5px] z-50">
            <Link href="/about">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
            </Link>
        
            <div className="flex gap-[33.5px] items-center">
                <div className="flex gap-[33.5px] items-center">
                <Link href="/search" className="text-main font-semibold"><Image src="/search.svg" alt="search" width={20} height={20} /></Link>
                <Link href="/about" className="text-main font-semibold">학생회 서비스</Link>
                <Link href="/schedule" className="text-main font-semibold">일정</Link>
                <Link href="/events" className="text-main font-semibold">이벤트</Link>
                <Link href="/notice" className="text-main font-semibold">공지사항</Link>
                </div>
                <Link href="/login" className="text-white bg-main rounded-[100px] px-[22px] py-[10px] font-semibold">로그인</Link>
                
            </div>

        </header>
    )


}