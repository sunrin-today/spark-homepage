import { TriangleAlert } from "lucide-react";

export const Cautions = ({ title, items }: { title: string; items: string }) => {
    return (
        <div className='w-fit bg-[#EC8303] bg-opacity-10 border border-[#EC8303] rounded-xl
        flex flex-col gap-4 py-4 px-[34px]'>
            <div className="flex items-center gap-[10px]">
                <TriangleAlert className="text-[#EC8303]" width={20} height={20} />
                <h4 className="text-base font-semibold text-[#EC8303]">
                    {title}
                </h4>
            </div>
            <p className="text-sm whitespace-pre-line font-medium text-[#EC8303]">
                {items}    
            </p>
        </div>
    );
};