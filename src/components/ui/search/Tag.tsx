export const Tag = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => {
    return (
        <button className={`text-lg px-[15px] py-[10px] rounded-[100px] border-[1px] border-gray
            ${selected ? `bg-main text-white` : `bg-none text-[#939393]`}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};