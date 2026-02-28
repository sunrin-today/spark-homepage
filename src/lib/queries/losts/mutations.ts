import { useMutation } from "@tanstack/react-query"
import { lostsApi } from "@/lib/api/losts"
import { useRouter } from "next/navigation"

export const useFindLostMutation = (lostId: string) => {
    const router = useRouter()
    return useMutation({
        mutationFn: () => lostsApi.postLostClaim(lostId),
        onSuccess: () => {
            router.push(`/losts/rental/${lostId}/success`)
        },
        onError: (error) => {
            //에러가 409면 이미 신청된 분실물입니다.
            if (error instanceof Error && error.message.includes("409")) {
                alert("이미 신청된 분실물입니다.")
            }
            else if (error instanceof Error) {
                alert("분실물 요청에 실패하였습니다.")
            }
        }
    })
}