import SectionReveal from './SectionReveal';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { motion, useScroll, useTransform } from 'motion/react';

const Hero = () => {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;
  
  const { scrollY } = useScroll();
  // Fades out the image as the user scrolls down from 0px to 200px
  const imageOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const imageScale = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            {/* Text Content */}
            <div className="w-full lg:w-3/5 flex flex-col space-y-6">
              <div>
                <p className="text-primary font-medium tracking-wider uppercase mb-2">Web Developer</p>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                  Hello, I'm <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 dark:from-text-dark dark:to-gray-400">
                    Dimas Ayyub Alghafiqi
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-gray-300 dark:text-gray-300 max-w-lg leading-relaxed">
                I build clean, modern, and highly performant web applications with a focus on exceptional user experiences and robust frontend architecture.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a 
                  href="#works" 
                  className="px-8 py-4 bg-white dark:bg-text-dark text-black dark:text-bg-dark font-medium rounded-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-transparent text-text-light dark:text-text-dark border border-border-light dark:border-border-dark font-medium rounded-sm hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all duration-300"
                >
                  Get In Touch
                </a>
              </div>
            </div>
            
            {/* Image Content */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group"
                style={{ opacity: imageOpacity, scale: imageScale }}
              >
                {/* Animated Glow Behind */}
                <div className="absolute inset-0 bg-primary/20 rounded-full md:rounded-[3rem] blur-3xl group-hover:bg-primary/40 group-hover:blur-2xl transition-all duration-700 ease-in-out -z-10"></div>
                
                {/* Outer Glassmorphism Frame (Removed borders as requested) */}
                <div className="absolute inset-[-12px] md:inset-[-16px] rounded-full md:rounded-[3.5rem] bg-white/5 dark:bg-[#050b14]/30 backdrop-blur-md -z-10 transition-transform duration-700 group-hover:scale-105 shadow-[0_0_30px_rgba(96,165,250,0.1)]"></div>
                
                {/* Image Wrapper */}
                <div className="relative w-full h-full overflow-hidden rounded-full md:rounded-[3rem] bg-gray-200 dark:bg-[#0a101d] shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(96,165,250,0.2)]">
                  {/* First Image - Fades out on hover */}
                  <img 
                    src="https://res.cloudinary.com/rg4bvkve/image/upload/v1788850064/dimas.png" 
                    alt="DIMAS_AYYUB_ALGHAFIQI_1" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity group-hover:opacity-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  {/* Second Image - Fades in on hover */}
                  <img 
                    src="https://res.cloudinary.com/rg4bvkve/image/upload/v1788850064/dimas3.jpg" 
                    alt="DIMAS_AYYUB_ALGHAFIQI_2" 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  {/* Subtle inner gradient for premium depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20 pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
                </div>
                
                {/* Floating Decorative Orbs */}
                <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-primary/40 rounded-full blur-xl animate-pulse pointer-events-none -z-20"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-blue-500/30 rounded-full blur-2xl animate-pulse [animation-delay:1s] pointer-events-none -z-20"></div>
              </motion.div>
            </div>
            
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default Hero;
