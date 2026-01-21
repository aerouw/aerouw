import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, Mail, MapPin, ExternalLink } from "lucide-react";
import logo from "@/assets/sae-aero-logo.png";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/sae_aero_uw/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/sae-aero-uw", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jkuehne@wisc.edu,nrienstra@wisc.edu,rrander@wisc.edu", label: "Email" },
];

const Footer = () => {
  return (
    <footer id="contact" className="relative py-16 overflow-hidden">
      {/* Animated divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(0 91% 41%) 50%, transparent 100%)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <motion.img
              src={logo}
              alt="SAE Aero UW"
              className="h-16 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            />
            <p className="text-muted-foreground mb-6 max-w-md">
              University of Wisconsin–Madison SAE Aero Design Team. Designing, building, and flying
              RC aircraft for international competition since our founding.
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Team", "Sponsors", "Join", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <span>{link}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-sm tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:jkuehne@wisc.edu" className="text-muted-foreground hover:text-foreground transition-colors">
                  jkuehne@wisc.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Engineering Hall<br />
                  University of Wisconsin–Madison<br />
                  Madison, WI 53706
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SAE Aero Design – University of Wisconsin–Madison. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
