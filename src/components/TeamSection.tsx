import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Mail, Linkedin, User, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import teamData from "@/data/team.json";

// Import all headshots from src/assets
const headshots = import.meta.glob<{ default: string }>("/src/assets/*.{jpg,JPG,jpeg,png,jfif,webp}", { eager: true });

interface Member {
  role: string;
  name: string;
  hometown: string;
  major: string;
  email: string;
  year: number;
  headshot: {
    filename: string;
    alt: string;
  };
  linkedinUrl: string;
}

const normalizeRole = (role: string) => {
  if (role === "Computational Fluid Dyanmics") return "Computational Fluid Dynamics";
  return role;
};

const getHeadshotPath = (filename: string) => {
  const targetPath = `/src/assets/${filename}`.toLowerCase();
  const foundKey = Object.keys(headshots).find(key => key.toLowerCase() === targetPath);
  return foundKey ? headshots[foundKey].default : null;
};

const TeamMemberCard = ({
  member,
  isLarge = false,
  onClick
}: {
  member: Member;
  isLarge?: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const photo = getHeadshotPath(member.headshot.filename);

  return (
    <motion.div
      className={`card-glass rounded-2xl ${isLarge ? 'p-8' : 'p-6'} text-center group cursor-pointer relative overflow-hidden h-full flex flex-col items-center`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(null)}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Avatar */}
      <motion.div
        className={`${isLarge ? 'w-24 h-24' : 'w-20 h-20'} rounded-full bg-muted mb-6 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary transition-all overflow-hidden shrink-0`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {photo ? (
          <img
            src={photo}
            alt={member.headshot.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} text-muted-foreground group-hover:text-primary transition-colors`} />
        )}
      </motion.div>

      <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-display mb-2 group-hover:text-primary transition-colors line-clamp-1`}>
        {member.name}
      </h3>
      <p className="text-primary text-sm font-medium mb-2 uppercase tracking-wider">
        {normalizeRole(member.role)}
      </p>


      <div className="mb-4 space-y-1">
        <p className="text-muted-foreground text-[10px] md:text-xs font-light line-clamp-1">
          Year {member.year} • {member.major}
        </p>
        {member.hometown && (
          <p className="text-muted-foreground text-[10px] md:text-xs font-light line-clamp-1 italic">
            {member.hometown}
          </p>
        )}
      </div>


      {/* Contact icons */}
      <div className="flex justify-center gap-4 mt-auto relative z-10">
        <a
          href={`mailto:${member.email}`}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Email ${member.name}`}
        >
          <Mail className="w-4 h-4 text-muted-foreground" />
        </a>
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label={`LinkedIn for ${member.name}`}
        >
          <Linkedin className="w-4 h-4 text-muted-foreground" />
        </a>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { leadershipMembers, otherMembers, expandedGrid, xxCount } = useMemo(() => {
    const members = teamData.members as Member[];
    const visibleRoles = teamData.ui.collapsed.visibleRoles;

    // 1. Find leadership members
    const leadership = visibleRoles.map(role =>
      members.find(m => m.role === role)
    ).filter((m): m is Member => !!m);

    const leadershipIds = new Set(leadership.map(m => m.email));
    const others = members.filter(m => !leadershipIds.has(m.email));

    // 2. Build expanded grid
    const usedMemberIds = new Set<string>();
    const grid: (Member | null)[][] = [];

    teamData.websiteGridStructure.forEach(row => {
      const gridRow: (Member | null)[] = [];
      row.forEach(role => {
        if (role === null) {
          gridRow.push(null);
          return;
        }
        const member = others.find(m => m.role === role && !usedMemberIds.has(m.email));
        if (member) {
          gridRow.push(member);
          usedMemberIds.add(member.email);
        } else {
          gridRow.push(null);
        }
      });
      grid.push(gridRow);
    });

    // 3. Append remaining members
    const remaining = others.filter(m => !usedMemberIds.has(m.email));
    if (remaining.length > 0) {
      for (let i = 0; i < remaining.length; i += 3) {
        grid.push(remaining.slice(i, i + 3).concat(new Array(3 - remaining.slice(i, i + 3).length).fill(null)));
      }
    }

    return {
      leadershipMembers: leadership,
      otherMembers: others,
      expandedGrid: grid,
      xxCount: others.length
    };
  }, []);

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

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {leadershipMembers.map((member) => (
            <TeamMemberCard
              key={member.email}
              member={member}
              isLarge={true}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Expand Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="rounded-full px-8 py-6 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-base font-display tracking-wider uppercase group transition-all duration-300"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                {teamData.ui.showAllButtonLabelTemplate.replace("{count}", xxCount.toString())}
                <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Expanded Roster */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-8 pt-8">
                {expandedGrid.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {row.map((member, colIndex) => (
                      <div key={member ? member.email : `empty-${rowIndex}-${colIndex}`}>
                        {member ? (
                          <TeamMemberCard
                            member={member}
                            onClick={() => setSelectedMember(member)}
                          />
                        ) : (
                          <div className="hidden lg:block h-full" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal for Member Details */}
        <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-[90vw] md:max-w-md bg-background/95 backdrop-blur-2xl border-primary/20 p-0 overflow-hidden rounded-3xl gap-0">
            {selectedMember && (
              <div className="flex flex-col items-center">
                {/* Header Image Area */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {getHeadshotPath(selectedMember.headshot.filename) ? (
                    <img
                      src={getHeadshotPath(selectedMember.headshot.filename)!}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <User className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                  {/* Vignette/Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
                </div>

                {/* Info Area */}
                <div className="w-full px-6 md:px-8 pb-8 md:pb-10 -mt-12 md:-mt-16 relative z-10 text-center">
                  <h2 className="font-display text-2xl md:text-3xl mb-1 text-foreground">{selectedMember.name}</h2>
                  <p className="text-primary font-display text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8">
                    {normalizeRole(selectedMember.role)}
                  </p>

                  <div className="space-y-4 mb-8 md:mb-10">
                    {selectedMember.hometown && (
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Hometown</span>
                        <span className="text-base md:text-lg font-light">{selectedMember.hometown}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">Year & Major</span>
                      <span className="text-base md:text-lg font-light">
                        {selectedMember.year === 1 ? 'Freshman' :
                          selectedMember.year === 2 ? 'Sophomore' :
                            selectedMember.year === 3 ? 'Junior' :
                              selectedMember.year === 4 ? 'Senior' :
                                `${selectedMember.year}th Year`} • {selectedMember.major}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <Button asChild variant="outline" className="rounded-full px-6 md:px-8 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-sm">
                      <a href={`mailto:${selectedMember.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full px-6 md:px-8 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-sm">
                      <a href={selectedMember.linkedinUrl} target="_blank" rel="noopener noreferrer">
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
