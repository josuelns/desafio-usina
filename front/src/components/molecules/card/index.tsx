import { ChevronRight } from "lucide-react";

interface CardProps {
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    onClick: () => void;
}

export const Card = ({ title, description, buttonText, imageUrl, onClick }: CardProps) => (
    <div
        className="relative w-[225px] h-[320px] bg-black text-white rounded-lg shadow-lg overflow-hidden"
        style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="absolute inset-0 bg-[#000000be] bg-opacity-70 p-6 flex flex-col justify-end">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="mb-4 text-sm">{description.slice(0, 100)}</p>
            <button className="text-white hover:text-gray-300 font-bold flex items-center gap-1" onClick={onClick}>
                {buttonText} <ChevronRight size={16} />
            </button>
        </div>
    </div>
);
