
import Image from "next/image"
export const UserProfile = ({ name, photoURL }: { name: string, photoURL?: string }) => {
    return (
        <div className="flex gap-2 z-50 items-center">
            <Image src={photoURL || "/logo/logo.svg"} className="rounded-full" alt="profile" width={24} height={24} unoptimized/>
            <span className="underline text-base font-medium">{name}</span>
        </div>
    )
}