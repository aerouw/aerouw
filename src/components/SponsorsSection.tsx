import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

import ansysLogo from "@/assets/ANSYS-logo.png";
import coeLogo from "@/assets/college-of-engineering-logo.jpg";
import meLogo from "@/assets/mechanical-engineering-logo.png";
import boeingLogo from "@/assets/boeing-logo.png";
import lockheedLogo from "@/assets/Lockheed-Martin-logo.png";

const sponsorGroups = [
  {
    title: "Sponsors",
    items: [
      { name: "ANSYS", logo: ansysLogo, url: "https://www.ansys.com/" },
      { name: "UW-Madison College of Engineering", logo: coeLogo, url: "https://engineering.wisc.edu/" },
      { name: "UW-Madison Dept of Mechanical Engineering", logo: meLogo, url: "https://engineering.wisc.edu/departments/mechanical-engineering/" },
    ],
  },
  {
    title: "Industry Partners",
    items: [
      { name: "Boeing", logo: boeingLogo, url: "https://www.boeing.com/" },
      { name: "Lockheed Martin", logo: lockheedLogo, url: "https://www.lockheedmartin.com/en-us/index.html" },
    ],
  },
];

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sponsors" className="relative py-32 overflow-hidden bg-card/30">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase mb-4 block">
            Our Partners
          </span>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            Powered by <span className="text-gradient">Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our sponsors make it possible for us to design, build, and compete at the highest level.
          </p>
        </motion.div>

        {/* Sponsor Groups */}
        <div className="space-y-20 mb-24">
          {sponsorGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + groupIndex * 0.2 }}
            >
              <h3 className="text-center font-display text-2xl text-muted-foreground mb-10 uppercase tracking-widest">
                {group.title}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
                {group.items.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + groupIndex * 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300">
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-16 md:h-20 w-auto object-contain"
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA for sponsors */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-display text-2xl mb-6">Interested in Sponsoring?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Support the next generation of aerospace engineers and gain access to talented students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Sponsor Packet
            </Button>
            <Button variant="heroSecondary" size="lg" onClick={() => window.location.href = "mailto:jkuehne@wisc.edu,nrienstra@wisc.edu,rrander@wisc.edu"}>
              <Mail className="w-5 h-5 mr-2" />
              Contact Business Director
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
