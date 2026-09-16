import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import SectionReveal from './SectionReveal';

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setIsSent(false);
    setError(false);

    // Ganti nilai-nilai ini dengan kredensial dari dashboard EmailJS Anda
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        (result) => {
          setIsSending(false);
          setIsSent(true);
          formRef.current.reset();
          
          setTimeout(() => setIsSent(false), 5000);
        },
        (error) => {
          setIsSending(false);
          setError(true);
          console.error(error.text);
        }
      );
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          <SectionReveal>
            <div>
              <p className="text-primary font-medium tracking-wider uppercase mb-2">Message</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
                Send a <br className="hidden md:block"/> message
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-400 mb-10 max-w-md">
                Have a question, feedback, or want to work together? Leave a message below and I'll get back to you as soon as possible.
              </p>
            </div>
          </SectionReveal>
          
          <SectionReveal>
            <form ref={formRef} className="flex flex-col space-y-5 lg:pl-12" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" id="name" name="user_name" required placeholder="John Doe" className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" name="user_email" required placeholder="john@example.com" className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" name="message" required rows="5" placeholder="Your message here..." className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors resize-none"></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSending}
                className={`mt-2 py-4 px-8 rounded-xl text-white font-medium transition-all duration-300 flex justify-center items-center gap-2 ${
                  isSending ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(96,165,250,0.3)] hover:-translate-y-1'
                }`}
              >
                {isSending ? 'Sending...' : isSent ? 'Message Sent!' : 'Send Message'}
                {!isSending && !isSent && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
                {isSent && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>
              
              {error && (
                <p className="text-red-400 text-sm mt-2 text-center">Failed to send message. Please try again or contact me directly.</p>
              )}
            </form>
          </SectionReveal>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
