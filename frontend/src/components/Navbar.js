function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline/10 dark:border-outline-variant/10 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center w-full max-w-container-max mx-auto h-20 px-margin-mobile md:px-margin-desktop">
          <div className="font-headline-md text-headline-md font-bold tracking-tight text-black">
            AK .
          </div>
          <div className="hidden md:flex items-center gap-gutter">
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-black transition-colors font-body-md text-body-md"
              href="#about"
            >
              About
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-black transition-colors font-body-md text-body-md"
              href="#skills"
            >
              Skills
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-black transition-colors font-body-md text-body-md"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-black transition-colors font-body-md text-body-md"
              href="#certs"
            >
              Certs.
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-black transition-colors font-body-md text-body-md"
              href="#contact"
            >
              Contact
            </a>
          </div>
          <a href="#contact">
            <button
              href="#contact"
              className="hidden md:block bg-primary text-on-primary px-6 py-2 rounded-none hover:bg-accent hover:text-on-secondary transition-colors duration-200 font-label-mono text-label-mono uppercase tracking-widest"
            >
              Hire Me
            </button>
          </a>
          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined" data-icon="menu">
              menu
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
