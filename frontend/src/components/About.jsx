import SectionReveal from './SectionReveal';
import { SkillsCloud } from './SkillsCloud';
const About = () => {
  return (
    <section id="about" className="py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            <div className="md:col-span-5 lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Me.</h2>
              <div className="w-12 h-1 bg-primary mb-8"></div>
              
              <div className="space-y-4 text-gray-300 dark:text-gray-300 text-justify">
                <p>
                  Computer Engineering graduate specializing in web development with a passion for building modern, responsive, and scalable web applications. Experienced in developing full-stack solutions by combining intuitive user interfaces with robust back-end systems. Dedicated to writing clean, maintainable code, optimizing application performance, and continuously learning emerging technologies to deliver reliable and user-focused digital experiences.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-7 lg:col-span-8 lg:pl-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Stats / Mini Info */}
                <div className="p-6 border border-border-light dark:border-border-dark bg-white/5 dark:bg-[#030509]/60 backdrop-blur-md rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/50 transition-colors duration-300">
                  <h3 className="text-4xl font-bold text-white mb-2">05+</h3>
                  <p className="font-medium mb-1">Months Experience</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">Working professionally in web development.</p>
                </div>
                
                <div className="p-6 border border-border-light dark:border-border-dark bg-white/5 dark:bg-[#030509]/60 backdrop-blur-md rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-white/50 transition-colors duration-300">
                  <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
                  <p className="font-medium mb-1">Projects Completed</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">Ranging from landing pages to complex web apps.</p>
                </div>
                </div>
                
                {/* Tech Stack Marquee with BorderBeam & Wave Text */}
                <SkillsCloud />
              </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default About;
