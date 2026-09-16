import SectionReveal from './SectionReveal';
import { experience } from '../data/experience';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });
  
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="experience" className="h-full">
      <div className="flex flex-col h-full">
        <SectionReveal>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience.</h2>
            <div className="w-12 h-1 bg-primary mb-6"></div>
          </div>
        </SectionReveal>

        <div ref={containerRef} className="relative">
          {/* Base Timeline Line (Inactive) */}
          <div className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-border-light dark:bg-border-dark opacity-30"></div>
          
          {/* Lightning Line (Active Animated) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute top-0 left-[9px] w-[2px] bg-white shadow-[0_0_15px_#3b82f6] dark:shadow-[0_0_20px_#60a5fa] z-0 origin-top animate-lightning"
          ></motion.div>

          <div className="space-y-6 relative z-10">
            {experience.map((job) => (
              <SectionReveal key={job.id}>
                <div className="relative flex items-start gap-4 md:gap-6 group">
                  
                  {/* Timeline Icon */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center w-5 h-5 rounded-full border-4 border-white dark:border-bg-dark bg-primary shrink-0 shadow-[0_0_10px_rgba(96,165,250,0.5)] z-10 mt-1.5"
                  ></motion.div>
                  
                  {/* Content Card */}
                  <div className="flex-1 p-6 border border-border-light dark:border-border-dark rounded-xl bg-white/5 dark:bg-[#030509]/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-primary/50 hover:shadow-primary/10 transition-all duration-300">
                    <div className="flex flex-col mb-4">
                      <span className="text-sm font-medium text-primary mb-1">{job.period}</span>
                      <h3 className="text-xl font-bold">{job.role}</h3>
                      <h4 className="text-gray-300 dark:text-gray-400 font-medium">{job.company}</h4>
                    </div>
                    
                    <p className="text-gray-400 dark:text-gray-400 mb-4 text-justify">
                      {job.description}
                    </p>
                    
                    <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-500 dark:text-gray-400 text-justify">
                      {job.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
