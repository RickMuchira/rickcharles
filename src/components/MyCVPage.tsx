// components/MyCVPage.tsx
"use client";

import React, { useState } from "react";
import TiltBadge from "./TiltBadge";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const experiences = [
  {
    role: "Software Developer Intern",
    company: "Strathmore University ICT Dept",
    period: "Feb–Apr 2025",
    details: [
      "Built Security Management System with Laravel & React.",
      "Led testing & adoption with ICT and security teams.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Strathmore University ICT Dept",
    period: "May–Jul 2024",
    details: [
      "Built HR chatbot with WhatsApp & Groq AI.",
      "Reduced HR response time with Twilio integration.",
    ],
  },
  // Add more roles as needed...
];

export default function MyCVPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
      {/* Tilt badge */}
      <div className="flex justify-center mb-8">
        <TiltBadge fontSize={2.5} />
      </div>

      {/* Header + Summary */}
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Rick Charles Muchira</h1>
        <p className="text-lg text-gray-700">
          Hey, I’m Rick—full-stack developer & AI builder. I turn complex ideas
          into real, user-friendly products—fast.
        </p>
        <Button
          id="download-cv-top"
          title="Download FULL CV"
          rightIcon={<TiLocationArrow />}
          href="/RickCharlesMuchira_CV.pdf"
          download
        />
      </header>

      {/* Behavior / Strengths / Mindset */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold">Behavior</h3>
          <p>Outcome-driven, collaborative, pragmatic.</p>
        </div>
        <div>
          <h3 className="font-semibold">Strengths</h3>
          <p>Full-stack, AI systems, secure architectures.</p>
        </div>
        <div>
          <h3 className="font-semibold">Mindset</h3>
          <p>I love shipping solutions that help people and institutions.</p>
        </div>
      </section>

      {/* Industries */}
      <section>
        <h2 className="font-semibold text-xl mb-3">Industries & Domains</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Education systems</li>
          <li>Chatbots & AI</li>
          <li>Payments & M-Pesa integration</li>
        </ul>
      </section>

      {/* Experience */}
      <section>
        <h2 className="font-semibold text-xl mb-6">Experience</h2>
        {experiences.map((exp, i) => (
          <div key={i} className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div>
                <p className="font-medium">{exp.role}</p>
                <p className="text-gray-500">
                  {exp.company} • {exp.period}
                </p>
              </div>
              <span>{openIdx === i ? "▼" : "▶"}</span>
            </button>
            {openIdx === i && (
              <ul className="mt-2 list-disc pl-5 text-gray-700">
                {exp.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Download CTA */}
      <div className="text-center mt-12">
        <Button
          id="download-cv-bottom"
          title="Download Full CV"
          rightIcon={<TiLocationArrow />}
          href="/RickCharlesMuchira_CV.pdf"
          download
        />
      </div>
    </div>
  );
}
