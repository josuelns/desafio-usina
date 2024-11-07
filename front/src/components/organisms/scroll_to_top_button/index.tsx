import React from 'react';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';


export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                    aria-label="Scroll to top"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                        opacity: { duration: 0.6, ease: "easeInOut" },
                        scale: { duration: 0.4, ease: "easeOut" },
                    }}
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    )
};
