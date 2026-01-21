import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, PenTool, Box, Wrench, Layers, TestTube, Trophy } from "lucide-react";

const timelineSteps = [
  { icon: Lightbulb, title: "Concept", description: "Initial design concepts and mission analysis" },
  { icon: PenTool, title: "Preliminary Design", description: "Trade studies and initial sizing" },
  { icon: Box, title: "Detailed CAD", description: "Full CAD modeling and FEA analysis" },
  { icon: Wrench, title: "Manufacturing", description: "Component fabrication and assembly" },
  { icon: Layers, title: "Integration", description: "Systems integration and wiring" },
  { icon: TestTube, title: "Testing", description: "Ground and flight test campaigns" },
  { icon: Trophy, title: "Competition", description: "SAE Aero Design competition" },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden bg-card/30">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase mb-4 block">
            Our Process
          </span>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            Project <span className="text-gradient">Lifecycle</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From initial concept to competition day, every phase is carefully planned and executed.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 bg-primary hidden lg:block"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />

          {/* Timeline items */}
          <div className="relative space-y-8 lg:space-y-0">
            {timelineSteps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  className={`relative lg:flex items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                >
                  {/* Content card */}
                  <div className={`lg:w-[calc(50%-3rem)] ${isLeft ? "lg:pr-0" : "lg:pl-0"}`}>
                    <motion.div
                      className="card-glass rounded-xl p-6 group cursor-pointer"
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                          animate={hoveredStep === index ? { rotate: 360 } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <step.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full border-4 ${hoveredStep === index
                          ? "bg-primary border-primary"
                          : "bg-background border-primary"
                        } transition-colors`}
                      animate={hoveredStep === index ? { scale: 1.3 } : { scale: 1 }}
                    />
                  </motion.div>

                  {/* Spacer for opposite side */}
                  <div className="lg:w-[calc(50%-3rem)] hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
