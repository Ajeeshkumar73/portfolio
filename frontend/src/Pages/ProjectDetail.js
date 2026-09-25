import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  Farmie,
  ScoreTacker,
  WellnessWave,
  LearnLoop,
} from "../assets/ProjectImage";

const allProjects = [
  {
    id: "learnloop",
    title:
      "LEARNLOOP | AI-Powered Career Guidance & Skill Development Platform",
    year: "2026",
    description:
      "Developed an AI-powered Career Guidance and Skill Development Platform that helps users identify suitable career paths through personalized recommendations, skill-gap analysis, and customized learning roadmaps. The platform integrates an AI mentor chatbot, resume generation, and job description analysis using Large Language Models and Natural Language Processing techniques. It also includes community collaboration features, secure authentication, media management, and scalable backend architecture for enhanced user engagement and career planning.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Django",
      "MongoDB",
      "LLaMA 3.3 70B",
      "Groq API",
      "NLP",
      "REST API",
      "Google OAuth 2.0",
      "Git",
      "GitHub",
    ],
    image: LearnLoop,
    url: "https://github.com/Ajeeshkumar73/LearnLoop",
  },
  {
    id: "wellness-wave",
    title:
      "WELLNESS WAVE | Early Lifestyle Disease Prediction and Prevention System",
    year: "2026",
    description:
      "Developed an AI-powered Lifestyle Disease Prediction and Healthcare Management Platform that analyzes user health data using deep learning models to predict the risk of lifestyle diseases and classify users into low, intermediate, or high-risk categories. The system provides personalized preventive healthcare recommendations, including diet plans, exercise routines, and healthy lifestyle habits for low- and intermediate-risk users, while recommending consultations with relevant medical specialists for high-risk individuals. The platform also integrates an AI chatbot for healthcare assistance, doctor appointment booking, real-time communication, appointment reminders, and health report generation to enhance preventive care and patient engagement. Built with a scalable architecture, responsive user interface, and secure data management practices.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Flask",
      "MongoDB",
      "PyTorch TabNet",
      "Deep Learning",
      "Qwen 3 32B",
      "Groq API",
      "Flask-SocketIO",
      "REST API",
      "Git",
      "GitHub",
    ],
    image: WellnessWave,
    url: "https://github.com/Ajeeshkumar73/wellness_wave_main",
  },
  {
    id: "score-tracker",
    title:
      "SCORE TRACKER | Employee Productivity Monitoring and Smart Task Recommendation System",
    year: "2026",
    description:
      "Developed an AI-powered workforce management platform that analyzes employee performance, tracks productivity trends, and generates real-time insights to improve organizational efficiency. Implemented a smart task recommendation engine that assigns tasks based on employee skills, workload, and historical performance data, ensuring optimal resource utilization. Integrated attendance tracking, leave management, and interactive analytical dashboards with real-time communication features and optimized database operations.",
    tech: [
      "Python",
      "Flask",
      "MongoDB",
      "Random Forest",
      "Machine Learning",
      "Scikit-learn",
      "Socket.IO",
      "NumPy",
      "Pandas",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
    ],
    image: ScoreTacker,
    url: "https://github.com/Ajeeshkumar73/score-tracker",
  },
  {
    id: "farmie",
    title: "FARMIE | Web-Based Agriculture Management System",
    year: "2025",
    description:
      "Developed a full-stack agriculture management platform featuring AI-powered plant disease detection, crop cultivation guidance, and an online marketplace for farmers to manage and sell agricultural products. Built with a responsive interface, secure backend services, and scalable software engineering practices.",
    tech: [
      "Python",
      "Flask",
      "MongoDB",
      "Scikit-learn",
      "NumPy",
      "Random Forest",
      "Machine Learning",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
    ],
    image: Farmie,
    url: "https://github.com/Ajeeshkumar73/farmie",
  },
];

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  const project = allProjects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Image slides in from top
      gsap.fromTo(
        imgRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      );
      // Content fades up
      gsap.fromTo(
        ".pd-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.25,
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-black">Project Not Found</h1>
          <button
            onClick={() => navigate("/#projects")}
            className="border border-black px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const titleParts = project.title.split("|");
  const mainTitle = titleParts[0].trim();
  const subtitle = titleParts.slice(1).join("|").trim();

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* Top Nav Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 px-6 md:px-12 h-16 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest font-semibold text-black/40">
          Project Details
        </span>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/70 hover:text-black transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      </div>

      {/* Full-Width Hero Image */}
      <div ref={imgRef} className="w-full pt-16">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto max-h-[75vh] object-contain bg-white"
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 flex flex-col gap-10">
        {/* Title */}
        <div className="pd-content border-b border-black/10 pb-8">
          <p className="text-xs uppercase tracking-widest font-semibold text-black/40 mb-3">
            {project.year}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">
            {mainTitle}
          </h1>
          {subtitle && (
            <p className="mt-3 text-lg sm:text-xl text-black/60 font-medium leading-snug">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="pd-content space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-black/40">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="text-xs font-mono uppercase tracking-wider text-black bg-black/5 border border-black/15 px-3 py-1.5 font-medium hover:bg-black hover:text-white transition-all duration-200 cursor-default"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="pd-content space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-black/40">
            About the Project
          </h2>
          <p
            className="text-base sm:text-lg text-black/70 leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: expanded ? "unset" : 6,
              WebkitBoxOrient: "vertical",
              overflow: expanded ? "visible" : "hidden",
            }}
          >
            {project.description}
          </p>
          {project.description && project.description.length > 300 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black/50 hover:text-black transition-colors pt-1 cursor-pointer bg-transparent border-0 p-0"
            >
              {expanded ? "Show Less" : "Read More"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>

        {/* CTA */}
        {project.url && project.url !== "#" && (
          <div className="pd-content pt-4 border-t border-black/10 flex flex-col sm:flex-row gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 px-8 py-4 text-sm font-semibold uppercase tracking-widest"
            >
              View Repository ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
