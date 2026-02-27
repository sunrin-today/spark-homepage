export default function Footer() {
  return (
    <footer className="w-full bg-[#ffffff]">
      <div className="max-w-screen-xl mx-auto px-6 py-[36px] flex flex-col items-center text-center gap-8">
        <div className="flex flex-row items-center gap-6 flex-wrap justify-center">
          <img
            src="/logo/logo.svg"
            alt="Spark! Logo"
            className="h-[33px] w-auto"
          />
          <div className="flex flex-row items-center gap-2 text-sm">
            <span className="font-medium text-[#505050]">연락 이메일</span>
            <a
              href="mailto:council@sunrin.kr"
              className="font-medium text-black"
            >
              council@sunrin.kr
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 text-sm font-medium text-[#767676]">
          <span>서울 용산구 원효로97길 33-4 222실</span>
          <span>Copyright © 2026 Sunrin Council. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
