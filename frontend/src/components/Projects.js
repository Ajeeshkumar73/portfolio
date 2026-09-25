import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Farmie,
  ScoreTacker,
  WellnessWave,
  LearnLoop,
} from "../assets/ProjectImage";

gsap.registerPlugin(ScrollTrigger);

function Projects({ profile, loading }) {
  const projectsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left header entrance
      gsap.fromTo(
        ".projects-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Project cards staggered entrance on scroll
      const cards = gsap.utils.toArray(".project-card-item");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  const getProjectImage = (title) => {
    if (!title) return null;
    const t = title.toLowerCase();
    if (t.includes("learnloop")) return LearnLoop;
    if (t.includes("wellness wave") || t.includes("wellness-wave"))
      return WellnessWave;
    if (
      t.includes("score tracker") ||
      t.includes("score-tracker") ||
      t.includes("scoretacker") ||
      t.includes("score tacker")
    )
      return ScoreTacker;
    if (t.includes("farmie")) return Farmie;
    return null;
  };

  const hardcodedProjects = [
    {
      id: "learnloop",
      title:
        "LEARNLOOP | AI-Powered Career Guidance & Skill Development Platform",
      year: "2026",
      image: LearnLoop,
    },
    {
      id: "wellness-wave",
      title:
        "WELLNESS WAVE | Early Lifestyle Disease Prediction and Prevention System",
      year: "2026",
      image: WellnessWave,
    },
    {
      id: "score-tracker",
      title:
        "SCORE TRACKER | Employee Productivity Monitoring and Smart Task Recommendation System",
      year: "2026",
      image: ScoreTacker,
    },
    {
      id: "farmie",
      title: "FARMIE | Web-Based Agriculture Management System",
      year: "2025",
      image: Farmie,
    },
  ];

  const allProjects = hardcodedProjects;

  return (
    <>
      <section
        ref={projectsRef}
        className="w-full pt-16 border-t border-outline/10 relative"
        id="projects"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          {/* Left Column - Sticky Header & Description & Explore More */}
          <div className="projects-left md:col-span-5 flex flex-col gap-6 md:sticky md:top-28 self-start">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Selected Works
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed">
              Take a look at some of my standout projects, combining modern
              design, seamless functionality, and engaging user experiences to
              bring ideas to life.
            </p>

            <div>
              <a
                href="https://github.com/Ajeeshkumar73?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 rounded-none px-5 py-2.5 text-xs font-semibold uppercase tracking-widest group shadow-2xs"
              >
                Explore More
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Clean List of Image + Title + Subtitle + Year */}
          <div className="projects-right md:col-span-7 flex flex-col gap-14">
            {allProjects.map((project, idx) => {
              const projectImg =
                getProjectImage(project.title) || project.image;
              const titleParts = project.title.split("|");
              const mainTitle =
                titleParts.length > 1 ? titleParts[0].trim() : project.title;
              const subtitle =
                titleParts.length > 1
                  ? titleParts.slice(1).join("|").trim()
                  : "";

              const handleNavigate = () => navigate(`/project/${project.id}`);

              return (
                <div
                  key={idx}
                  className="project-card-item flex flex-col gap-3"
                >
                  {/* Image Showcase Container */}
                  <div
                    className="w-full aspect-[16/10] bg-surface-container-high rounded-xl border border-outline/10 relative overflow-hidden shadow-md group cursor-pointer"
                    onClick={handleNavigate}
                  >
                    {projectImg ? (
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        src={projectImg}
                      />
                    ) : (
                      <div className="text-on-surface-variant font-body-lg flex items-center justify-center h-full">
                        No project image uploaded
                      </div>
                    )}

                    {/* Centered Floating Rectangle "View Project" Button on Hover */}
                    {projectImg && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 ease-out">
                        <span className="border border-black bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-widest px-6 py-3 rounded-none shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                          View Project
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Year Row */}
                  <div className="flex justify-between items-baseline border-b border-outline/20 pb-2 pt-1">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-primary tracking-tight cursor-pointer hover:text-secondary transition-colors"
                      onClick={handleNavigate}
                    >
                      {mainTitle}
                    </h3>
                    <span className="text-sm sm:text-base font-semibold text-on-surface-variant font-mono">
                      {project.year || "2025"}
                    </span>
                  </div>

                  {/* Subtitle / Sub-Name */}
                  {subtitle && (
                    <p
                      className="text-sm sm:text-base text-on-surface-variant font-medium -mt-1 leading-snug cursor-pointer hover:text-black transition-colors"
                      onClick={handleNavigate}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;
