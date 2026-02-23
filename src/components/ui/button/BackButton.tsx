import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    
    const handleBack = () => {
        router.back();
    };
    
    return (
        <button onClick={handleBack} className="flex justify-start w-6 h-6">
         <ArrowLeft />
        </button>
    );
}