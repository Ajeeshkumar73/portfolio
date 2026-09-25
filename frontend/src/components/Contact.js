import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Resume from "../assets/Resume/AJEESH KUMAR B S.pdf";

gsap.registerPlugin(ScrollTrigger);

function Contact({ profile }) {
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={contactRef}
        className="w-full flex flex-col gap-12 pt-16 pb-16 border-t border-white/10 relative"
        id="contact"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full">
          <div className="md:col-span-5 flex flex-col gap-6 contact-animate">
            <h3 className="font-headline-md text-headline-md text-white font-bold">
              Get in touch
            </h3>
            <p className="font-body-lg text-body-lg text-white/70">
              Currently open for new opportunities or exciting project
              collaborations. Whether you have a question or just want to say
              hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                href="http://linkedin.com/in/ajeesh-kumar-b-s-60978631a"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                href="http://github.com/Ajeeshkumar73"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                className="w-28 h-12 border border-white/20 flex items-center justify-center gap-2 text-white hover:bg-white hover:text-black transition-colors font-label-mono text-label-mono uppercase tracking-widest"
                href={Resume}
                target="_blank"
                rel="noopener noreferrer"
                title="View & Download Resume"
              >
                <span className="material-symbols-outlined">description</span>{" "}
                Resume
              </a>
            </div>
          </div>

          <div className="md:col-span-1"></div>

          <div className="md:col-span-6 flex flex-col justify-between contact-animate">
            {/* Direct Contact Info */}
            <div className="flex flex-col gap-4 mb-8">
              <a
                href="mailto:ajeeshkumarbs168@gmail.com"
                className="flex items-center gap-4 text-white hover:text-white/70 transition-colors duration-200 group"
              >
                <span className="w-12 h-12 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <span className="font-body-lg font-medium text-white">
                  ajeeshkumarbs168@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
