export const Tag = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => {
    return (
        <button className={`text-lg px-[15px] py-[10px] rounded-[100px]
            ${selected ? `bg-main text-white` : `border-[1px] bg-lightgray border-gray text-gray`}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};