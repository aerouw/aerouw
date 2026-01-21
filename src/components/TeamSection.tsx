import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import jasonPhoto from "@/assets/jason-kuehne.jpg";
import nicholasPhoto from "@/assets/nicholas.jpg";
import drakePhoto from "@/assets/drake.jpg";

const leadership = [
  {
    name: "Jason Kuehne",
    role: "President",
    email: "jkuehne@wisc.edu",
    linkedin: "https://www.linkedin.com/in/jason-kuehne/",
    photo: jasonPhoto,
    hometown: "San Francisco, CA",
    year: "5th Year",
    major: "Engineering Mechanics & Aeronautics"
  },
  {
    name: "Nicholas Rienstra",
    role: "Vice President",
    email: "nrienstra@wisc.edu",
    linkedin: "https://www.linkedin.com/in/nicholas-rienstra/",
    photo: nicholasPhoto,
    hometown: "Sun Prairie, WI",
    year: "Senior",
    major: "Engineering Mechanics & Aeronautics"
  },
  {
    name: "Drake Rander",
    role: "Business Director",
    email: "rrander@wisc.edu",
    linkedin: "https://www.linkedin.com/in/robert-rander/",
    photo: drakePhoto,
    hometown: "Woodbury, MN",
    year: "Junior",
    major: "Mechanical Engineering"
  },
];

const subteams = [
  "Aerodynamics",
  "Structures",
  "Propulsion",
  "Controls",
  "Manufacturing",
  "Systems Integration",
  "Business & Outreach",
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredLeader, setHoveredLeader] = useState<number | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<typeof leadership[0] | null>(null);

  return (
    <section id="team" className="relative py-32 overflow-hidden bg-card/30">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            Meet the <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Driven students leading innovation in aerospace engineering.
          </p>
        </motion.div>

        {/* Leadership cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.name}
              className="card-glass rounded-2xl p-8 text-center group cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              onMouseEnter={() => setHoveredLeader(index)}
              onMouseLeave={() => setHoveredLeader(null)}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedLeader(leader)}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Avatar */}
              <motion.div
                className="w-24 h-24 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary transition-all overflow-hidden"
                animate={hoveredLeader === index ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {leader.photo ? (
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </motion.div>

              <h3 className="font-display text-2xl mb-2 group-hover:text-primary transition-colors">
                {leader.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-4">
                {leader.role}
              </p>

              {/* Contact icons */}
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredLeader === index ? 1 : 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={`mailto:${leader.email}`}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Mail className="w-5 h-5 text-muted-foreground" />
                </a>
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Subteams */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-display text-2xl mb-8">Our Subteams</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {subteams.map((team, index) => (
              <motion.span
                key={team}
                className="px-5 py-2 rounded-full bg-muted text-muted-foreground border border-border hover:border-primary hover:text-primary transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {team}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <Dialog open={selectedLeader !== null} onOpenChange={(open) => !open && setSelectedLeader(null)}>
          <DialogContent className="max-w-[90vw] md:max-w-md bg-background/95 backdrop-blur-2xl border-primary/20 p-0 overflow-hidden rounded-3xl gap-0">
            {selectedLeader && (
              <div className="flex flex-col items-center">
                {/* Header Image Area */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src={selectedLeader.photo}
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Vignette/Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
                </div>

                {/* Info Area */}
                <div className="w-full px-6 md:px-8 pb-8 md:pb-10 -mt-12 md:-mt-16 relative z-10 text-center">
                  <h2 className="font-display text-2xl md:text-3xl mb-1 text-foreground">{selectedLeader.name}</h2>
                  <p className="text-primary font-display text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8">{selectedLeader.role}</p>

                  <div className="space-y-4 mb-8 md:mb-10">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Hometown</span>
                      <span className="text-base md:text-lg font-light">{selectedLeader.hometown}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Year & Major</span>
                      <span className="text-base md:text-lg font-light">{selectedLeader.year} • {selectedLeader.major}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <Button asChild variant="outline" className="rounded-full px-6 md:px-8 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-sm">
                      <a href={`mailto:${selectedLeader.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full px-6 md:px-8 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-sm">
                      <a href={selectedLeader.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TeamSection;
