// app/page.tsx or components/HomePage.tsx
"use client";

import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/FloatingImage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      {/* Navbar in header semantics */}
      <header>
        <Navbar />
      </header>

      {/* Main content */}
      <main>
        {/* Home Section */}
        <section id="home" aria-label="Home">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" aria-label="About">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects" aria-label="Projects">
          <Projects />
        </section>

        {/* Experience Section */}
        <section id="experience" aria-label="Experience">
          <Experience />
        </section>

        {/* Contact Section */}
        <section id="contact" aria-label="Contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
