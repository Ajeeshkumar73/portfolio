function About({ profile }) {
  return (
    <>
      <section
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter pt-16 border-t border-outline/10"
        id="about"
      >
        <div className="md:col-span-6 flex flex-col gap-6">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">
            About Me
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            I am an MCA graduate and a passionate Full Stack Developer with
            experience in developing modern web applications and intelligent
            software solutions. Throughout my academic journey and freelance
            projects, I have successfully designed and developed a variety of
            web-based systems, ranging from responsive websites to full-stack
            applications integrated with Artificial Intelligence (AI), Machine
            Learning (ML), and Deep Learning technologies.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            My expertise spans both frontend and backend development, enabling
            me to build scalable, secure, and user-friendly applications from
            concept to deployment. I enjoy solving real-world problems by
            combining software engineering principles with data-driven
            technologies to create innovative and impactful solutions.
          </p>

        </div>
        <div className="md:col-span-1"></div>
        <div className="md:col-span-5 flex flex-col gap-6">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">
            Education
          </h3>
          <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-outline/20">
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-background border-2 border-primary rounded-full"></div>
              <h4 className="font-body-lg text-body-lg text-primary font-semibold">
                Master of Computer Applications
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                APJ Abdul Kalam Technological University
              </p>
              <span className="font-label-mono text-label-mono text-secondary block mt-1">
                2024 - 2026
              </span>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-background border-2 border-outline/40 rounded-full"></div>
              <h4 className="font-body-lg text-body-lg text-primary font-semibold">
                B.Sc. in Computer Science
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                University of Kerala
              </p>
              <span className="font-label-mono text-label-mono text-secondary block mt-1">
                2021 - 2024
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
