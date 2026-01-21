import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { Button } from "./ui/button";

const DonationPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show popup after 10 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="fixed bottom-6 right-6 z-[100] w-[320px] md:w-[340px] p-6 rounded-2xl card-glass border-primary/20 shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close popup"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Content */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <h3 className="font-display text-base font-bold leading-tight">
                                Help Send UW Engineers to Competition
                            </h3>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Support SAE Aero UW as we design, build, and fly a competition aircraft representing UW–Madison on the international stage.
                        </p>

                        <p className="text-[11px] text-muted-foreground/60 italic">
                            Your donation directly funds materials, travel, and competition costs.
                        </p>

                        <Button
                            variant="hero"
                            className="w-full group relative overflow-hidden"
                            asChild
                        >
                            <a
                                href="https://www.gofundme.com/f/send-uwmadison-engineers-to-competition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-primary/20"
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 13, // Pulse every ~15 seconds
                                    }}
                                />
                                <Heart className="w-4 h-4 mr-2 text-white fill-white" />
                                <span className="relative z-10">Support the Team</span>
                            </a>
                        </Button>
                    </div>

                    {/* Subtle red accent line at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-b-2xl" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DonationPopup;
