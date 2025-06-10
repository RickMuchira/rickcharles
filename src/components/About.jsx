"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4 text-center">
        <p className="font-general text-sm uppercase text-gray-500 tracking-wider">
          Rickdefine Your World
        </p>

        <AnimatedTitle
          title="Building bold, beautiful, <b>impact-driven</b> experiences"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="max-w-2xl mt-4 space-y-3 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            I build smart, user-focused digital solutions — from full-stack apps
            to intelligent tools that simplify real-world problems.
          </p>
          <p>
            With experience across tech, education, and business, I combine
            creativity and clean code to deliver results that matter.
          </p>
          <p className="text-gray-500 text-sm">
            Fluent in Python, React, Laravel, Node — always building with purpose.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/aboutme.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
