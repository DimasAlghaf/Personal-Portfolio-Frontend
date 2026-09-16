import { useAnimationFrame } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Marquee } from "./ui/marquee";
import { BorderBeam } from "./ui/border-beam";

const BEAM_DURATION = 8;
const BEAM_SIZE = 100;

export const SkillsCloud = () => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const waveSpanRef = useRef(null);
  const startTimeRef = useRef(null);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => {
        setAllSkills(data.flatMap(group => group.items));
      })
      .catch(err => console.error("Error fetching skills:", err));
  }, []);

  useAnimationFrame((time) => {
    if (!(cardRef.current && textRef.current && waveSpanRef.current)) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = ((time - startTimeRef.current) / 1000) % BEAM_DURATION;
    const beamOffset = (elapsed / BEAM_DURATION) * 100;

    const cardRect = cardRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const W = cardRect.width;
    const H = cardRect.height;
    const perimeter = 2 * (W + H);

    const textLeft = Math.max(0, textRect.left - cardRect.left);
    const textRight = Math.min(W, textRect.right - cardRect.left);

    const textStartPercent = (textLeft / perimeter) * 100;
    const textEndPercent = (textRight / perimeter) * 100;

    const span = waveSpanRef.current;

    if (beamOffset >= textStartPercent && beamOffset <= textEndPercent) {
      const t =
        (beamOffset - textStartPercent) / (textEndPercent - textStartPercent);
      span.style.backgroundPosition = `${95 - t * 90}% center`;
    } else if (beamOffset < textStartPercent) {
      span.style.backgroundPosition = "0% center";
    } else {
      span.style.backgroundPosition = "100% center";
    }

    // Force BorderBeam to use the exact same offset as JS
    cardRef.current.style.setProperty("--beam-offset", beamOffset);
  });

  return (
    <div
      className="relative w-full rounded-2xl border border-white/30 dark:border-primary/20 bg-white/60 dark:bg-[#050b14]/80 backdrop-blur-2xl shadow-[0_4px_16px_0_rgba(96,165,250,0.15)] mt-8 md:col-span-2"
      ref={cardRef}
    >
      <BorderBeam
        className="isolate -z-1 opacity-70 after:![animation:none] after:![offset-distance:calc(var(--beam-offset,0)*1%)]"
        duration={BEAM_DURATION}
        size={BEAM_SIZE}
        colorFrom="#60a5fa"
        colorTo="#3b82f6"
      />

      {/* Title */}
      <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center px-4 md:px-10 z-10">
        <p
          className="bg-bg-light dark:bg-bg-dark px-3 text-center font-medium text-text-light dark:text-text-dark text-lg md:text-xl tracking-[-0.01em] sm:px-6 rounded-full border border-border-light dark:border-border-dark"
          ref={textRef}
        >
          <span
            ref={waveSpanRef}
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0%, currentColor 45%, #60a5fa 47%, #3b82f6 50%, #60a5fa 53%, currentColor 55%, currentColor 100%)",
              backgroundSize: "250% 100%",
              backgroundRepeat: "no-repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundPosition: "0% center",
            }}
          >
            Tech Stack
          </span>
        </p>
      </div>

      <div className="grid pt-8 pb-4">
        {/* We use standard CSS mask-image for fading left/right edges */}
        <div 
          className="flex min-w-0 items-center justify-center py-6"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          <Marquee
            className="[--duration:40s] [--gap:1rem] md:[--gap:2rem] py-4"
            repeat={4}
          >
            {allSkills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center justify-center gap-2 group/skill px-2 cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-gray-200 dark:border-white/10 bg-white flex items-center justify-center shadow-md transition-all duration-300 transform group-hover/skill:-translate-y-1 group-hover/skill:border-primary/50 group-hover/skill:shadow-primary/20 group-hover/skill:shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                  <iconify-icon icon={skill.icon} class="text-2xl md:text-3xl"></iconify-icon>
                </div>
                <span className="font-semibold text-[9px] md:text-[10px] text-text-light dark:text-text-dark transition-colors group-hover/skill:text-primary">
                  {skill.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};
