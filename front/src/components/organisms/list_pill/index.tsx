import { motion } from "framer-motion";
import { Pill } from "@/components/atoms/pill";
import { IGenres } from "@/types/genre.type";

interface IListPill {
    genres: IGenres[]
}

export const ListPill = ({ genres }: IListPill) => (
    <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <ul className="flex gap-4 overflow-hidden hover:overflow-x-auto px-4 scrollbar-hide">
            {genres.map(
                (genre) => (
                    <Pill key={genre.id} name={genre.name} />
                )
            )}
        </ul>
    </motion.div>
)