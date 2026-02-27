export const ChargerStatus = ({ status }: { status: string }) => {
    return (
        <span className="px-2 py-1 text-base font-medium rounded-lg">
            {status === "대여 가능" ? "반납 완료" : "대여 중"}
        </span>
    )
}