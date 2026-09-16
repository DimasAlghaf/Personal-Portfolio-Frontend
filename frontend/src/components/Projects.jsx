import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionReveal from './SectionReveal';
import { ElasticGallery } from './ui/elastic-gallery';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('works'); // 'works' | 'certificates'
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [visibleWorksCount, setVisibleWorksCount] = useState(5);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
      
    fetch(`${API_URL}/api/certificates`)
      .then(res => res.json())
      .then(data => setCertificates(data))
      .catch(err => console.error("Error fetching certificates:", err));
  }, []);

  // Map our projects data to match ElasticGallery's expected format
  const galleryItems = useMemo(() => projects.map((project) => ({
    id: String(project.id).padStart(2, '0'),
    title: project.title,
    category: project.category,
    src: project.image,
    alt: project.description,
    description: project.description,
    technologies: project.technologies,
  })), [projects]);

  // Prevent scrolling when any modal is open
  useEffect(() => {
    if (selectedProject || selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, selectedCert]);

  return (
    <section id="works" className="py-24 bg-transparent relative z-40">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Project & Certifications.</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-gray-300 dark:text-gray-400 max-w-2xl">
                A collection of projects showcasing my technical skills, and professional certifications that validate my expertise.
              </p>
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white/5 dark:bg-white/5 p-1.5 rounded-xl border border-white/10 dark:border-white/10 w-fit">
              <button
                onClick={() => setActiveTab('works')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'works' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-400 hover:text-text-light dark:hover:text-text-dark hover:bg-white/5'
                }`}
              >
                Project
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'certificates' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-400 hover:text-text-light dark:hover:text-text-dark hover:bg-white/5'
                }`}
              >
                Certificates
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* Works Tab Content */}
        {activeTab === 'works' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SectionReveal>
              <ElasticGallery 
                items={galleryItems.slice(0, visibleWorksCount)} 
                onProjectClick={(project) => setSelectedProject(project)} 
              />
            </SectionReveal>
            
            {galleryItems.length > 5 && (
              <SectionReveal className="mt-8 text-center">
                {visibleWorksCount < galleryItems.length ? (
                  <button 
                    onClick={() => setVisibleWorksCount(prev => prev + 5)}
                    className="inline-flex items-center gap-2 pb-1 border-b border-text-light dark:border-text-dark font-medium hover:text-primary hover:border-primary transition-colors cursor-pointer"
                  >
                    Load More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                ) : (
                  <a 
                    href="https://github.com/DimasAlghaf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 pb-1 border-b border-text-light dark:border-text-dark font-medium hover:text-primary hover:border-primary transition-colors"
                  >
                    View More on GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </SectionReveal>
            )}
          </motion.div>
        )}

        {/* Certificates Tab Content */}
        {activeTab === 'certificates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          >
            {certificates.map((cert, index) => (
              <SectionReveal key={cert.id} className={`delay-[${index * 100}ms]`}>
                <div 
                  onClick={() => setSelectedCert(cert)}
                  className="cursor-pointer group block p-6 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-2xl hover:bg-white/10 dark:hover:bg-white/10 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 text-primary">
                        <iconify-icon icon={cert.icon} width="24" height="24"></iconify-icon>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors text-left">
                          {cert.title}
                        </h3>
                        <p className="text-gray-400 dark:text-gray-400 mt-1 text-left text-sm md:text-base line-clamp-2">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-500 group-hover:text-primary transition-colors mt-2 ml-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6"></path>
                        <path d="M10 14 21 3"></path>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" data-lenis-prevent="true">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative z-10 w-full max-w-4xl bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] mt-16"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary transition-colors border border-white/10 backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="overflow-y-auto w-full h-full custom-scrollbar">
                <div className="w-full h-64 sm:h-80 relative">
                  <img 
                    src={selectedProject.src} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent"></div>
                </div>

                <div className="p-6 sm:p-10 -mt-16 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-medium tracking-wider uppercase text-sm">
                      {selectedProject.category}
                    </span>
                    <span className="text-gray-500 text-sm">#{selectedProject.id}</span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-text-light dark:text-text-dark">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3 text-text-light dark:text-text-dark">Overview</h4>
                    <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-text-light dark:text-text-dark">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-lg text-sm text-text-light dark:text-text-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" data-lenis-prevent="true">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-5xl h-[85vh] mt-20 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-light dark:border-border-dark bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md">
                <h3 className="text-xl md:text-2xl font-bold text-text-light dark:text-text-dark pl-2 pr-4 truncate">
                  {selectedCert.title}
                </h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-primary transition-colors border border-white/10 backdrop-blur-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="w-full flex-1 bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
                <iframe 
                  src={`${selectedCert.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={selectedCert.title}
                  className="w-full h-full border-none"
                ></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
