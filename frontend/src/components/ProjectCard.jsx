import SectionReveal from './SectionReveal';

const ProjectCard = ({ project, index }) => {
  // Determine card size/layout based on index for asymmetrical grid
  const isLarge = index === 0;
  const isMedium = index === 1 || index === 2;
  // Others are small

  return (
    <SectionReveal 
      className={`${
        isLarge ? 'md:col-span-2 md:row-span-2' : 
        isMedium ? 'md:col-span-1 md:row-span-2' : 
        'md:col-span-1 md:row-span-1'
      }`}
    >
      <a href="#" className="group block relative w-full h-full overflow-hidden rounded-xl bg-white/5 dark:bg-[#030509]/60 backdrop-blur-md border border-border-light dark:border-border-dark shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-primary/50 transition-colors duration-300">
        
        {/* Aspect Ratio Container for images */}
        <div className={`relative w-full ${isLarge ? 'aspect-[4/3] md:aspect-[16/9]' : isMedium ? 'aspect-[4/3] md:aspect-[3/4]' : 'aspect-video'}`}>
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
        </div>
        
        {/* Project Info (Appears on hover for desktop, static for mobile) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out md:block hidden">
          <p className="text-primary font-medium mb-1 drop-shadow-md">{project.category}</p>
          <h3 className="text-2xl font-bold text-white drop-shadow-md">{project.title}</h3>
        </div>

        {/* Mobile Info (Always visible) */}
        <div className="p-4 md:hidden bg-white dark:bg-bg-dark border-x border-b border-border-light dark:border-border-dark">
          <p className="text-sm text-primary mb-1">{project.category}</p>
          <h3 className="text-lg font-bold">{project.title}</h3>
        </div>

      </a>
    </SectionReveal>
  );
};

export default ProjectCard;
