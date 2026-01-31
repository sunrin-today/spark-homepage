"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getPageColor } from "@/utils/color";
import { useAuth } from "@/contexts/AuthContexts";
import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/about", label: "학생회 서비스" },
  { href: "/schedule", label: "일정" },
  { href: "/events", label: "이벤트" },
  { href: "/notice", label: "공지사항" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const color = getPageColor(path);
  const { user, logout, loading } = useAuth();
 const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setIsOpen(false);
    if(path!=="/") {
      setScrolled(false);
      return;
    }
     const onScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

  }, [path]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center h-16 px-4 bg-white shadow-sm">
          <Link href="/" className="z-50">
            <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
          </Link>
          
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 z-50"
            aria-label="메뉴 열기"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 모바일 사이드바 */}
        <div
          className={`
            fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out z-40
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:hidden
          `}
        >
          <div className="h-full pt-20 px-6 space-y-8 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xl font-semibold py-2 hover:underline hover:bg-gray px-3 `}
                >
                  {item.label}
                </Link>
              ))}

              {!loading && user ? (
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex items-center space-x-4 mb-6">
                        <Image src={user.photoURL || "/logo/logo.svg"} className="rounded-full" alt="profile" width={40} height={40} />
                    <div>
                      <p className="font-medium" style={{color: getPageColor(path).textColor}}>
                        {user.displayName || user.email?.split("@")[0]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-center py-3 px-4 rounded-lg bg-main text-white  `}
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`w-full text-center py-3 px-4 rounded-lg text-white bg-main`}
                >
                  로그인
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* 데스크탑 헤더 */}
      <header className="hidden lg:flex fixed h-[64px] top-0 left-0 right-0 justify-between items-center px-[50px] py-[5px] z-50">
        <Link href="/">
          <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
        </Link>
        <div className="flex gap-[33.5px] items-center">
          <form onSubmit={(e) => e.preventDefault()} className="flex relative items-center text-[#767676]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 " />
            <input 
              type="text" 
              placeholder="검색어를 입력해주세요" 
              className="bg-[#FFFFFF] text-base placeholder:text-[#767676] pl-10 rounded-[86px] px-6 py-3
              w-[300px] border border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#E6E6E6]"
            />
          </form>
          <div className="flex gap-[33.5px] items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-semibold hover:underline"
                style={{color: getPageColor(path).textColor}}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {!loading && user ? (
            <div className="flex items-center gap-3">
              <span className={`font-semibold`} style={{color: getPageColor(path).textColor}}>
                {user.displayName || user.email?.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className={`rounded-[100px] px-[22px] py-[10px] hover:opacity-80 transition-opacity`}
                style={{backgroundColor: getPageColor(path).textColor, color: getPageColor(path).buttonColor}}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`rounded-[100px] px-[22px] py-[10px]`}
              style={{backgroundColor: getPageColor(path).textColor, color: getPageColor(path).buttonColor}}
            >
              로그인
            </Link>
          )}
        </div>
      </header>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

    </>
  );
};