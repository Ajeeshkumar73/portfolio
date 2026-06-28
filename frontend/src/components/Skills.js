function Skills({ profile }) {
  const getSkillsForCategory = (category, defaultSkills) => {
    if (profile && profile.skillCategory === category && profile.skills) {
      return profile.skills.split(",").map(s => s.trim()).filter(Boolean);
    }
    return defaultSkills;
  };

  const frontendSkills = getSkillsForCategory("Frontend", [
    "TensorFlow / PyTorch",
    "Scikit-learn",
    "LLM Integration",
    "LangChain"
  ]);

  const backendSkills = getSkillsForCategory("Backend", [
    "TensorFlow / PyTorch",
    "Scikit-learn",
    "LLM Integration",
    "LangChain"
  ]);

  const toolsSkills = getSkillsForCategory("Tools", [
    "TensorFlow / PyTorch",
    "Scikit-learn",
    "LLM Integration",
    "LangChain"
  ]);

  const aiMlSkills = getSkillsForCategory("AI & ML", [
    "TensorFlow / PyTorch",
    "Scikit-learn",
    "LLM Integration",
    "LangChain"
  ]);

  return (
    <>
      <section
        class="w-full flex flex-col gap-12 pt-16 border-t border-outline/10"
        id="skills"
      >
        <h3 class="font-headline-md text-headline-md text-primary">Skills</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/**Frontend */}
          <div class="border border-outline/10 p-8 flex flex-col gap-6 bg-tertiary-container text-on-tertiary hover:border-primary transition-colors duration-300">
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-outlined text-on-tertiary text-2xl"
                data-icon="web"
              >
                web
              </span>
              <h4 class="font-body-lg text-body-lg font-semibold">Frontend</h4>
            </div>
            <ul class="flex flex-col gap-3 font-body-md text-body-md text-surface-variant">
              {frontendSkills.map((skill, index) => (
                <li key={index} class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-on-tertiary rounded-full"></span>{" "}
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          {/**Backend */}
          <div class="border border-outline/10 p-8 flex flex-col gap-6 bg-tertiary-container text-on-tertiary hover:border-primary transition-colors duration-300">
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-outlined text-on-tertiary text-2xl"
                data-icon="dns"
              >
                dns
              </span>
              <h4 class="font-body-lg text-body-lg font-semibold">Backend</h4>
            </div>
            <ul class="flex flex-col gap-3 font-body-md text-body-md text-surface-variant">
              {backendSkills.map((skill, index) => (
                <li key={index} class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-on-tertiary rounded-full"></span>{" "}
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          {/**Tools*/}
          <div class="border border-outline/10 p-8 flex flex-col gap-6 bg-tertiary-container text-on-tertiary hover:border-primary transition-colors duration-300">
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-outlined text-on-tertiary text-2xl"
                data-icon="build"
              >
                build
              </span>
              <h4 class="font-body-lg text-body-lg font-semibold">Tools</h4>
            </div>
            <ul class="flex flex-col gap-3 font-body-md text-body-md text-surface-variant">
              {toolsSkills.map((skill, index) => (
                <li key={index} class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-on-tertiary rounded-full"></span>{" "}
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          {/**AI & ML */}
          <div class="border border-outline/10 p-8 flex flex-col gap-6 bg-tertiary-container text-on-tertiary hover:border-primary transition-colors duration-300">
            <div class="flex items-center gap-3">
              <span
                class="material-symbols-outlined text-on-tertiary text-2xl"
                data-icon="smart_toy"
              >
                smart_toy
              </span>
              <h4 class="font-body-lg text-body-lg font-semibold">AI & ML</h4>
            </div>
            <ul class="flex flex-col gap-3 font-body-md text-body-md text-surface-variant">
              {aiMlSkills.map((skill, index) => (
                <li key={index} class="flex items-center gap-2">
                  <span class="w-1 h-1 bg-on-tertiary rounded-full"></span>{" "}
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
