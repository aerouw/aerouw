import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Copy, Check } from "lucide-react";
import compImage from "@/assets/spring2025-comp-pic.png";

const GOFUNDME_URL = "https://www.gofundme.com/f/send-uwmadison-engineers-to-competition";

const GoFundMeSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(GOFUNDME_URL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <section className="relative py-24 overflow-hidden bg-background">
            <div className="container mx-auto px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-center font-display text-3xl md:text-4xl mb-16">
                        Support Our <span className="text-gradient">Season</span>
                    </h2>

                    {/* Donation Card */}
                    <div className="max-w-5xl mx-auto">
                        <div className="card-glass rounded-3xl overflow-hidden border border-primary/20 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="grid md:grid-cols-2 gap-0 relative z-10">
                                {/* Left: Text Content */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                                        Your donation directly funds materials, travel, and competition costs for SAE Aero UW as we compete internationally. Every contribution helps us push the boundaries of aerospace engineering and represent UW-Madison on the world stage.
                                    </p>

                                    {/* Primary CTA */}
                                    <Button
                                        asChild
                                        variant="cta"
                                        size="lg"
                                        className="mb-4 w-full sm:w-auto"
                                    >
                                        <a
                                            href={GOFUNDME_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Donate on GoFundMe"
                                        >
                                            <Heart className="w-5 h-5 mr-2" />
                                            Donate on GoFundMe
                                        </a>
                                    </Button>

                                    {/* Secondary CTA */}
                                    <button
                                        onClick={handleCopyLink}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group/copy focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1 -ml-2"
                                        aria-label="Copy GoFundMe link to clipboard"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-primary" />
                                                <span className="text-primary">Link copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 group-hover/copy:text-primary transition-colors" />
                                                <span>Or share our fundraiser</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Right: Visual Panel */}
                                <div className="relative h-64 md:h-auto min-h-[300px] order-first md:order-last">
                                    <img
                                        src={compImage}
                                        alt="SAE Aero UW team at Spring 2025 competition"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    {/* Dark overlay with gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GoFundMeSection;
