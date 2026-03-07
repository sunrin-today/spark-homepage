import Image from "next/image"

function getFirstKoreanChar(name: string): string {
  const match = name.match(/[가-힣]/);
  return match ? match[0] : name[0] ?? "?";
}

export const UserProfile = ({ name, photoURL }: { name: string, photoURL?: string }) => {
    return (
        <div className="flex gap-2 px-3 py-1.5 z-50 items-center">
            {photoURL ? (
                <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                        src={photoURL}
                        className="rounded-full object-cover"
                        alt="profile"
                        width={24}
                        height={24}
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                        }}
                    />
                    <span
                        className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-semibold items-center justify-center flex-shrink-0"
                        style={{ display: "none" }}
                    >
                        {getFirstKoreanChar(name)}
                    </span>
                </div>
            ) : (
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                    {getFirstKoreanChar(name)}
                </span>
            )}
            <span className="text-base font-medium">{name}</span>
        </div>
    )
}