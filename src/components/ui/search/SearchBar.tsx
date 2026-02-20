// src/components/ui/search/SearchBar.tsx
import { Search } from "lucide-react";
import { ChangeEvent } from "react";
interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  buttonColor? : string;
  handleSubmit: () => void;
  onChangeText: (value: string) => void;
  value: string;
  className?: string;
  showSearchText?: boolean;
  searched?: string;
}

export const SearchBar = ({ 
//   placeholder, 
//   buttonText = "검색하기",
//   buttonColor = "orange", 
  handleSubmit,
  onChangeText,
  value,
  className = "",
  showSearchText = true,
  searched = ""
}: SearchBarProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText?.(e.target.value);
    };

    return (
       <div className={`w-full flex justify-center ${className}`}>
            <div className="w-full max-w-[556px] flex flex-col gap-4">
                <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-[10px]"
                >
                    <div className="flex-1 min-w-0 flex items-center gap-[10px] px-6 py-3 border border-[#D4D4D4] focus-within:border-black rounded-[86px]">
                        <Search className="text-[#767676]" width={20} height={20} />
                        <input
                        value={value}
                        type="text"
                        name="search"
                        className="font-medium w-full border-none outline-none"
                        onChange={handleChange}
                        placeholder="검색어를 입력해주세요..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="shrink-0 text-white bg-black px-4 py-3 rounded-2xl whitespace-nowrap"
                    >
                        검색하기
                    </button>
                </form>

                {showSearchText && searched && (
                <div className="font-medium text-[#767676]">
                    검색어: <span className="text-black">{searched}</span>
                </div>
                )}
            </div>
        </div>


    );
};