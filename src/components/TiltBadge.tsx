// components/TiltBadge.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react"; 
// No annotation markers here

interface TiltBadgeProps {
  text?: string;
  fontSize?: number | string;
  maxRotation?: number;
  zDepth?: number;
  autoSpeed?: number;
  autoDelay?: number;
}

const TiltBadge: React.FC<TiltBadgeProps> = ({
  text = "RICKDEFINE",
  fontSize = "2rem",
  maxRotation = 40,
  zDepth = 80,
  autoSpeed = 3,
  autoDelay = 30,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = text.split("");

  const [isInteracting, setIsInteracting] = useState(false);
  const [autoAngle, setAutoAngle] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize applyTransform so it can be safely used in useEffect dependencies
  const applyTransform = useCallback(
    (rotateX: number, rotateY: number, zTranslate = zDepth) => {
      const spans = containerRef.current?.querySelectorAll<HTMLSpanElement>(".letter");
      spans?.forEach((s) => {
        s.style.transition = "transform 0.1s ease-out";
        s.style.transform = `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(${zTranslate}px)
        `;
      });
    },
    [zDepth] // include zDepth since used inside :contentReference[oaicite:7]{index=7}
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsInteracting(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsInteracting(false), 2000);

      const rect = container.getBoundingClientRect(); 
      // MDN: getBoundingClientRect returns element position & size :contentReference[oaicite:8]{index=8}
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (offsetX - centerX) / centerX;
      const percentY = (offsetY - centerY) / centerY;

      const rotateX = percentY * -maxRotation;
      const rotateY = percentX * maxRotation;

      applyTransform(rotateX, rotateY);
    };

    const handleMouseLeave = () => {
      applyTransform(0, 0, 0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [applyTransform, maxRotation]); // dependencies included :contentReference[oaicite:9]{index=9}

  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteracting) return;

      setAutoAngle((prev) => (prev + autoSpeed) % 360);
      const angle = autoAngle;
      const rotateX = Math.sin((angle * Math.PI) / 180) * maxRotation * 0.4;
      const rotateY = Math.cos((angle * Math.PI) / 180) * maxRotation * 0.4;

      applyTransform(rotateX, rotateY);
    }, autoDelay);

    return () => clearInterval(interval);
  }, [autoAngle, isInteracting, maxRotation, autoSpeed, autoDelay, applyTransform]); // include applyTransform :contentReference[oaicite:10]{index=10}

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <h1
        aria-label={text}
        className="m-0 flex"
        style={{
          fontSize: typeof fontSize === "number" ? `${fontSize}rem` : fontSize,
          transformStyle: "preserve-3d",
          whiteSpace: "nowrap",
        }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            className="letter inline-block origin-center bg-clip-text text-transparent"
            style={{
              transformStyle: "preserve-3d",
              backgroundImage: "linear-gradient(45deg, #a78bfa, #f472b6)",
              textShadow: "0 4px 10px rgba(0,0,0,0.25)",
              transition: "transform 0.3s ease, background 0.5s ease",
            }}
          >
            {ch}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TiltBadge;
