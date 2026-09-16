import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionReveal from './SectionReveal';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${API_URL}/api/certificates`)
      .then(res => res.json())
      .then(data => setCertificates(data))
      .catch(err => console.error("Error fetching certificates:", err));
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionReveal>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Certifications.</h2>
            <div className="w-12 h-1 bg-primary mb-6"></div>
            <p className="text-gray-300 dark:text-gray-400 max-w-2xl">
              Professional certifications and achievements that validate my technical skills and expertise.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 mt-16 md:mt-0">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="relative w-full max-w-5xl h-[85vh] bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header with Title and Close Button */}
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

              {/* PDF Viewer */}
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

export default Certificates;
