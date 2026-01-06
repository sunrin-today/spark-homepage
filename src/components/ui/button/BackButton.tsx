import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();
    
    const handleBack = () => {
        router.back();
    };
    
    return (
        <button onClick={handleBack} className="flex justify-start text-2xl">
        &lt;
        </button>
    );
}