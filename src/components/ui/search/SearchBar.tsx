// src/components/ui/search/SearchBar.tsx
import Image from "next/image";
import { ChangeEvent } from "react";
interface SearchBarProps {
  placeholder: string;
  buttonText?: string;
  buttonColor? : string;
  handleSubmit: () => void;
  onChangeText: (value: string) => void;
  value: string;
  className?: string;
}

export const SearchBar = ({ 
  placeholder, 
  buttonText = "검색하기",
  buttonColor = "orange", 
  handleSubmit,
  onChangeText,
  value,
  className = ""
}: SearchBarProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText?.(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full ${className}`}>
            <div className="relative w-full">
                <Image 
                    width={34} 
                    height={34} 
                    src="/icons/search_gray.svg" 
                    alt="search" 
                    className="absolute top-[15px] bg-lightgray left-[23px]"
                />         
                <div className="flex w-full gap-[50px]">
                <input 
                    value={value}
                    type="text" 
                    name="search"
                    className="bg-lightgray font-semibold text-lg border-[1px] text-gray
                                focus:outline-none focus:ring-1 focus:ring-gray focus:text-black 
                                placeholder:text-gray border-gray flex-1 rounded-[100px] 
                                pl-[75px] pr-[25px] py-[15px] w-full" 
                    onChange={handleChange}
                    placeholder={placeholder}
                />
                <button 
                    type="submit"
                    className={` text-white bg-main
                            text-[9px] px-[1rem] py-[0.5rem]
                            md:text-[18px] md:px-[2rem] md:py-[1rem]
                            rounded-[100px] whitespace-nowrap`}
                >
                {buttonText}
                </button>
                </div>
            </div>
        </form>
    );
};