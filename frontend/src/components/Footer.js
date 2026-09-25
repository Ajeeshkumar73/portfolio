function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full border-t border-white/10 py-8 px-6 md:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 w-full max-w-container-max mx-auto">
        {/* Left Side: Copyright */}
        <span className="text-xs font-mono uppercase tracking-widest text-white/50">
          © {new Date().getFullYear()} Ajeesh Kumar B S
        </span>

        {/* Right Side: GitHub, LinkedIn & Back to Top Button grouped together */}
        <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end">
          <a
            className="font-label-mono text-xs uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-4 transition-colors duration-200"
            href="http://github.com/Ajeeshkumar73"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="font-label-mono text-xs uppercase tracking-widest text-white/60 hover:text-white underline underline-offset-4 transition-colors duration-200"
            href="http://linkedin.com/in/ajeesh-kumar-b-s-60978631a"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 font-label-mono text-xs uppercase tracking-widest cursor-pointer sm:ml-2"
            title="Scroll Back to Top"
          >
            Back to Top
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
