export const LocationList = ({ locations, title }: { locations: { name: string, charge: boolean }[], title: string }) => {
    return (
        <div className="bg-lightgray border border-gray rounded-xl max-w-4xl w-full flex flex-col gap-5 p-6 sm:p-8 md:p-12">
            <h4 className="w-full font-semibold text-2xl text-gray-900">{title}</h4>
            <div className="w-full overflow-x-auto bg-white">
                <div className="w-full flex gap-3 p-6 rounded-lg whitespace-nowrap">
                    {locations.map((location, index) => (
                        <span 
                            key={index} 
                            className={`
                                inline-flex items-center justify-center
                                px-4 py-2 text-base
                                rounded-md font-medium
                                ${location.charge 
                                    ? 'bg-main text-white' 
                                    : 'bg-gray text-black'
                                }
                                min-w-[100px]
                            `}
                        >
                            {location.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}