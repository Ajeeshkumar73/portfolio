

import { useState } from "react";

function Projects({ profile }) {
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0
  });

  const hardcodedProjects = [
    {
      title: "NeuroAnalytics Platform",
      description: "A predictive analytics dashboard leveraging machine learning to forecast market trends. Built with a scalable microservices architecture to process real-time data streams.",
      tech: ["NextJS", "Python", "TensorFlow"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0lcbxuklA_GFYTES2yrgwlItR7hoYLbXCFbQfxkm_3KnOvAsuTIQyh8tb6A7SogZV4GtIKiseUBO1iQeD96c0MMMKMWNNvkwMMu_NDETp2-8dWb0FKBnw0a6dIlrGZiYmywZ4QW_zb8uJXBcEHKYg4V0yzkXfG6uLD1VBC8-T6w9DCzV1_Deonx00ZZv7Jjr3iwlTcW7OBA5SDuII9Y4SsxW34CTAUIJIQfB98pdyVpLsxFFZfOPeQs8EFlcaAiqvzhJEqU5ZDRpj",
      images: [],
      url: "#"
    },
    {
      title: "IntelliAPI Gateway",
      description: "An intelligent API gateway that dynamically routes requests based on payload sentiment and origin, utilizing lightweight NLP models at the edge.",
      tech: ["NodeJS", "Docker", "PyTorch"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp94_XNvXrJy7dXKE_KIwbX-WNUaFOTAVufC8Y1rFIsEjL_IqPMT9ZSGujDJ-FxT14R_vbh2XLQSEqBEkpTh8ed51h2Wp0P5Qe8RQ0DHeD35LlRGWd4Uhcr9nd-E-eBllCJVZMjwEFBE8nFChSLe8rubFPQDsDruxMZW4cIb95F-TJ22lyLM410WpK8xR2aRmOD7E1RtAxXzAZUF4APd0X28N5zEYLpjeZHf2rYE5ZfIwvGOIMOEA4Z7-3R4xNQdS_gJlUnYJAd4xr",
      images: [],
      url: "#"
    }
  ];

  const allProjects = [];
  if (profile && profile.projectTitle) {
    allProjects.push({
      title: profile.projectTitle,
      description: profile.projectDescription,
      tech: profile.projectTech ? profile.projectTech.split(",").map(t => t.trim()).filter(Boolean) : [],
      image: profile.projectImage,
      images: profile.images || [],
      url: profile.projectUrl || "#"
    });
  }
  allProjects.push(...hardcodedProjects);

  const getProjectImagesList = (project) => {
    const list = [];
    if (project.image) {
      list.push(project.image);
    }
    if (project.images && project.images.length > 0) {
      project.images.forEach(imgObj => {
        const url = typeof imgObj === "object" ? imgObj.image : imgObj;
        if (url && !list.includes(url)) {
          list.push(url);
        }
      });
    }
    return list;
  };

  const openLightbox = (imagesList, index) => {
    setLightbox({
      isOpen: true,
      images: imagesList,
      currentIndex: index
    });
  };

  return (
    <>
      <section class="w-full flex flex-col gap-12 pt-16 border-t border-outline/10" id="projects">
        <div class="flex justify-between items-end">
          <h3 class="font-headline-md text-headline-md text-primary">Selected Work</h3>
          <div class="flex gap-2">
            <button class="w-10 h-10 border border-outline/20 flex items-center justify-center text-primary hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </button>
            <button class="w-10 h-10 border border-outline/20 flex items-center justify-center text-primary hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {allProjects.map((project, idx) => {
            const imagesList = getProjectImagesList(project);
            return (
              <div key={idx} class="border border-outline/10 bg-surface flex flex-col group cursor-pointer hover:border-primary/30 transition-colors">
                <div 
                  class="w-full aspect-video bg-surface-container-high relative overflow-hidden flex items-center justify-center"
                  onClick={() => {
                    if (imagesList.length > 0) {
                      openLightbox(imagesList, 0);
                    }
                  }}
                >
                  {project.image ? (
                    <img
                      alt={project.title}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={project.image}
                    />
                  ) : (
                    <div className="text-on-surface-variant font-body-md">No project image uploaded</div>
                  )}
                </div>

                {/* Additional Images / Thumbnails */}
                {imagesList.length > 1 && (
                  <div className="flex gap-2 px-8 pt-4 overflow-x-auto">
                    {imagesList.map((imgUrl, thumbIdx) => (
                      <div 
                        key={thumbIdx} 
                        className="w-20 aspect-video rounded border border-outline/15 overflow-hidden cursor-pointer hover:border-primary transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(imagesList, thumbIdx);
                        }}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${thumbIdx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <div class="p-8 flex flex-col gap-4">
                  <h4 class="font-headline-md text-headline-md text-primary">{project.title}</h4>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    {project.description}
                  </p>
                  <div class="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} class="bg-surface-container px-3 py-1 font-label-mono text-label-mono text-on-surface-variant">
                        #{t}
                      </span>
                    ))}
                  </div>
                  {project.url && project.url !== "#" && (
                    <div className="mt-4">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline font-medium inline-flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit Project →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 transition-all duration-300"
          onClick={() => setLightbox({ ...lightbox, isOpen: false })}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox({ ...lightbox, isOpen: false });
            }}
          >
            <span className="material-symbols-outlined block text-3xl">close</span>
          </button>

          {/* Main Image Container */}
          <div className="relative max-w-5xl max-h-[80vh] w-full flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightbox.images[lightbox.currentIndex]} 
              alt="Expanded view" 
              className="max-w-full max-h-[80vh] object-contain border border-white/10 shadow-2xl rounded-lg"
            />

            {/* Left Nav Button */}
            {lightbox.images.length > 1 && (
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({
                    ...lightbox,
                    currentIndex: (lightbox.currentIndex - 1 + lightbox.images.length) % lightbox.images.length
                  });
                }}
              >
                <span className="material-symbols-outlined block text-3xl">arrow_back</span>
              </button>
            )}

            {/* Right Nav Button */}
            {lightbox.images.length > 1 && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({
                    ...lightbox,
                    currentIndex: (lightbox.currentIndex + 1) % lightbox.images.length
                  });
                }}
              >
                <span className="material-symbols-outlined block text-3xl">arrow_forward</span>
              </button>
            )}
          </div>

          {/* Indicator Info */}
          <div className="mt-4 text-white/60 font-body-md bg-black/40 px-3 py-1 rounded-full">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </div>
        </div>
      )}
    </>
  );
}

export default Projects
