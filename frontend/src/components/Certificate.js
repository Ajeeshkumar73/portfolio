

function Certificate({ profile }) {
  const hardcodedCertificates = [
    {
      title: "Cloud Architecture",
      name: "AWS Certified Solutions Architect",
      from: "Amazon Web Services"
    },
    {
      title: "Machine Learning",
      name: "Google Professional Machine Learning Engineer",
      from: "Google Cloud"
    },
    {
      title: "Deep Learning",
      name: "DeepLearning.AI TensorFlow Developer",
      from: "Coursera / DeepLearning.AI"
    }
  ];

  const allCertificates = [];
  if (profile && profile.certificateName) {
    allCertificates.push({
      title: profile.certificationTitle || "Certification",
      name: profile.certificateName,
      from: profile.certificateFrom || ""
    });
  }
  allCertificates.push(...hardcodedCertificates);

  return (
    <>
      <section class="w-full flex flex-col gap-12 pt-16 border-t border-outline/10" id="certificates">
        <h3 class="font-headline-md text-headline-md text-primary">Certificates</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {allCertificates.map((cert, idx) => (
            <div key={idx} class="border border-outline/10 p-8 flex flex-col gap-4 bg-surface hover:border-primary/50 transition-colors duration-300">
              <span class="font-label-mono text-label-mono uppercase tracking-widest text-secondary">{cert.title}</span>
              <h4 class="font-body-lg text-body-lg text-primary font-semibold">{cert.name}</h4>
              <p class="font-body-md text-body-md text-on-surface-variant">{cert.from}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Certificate
