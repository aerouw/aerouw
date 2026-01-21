import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/aircraft-flight.jpg";
import logo from "@/assets/sae-aero-logo.png";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroBg})`
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
    </div>

    {/* Animated grid overlay */}
    <div className="absolute inset-0 grid-overlay opacity-20 animate-grid" />

    {/* Glowing orb */}
    <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30" style={{
      background: "var(--gradient-glow)"
    }} animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

    {/* Floating aircraft icon */}
    <motion.div className="absolute top-20 right-20 text-primary/30" animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}>
      <Plane className="w-32 h-32" />
    </motion.div>

    {/* Content */}
    <div className="relative z-10 container mx-auto px-6 text-center">
      <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        ease: "easeOut"
      }}>
        {/* Logo */}


        {/* Main heading */}
        <motion.h1 className="heading-display text-4xl md:text-6xl lg:text-7xl mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
          <span className="text-foreground">SAE Aero Design</span>
          <br />
          <span className="text-gradient">University of Wisconsin–Madison</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.6
        }}>
          Designing, building, and flying large-scale RC aircraft for international competition
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.8
        }}>
          <Button variant="hero" size="xl" className="group" asChild>
            <a href="mailto:jkuehne@wisc.edu,nrienstra@wisc.edu,rrander@wisc.edu?subject=SAE%20Aero%20UW%20Join%20Request&body=Name:%0AYear:%0AMajor:%0APhone:%0A">
              <span>Join the Team</span>
            </a>
          </Button>
          <Button variant="heroSecondary" size="xl">
            Sponsor Us
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.2
      }}>
        <motion.div animate={{
          y: [0, 10, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="text-muted-foreground">

        </motion.div>
      </motion.div>
    </div>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>;
};
export default HeroSection;