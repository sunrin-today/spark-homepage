import Image from "next/image"
export const LocationList = ({ title, width, url }: { title: string, width?: string, url: string }) => {
    return (
        <div
            className="w-full flex flex-col gap-4"
            style={{ maxWidth: width || '100%' }}
        >
            <h4 className="w-full font-semibold text-2xl text-black">{title}</h4>
            <Image src={url} alt="location" width={1000} height={1000} />
        </div>
    )
}