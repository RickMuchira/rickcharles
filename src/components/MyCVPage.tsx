// components/MyCVPage.tsx
"use client";

import React, { useState } from "react";
import TiltBadge from "./TiltBadge";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Strathmore University - ICT Department",
    period: "Feb 2025 - Apr 2025",
    details: [
      "Developed a comprehensive Security Management System using Laravel (backend) and React (frontend), now actively serving 200+ university staff and security personnel daily",
      "Reduced security incident response time through streamlined reporting and tracking features",
      "Led end-to-end testing and troubleshooting, achieving 95% user satisfaction rate during rollout"
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Strathmore University - ICT Department",
    period: "May 2024 - Jul 2024",
    details: [
      "Independently designed and deployed a WhatsApp-based chatbot for the People and Culture department",
      "Integrated Groq AI for natural language understanding and built a document retrieval system for accurate HR policy responses",
      "Utilized Twilio API for seamless WhatsApp integration, improving information access and response times"
    ],
  },
];

const projects = [
  {
    name: "Madwanzi Cybersecurity Blog Platform",
    year: "2025",
    tech: "Laravel, React, MySQL, Rich Text Editor, JWT Authentication",
    description: "Building Medium-style content management platform optimized for cybersecurity professionals with advanced rich text editor and syntax highlighting",
    github: "RickMuchira/madwanzi_blog_site"
  },
  {
    name: "Voting Management System",
    year: "2025",
    tech: "Full-stack web application with secure authentication",
    description: "Complete voting solution built in partnership with KCA University featuring 256-bit encryption and real-time vote tracking",
    github: "RickMuchira/VotingSystem"
  },
  {
    name: "Policy WhatsApp Chatbot",
    year: "2025",
    tech: "Flask, LangChain, Twilio, Vector Databases",
    description: "AI-powered WhatsApp chatbot using RAG for HR policy questions, reducing HR team workload significantly",
    github: null
  },
  {
    name: "RAG Applications Development",
    year: "2024",
    tech: "Python, Next.js, Vector Databases",
    description: "Semantic search over 10,000+ academic documents with 90%+ accuracy for academic query resolution",
    github: null
  },
  {
    name: "M-Pesa Integration Ticketing System",
    year: "2024",
    tech: "Node.js, M-Pesa Daraja API, Google Sheets API",
    description: "Event ticketing system with automated payment verification and 99.8% transaction success rate",
    github: null
  },
  {
    name: "Mobile Money Transfer System",
    year: "2023",
    tech: "HTML, CSS, JavaScript, PHP, MySQL",
    description: "Secure payment solution with responsive frontend and reliable money transfer capabilities",
    github: null
  }
];

const skills = {
  "Programming Languages": ["Python", "JavaScript (ES6+)", "PHP"],
  "Frontend Technologies": ["React.js", "Next.js", "HTML5", "CSS3", "GSAP Animation"],
  "Backend Frameworks": ["Laravel", "Node.js", "Express.js", "Flask"],
  "Databases & Storage": ["MySQL", "SQLite", "Vector Databases"],
  "API Integration": ["M-Pesa Daraja API", "Twilio", "WhatsApp Business API", "Google Sheets API"],
  "AI/ML Technologies": ["Retrieval-Augmented Generation (RAG)", "LangChain", "Groq AI", "Prompt Engineering"],
  "Development Tools": ["Visual Studio Code", "Git/GitHub", "Agile (Scrum/Kanban)"],
  "Cloud & Deployment": ["Production deployment", "Real-time systems", "Payment gateways"]
};

const education = [
  {
    institution: "Strathmore University",
    degree: "Diploma in Business Information Technology",
    period: "2022-2024",
    note: "Graduated with Distinction"
  },
  {
    institution: "Mang'u High School",
    degree: "Kenya Certificate of Secondary Education (KCSE)",
    period: "2018-2022",
    note: null
  }
];

