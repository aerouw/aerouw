import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, HandCoins, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamMeeting1 from "@/assets/team-meeting1.png";

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="join" className="relative py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={teamMeeting1}
          alt="Team Meeting"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Animated background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{ background: "var(--gradient-glow)" }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-8"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Rocket className="w-16 h-16 text-primary" />
          </motion.div>

          <h2 className="heading-display text-4xl md:text-6xl mb-6">
            Ready to <span className="text-gradient">Take Off</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-4 font-light">
            Build aircraft. Learn fast. Compete globally.
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join a team of passionate engineers building real aircraft. No experience required,
            just bring your curiosity and willingness to learn!
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Button variant="hero" size="xl" className="group min-w-[200px]" asChild>
              <a href="mailto:jkuehne@wisc.edu,nrienstra@wisc.edu,rrander@wisc.edu?subject=SAE%20Aero%20UW%20Join%20Request&body=Name:%0AYear:%0AMajor:%0APhone:%0A">
                <Users className="w-5 h-5 mr-2" />
                <span>Join Now</span>
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </Button>
            <Button variant="heroSecondary" size="xl" className="min-w-[200px]" asChild>
              <a href="#sponsors">
                <HandCoins className="w-5 h-5 mr-2" />
                Sponsor Us
              </a>
            </Button>
          </motion.div>

          {/* Quick FAQ */}
          <motion.div
            className="card-glass rounded-2xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-display text-xl mb-4">Not sure if you're ready?</h3>
            <p className="text-muted-foreground">
              We accept members of all experience levels and majors. Many of our most successful
              members joined with no prior aerospace experience. Come to a meeting, ask questions,
              and see if it's right for you!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
