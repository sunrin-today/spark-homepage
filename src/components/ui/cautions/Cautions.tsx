import { TriangleAlert } from "lucide-react";

export const Cautions = ({ title, items }: { title: string; items: string }) => {
    return (
        <div className='w-full md:w-fit bg-[#EC8303] bg-opacity-10 border border-[#EC8303] rounded-xl
        flex flex-col gap-2 md:gap-4 py-4 md:py-5 px-5 md:px-[34px]'>
            <div className="flex items-center gap-[10px]">
                <TriangleAlert className="text-[#EC8303]" width={16} height={16} />
                <h4 className="text-xs md:text-base font-semibold text-[#EC8303]">
                    {title}
                </h4>
            </div>
            <p className="text-[9px] md:text-sm whitespace-pre-line font-medium text-[#EC8303]">
                {items}    
            </p>
        </div>
    );
};