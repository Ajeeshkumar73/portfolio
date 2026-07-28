import { useState } from "react";
import {
  Farmie,
  ScoreTacker,
  WellnessWave,
  LearnLoop,
} from "../assets/ProjectImage";

function Projects({ profile, loading }) {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
  const [expandedMap, setExpandedMap] = useState({});

  const toggleExpand = (idx) => {
    setExpandedMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getProjectImage = (title) => {
    if (!title) return null;
    const t = title.toLowerCase();
    if (t.includes("learnloop")) return LearnLoop;
    if (t.includes("wellness wave") || t.includes("wellness-wave")) return WellnessWave;
    if (t.includes("score tracker") || t.includes("score-tracker") || t.includes("scoretacker") || t.includes("score tacker")) return ScoreTacker;
    if (t.includes("farmie")) return Farmie;
    return null;
  };

  const hardcodedProjects = [
    {
      title: "LEARNLOOP | AI-Powered Career Guidance & Skill Development Platform",
      description: "Developed an AI-powered Career Guidance and Skill Development Platform that helps users identify suitable career paths through personalized recommendations, skill-gap analysis, and customized learning roadmaps. The platform integrates an AI mentor chatbot, resume generation, and job description analysis using Large Language Models and Natural Language Processing techniques. It also includes community collaboration features, secure authentication, media management, and scalable backend architecture for enhanced user engagement and career planning.",
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
        "GitHub"
      ],
      image: LearnLoop,
      images: [LearnLoop],
      url: "https://github.com/Ajeeshkumar73/LearnLoop"
    },
    {
      title: "WELLNESS WAVE | Early Lifestyle Disease Prediction and Prevention System",
      description: "Developed an AI-powered Lifestyle Disease Prediction and Healthcare Management Platform that analyzes user health data using deep learning models to predict the risk of lifestyle diseases and classify users into low, intermediate, or high-risk categories. The system provides personalized preventive healthcare recommendations, including diet plans, exercise routines, and healthy lifestyle habits for low- and intermediate-risk users, while recommending consultations with relevant medical specialists for high-risk individuals. The platform also integrates an AI chatbot for healthcare assistance, doctor appointment booking, real-time communication, appointment reminders, and health report generation to enhance preventive care and patient engagement. Built with a scalable architecture, responsive user interface, and secure data management practices",
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
        "GitHub"
      ],
      image: WellnessWave,
      images: [WellnessWave],
      url: "https://github.com/Ajeeshkumar73/wellness_wave_main"
    },
    {
      title: "SCORE TRACKER | Employee Productivity Monitoring and Smart Task Recommendation System",
      description: "Developed an AI-powered workforce management platform that analyzes employee performance, tracks productivity trends, and generates real-time insights to improve organizational efficiency. Implemented a smart task recommendation engine that assigns tasks based on employee skills, workload, and historical performance data, ensuring optimal resource utilization. Integrated attendance tracking, leave management, and interactive analytical dashboards with real-time communication features and optimized database operations.",
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
        "Tailwind CSS"
      ],
      image: ScoreTacker,
      images: [ScoreTacker],
      url: "https://github.com/Ajeeshkumar73/score-tracker"
    },
    {
      title: "FARMIE | Web-Based Agriculture Management System",
      description: "Developed a full-stack agriculture management platform featuring AI-powered plant disease detection, crop cultivation guidance, and an online marketplace for farmers to manage and sell agricultural products. Built with a responsive interface, secure backend services, and scalable software engineering practices.",
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
        "Tailwind CSS"
      ],
      image: Farmie,
      images: [Farmie],
      url: "https://github.com/Ajeeshkumar73/farmie"
    }
  ];

  const allProjects = hardcodedProjects;

  const getProjectImagesList = (project) => {
    const localImg = getProjectImage(project.title);
    if (localImg) {
      return [localImg];
    }
    const list = [];
    if (project.image) {
      list.push(project.image);
    }
    return list;
  };

  const openLightbox = (imagesList, index) => {
    setLightbox({
      isOpen: true,
      images: imagesList,
      currentIndex: index,
    });
  };

  return (
    <>
      <section
        class="w-full flex flex-col gap-12 pt-16 border-t border-outline/10"
        id="projects"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 class="font-headline-md text-headline-md text-primary">
            Selected Work
          </h3>
          <a
            href="https://github.com/Ajeeshkumar73?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000000",
              background: "rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.18)",
              borderRadius: "999px",
              padding: "5px 14px",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.4)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            Explore More
            <span style={{ fontSize: "13px", marginLeft: "1px" }}>↗</span>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {allProjects.map((project, idx) => {
            const imagesList = getProjectImagesList(project);
            return (
              <div
                key={idx}
                class="border border-outline/10 bg-surface flex flex-col group cursor-pointer hover:border-primary/30 transition-colors"
              >
                <div
                  class="w-full aspect-video bg-surface-container-high relative overflow-hidden flex items-center justify-center"
                  onClick={() => {
                    if (imagesList.length > 0) {
                      openLightbox(imagesList, 0);
                    }
                  }}
                >
                  {getProjectImage(project.title) || project.image ? (
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={getProjectImage(project.title) || project.image}
                    />
                  ) : (
                    <div className="text-on-surface-variant font-body-md">
                      No project image uploaded
                    </div>
                  )}
                </div>

                <div class="p-8 flex flex-col gap-4">
                  {/* Title */}
                  <h4 class="font-headline-md text-headline-md text-primary">
                    {project.title}
                  </h4>

                  {/* Description preview (always visible, 2 lines clamped) */}
                  <p
                    class="font-body-md text-body-md text-on-surface-variant"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: expandedMap[idx] ? "unset" : 2,
                      WebkitBoxOrient: "vertical",
                      overflow: expandedMap[idx] ? "visible" : "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Expand / Collapse arrow — below description */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(idx);
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.06em",
                        color: "#444",
                      }}
                      aria-label={expandedMap[idx] ? "Collapse" : "Expand"}
                    >
                      {expandedMap[idx] ? "Less" : "More"}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transition: "transform 0.3s",
                          transform: expandedMap[idx]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        class="bg-surface-container px-3 py-1 font-label-mono text-label-mono text-on-surface-variant"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  {project.url && project.url !== "#" && (
                    <div className="mt-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline font-medium inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Project →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 transition-all duration-300"
          onClick={() => setLightbox({ ...lightbox, isOpen: false })}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox({ ...lightbox, isOpen: false });
            }}
          >
            <span className="material-symbols-outlined block text-3xl">
              close
            </span>
          </button>

          {/* Main Image Container */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.currentIndex]}
              alt="Expanded view"
              className="max-w-full max-h-[80vh] object-contain border border-white/10 shadow-2xl rounded-lg"
            />

            {/* Left Nav Button */}
            {lightbox.images.length > 1 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({
                    ...lightbox,
                    currentIndex:
                      (lightbox.currentIndex - 1 + lightbox.images.length) %
                      lightbox.images.length,
                  });
                }}
              >
                <span className="material-symbols-outlined block text-3xl">
                  arrow_back
                </span>
              </button>
            )}

            {/* Right Nav Button */}
            {lightbox.images.length > 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({
                    ...lightbox,
                    currentIndex:
                      (lightbox.currentIndex + 1) % lightbox.images.length,
                  });
                }}
              >
                <span className="material-symbols-outlined block text-3xl">
                  arrow_forward
                </span>
              </button>
            )}
          </div>

          {/* Indicator Info */}
          <div className="mt-4 text-white/60 font-body-md bg-black/40 px-3 py-1 rounded-full">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </>
  );
}

export default Projects;
