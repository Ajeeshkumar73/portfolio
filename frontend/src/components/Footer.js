function Footer() {
  return (
    <>
      <footer class="w-full py-16 px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface dark:bg-surface border-t border-outline/10 dark:border-outline-variant/10 max-w-container-max mx-auto">
        <div class="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
          © 2026 Ajeesh Kumar B S. All rights reserved. Built with React.js,
          Django, and Tailwind CSS.
        </div>
        <div class="flex flex-wrap justify-center gap-6">
          <a
            class="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant hover:text-black underline decoration-1 underline-offset-4 transition-colors duration-200"
            href="http://github.com/Ajeeshkumar73"
          >
            Github
          </a>
          <a
            class="font-caption text-caption text-on-surface-variant dark:text-on-surface-variant hover:text-black underline decoration-1 underline-offset-4 transition-colors duration-200"
            href="http://linkedin.com/in/ajeesh-kumar-b-s-60978631a"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
