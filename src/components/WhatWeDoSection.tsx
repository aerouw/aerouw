import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PenTool, Calculator, Wrench, FlaskConical } from "lucide-react";

const capabilities = [
  {
    icon: PenTool,
    title: "Aircraft Design",
    description: "We develop the aircraft from a blank-sheet concept using aerodynamic sizing, stability analysis, configuration trade studies, and structural load cases.",
    details: ["Aerodynamic sizing", "Stability analysis", "Configuration trades", "Structural loads"],
  },
  {
    icon: Calculator,
    title: "Simulation & Analysis",
    description: "Members use ANSYS, MATLAB, SolidWorks, XFLR5, and custom tools to run high-fidelity analysis and optimize the vehicle for performance and manufacturability.",
    details: ["ANSYS FEA", "MATLAB simulations", "XFLR5 aero", "Custom tools"],
  },
  {
    icon: Wrench,
    title: "Manufacturing",
    description: "We fabricate composite wings, balsa structures, 3D-printed components, laser-cut frames, and custom electronics using campus labs and our team workspace.",
    details: ["Composite layup", "3D printing", "Laser cutting", "Electronics"],
  },
  {
    icon: FlaskConical,
    title: "Testing & Validation",
    description: "We perform wind tunnel analysis, static load tests, propulsion thrust testing, taxi trials, and structured flight test programs.",
    details: ["Wind tunnel", "Load testing", "Thrust testing", "Flight tests"],
  },
];

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase mb-4 block">
            Our Capabilities
          </span>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            What <span className="text-gradient">We Do</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From concept to competition, our team covers every aspect of aircraft development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="relative card-glass rounded-2xl p-8 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
            >


              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-6 transition-all duration-300">
                  <capability.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="font-display text-2xl mb-4 transition-colors">
                  {capability.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {capability.description}
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-2">
                  {capability.details.map((detail, i) => (
                    <motion.span
                      key={detail}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.2 + index * 0.15 + i * 0.05 }}
                    >
                      {detail}
                    </motion.span>
                  ))}
                </div>
              </div>


            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
