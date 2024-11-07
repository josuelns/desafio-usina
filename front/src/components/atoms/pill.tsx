interface ListPillProps {
    name: string
}

export const Pill = ({ name }: ListPillProps) => (
    <li
        className="text-white cursor-pointer uppercase whitespace-nowrap py-1 px-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-md"
    >
        {name}
    </li>
);


