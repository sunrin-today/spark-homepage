import { useMutation } from "@tanstack/react-query";
import { chargerRequestKeys } from "./keys";
import chargerApi from "@/lib/api/charger";
import { useRouter } from "next/navigation";

export function useChargerRequestMutation() {
  const router = useRouter();
  return useMutation({
    mutationKey: chargerRequestKeys.all,
    mutationFn: () => chargerApi.postChargerRentalRequest(),
    onSuccess: () => {
      router.push("/charger/rental/success");
    },
    onError: (error) => {
      alert("충전기 대여 요청에 실패했습니다");
      console.error(error);
    },
  });
}