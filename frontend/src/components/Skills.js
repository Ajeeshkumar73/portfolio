function Skills({ profile }) {
  // Helper to map skill names to skillicons slugs
  const skillToSlug = (skillName) => {
    const name = skillName.trim().toLowerCase();
    const mapping = {
      javascript: "js",
      typescript: "ts",
      python: "py",
      "c++": "cpp",
      "c#": "cs",
      react: "react",
      "react.js": "react",
      reactjs: "react",
      node: "nodejs",
      "node.js": "nodejs",
      nodejs: "nodejs",
      "next.js": "nextjs",
      nextjs: "nextjs",
      "vue.js": "vue",
      vuejs: "vue",
      vue: "vue",
      angular: "angular",
      angularjs: "angular",
      tailwind: "tailwind",
      tailwindcss: "tailwind",
      "tailwind css": "tailwind",
      bootstrap: "bootstrap",
      sass: "sass",
      scss: "sass",
      html: "html",
      html5: "html",
      css: "css",
      css3: "css",
      django: "django",
      flask: "flask",
      fastapi: "fastapi",
      "spring boot": "spring",
      springboot: "spring",
      spring: "spring",
      laravel: "laravel",
      express: "express",
      "express.js": "express",
      expressjs: "express",
      mongodb: "mongodb",
      mongo: "mongodb",
      postgresql: "postgres",
      postgres: "postgres",
      mysql: "mysql",
      sqlite: "sqlite",
      redis: "redis",
      graphql: "graphql",
      apollo: "apollo",
      docker: "docker",
      kubernetes: "kubernetes",
      k8s: "kubernetes",
      aws: "aws",
      gcp: "gcp",
      azure: "azure",
      firebase: "firebase",
      git: "git",
      github: "github",
      gitlab: "gitlab",
      bitbucket: "bitbucket",
      figma: "figma",
      postman: "postman",
      vscode: "vscode",
      "vs code": "vscode",
      npm: "npm",
      yarn: "yarn",
      pnpm: "pnpm",
      vite: "vite",
      webpack: "webpack",
      babel: "babel",
      tensorflow: "tensorflow",
      pytorch: "pytorch",
      "scikit-learn": "sklearn",
      scikitlearn: "sklearn",
      sklearn: "sklearn",
      opencv: "opencv",
      pandas: "pandas",
      numpy: "numpy",
      c: "c",
      java: "java",
      kotlin: "kotlin",
      swift: "swift",
      dart: "dart",
      flutter: "flutter",
      linux: "linux",
      ubuntu: "ubuntu",
      windows: "windows",
      apple: "apple",
      android: "android",
      nginx: "nginx",
      heroku: "heroku",
      vercel: "vercel",
      netlify: "netlify",
      jenkins: "jenkins",
      "github actions": "githubactions",
      githubactions: "githubactions",
      jupyter: "jupyter",
      "jupyter notebook": "jupyter",
      jupyternotebook: "jupyter",
      excel: "excel",
      "microsoft excel": "excel",
      "ms excel": "excel",
    };

    if (mapping[name]) return mapping[name];
    return name.replace(/[^a-z0-9]/g, "");
  };

  const getSkillsForCategory = (fieldValue, defaultSkills) => {
    if (fieldValue) {
      return fieldValue
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return defaultSkills;
  };

  const frontendSkills = getSkillsForCategory(profile?.frontendSkills, [
    "React",
    "Tailwind",
    "Bootstrap",
    "HTML5",
    "CSS3",
    "JavaScript",
  ]);

  const backendSkills = getSkillsForCategory(profile?.backendSkills, [
    "Python",
    "PHP",
    "C",
    "JavaScript",
    "Django",
    "Flask",
  ]);

  const databaseSkills = getSkillsForCategory(profile?.databaseSkills, [
    "MySQL",
    "MongoDB",
    "SQLite",
  ]);

  const toolsSkills = getSkillsForCategory(profile?.toolsSkills, [
    "Git",
    "GitHub",
    "VS Code",
    "Jupyter Notebook",
    "Excel",
  ]);

  const otherSkillsList = profile?.otherSkills
    ? profile.otherSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        "REST APIs",
        "MVC Architecture",
        "Data Structures",
        "Algorithms",
        "OOP",
        "DBMS",
      ];

  const renderSkillIconCard = (title, skillsList) => {
    return (
      <div className="bg-white shadow-md border border-outline/10 p-8 flex flex-col gap-6 hover:border-primary transition-all duration-300 rounded-lg">
        <h4 className="font-body-lg text-body-lg font-bold tracking-wider uppercase text-black flex items-center gap-2">
          {title}
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillsList.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-surface-container transition-colors duration-200 w-full"
            >
              <img
                src={`https://skillicons.dev/icons?i=${skillToSlug(skill)}`}
                alt={skill}
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-200"
              />
              <span className="text-[11px] sm:text-xs font-semibold text-on-surface-variant text-center max-w-full leading-tight">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        className="w-full flex flex-col gap-12 pt-16 border-t border-outline/10"
        id="skills"
      >
        <h3 className="font-headline-md text-headline-md text-primary">
          Skills
        </h3>

        {/* Modern 2x2 Grid representing the Table layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {renderSkillIconCard("Frontend & Libraries", frontendSkills)}
          {renderSkillIconCard("Languages & Backend", backendSkills)}
          {renderSkillIconCard("Databases", databaseSkills)}
          {renderSkillIconCard("Tools & Platforms", toolsSkills)}
        </div>

        {/* Bottom Section: Other Skills */}
        {otherSkillsList.length > 0 && (
          <div className="bg-white shadow-md border border-outline/10 p-8 flex flex-col items-center justify-center text-center gap-6 hover:border-primary transition-all duration-300 rounded-lg w-full">
            <h4 className="font-body-lg text-body-lg font-bold tracking-wider uppercase text-black">
              Other Skills
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-4xl text-body-md text-on-surface-variant font-medium">
              {otherSkillsList.map((skill, index) => (
                <span key={index} className="flex items-center">
                  <code className="bg-surface-container px-3 py-1 rounded text-primary border border-outline/5 text-sm font-mono">
                    {skill}
                  </code>
                  {index < otherSkillsList.length - 1 && (
                    <span className="text-secondary ml-3 text-lg font-bold">
                      •
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Skills;
