"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getPageColor } from "@/utils/color";
import { useAuth } from "@/contexts/AuthContexts";

const NAV_ITEMS = [
  { href: "/search", label: "검색", icon: "/icons/search.svg" },
  { href: "/about", label: "학생회 서비스" },
  { href: "/schedule", label: "일정" },
  { href: "/events", label: "이벤트" },
  { href: "/notice", label: "공지사항" },
];

export const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const color = getPageColor(path);
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className="fixed flex space-between h-[64px] top-0 left-0 right-0 justify-between items-center px-[50px] py-[5px] z-50">
      <Link href="/about">
        <Image src="/logo/logo.svg" alt="logo" width={89} height={46} />
      </Link>
      <div className="flex gap-[33.5px] items-center">
        <div className="flex gap-[33.5px] items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-semibold text-${color || ""}`}
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

        {!loading && user ? (
          // 로그인 돼있을 때
          <div className="flex items-center gap-3">
            <span className={`font-semibold text-${color || ""}`}>
              {user.displayName || user.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className={`bg-${color} text-${
                color == "white" ? "black" : "white"
              } rounded-[100px] px-[22px] py-[10px] font-semibold hover:opacity-80 transition-opacity`}
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 로그아웃 돼있을 때
          <Link
            href="/login"
            className={`bg-${color} text-${
              color == "white" ? "black" : "white"
            } rounded-[100px] px-[22px] py-[10px] font-semibold`}
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};