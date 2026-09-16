import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleDrift from './components/ParticleDrift';
import { AppleHelloEnglishEffect } from './components/AppleHelloEffect';

import Lenis from 'lenis';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // The lower the lerp, the smoother/heavier the scroll momentum (default is 0.1)
      wheelMultiplier: 0.8, // Slightly reduces scroll distance per wheel tick for more control
      smoothWheel: true, // Enables smooth scrolling for mouse wheels
      syncTouch: true, // Syncs touch scroll with the smooth scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Add a small overflow hidden on body while intro is shown to prevent scrolling
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      // Force scroll to top on load
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  return (
    <>
      <ParticleDrift className="fixed inset-0 z-[-1]" />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <AppleHelloEnglishEffect 
              className="text-black dark:text-white w-64 md:w-96" 
              speed={1.5} 
              onAnimationComplete={() => {
                setTimeout(() => setShowIntro(false), 500);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={showIntro ? "pointer-events-none" : ""}
      >
        <Navbar />
        <main className="w-full flex flex-col pt-16">
          <Hero />
          <About />
          <Projects />
          <section id="resume" className="py-24 bg-transparent relative z-10">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <Experience />
                <Services />
              </div>
            </div>
          </section>
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

export default App;

