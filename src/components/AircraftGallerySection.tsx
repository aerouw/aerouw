import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import aircraftFlight from "@/assets/aircraft-flight.jpg";
import aircraftCad from "@/assets/aircraft-cad.png";

const galleryItems = [
  {
    id: 1,
    image: aircraftFlight,
    title: "In Flight",
    description: "Our aircraft takes to the skies during competition testing",
    category: "Competition"
  },
  {
    id: 2,
    image: aircraftCad,
    title: "Structural Design",
    description: "CAD wireframe showing the internal framework and engineering",
    category: "Engineering"
  }
];

const AircraftGallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="aircraft" className="relative py-32 overflow-hidden">
      {/* CAD wireframe background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-no-repeat bg-center bg-contain pointer-events-none"
        style={{ backgroundImage: `url(${aircraftCad})` }}
      />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-primary font-display text-sm tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Our Aircraft
          </motion.span>
          
          <motion.h2 
            className="heading-display text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            From <span className="text-gradient">Design</span> to Flight
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Every year we design, build, and fly a new aircraft for the SAE Aero Design competition. 
            From CAD models to competition flights, see our engineering in action.
          </motion.p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              onClick={() => setSelectedImage(item)}
              whileHover={{ y: -8 }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden card-glass">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-display tracking-wider">
                    {item.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/50 group-hover:border-primary transition-colors" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/50 group-hover:border-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Click to expand hint */}
        <motion.p
          className="text-center text-muted-foreground/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Click on an image to view full size
        </motion.p>
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative max-w-6xl w-full max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-foreground/70 hover:text-foreground transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="mt-4 text-center">
              <h3 className="font-display text-2xl text-foreground">{selectedImage.title}</h3>
              <p className="text-muted-foreground mt-2">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default AircraftGallerySection;
