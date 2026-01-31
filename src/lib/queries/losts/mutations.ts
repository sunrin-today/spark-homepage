import { useMutation } from "@tanstack/react-query"
import { lostsApi } from "@/lib/api/losts"

export const useFindLostMutation = (lostId: string) => {
    return useMutation({
        mutationFn: () => lostsApi.postLostClaim(lostId),
        onSuccess: () => {
            alert("분실물 찾기 요청이 완료되었습니다.")
        },
        onError: () => {
            alert("분실물 찾기 요청이 실패하였습니다.")
        }
    })
}