export default function MyCVPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openExpIdx, setOpenExpIdx] = useState<number | null>(null);
  const [openProjectIdx, setOpenProjectIdx] = useState<number | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Tilt badge */}
      <div className="flex justify-center mb-8">
        <TiltBadge fontSize={2.5} />
      </div>

      {/* Header + Contact */}
      <header className="space-y-6 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Rick Charles Muchira
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-blue-600">📞</span>
            <span className="text-gray-700">+254 745752274</span>
          </div>
          
          <a 
            href="https://wa.me/254789103744?text=Hi%20Rick!%20I%20saw%20your%20CV%20and%20would%20love%20to%20discuss%20a%20collaboration%20opportunity.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
          >
            <span className="text-green-600 text-lg group-hover:animate-pulse">💬</span>
            <span className="text-green-700 font-medium">WhatsApp: +254789103744</span>
          </a>
          
          <a 
            href="mailto:rickcharlesm@gmail.com?subject=Let&apos;s%20Work%20Together%20-%20Project%20Collaboration&body=Hi%20Rick%2C%0A%0AI%20came%20across%20your%20CV%20and%20I&apos;m%20impressed%20with%20your%20work%20in%20full-stack%20development%20and%20AI%20solutions.%20I&apos;d%20love%20to%20discuss%20a%20potential%20collaboration%20opportunity.%0A%0AProject%2FOpportunity%3A%20%5BPlease%20describe%20your%20project%20or%20opportunity%5D%0A%0ATech%20Stack%2FRequirements%3A%20%5BPlease%20mention%20technologies%20or%20specific%20requirements%5D%0A%0ATimeline%3A%20%5BExpected%20timeline%5D%0A%0ABudget%2FCompensation%3A%20%5BIf%20applicable%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group"
          >
            <svg className="w-5 h-5 text-red-600 group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8.236l-8,4.882L4,8.236V6h16V8.236z"/>
            </svg>
            <span className="text-red-700 font-medium">rickcharlesm@gmail.com</span>
          </a>
          
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-orange-600">📍</span>
            <span className="text-gray-700">Nairobi, Kenya</span>
          </div>
          
          <a 
            href="https://github.com/RickMuchira" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
          >
            <svg className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-white font-medium">GitHub: 30+ Projects</span>
          </a>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Full-Stack Developer with 2+ years of hands-on experience building scalable web applications, 
          AI-powered chatbots, and payment integration solutions. Proven track record delivering production 
          systems serving 100+ university staff daily. Distinction graduate eager to drive innovation.
        </p>
        <Button
          id="download-cv-top"
          title="Download FULL CV"
          rightIcon={<TiLocationArrow />}
          href="/RickCharlesMuchira_CV.pdf"
          download
        />
      </header>

      {/* Core Strengths Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="font-semibold text-lg text-blue-800 mb-2">Technical Leadership</h3>
          <p className="text-gray-700">Cross-functional collaboration, system architecture, project management</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <h3 className="font-semibold text-lg text-purple-800 mb-2">AI & Innovation</h3>
          <p className="text-gray-700">RAG systems, chatbots, prompt engineering, ML integration</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
          <h3 className="font-semibold text-lg text-green-800 mb-2">Full-Stack Expertise</h3>
          <p className="text-gray-700">React, Laravel, Python, payment gateways, secure architectures</p>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <button
          className="w-full flex justify-between items-center text-left mb-6"
          onClick={() => toggleSection('experience')}
        >
          <h2 className="font-bold text-2xl">Professional Experience</h2>
          <span className="text-2xl">{openSection === 'experience' ? '▼' : '▶'}</span>
        </button>
        {openSection === 'experience' && (
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-6 pb-6">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => setOpenExpIdx(openExpIdx === i ? null : i)}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm">{exp.period}</p>
                  </div>
                  <span className="text-lg">{openExpIdx === i ? '▼' : '▶'}</span>
                </button>
                {openExpIdx === i && (
                  <ul className="mt-4 space-y-2">
                    {exp.details.map((detail, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section>
        <button
          className="w-full flex justify-between items-center text-left mb-6"
          onClick={() => toggleSection('projects')}
        >
          <h2 className="font-bold text-2xl">Key Projects</h2>
          <span className="text-2xl">{openSection === 'projects' ? '▼' : '▶'}</span>
        </button>
        {openSection === 'projects' && (
          <div className="space-y-4">
            {projects.map((project, i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => setOpenProjectIdx(openProjectIdx === i ? null : i)}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.year} • {project.tech}</p>
                  </div>
                  <span className="text-lg">{openProjectIdx === i ? '▼' : '▶'}</span>
                </button>
                {openProjectIdx === i && (
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700">{project.description}</p>
                    {project.github && (
                      <p className="text-sm">
                        <span className="text-gray-500">GitHub: </span>
                        <span className="text-blue-600 font-mono">{project.github}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Technical Skills Section */}
      <section>
        <button
          className="w-full flex justify-between items-center text-left mb-6"
          onClick={() => toggleSection('skills')}
        >
          <h2 className="font-bold text-2xl">Technical Skills</h2>
          <span className="text-2xl">{openSection === 'skills' ? '▼' : '▶'}</span>
        </button>
        {openSection === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Education Section */}
      <section>
        <button
          className="w-full flex justify-between items-center text-left mb-6"
          onClick={() => toggleSection('education')}
        >
          <h2 className="font-bold text-2xl">Education</h2>
          <span className="text-2xl">{openSection === 'education' ? '▼' : '▶'}</span>
        </button>
        {openSection === 'education' && (
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="border-l-4 border-green-500 pl-6">
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-green-600 font-medium">{edu.institution}</p>
                <p className="text-gray-500 text-sm">{edu.period}</p>
                {edu.note && (
                  <p className="text-sm font-medium text-green-700 mt-1">{edu.note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Industries & Impact */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
        <h2 className="font-bold text-2xl mb-4">Industries & Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-indigo-800">Education Systems</h3>
            <p className="text-sm text-gray-700">Security management, HR automation, university-scale solutions</p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-800">AI & Chatbots</h3>
            <p className="text-sm text-gray-700">RAG systems, document retrieval, natural language processing</p>
          </div>
          <div>
            <h3 className="font-semibold text-pink-800">Payments & Fintech</h3>
            <p className="text-sm text-gray-700">M-Pesa integration, secure transactions, real-time processing</p>
          </div>
        </div>
      </section>

      {/* Languages & Contact */}
      <section className="text-center space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Languages</h3>
          <p className="text-gray-700">English (Fluent) • Kiswahili (Fluent)</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Ready to Build Something Amazing?</h3>
          <p className="text-gray-700 mb-6">
            Let&apos;s discuss how I can contribute to your team&apos;s success with innovative, scalable solutions.
          </p>
        </div>
      </section>

      {/* Download CTA */}
      <div className="text-center mt-12">
        <Button
          id="download-cv-bottom"
          title="Download Complete CV"
          rightIcon={<TiLocationArrow />}
          href="/RickCharlesMuchira_CV.pdf"
          download
        />
      </div>
    </div>
  );
}