import Profile_pic from "../assets/profile_pic.png";

function HeroSection({ profile }) {
  const imageSrc =
    profile && profile.profilePic ? profile.profilePic : Profile_pic;

  return (
    <>
      <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center pt-6 pb-16 relative">
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
            Hello, I am
          </span>
          <h1 className="font-display text-display text-primary">
            Ajeesh Kumar B S.
          </h1>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface-variant">
            Full Stack &amp; Web Developer
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
            I am a passionate Full Stack Developer and Web Developer dedicated
            to building modern, responsive, and user-friendly web applications.
            With expertise in both frontend and backend technologies, I create
            scalable digital solutions that combine clean design, efficient
            functionality, and seamless user experiences. I enjoy transforming
            ideas into impactful web products that solve real-world problems.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#projects">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-none hover:bg-accent transition-colors duration-200 font-label-mono text-label-mono uppercase tracking-widest border border-primary">
                View Projects
              </button>
            </a>
            <a href="#contact">
              <button className="bg-transparent text-primary px-8 py-4 rounded-none hover:bg-surface-container transition-colors duration-200 font-label-mono text-label-mono uppercase tracking-widest border border-primary/20">
                Contact Me
              </button>
            </a>
          </div>
        </div>
        <div className="md:col-span-5 flex justify-end mt-12 md:mt-0 relative">
          <div className="w-full aspect-[4/5] bg-surface-container-high border border-outline/10 relative overflow-hidden flex items-center justify-center">
            <img
              alt="Professional headshot"
              className="w-full h-full object-cover"
              data-alt="A professional headshot of a confident male software developer in his late 20s. He is wearing a crisp, dark minimalist shirt and looking directly at the camera with a subtle, professional smile. The background is a clean, bright studio setting with soft, high-key lighting that emphasizes a modern, light-mode aesthetic. The image is high-contrast with deep blacks and pristine whites, fitting a sophisticated, classic-modern portfolio design."
              src={imageSrc}
            />
            <div className="absolute inset-0 border border-primary/10 pointer-events-none"></div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
          <span>Scroll Down</span>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
