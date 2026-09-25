import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Certificate({ profile, loading }) {
  const containerRef = useRef(null);

  const hardcodedCertificates = [
    {
      title: "Python Programming",
      name: "Software Programmer - Python",
      from: "IT-ITeS SSC NASSCOM, 2024",
    },
    {
      title: "Data Analytics",
      name: "Data Analytics",
      from: "IT-ITeS SSC NASSCOM, 2025",
    },
    {
      title: "Cloud Computing",
      name: "Cloud Computing",
      from: "NPTEL, 2025",
    },
  ];

  const allCertificates = hardcodedCertificates;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="w-full flex flex-col gap-12 pt-16 border-t border-outline/10 overflow-hidden"
        id="certs"
      >
        <h3 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
          Certificates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {allCertificates.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card border border-black/20 p-8 flex flex-col gap-4 bg-white rounded-none shadow-sm hover:shadow-xl hover:border-black transition-all duration-300"
            >
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary font-semibold">
                {cert.title}
              </span>
              <h4 className="font-body-lg text-body-lg text-primary font-bold">
                {cert.name}
              </h4>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {cert.from}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Certificate;
