export const DetailImageList = ({imgs}: {imgs: string[]}) => {

    return (
        
        <ul className='
                flex gap-3 list-none max-w-[1552px] border-t-2 border-lightgray pt-[110px] mt-[135px]
                 snap-x snap-mandatory overflow-x-auto border-b-2
            '>
                {
            
                imgs.map((image, index) => (
                    <img className="snap-start" src={image} alt="" />
                ))
            }
        </ul>
    )

}