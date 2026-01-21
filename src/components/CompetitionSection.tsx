import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Ruler, Weight, Trophy, Download, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CompetitionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeConstraint, setActiveConstraint] = useState<number | null>(null);

  const constraints = [
    {
      icon: Ruler,
      label: "Size Limits",
      primaryNumber: "72–120 in Wingspan",
      modalTitle: "Aircraft Size Constraints",
      keyConstraints: [
        "Wingspan: Minimum 72 inches; maximum 120 inches",
        "Fuselage Length: Maximum 120 inches",
        "Wing Chord: Minimum 4 inches",
        "Configuration: Fixed-wing aircraft only",
        "Geometry: No chord steps or discontinuities allowed"
      ],
      context: "These dimensional limits define the allowable design envelope and are verified during inspection against submitted 2D drawings. The constraints force teams to balance aerodynamic efficiency, structural weight, and transportability.",
      implications: [
        "Aspect ratio optimization",
        "Wing structural sizing",
        "Lift performance at low Reynolds numbers",
        "Packaging and assembly constraints"
      ]
    },
    {
      icon: Weight,
      label: "Weight Rules",
      primaryNumber: "55 lb Max Gross Weight",
      modalTitle: "Aircraft Weight Rules",
      keyConstraints: [
        "Gross Weight: Takeoff weight may not exceed 55 lbs when fully loaded",
        "Empty Weight: Includes airframe, propulsion, batteries, electronics, hardware, and fasteners",
        "Materials: Fiber-reinforced plastics (carbon fiber, fiberglass, etc.) are prohibited except for commercially available motor mounts, propellers, and landing gear",
        "Tie-Breaker: Final score ties are broken by the lowest aircraft empty weight"
      ],
      context: "Weight is one of the most restrictive constraints in the competition and directly impacts payload capacity, takeoff distance, and scoring performance.",
      implications: [
        "Aggressive structural optimization",
        "Material selection trade studies",
        "Battery capacity vs endurance tradeoffs",
        "Manufacturing precision and mass budgeting"
      ]
    },
    {
      icon: Target,
      label: "Payload",
      primaryNumber: "2L Bottles (Standard Cargo)",
      modalTitle: "Payload Requirements",
      keyConstraints: [
        "Payload Type: Unmodified, commercially available 2-liter cylindrical plastic bottles",
        "Configurations: Empty bottles (1.0–4.0 lbs) or Filled bottles (≥ 4.0 lbs)",
        "Internal Storage: Payload must be carried internally in fully enclosed cargo bays and cannot be exposed to the airstream",
        "Structural Rule: Payload may not contribute to the structural integrity of the aircraft",
        "Increment Rule: After each successful flight, payload must be increased by adding at least one empty bottle or replacing an empty bottle with a filled bottle"
      ],
      context: "Payload is discrete, physical cargo rather than abstract mass, forcing teams to design robust cargo systems that manage center-of-gravity shifts and structural loads.",
      implications: [
        "Modular cargo bay design",
        "CG migration management",
        "Load path isolation",
        "Rapid unloading mechanisms"
      ]
    },
    {
      icon: Trophy,
      label: "Performance",
      primaryNumber: "4(EB) + 15(FB)",
      modalTitle: "Flight Performance & Scoring",
      math: {
        flightScore: "FS = 4(EB) + 15(FB)",
        finalScore: "FFS = (FS₁ + FS₂ + FS₃) / 3 + PPB",
        bonus: "PPB = max(10 − (FS − PS)², 0)"
      },
      keyConstraints: [
        "EB = Number of empty bottles",
        "FB = Number of filled bottles",
        "PS = Predicted maximum flight score",
        "Circuit: Aircraft must complete a full 360° circuit",
        "Takeoff: Must become airborne within 100 ft",
        "Landing: Must land and stop within a 400 ft landing zone",
        "Unloading: Payload must be unloaded within 60 seconds by two members"
      ],
      context: "Performance rewards payload capacity, prediction accuracy, and operational reliability. Teams must design aircraft that perform consistently across multiple flights.",
      implications: [
        "High-lift aerodynamic design",
        "Ground roll optimization",
        "Flight repeatability",
        "Prediction model accuracy"
      ]
    }
  ];

  const handleNext = () => {
    if (activeConstraint !== null) {
      setActiveConstraint((activeConstraint + 1) % constraints.length);
    }
  };

  const handlePrev = () => {
    if (activeConstraint !== null) {
      setActiveConstraint((activeConstraint - 1 + constraints.length) % constraints.length);
    }
  };

  return (
    <section id="competition" className="relative py-32 overflow-hidden bg-background">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center max-w-4xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-primary font-display text-sm tracking-widest uppercase mb-6 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            The Challenge
          </motion.span>

          <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl mb-8">
            SAE Aero Design <span className="text-gradient">Competition</span>
          </h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            The SAE Aero Design competition challenges university teams to design and build an RC
            aircraft that maximizes mission performance under strict size, weight, and loading rules.
            Students are judged on design reports, technical presentations, and flight performance.
          </motion.p>
        </motion.div>

        {/* Regular Class highlight */}
        <motion.div
          className="relative card-glass rounded-2xl p-8 md:p-12 mb-24 overflow-hidden group"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <motion.div
              className="inline-block mb-8"
              animate={{
                boxShadow: ["0 0 20px hsl(0 91% 41% / 0.3)", "0 0 40px hsl(0 91% 41% / 0.5)", "0 0 20px hsl(0 91% 41% / 0.3)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display text-lg tracking-wider uppercase font-bold">
                Regular Class
              </span>
            </motion.div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10 font-light">
              Our team competes in <span className="text-foreground font-medium">Regular Class</span>,
              which focuses on high-lift design, payload optimization, and system reliability. Each year
              introduces new mission requirements that drive innovative aerodynamic configurations,
              complex weight tradeoffs, and aggressive structural design targets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="cta" size="lg" className="gap-3">
                <a href="/rule_summary.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5" />
                  View Rule Summary
                </a>
              </Button>
              <Button asChild variant="heroSecondary" size="lg" className="gap-3">
                <a href="/full_rules.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5" />
                  View Full Rules
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Constraint icons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {constraints.map((constraint, index) => (
            <motion.div
              key={constraint.label}
              className="card-glass rounded-xl p-8 text-center group hover:border-primary/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setActiveConstraint(index)}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-xl" />

              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <constraint.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="font-display text-lg mb-3 relative z-10 tracking-wide uppercase text-muted-foreground group-hover:text-primary transition-colors">
                {constraint.label}
              </h3>

              <p className="text-2xl font-bold font-display text-foreground relative z-10 leading-tight">
                {constraint.primaryNumber}
              </p>

              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-display tracking-widest uppercase text-primary border-b border-primary/30 pb-1">
                  View Details
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={activeConstraint !== null} onOpenChange={(open) => !open && setActiveConstraint(null)}>
          <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-primary/20 text-foreground p-0 overflow-hidden gap-0">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <DialogHeader className="p-8 pb-4 bg-muted/20">
              <DialogTitle className="text-2xl font-display font-bold text-foreground flex items-center gap-4 uppercase tracking-wide">
                {activeConstraint !== null && (
                  <>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      {(() => {
                        const Icon = constraints[activeConstraint].icon;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <span className="text-balance">{constraints[activeConstraint].modalTitle}</span>
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {activeConstraint !== null && (
              <div className="p-8 pt-4 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {/* Math Section for Performance */}
                {constraints[activeConstraint].math && (
                  <div className="bg-muted/30 p-6 rounded-lg border border-primary/10 font-mono text-sm space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                    <p className="text-primary font-bold font-display tracking-wider uppercase text-xs mb-2">Scoring Equations</p>
                    <div className="space-y-2 text-foreground/90">
                      <p className="text-lg">{constraints[activeConstraint].math.flightScore}</p>
                      <p className="text-lg">{constraints[activeConstraint].math.finalScore}</p>
                      <p className="text-lg">{constraints[activeConstraint].math.bonus}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Context
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {constraints[activeConstraint].context}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Key Constraints
                  </h4>
                  <ul className="space-y-3">
                    {constraints[activeConstraint].keyConstraints.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Engineering Implications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {constraints[activeConstraint].implications.map((item, i) => (
                      <div key={i} className="bg-muted/30 px-4 py-3 rounded border border-border/50 text-sm text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 mt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrev}
                    className="gap-2 text-muted-foreground border border-transparent hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    className="gap-2 text-muted-foreground border border-transparent hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CompetitionSection;
