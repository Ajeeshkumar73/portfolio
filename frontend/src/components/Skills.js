import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Skills({ profile }) {
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side entrance
      gsap.fromTo(
        ".skills-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Skill rows staggered entrance on scroll
      const rows = gsap.utils.toArray(".skill-row");
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      name: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript"],
    },
    {
      name: "Frameworks & Libraries",
      skills: ["React.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      name: "Backend & Languages",
      skills: ["Python", "C", "Django", "Flask", "REST APIs"],
    },
    {
      name: "Databases",
      skills: ["MySQL", "MongoDB", "SQLite"],
    },
    {
      name: "AI & Machine Learning",
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "LLM Integration",
        "Scikit-Learn",
        "NLP",
      ],
    },
    {
      name: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Figma", "AI Tools"],
    },
    {
      name: "Deployment",
      skills: ["Vercel", "Render", "Github Pages"],
    },
  ];

  return (
    <section
      ref={skillsRef}
      className="w-full pt-16 border-t border-outline/10 relative"
      id="skills"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Column - Sticky Header & Description */}
        <div className="skills-left md:col-span-5 flex flex-col gap-6 md:sticky md:top-28 self-start">
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Tech Stack
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed">
            I utilize a wide range of cutting-edge technologies to create fast,
            responsive, and interactive websites that deliver exceptional user
            experiences. Here's the toolkit that powers my work.
          </p>
        </div>

        {/* Right Column - Categorized Rows with Rectangular Border Pills */}
        <div className="skills-right md:col-span-7 flex flex-col">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="skill-row group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-outline/20 last:border-b transition-colors duration-200"
            >
              <h3 className="text-[19px] sm:text-[20px] font-semibold text-primary tracking-[-0.01em]">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2.5 items-center justify-start sm:justify-end">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="border border-outline/30 bg-white text-black text-sm sm:text-base font-medium px-3.5 py-1.5 rounded hover:border-black hover:bg-black hover:text-white transition-all duration-200 cursor-default shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Animated Black Flow Border on Hover */}
              <span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-750 ease-in-out group-hover:w-full pointer-events-none"
                style={{ transitionDuration: "750ms" }}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
