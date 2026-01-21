import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import cadWireframe from "@/assets/aircraft-cad.png";
import flight2 from "@/assets/aircraft-flight2.JPG";
import flight3 from "@/assets/aircraft-flight3.JPG";
import flight4 from "@/assets/aircraft-flight4.JPG";
import flight5 from "@/assets/aircraft-flight5.JPG";
import compPic1 from "@/assets/comp-pic1.png";
import teamMeeting1 from "@/assets/team-meeting1.png";

const slideshowImages = [
  cadWireframe,
  flight2,
  flight3,
  flight4,
  flight5,
  compPic1,
  teamMeeting1
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="text-primary font-display text-sm tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Our Team
            </motion.span>

            <motion.h2
              className="heading-display text-4xl md:text-5xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Engineering <span className="text-gradient">Excellence</span> in Flight
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              SAE Aero UW designs, builds, and flies large-scale RC aircraft for the SAE Aero Design
              competition. Our team brings together students from every discipline at UW-Madison to create a new
              aircraft each year using industry-standard engineering tools, hands-on manufacturing,
              and rigorous testing.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              Members gain experience in aerodynamics, structures, powertrain design, controls,
              fabrication, and team leadership while contributing to an international competition team.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "100+", label: "Team Members" },
                { value: "12+", label: "Subteams" },
                { value: "1", label: "New Aircraft/Year" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* CAD Wireframe Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden card-glass p-8" style={{ perspective: "1200px" }}>
              {/* Grid background */}
              <div className="absolute inset-0 grid-overlay opacity-30" />

              {/* Slideshow Images */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={slideshowImages[currentImageIndex]}
                  alt="Aircraft Slideshow"
                  className="w-full h-full object-contain relative z-10 rounded-2xl"
                  initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                />
              </AnimatePresence>

              {/* Corner markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
            </div>

            {/* Floating labels */}
            <motion.div
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-display tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              DESIGN
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-lg text-sm font-display tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.7 }}
            >
              BUILD • FLY
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
