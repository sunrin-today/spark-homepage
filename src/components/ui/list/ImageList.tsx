export const ImageList = ({items}: { items: string[] }) => {
    return (
        <ul className='
                flex gap-3 list-none w-full max-w-[1440px] border-t-2 border-lightgray pt-[70px] mt-[50px]
                snap-x snap-mandatory overflow-x-auto'>
            {items.length > 0 ? (
                items.map((item, index) => (
                    <li key={index} className="snap-start">
                        <img src={item} alt={`Item ${index}`} className="w-full h-full" />
                    </li>
                ))
            ) : (
                <li className="text-gray-500">이미지가 없습니다.</li>
            )}

        </ul>
    );
}