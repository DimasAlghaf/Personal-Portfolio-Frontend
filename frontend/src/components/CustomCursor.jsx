import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Dispatch event for other components (like ParticleDrift) to catch
      window.dispatchEvent(new CustomEvent('global-mousemove', {
        detail: { x: e.clientX, y: e.clientY }
      }));

      // Check if hovering over a clickable element
      const target = e.target;
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        const isClickable = 
          computedStyle.cursor === 'pointer' ||
          target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') !== null ||
          target.closest('button') !== null;
          
        setIsPointer(isClickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check for touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center mix-blend-screen"
      style={{ 
        transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
        backgroundColor: isPointer ? 'rgba(96, 165, 250, 0.1)' : 'transparent'
      }}
    >
      <div 
        className={`w-1.5 h-1.5 bg-primary rounded-full transition-opacity duration-200 ${isPointer ? 'opacity-0' : 'opacity-100'}`} 
      />
    </div>
  );
};

export default CustomCursor;
