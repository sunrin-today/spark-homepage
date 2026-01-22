export const LocationList = ({ locations, title, width }: { locations: { name: string, charge: boolean, width?: string, height?: string }[], title: string, width?: string }) => {
    return (
        <div
            className="bg-lightgray border border-gray rounded-xl w-full flex flex-col gap-[26px] p-6 sm:p-8 md:p-12"
            style={{ maxWidth: width || '100%' }}
        >
            <h4 className="w-full font-semibold text-2xl text-black">{title}</h4>
            <div className="w-full overflow-x-auto bg-white">
                <div className="w-full flex gap-[17px] px-[35px] py-[51px] rounded-lg">
                    {locations.map((location, index) => (
                        <div 
                            key={index}
                            style={{
                                width: location.width || '86px',
                                height: location.height || '55px'
                            }} 
                            className={`
                                inline-flex items-center justify-center
                                text-base
                                rounded-md font-semibold
                                min-w-[86px]
                                ${location.charge 
                                    ? 'bg-main text-white' 
                                    : 'bg-gray text-black'
                                }
                            `}
                        >
                            {location.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}