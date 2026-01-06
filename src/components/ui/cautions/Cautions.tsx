export const Cautions = ({ cautions  }: { cautions: string[] }) => {
    return <ul className="list-none">

        {cautions.map(content => 
            <li className={`before:content-['•'] before:mx-2 before:text-2xl before:text-black
                            text-[18px] before:text-center before:mr-2`}>
             {content}
            </li>
        )}
    </ul>;
};