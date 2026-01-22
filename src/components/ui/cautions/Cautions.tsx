export const Cautions = ({ title, items }: { title: string; items: string[] }) => {
    return (
        <div className="w-full max-w-[628px] bg-lightgray border border-gray rounded-xl p-6 sm:p-8 md:p-12">
            <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                {title}
            </h4>
            <ul className="space-y sm:space-y-1">
                {items.map((caution, index) => (
                    <li key={index} className="flex items-start text-lg">
                        <span className="mr-2 text-xl font-bold">•</span>
                        {caution}
                    </li>
                ))}
            </ul>
        </div>
    );
};