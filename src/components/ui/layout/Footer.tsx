export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto py-[36px] flex flex-col items-center text-center">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8">
          <img
            src="/logo/logo.svg"
            alt="Spark! Logo"
            className="h-[33px] w-auto mx-auto"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-medium text-sm text-[#505050]">
            <span>연락 이메일</span>
            <a
              href="mailto:council@sunrin.kr"
              className="font-medium text-black"
            >
              council@sunrin.kr
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 font-medium text-sm text-[#767676]">
          <span>서울 용산구 원효로97길 33-4 222실</span>
          <span>Copyright © 2026 Sunrin Council. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
