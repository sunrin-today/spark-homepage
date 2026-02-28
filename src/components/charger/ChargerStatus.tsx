export const ChargerStatus = ({ status }: { status: boolean }) => {
    return (
        <span className={`px-2 py-1 text-base font-medium rounded-lg bg-opacity-20 ${status ? "bg-[#27C20F] text-[#27C20F]" : "bg-[#E58D12] text-[#E58D12]"}`}>
            {status ? "반납 완료" : "대여 중"}
        </span>
    )
}