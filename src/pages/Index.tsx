import { lazy, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { useLocomotiveScroll } from "@/hooks/use-locomotive-scroll";
import { ScrollProvider } from "@/contexts/ScrollContext";

const PixiParticleField = lazy(() =>
  import("@/components/effects/PixiParticleField").catch(() => ({
    default: () => null,
  })),
);

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollToSection, scrollY } = useLocomotiveScroll(scrollContainerRef);

  return (
    <ScrollProvider value={{ scrollToSection }}>
      <div className="min-h-screen bg-background">
        <Suspense fallback={null}>
          <PixiParticleField />
        </Suspense>
        <Navigation />
        <main
          ref={scrollContainerRef}
          data-scroll-container
          className="relative z-10"
        >
          <HeroSection scrollY={scrollY} />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
          >
            <AboutSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
          >
            <SkillsSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={sectionVariants}
          >
            <ProjectsSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ContactSection />
          </motion.div>
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
};

export default Index;
