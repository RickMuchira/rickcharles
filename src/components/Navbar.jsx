// components/Navbar.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import clsx from "clsx";
import { TiLocationArrow } from "react-icons/ti";
import { useRouter } from "next/navigation";

import Button from "./Button";

const navItems = ["Home", "About", "Projects", "Experience", "Contact"];

export default function NavBar() {
  const router = useRouter();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((p) => !p);
    setIsIndicatorActive((p) => !p);
  };

  // Play/pause audio
  useEffect(() => {
    const audioEl = audioElementRef.current;
    if (!audioEl) return;
    isAudioPlaying ? audioEl.play() : audioEl.pause();
  }, [isAudioPlaying]);

  // Show/hide on scroll
  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      nav.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      nav.classList.add("floating-nav");
    } else {
      setIsNavVisible(true);
      nav.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // GSAP slide effect
  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;
    gsap.to(nav, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex w-full items-center justify-between p-4">
          {/* Logo + Resume button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="resume-button"
              title="My RESUME"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 px-3 py-1 rounded"
              onClick={() => router.push("/resume")}
            />
          </div>

          {/* Section anchors */}
          <div className="flex items-center">
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio toggle */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
