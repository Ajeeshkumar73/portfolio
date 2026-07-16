function Certificate({ profile, loading }) {
  const hardcodedCertificates = [];

  const allCertificates = [];
  if (profile && profile.certificates && profile.certificates.length > 0) {
    profile.certificates.forEach((c) => {
      allCertificates.push({
        title: c.title || "Certification",
        name: c.name,
        from: c.from_org || "",
      });
    });
  } else if (profile && profile.certificateName) {
    // Fallback for legacy structure
    allCertificates.push({
      title: profile.certificationTitle || "Certification",
      name: profile.certificateName,
      from: profile.certificateFrom || "",
    });
  }

  if (allCertificates.length === 0) {
    allCertificates.push(...hardcodedCertificates);
  }

  return (
    <>
      <section
        class="w-full flex flex-col gap-12 pt-16 border-t border-outline/10"
        id="certs"
      >
        <h3 class="font-headline-md text-headline-md text-primary">
          Certificates
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 border border-outline/10 bg-surface/50 rounded-xl w-full min-h-[250px] gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></div>
              <div className="w-3.5 h-3.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></div>
              <div className="w-3.5 h-3.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            </div>
            <p className="font-label-mono text-xs text-on-surface-variant/80 tracking-widest uppercase animate-pulse">
              Loading certificates from Render API...
            </p>
          </div>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {allCertificates.map((cert, idx) => (
              <div
                key={idx}
                class="border border-outline/10 p-8 flex flex-col gap-4 bg-surface hover:border-primary/50 transition-colors duration-300"
              >
                <span class="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
                  {cert.title}
                </span>
                <h4 class="font-body-lg text-body-lg text-primary font-semibold">
                  {cert.name}
                </h4>
                <p class="font-body-md text-body-md text-on-surface-variant">
                  {cert.from}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Certificate;
