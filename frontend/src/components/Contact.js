import { useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/portfolio/contact/`, formData);

      alert("Message Sent!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      alert("Failed to send message.\n\n" + (serverMsg || err.message));
    }
  };

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
            {profile && profile.resume && (
              <a
                class="w-24 h-12 border border-outline/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                title="View & Download Resume"
              >
                <span class="material-symbols-outlined">description</span>{" "}
                Resume
              </a>
            )}
          </div>
        </div>
        <div class="md:col-span-1"></div>
        <div class="md:col-span-6">
          <form onSubmit={sendMessage} class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="font-label-mono text-label-mono uppercase text-on-surface-variant">
                Name
              </label>
              <input
                class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors"
                placeholder="John Doe"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-label-mono text-label-mono uppercase text-on-surface-variant">
                Email
              </label>
              <input
                class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors"
                placeholder="john@example.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div class="flex flex-col gap-2 mt-4">
              <label class="font-label-mono text-label-mono uppercase text-on-surface-variant">
                Message
              </label>
              <textarea
                class="w-full bg-transparent border-0 border-b border-outline/20 focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-primary placeholder-outline/40 transition-colors resize-none"
                placeholder="How can we work together?"
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              class="mt-4 bg-primary text-on-primary px-8 py-4 rounded-none hover:bg-accent transition-colors duration-200 font-label-mono text-label-mono uppercase tracking-widest self-start"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
