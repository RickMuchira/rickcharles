// components/FloatingImage.tsx
"use client";

import React, { useRef, useCallback } from "react"; 
import gsap from "gsap"; 
import Image from "next/image"; 

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage: React.FC = () => {
  // Wrapper ref for capturing mouse events or animating parent
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ref to store underlying <img> element from Next.js Image for GSAP
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Capture the HTMLImageElement when Next.js Image loads
  const handleImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  // Mouse move handler on wrapper, animates underlying image via GSAP
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const element = imgRef.current;
      if (!element) return; // Null check before animation

      const rect = element.getBoundingClientRect(); // MDN: getBoundingClientRect :contentReference[oaicite:14]{index=14}
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((yPos - centerY) / centerY) * -10;
      const rotateY = ((xPos - centerX) / centerX) * 10;

      gsap.to(element, {
        duration: 0.3,
        rotateX,
        rotateY,
        transformPerspective: 500,
        ease: "power1.inOut",
      });
    },
    []
  );

  // Reset rotation on leave/up/enter
  const resetRotation = useCallback(() => {
    const element = imgRef.current;
    if (!element) return;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          THE JOURNEY
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> <b>R<b>ICK<b>MUCHIRA</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              {/* Wrapper div to position Next.js Image and capture mouse events */}
              <div
                ref={wrapperRef}
                className="story-img-content relative w-full h-[400px]" // adjust height as needed
                onMouseMove={handleMouseMove}
                onMouseLeave={resetRotation}
                onMouseUp={resetRotation}
                onMouseEnter={resetRotation}
              >
                <Image
                  src="/img/entrance.webp"
                  alt="Entrance"
                  fill
                  className="object-contain"
                  onLoadingComplete={(img) => {
                    // Pre-Next.js 14: receives HTMLImageElement
                    if (img instanceof HTMLImageElement) {
                      handleImageLoad(img);
                    }
                  }}
                  onLoad={(e) => {
                    // Next.js 14+: e.currentTarget is HTMLImageElement
                    handleImageLoad(e.currentTarget as HTMLImageElement);
                  }}
                />
              </div>
            </div>
            {/* SVG filter for rounded corners, kept invisible */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              I’ve contributed to real systems, worked across teams, and taken
              ownership of projects that made a difference. From university
              departments to independently led initiatives, my experience
              blends technical skill with clear communication, fast learning,
              and consistent delivery. I’m ready to bring the same energy and
              reliability to your team.
            </p>

            <Button
              id="realm-btn"
              title="discover projects"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
