import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What experience do I need to join?",
    answer: "No prior experience is required! We welcome students from all majors and skill levels. Our team provides training and mentorship to help you develop skills in design, manufacturing, and analysis."
  },
  {
    question: "How much time commitment is expected?",
    answer: "Members typically contribute 5-10 hours per week, with increased hours closer to competition. We understand academic demands and work flexibly with members' schedules."
  },
  {
    question: "What will I learn by joining?",
    answer: "You'll gain hands-on experience in CAD modeling, structural analysis, composite manufacturing, electronics, project management, and teamwork. Many members apply these skills directly to internships and careers in aerospace."
  },
  {
    question: "When do you meet?",
    answer: "We have general meetings twice monthly, with subteams meeting on their own schedules. Build sessions happen throughout the week in our workspace, and members can work independently as well."
  },
  {
    question: "Can I join mid-semester?",
    answer: "Absolutely! While joining at the start of the semester is ideal, we accept new members year-round. Reach out to our leadership team to discuss how you can get involved."
  },
  {
    question: "How can companies sponsor the team?",
    answer: "We offer various sponsorship tiers with benefits including logo placement, recruiting access, and technical collaboration. Contact our Business Director for our sponsorship packet."
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-display text-sm tracking-widest uppercase mb-4 block">
            Have Questions?
          </span>
          <h2 className="heading-display text-4xl md:text-5xl mb-6">
            Frequently <span className="text-gradient">Asked</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="card-glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <motion.button
                className="w-full p-6 flex items-center justify-between text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-display text-lg pr-4 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-primary" />
                  )}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
