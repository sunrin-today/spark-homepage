"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContexts";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/service", label: "학생회 서비스" },
  { href: "/schedule", label: "일정" },
  { href: "/events", label: "이벤트" },
  { href: "/notice", label: "공지사항" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { handleGoogleLogin, isLoading } = useGoogleLogin();

  const isActive = (href: string) => {
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        handleLogout();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="lg:hidden sticky top-0 left-0 right-0 px-6 z-50 bg-[#ffffff]">
        <div className="flex justify-between items-center h-[72px]">
          {!isOpen ? (
            <Link href="/" className="z-50">
              <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
            </Link>
          ) : user ? (
            <div className="flex gap-2 px-3 py-1.5 z-50 items-center">
              <Image
                src={user.photoURL || "/logo/logo.svg"}
                className="rounded-full"
                alt="profile"
                width={32}
                height={32}
              />
              <span className="text-base font-medium">
                {user.displayName || user.email?.split("@")[0]}
              </span>
            </div>
          ) : null}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 z-50"
            aria-label="메뉴 열기"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 사이드바 */}
        <div
          className={`fixed inset-0 transform transition-all duration-300 ease-in-out z-40 bg-[#FFFFFF]
            ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
            lg:hidden
          `}
        >
          <div className="h-full pt-[88px] px-6 overflow-y-auto">
            <nav className="w-full max-w-[140px] flex flex-col gap-[16px]">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    `w-full text-base px-2 py-1.5 font-medium hover:border-b-2 hover:border-main ` +
                    (isActive(item.href)
                      ? "border-b-2 border-main text-[#010101]"
                      : "text-[#525252]")
                  }
                >
                  {item.label}
                </Link>
              ))}

              {!loading && !user && (
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full text-center py-3 px-4 rounded-lg text-white bg-main disabled:opacity-60"
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* 데스크탑 헤더 */}
      <header className="hidden lg:flex w-full sticky h-[72px] top-0 left-0 right-0 justify-between items-center px-[24px] z-50 bg-[#ffffff]">
        <Link href="/">
          <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
        </Link>
        <div className="w-full max-w-[600px] flex items-center justify-between">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "max-w-[120px] w-full py-1.5 px-2 font-medium hover:border-b-2 border-main transition-all text-center" +
                (isActive(item.href) ? " border-b-2 border-main" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {!loading && user ? (
          <div className="flex items-center gap-3">
            <div className="flex gap-2 px-3 py-1.5 items-center">
              <Image
                src={user.photoURL || "/logo/logo.svg"}
                className="rounded-full"
                alt="profile"
                width={32}
                height={32}
              />
              <span className="text-base font-medium">
                {user.displayName || user.email?.split("@")[0]}
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="rounded-[100px] px-[22px] py-[10px] hover:opacity-80 transition-opacity disabled:opacity-60"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        )}
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};