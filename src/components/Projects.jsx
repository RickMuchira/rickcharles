"use client";

import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link"; // If you want each card to link to a project‐detail page

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      {/* Replace <video> with <img> if you don’t have demo videos */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      {/* Section Header */}
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">My Projects</p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          A curated selection of web apps, design experiments, and open‐source contributions.
        </p>
      </div>

      {/* Featured Project (Large Card) */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        {/* If you want this to link to a detail page, wrap in <Link href="/projects/your-slug"> */}
        <BentoCard
          src="videos/feature-1.mp4"      // ← Replace with your project’s video/GIF or use "/img/project-1.png"
          title={<><b>Project</b> One</>}       // ← Replace with your actual project name
          description="A React + Next.js productivity dashboard." // ← Replace with your one‐sentence summary
        />
      </BentoTilt>

      {/* Grid of Other Projects */}
      <div className="grid h-auto w-full grid-cols-2 grid-rows-3 gap-7">
        {/* Project Two */}
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"      // ← Replace with your second project’s media
            title={<><b>Project</b> Two</>}
            description="An interactive D3.js data visualization."
          />
        </BentoTilt>

        {/* Project Three */}
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"      // ← Replace with your third project’s media
            title={<><b>Project</b> Three</>}
            description="A Tailwind‐styled landing page template."
          />
        </BentoTilt>

        {/* Project Four */}
        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"      // ← Replace with your fourth project’s media
            title={<><b>Project</b> Four</>}
            description="A Unity prototype game demo."
          />
        </BentoTilt>

        {/* Placeholder / “More” Card – Remove or Replace When You Have More Projects */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re s<b>o</b>on
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        {/* Project Five (Optional) */}
        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"     // ← Replace with your fifth project’s media or remove if not needed
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Projects;
