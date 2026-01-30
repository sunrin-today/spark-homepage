import { useMutation } from "@tanstack/react-query";
import { chargerRequestKeys } from "./keys";
import chargerApi from "@/lib/api/charger";

export function useChargerRequestMutation() {
  return useMutation({
    mutationKey: chargerRequestKeys.all,
    mutationFn: () => chargerApi.postChargerRentalRequest(),
    onSuccess: () => {
      alert("충전기 대여 요청이 완료되었습니다!\n학생회실로 오셔서 수령하시길 바랍니다!");
    },
    onError: (error) => {
      alert("충전기 대여 요청에 실패했습니다");
      console.error(error);
    },
  });
}