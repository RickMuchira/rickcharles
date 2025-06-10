"use client";

import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { href: "https://linkedin.com/in/rickcharlesmuchira", icon: <FaLinkedin /> },
  { href: "https://github.com/rickcharlesmuchira", icon: <FaGithub /> },
  { href: "https://twitter.com/rick_charles", icon: <FaTwitter /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left text-white">
          © Rick Charles Muchira 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-500 ease-in-out hover:text-gray-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline text-white md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
