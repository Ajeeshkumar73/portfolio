import Resume from "../assets/Resume/AJEESH KUMAR B S - Resume.pdf";

function Contact({ profile }) {



  return (
    <>
      <section
        class="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter pt-16 border-t border-outline/10"
        id="contact"
      >
        <div class="md:col-span-5 flex flex-col gap-6">
          <h3 class="font-headline-md text-headline-md text-primary">
            Get in touch
          </h3>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Currently open for new opportunities or exciting project
            collaborations. Whether you have a question or just want to say hi,
            I'll try my best to get back to you!
          </p>

          <div class="flex gap-4 mt-4">
            <a
              class="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
              href="http://linkedin.com/in/ajeesh-kumar-b-s-60978631a"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              class="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
              href="http://github.com/Ajeeshkumar73"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              class="w-24 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              title="View & Download Resume"
            >
              <span class="material-symbols-outlined">description</span> Resume
            </a>
          </div>
        </div>
        <div class="md:col-span-1"></div>
        <div class="md:col-span-6">
          {/* Direct Contact Info */}
          <div className="flex flex-col gap-4 mb-8">
            <a
              href="mailto:ajeeshkumarbs168@gmail.com"
              className="flex items-center gap-4 text-black hover:text-primary transition-colors duration-200 group"
            >
              <span className="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              <span className="font-body-md font-medium text-black">
                ajeeshkumarbs168@gmail.com
              </span>
            </a>

            <a
              href="https://wa.me/919567106498"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-black hover:text-primary transition-colors duration-200 group"
            >
              <span className="w-12 h-12 border border-outline/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.453 5.437 1.454 5.378 0 9.754-4.372 9.757-9.749.002-2.607-1.011-5.059-2.854-6.904C17.094 2.11 14.639.08 12.015.08c-5.385 0-9.761 4.374-9.764 9.751-.001 1.997.521 3.95 1.514 5.674l-.99 3.614 3.702-.971zm10.702-7.108c-.287-.144-1.696-.838-1.958-.934-.262-.096-.453-.144-.644.144-.191.288-.739.934-.906 1.125-.167.192-.334.215-.621.072-.288-.145-1.215-.448-2.313-1.43-.855-.763-1.433-1.706-1.6-1.994-.168-.288-.018-.444.126-.587.13-.129.288-.335.431-.503.144-.168.191-.288.287-.48.096-.192.048-.361-.024-.505-.072-.144-.644-1.554-.882-2.13-.232-.559-.469-.482-.644-.491-.167-.008-.359-.01-.55-.01s-.502.072-.765.361c-.263.288-1.004.982-1.004 2.396 0 1.415 1.028 2.784 1.171 2.977.144.192 2.023 3.088 4.901 4.331.685.296 1.219.473 1.637.605.689.219 1.316.188 1.812.114.553-.082 1.696-.693 1.935-1.362.24-.669.24-1.24.167-1.362-.072-.12-.262-.191-.55-.335z" />
                </svg>
              </span>
              <span className="font-body-md font-medium text-black">
                +91 9567106498
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
