"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
}) {
  const [displayText, setDisplayText] = useState(label);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    let intervalId;
    let currentStep = 0;
    const maxSteps = 12; // Increased steps for a longer effect

    if (isHovered) {
      intervalId = setInterval(() => {
        setDisplayText((prev) => {
          const newText = prev.split("");
          for (let i = 0; i < label.length; i++) {
            if (currentStep > i * (maxSteps / label.length)) {
              newText[i] = label[i];
            } else {
              newText[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
          return newText.join("");
        });
        currentStep++;

        if (currentStep > maxSteps + label.length * (maxSteps / label.length)) {
          clearInterval(intervalId);
          setDisplayText(label);
        }
      }, staggerDuration * 2500); // Slower interval (approx 62.5ms instead of 25ms)
    } else {
      setDisplayText(label);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, label, staggerDuration]);

  return (
    <motion.span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={controls}
      transition={transition}
    >
      {displayText}
    </motion.span>
  );
}
