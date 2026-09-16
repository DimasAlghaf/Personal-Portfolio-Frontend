import SectionReveal from './SectionReveal';
import { services } from '../data/services';

const Services = () => {
  return (
    <div id="services" className="h-full relative z-10">
      <div className="flex flex-col h-full">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">My Services.</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-gray-300 dark:text-gray-300 max-w-xl">
                I help brands and businesses create exceptional digital experiences by providing modern web development services.
              </p>
            </div>
            <a 
              href="#contact" 
              className="inline-block px-6 py-3 border border-border-light dark:border-border-dark hover:border-primary hover:text-primary transition-all duration-300 rounded-sm font-medium whitespace-nowrap"
            >
              Discuss a Project
            </a>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-y-12">
          {services.map((service, index) => (
            <SectionReveal key={service.id}>
              <div className="group border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-700 group-hover:text-primary transition-colors duration-300 mt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
