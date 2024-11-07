import { Input } from "@/components/atoms/input";
import { Filter, Search } from "lucide-react";

interface ISearchForm {
    openFilterModal: (state: object) => void;
}
export const SearchForm = ({openFilterModal}: ISearchForm) => (
    <div className="flex w-[70%]">
        <Input placeholder="Pesquisar..." />
        <div className="flex mx-2 gap-1">
            <button className="bg-red-600 text-white px-4 hover:bg-red-700 transition duration-300 shadow-md rounded-sm">
                <Search className="inline w-5 h-5" />
            </button>
            <button className="bg-gray-800 text-white px-4 ml-2 hover:bg-gray-700 transition duration-300 shadow-md rounded-sm" onClick={() => openFilterModal({})}>
                <Filter className="inline w-5 h-5" />
            </button>
        </div>
    </div>
);