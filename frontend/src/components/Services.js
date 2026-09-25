import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side entrance
      gsap.fromTo(
        ".services-left",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Service items animate one by one as each scrolls into view
      const items = gsap.utils.toArray(".service-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  const servicesList = [
    {
      icon: "✦",
      title: "Custom Website Development",
      description:
        "Building tailored, highly responsive, modern websites designed to meet your specific business or personal requirements with high performance and pixel-perfect UI.",
    },
    {
      icon: "✦",
      title: "College & Academic Projects",
      description:
        "Assisting in end-to-end development of college, mini, and final-year main projects with clean architecture, clear documentation, and modern tech stacks.",
    },
    {
      icon: "✦",
      title: "LLM & AI Integrated Websites",
      description:
        "Embedding state-of-the-art LLM APIs (OpenAI, Gemini), intelligent chatbots, smart search, and AI-driven automation directly into web applications.",
    },
    {
      icon: "✦",
      title: "Full Stack Development",
      description:
        "Building responsive, modern, and high-performing web applications using Python, Django, Flask, React, and JavaScript with seamless frontend-backend integration.",
    },
    {
      icon: "✦",
      title: "AI & Machine Learning",
      description:
        "Developing AI-powered applications using deep learning models, NLP, LLM APIs, and intelligent automation to turn complex data into actionable insights.",
    },
    {
      icon: "✦",
      title: "Backend & REST APIs",
      description:
        "Designing secure REST APIs, authentication systems, database architecture, and scalable backend services using Django, Flask, and MongoDB.",
    },
  ];

  return (
    <section
      ref={servicesRef}
      className="w-full pt-16 border-t border-outline/10 relative"
      id="services"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Column - Sticky until right column finishes scrolling */}
        <div className="services-left md:col-span-5 flex flex-col gap-6 md:sticky md:top-28 self-start">
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            What I Offer
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed">
            I provide modern web solutions including full-stack development,
            AI-powered applications, machine learning integrations, and
            user-focused designs. Each service is tailored to meet your goals
            and create an impactful digital presence.
          </p>
        </div>

        {/* Right Column - Scrolls through service items */}
        <div className="services-right md:col-span-7 flex flex-col">
          {servicesList.map((service, idx) => (
            <div
              key={idx}
              className="service-item group relative flex items-start gap-[18px] py-8 border-t border-outline/20 last:border-b transition-colors duration-200"
            >
              <div className="service-icon text-[18px] text-primary flex-shrink-0 mt-[3px] transition-transform duration-300 ease-out group-hover:rotate-45">
                {service.icon}
              </div>
              <div className="service-content flex-1">
                <h3 className="service-name text-[20px] font-semibold tracking-[-0.02em] text-primary mb-2.5">
                  {service.title}
                </h3>
                <p className="service-desc font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Animated Black Flow Border on Hover / Hold - Slowed down flow */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-750 ease-in-out group-hover:w-full pointer-events-none" style={{ transitionDuration: "750ms" }}></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
