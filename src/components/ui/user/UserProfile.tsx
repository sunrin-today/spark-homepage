
import Image from "next/image"
export const UserProfile = ({ name, photoURL }: { name: string, photoURL?: string }) => {
    return (
        <div className="flex gap-2 px-3 py-1.5 z-50 items-center">
            <Image src={photoURL || "/logo/logo.svg"} className="rounded-full" alt="profile" width={24} height={24} />
            <span className="text-base font-medium">{name}</span>
        </div>
    )
}