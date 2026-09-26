import { useEffect, useRef } from "react";
import gsap from "gsap";
import Profile_pic from "../assets/profile_pic.jpeg";

function HeroSection({ profile }) {
  const heroRef = useRef(null);
  const imageSrc =
    profile && profile.profilePic ? profile.profilePic : Profile_pic;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(".hero-subtext", { y: "-20px", opacity: 0 });
      gsap.set(".hero-title-text", { y: "30px", opacity: 0 });
      gsap.set(".hero-img-container", { x: "-40px", opacity: 0 });
      gsap.set(".hero-right-content", { x: "40px", opacity: 0 });
      gsap.set(".hero-img", { scale: 1.1 });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.to(".hero-subtext", {
        y: "0px",
        opacity: 1,
        duration: 0.8,
      })
        .to(
          ".hero-title-text",
          {
            y: "0px",
            opacity: 1,
            duration: 1.0,
          },
          "-=0.6",
        )
        .to(
          ".hero-img-container",
          {
            x: "0px",
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .to(
          ".hero-right-content",
          {
            x: "0px",
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.9",
        )
        .to(
          ".hero-img",
          {
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
          },
          "-=1.1",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="w-full flex flex-col gap-8 pt-8 pb-7 relative"
        id="hero"
      >
        {/* Top Subtext and Large Title */}
        <div className="flex flex-col gap-3 w-full">
          <span className="hero-subtext font-label-mono text-label-mono uppercase tracking-widest text-secondary font-semibold">
            Hello, I am Ajeesh Kumar B S
          </span>
          <h1 className="hero-title-text font-headline-lg text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-black tracking-tight leading-[1.08] w-full">
            Full Stack &amp; Web Developer
          </h1>
        </div>

        {/* 2-Column Split: B&W Image on Left, Paragraph + My Services on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch w-full mt-2">
          {/* Left: Black & White Photo */}
          <div className="hero-img-container md:col-span-6 relative flex flex-col justify-center">
            <div className="w-full aspect-[16/10] bg-surface-container-high border border-outline/10 relative overflow-hidden flex items-center justify-center rounded-xl shadow-sm">
              <img
                alt="Professional headshot"
                className="hero-img w-full h-full object-cover rounded-xl filter grayscale"
                style={{ filter: "grayscale(100%)" }}
                data-alt="A professional headshot of Ajeesh Kumar B S"
                src={imageSrc}
              />
              <div className="absolute inset-0 border border-primary/10 pointer-events-none rounded-xl"></div>
            </div>
          </div>

          {/* Right: Paragraph Description + Bottom Right My Services Link */}
          <div className="hero-right-content md:col-span-6 flex flex-col justify-between pt-1">
            <p className="font-body-lg text-[17px] sm:text-[18px] text-on-surface-variant leading-[1.75]">
              I'm a passionate Full Stack Developer and Web Developer dedicated
              to building modern, responsive, and user-friendly web
              applications. With expertise in both frontend and backend
              technologies, I create scalable digital solutions that combine
              clean design, efficient functionality, and seamless user
              experiences.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" style={{ bottom: "-50px" }}>
          <div className="mouse"></div>
          <span>Scroll Down</span>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
