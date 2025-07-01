// components/TiltBadge.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface TiltBadgeProps {
  text?: string;
  fontSize?: number | string;
  maxRotation?: number;
  zDepth?: number;
  autoSpeed?: number;
  dropDuration?: number;
  dropDelay?: number;
}

const TiltBadge: React.FC<TiltBadgeProps> = ({
  text = "RICKDEFINE",
  fontSize = "2rem",
  maxRotation = 25,
  zDepth = 60,
  autoSpeed = 0.8,
  dropDuration = 0.8,
  dropDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const letters = text.split("");

  const [isHovered, setIsHovered] = useState(false);
  const [isDropping, setIsDropping] = useState(true);
  const [droppedLetters, setDroppedLetters] = useState<Set<number>>(new Set());

  const applyTransform = useCallback(
    (rotateX: number, rotateY: number, zTranslate = zDepth, isSmooth = true) => {
      const spans = containerRef.current?.querySelectorAll<HTMLSpanElement>(".letter");
      spans?.forEach((s, index) => {
        // Skip transform if letter is still dropping
        if (droppedLetters.has(index) || !isDropping) {
          if (isSmooth) {
            s.style.transition = "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          } else {
            s.style.transition = "transform 0.1s ease-out";
          }
          
          // Add subtle wave effect across letters
          const waveOffset = Math.sin((Date.now() * 0.002) + (index * 0.3)) * 2;
          
          s.style.transform = `
            rotateX(${rotateX + waveOffset}deg)
            rotateY(${rotateY}deg)
            translateZ(${zTranslate}px)
            translateY(${waveOffset * 0.5}px)
          `;
        }
      });
    },
    [zDepth, droppedLetters, isDropping]
  );

  // Seamless auto-animation loop (only after dropping is complete)
  const animate = useCallback(() => {
    if (!isHovered && !isDropping) {
      const time = Date.now() * 0.001 * autoSpeed;
      
      // Create smooth circular motion
      const rotateX = Math.sin(time) * maxRotation * 0.6;
      const rotateY = Math.cos(time * 0.7) * maxRotation * 0.6;
      const zOffset = Math.sin(time * 0.5) * (zDepth * 0.3);
      
      applyTransform(rotateX, rotateY, zDepth + zOffset, true);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered, isDropping, autoSpeed, maxRotation, zDepth, applyTransform]);

  // Start dropping animation on mount
  useEffect(() => {
    setIsDropping(true);
    setDroppedLetters(new Set());

    // Trigger each letter to drop with staggered timing
    letters.forEach((_, index) => {
      setTimeout(() => {
        setDroppedLetters(prev => new Set([...prev, index]));
      }, index * dropDelay * 1000);
    });

    // Complete dropping animation
    setTimeout(() => {
      setIsDropping(false);
    }, (letters.length * dropDelay + dropDuration) * 1000);
  }, [letters.length, dropDelay, dropDuration]);

  // Start animation after dropping is complete
  useEffect(() => {
    if (!isDropping) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isDropping]);

  // Mouse interaction (only after dropping)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isDropping) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      // Smooth mouse-based rotation
      const rotateX = -y * maxRotation;
      const rotateY = x * maxRotation;
      
      applyTransform(rotateX, rotateY, zDepth * 1.5, false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, zDepth, applyTransform, isDropping]);

  // Restart drop animation every 10 seconds
  useEffect(() => {
    const restartInterval = setInterval(() => {
      setIsDropping(true);
      setDroppedLetters(new Set());

      // Trigger each letter to drop again
      letters.forEach((_, index) => {
        setTimeout(() => {
          setDroppedLetters(prev => new Set([...prev, index]));
        }, index * dropDelay * 1000);
      });

      // Complete dropping animation
      setTimeout(() => {
        setIsDropping(false);
      }, (letters.length * dropDelay + dropDuration) * 1000);
    }, 10000); // Restart every 10 seconds

    return () => clearInterval(restartInterval);
  }, [letters.length, dropDelay, dropDuration]);

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className={`cursor-pointer transition-all duration-700 ease-out ${
          isHovered && !isDropping ? 'scale-110' : 'scale-100'
        }`}
        style={{ 
          perspective: 1200,
          filter: `drop-shadow(0 10px 25px rgba(167, 139, 250, ${isHovered && !isDropping ? 0.4 : 0.2}))`,
        }}
      >
        <h1
          aria-label={text}
          className="m-0 flex select-none"
          style={{
            fontSize: typeof fontSize === "number" ? `${fontSize}rem` : fontSize,
            transformStyle: "preserve-3d",
            whiteSpace: "nowrap",
            fontWeight: 700,
          }}
        >
          {letters.map((ch, i) => (
            <span
              key={i}
              className={`letter inline-block origin-center bg-clip-text text-transparent relative ${
                isDropping && !droppedLetters.has(i) ? 'dropping' : 'landed'
              }`}
              style={{
                transformStyle: "preserve-3d",
                backgroundImage: "linear-gradient(45deg, #a78bfa, #f472b6)",
                textShadow: `
                  0 4px 15px rgba(0,0,0,0.3),
                  0 0 30px rgba(167, 139, 250, ${isHovered && !isDropping ? 0.6 : 0.3})
                `,
                transition: !isDropping ? "text-shadow 0.4s ease" : "none",
                // Initial position for dropping
                transform: isDropping && !droppedLetters.has(i) 
                  ? `translateY(-100vh) rotateX(${Math.random() * 720 - 360}deg) rotateY(${Math.random() * 720 - 360}deg) rotateZ(${Math.random() * 360}deg)`
                  : 'translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                animation: droppedLetters.has(i) && isDropping
                  ? `drop-${i} ${dropDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`
                  : !isDropping ? `float-${i % 6} 4s ease-in-out infinite` : 'none',
                animationDelay: !isDropping ? `${i * 0.1}s` : '0s',
              }}
            >
              {ch}
            </span>
          ))}
        </h1>
      </div>

      <style jsx>{`
        .dropping {
          opacity: 0.7;
        }
        
        .landed {
          opacity: 1;
        }

        /* Drop animations for each letter */
        ${letters.map((_, i) => `
          @keyframes drop-${i} {
            0% { 
              transform: translateY(-100vh) rotateX(${Math.random() * 720 - 360}deg) rotateY(${Math.random() * 720 - 360}deg) rotateZ(${Math.random() * 360}deg);
              opacity: 0.7;
            }
            70% { 
              transform: translateY(10px) rotateX(${Math.random() * 180 - 90}deg) rotateY(${Math.random() * 180 - 90}deg) rotateZ(${Math.random() * 180 - 90}deg);
              opacity: 1;
            }
            85% { 
              transform: translateY(-5px) rotateX(${Math.random() * 90 - 45}deg) rotateY(${Math.random() * 90 - 45}deg) rotateZ(${Math.random() * 90 - 45}deg);
            }
            100% { 
              transform: translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
              opacity: 1;
            }
          }
        `).join('')}

        /* Floating animations after landing */
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-3px) rotate(1deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-2px) rotate(-1deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-4px) rotate(0.5deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-2px) rotate(-0.5deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-3px) rotate(1deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-2px) rotate(-1deg); } }
      `}</style>
    </div>
  );
};

export default TiltBadge;