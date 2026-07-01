import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    profilePic: null,
    resume: null,
    skillCategory: "Frontend",
    skills: "",
    frontendSkills: "",
    backendSkills: "",
    databaseSkills: "",
    toolsSkills: "",
    aiMlSkills: "",
    otherSkills: "",
    projectTitle: "",
    projectDescription: "",
    projectTech: "",
    projectUrl: "",
    projectImage: null,
    certificationTitle: "",
    certificateName: "",
    certificateFrom: "",
    images: [],
    projects: [],
    certificates: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth !== "true") {
      navigate("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/portfolio/profile/`);
        const data = response.data;
        setProfile({
          profilePic: data.profilePic || null,
          resume: data.resume || null,
          skillCategory: data.skillCategory || "Frontend",
          skills: data.skills || "",
          frontendSkills: data.frontendSkills || "",
          backendSkills: data.backendSkills || "",
          databaseSkills: data.databaseSkills || "",
          toolsSkills: data.toolsSkills || "",
          aiMlSkills: data.aiMlSkills || "",
          otherSkills: data.otherSkills || "",
          projectTitle: data.projectTitle || "",
          projectDescription: data.projectDescription || "",
          projectTech: data.projectTech || "",
          projectUrl: data.projectUrl || "",
          projectImage: data.projectImage || null,
          certificationTitle: data.certificationTitle || "",
          certificateName: data.certificateName || "",
          certificateFrom: data.certificateFrom || "",
          images: data.images || [],
          projects: (data.projects || []).map(p => ({
            ...p,
            newGalleryImages: [],
            deleteGalleryImages: [],
            isDeleted: false
          })),
          certificates: (data.certificates || []).map(c => ({
            ...c,
            isDeleted: false
          })),
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.files[0] });
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signin");
  };

  // Projects handlers
  const handleAddProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: null,
          title: "",
          description: "",
          tech: "",
          url: "",
          image: null,
          images: [],
          newGalleryImages: [],
          deleteGalleryImages: [],
          isDeleted: false,
          tempKey: Date.now() + Math.random()
        }
      ]
    }));
  };

  const handleProjectFieldChange = (index, fieldName, value) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [fieldName]: value };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectFileChange = (index, e) => {
    const file = e.target.files[0];
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], image: file };
      return { ...prev, projects: updated };
    });
  };

  const handleProjectGalleryChange = (index, e) => {
    const files = Array.from(e.target.files);
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[index] = {
        ...updated[index],
        newGalleryImages: [...(updated[index].newGalleryImages || []), ...files]
      };
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveNewGalleryImage = (index, fileIdx) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[index].newGalleryImages = updated[index].newGalleryImages.filter((_, i) => i !== fileIdx);
      return { ...prev, projects: updated };
    });
  };

  const handleToggleDeleteExistingGalleryImage = (projIndex, imgId) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      const project = updated[projIndex];
      const deleteList = project.deleteGalleryImages || [];
      if (deleteList.includes(imgId)) {
        project.deleteGalleryImages = deleteList.filter(id => id !== imgId);
      } else {
        project.deleteGalleryImages = [...deleteList, imgId];
      }
      return { ...prev, projects: updated };
    });
  };

  const handleRemoveProject = (index) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      if (updated[index].id) {
        updated[index].isDeleted = true;
      } else {
        updated.splice(index, 1);
      }
      return { ...prev, projects: updated };
    });
  };

  // Certificates handlers
  const handleAddCertificate = () => {
    setProfile(prev => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          id: null,
          title: "",
          name: "",
          from_org: "",
          isDeleted: false,
          tempKey: Date.now() + Math.random()
        }
      ]
    }));
  };

  const handleCertificateFieldChange = (index, fieldName, value) => {
    setProfile(prev => {
      const updated = [...prev.certificates];
      updated[index] = { ...updated[index], [fieldName]: value };
      return { ...prev, certificates: updated };
    });
  };

  const handleRemoveCertificate = (index) => {
    setProfile(prev => {
      const updated = [...prev.certificates];
      if (updated[index].id) {
        updated[index].isDeleted = true;
      } else {
        updated.splice(index, 1);
      }
      return { ...prev, certificates: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      if (key !== "images" && key !== "projects" && key !== "certificates") {
        if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      }
    });

    // Append projects count
    formData.append("projects_count", profile.projects ? profile.projects.length : 0);

    // Append projects data
    if (profile.projects) {
      profile.projects.forEach((proj, idx) => {
        if (proj.id) {
          formData.append(`projects[${idx}][id]`, proj.id);
        }
        formData.append(`projects[${idx}][isDeleted]`, proj.isDeleted);
        formData.append(`projects[${idx}][title]`, proj.title || "");
        formData.append(`projects[${idx}][description]`, proj.description || "");
        formData.append(`projects[${idx}][tech]`, proj.tech || "");
        formData.append(`projects[${idx}][url]`, proj.url || "");
        
        // If image is a File object, append it
        if (proj.image instanceof File) {
          formData.append(`projects[${idx}][image]`, proj.image);
        }
        
        // Append new gallery files
        if (proj.newGalleryImages) {
          proj.newGalleryImages.forEach(file => {
            formData.append(`projects[${idx}][gallery_images]`, file);
          });
        }
        
        // Append delete gallery IDs
        if (proj.deleteGalleryImages) {
          proj.deleteGalleryImages.forEach(id => {
            formData.append(`projects[${idx}][delete_gallery_images]`, id);
          });
        }
      });
    }

    // Append certificates count
    formData.append("certificates_count", profile.certificates ? profile.certificates.length : 0);

    // Append certificates data
    if (profile.certificates) {
      profile.certificates.forEach((cert, idx) => {
        if (cert.id) {
          formData.append(`certificates[${idx}][id]`, cert.id);
        }
        formData.append(`certificates[${idx}][isDeleted]`, cert.isDeleted);
        formData.append(`certificates[${idx}][title]`, cert.title || "");
        formData.append(`certificates[${idx}][name]`, cert.name || "");
        formData.append(`certificates[${idx}][from_org]`, cert.from_org || "");
      });
    }

    try {
      const response = await axios.post(`${API_URL}/portfolio/profile/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        alert("Profile saved successfully!");
        const data = response.data.data;
        setProfile({
          profilePic: data.profilePic || null,
          resume: data.resume || null,
          skillCategory: data.skillCategory || "Frontend",
          skills: data.skills || "",
          frontendSkills: data.frontendSkills || "",
          backendSkills: data.backendSkills || "",
          databaseSkills: data.databaseSkills || "",
          toolsSkills: data.toolsSkills || "",
          aiMlSkills: data.aiMlSkills || "",
          otherSkills: data.otherSkills || "",
          projectTitle: data.projectTitle || "",
          projectDescription: data.projectDescription || "",
          projectTech: data.projectTech || "",
          projectUrl: data.projectUrl || "",
          projectImage: data.projectImage || null,
          certificationTitle: data.certificationTitle || "",
          certificateName: data.certificateName || "",
          certificateFrom: data.certificateFrom || "",
          images: data.images || [],
          projects: (data.projects || []).map(p => ({
            ...p,
            newGalleryImages: [],
            deleteGalleryImages: [],
            isDeleted: false
          })),
          certificates: (data.certificates || []).map(c => ({
            ...c,
            isDeleted: false
          })),
        });
      } else {
        alert("Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-8 bg-white shadow rounded-xl p-4">
        <button
          onClick={handleLogout}
          className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
        >
          ← Logout
        </button>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Profile Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Profile info</h2>
          {profile.profilePic && typeof profile.profilePic === "string" && (
            <div className="mb-4">
              <img
                src={profile.profilePic}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
              />
            </div>
          )}
          <label className="block mb-2 font-medium text-gray-700">Profile Picture</label>
          <input
            className="w-full border p-3 mb-6"
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label className="block mb-2 font-medium text-gray-700">Resume / CV (PDF or Document)</label>
          {profile.resume && typeof profile.resume === "string" && (
            <div className="mb-2 text-sm text-gray-600">
              Current Resume:{" "}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
              >
                View Current Resume
              </a>
            </div>
          )}
          <input
            className="w-full border p-3"
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Skills</h2>
          
          <div>
            <label className="block mb-1 font-medium text-gray-700">Frontend & Libraries</label>
            <input
              className="w-full border p-3"
              type="text"
              name="frontendSkills"
              placeholder="react, tailwind, bootstrap"
              value={profile.frontendSkills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Languages & Backend</label>
            <input
              className="w-full border p-3"
              type="text"
              name="backendSkills"
              placeholder="python, php, c, js, django, flask"
              value={profile.backendSkills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Databases</label>
            <input
              className="w-full border p-3"
              type="text"
              name="databaseSkills"
              placeholder="mysql, mongodb, sqlite"
              value={profile.databaseSkills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Tools & Platforms</label>
            <input
              className="w-full border p-3"
              type="text"
              name="toolsSkills"
              placeholder="git, github, vscode, postman"
              value={profile.toolsSkills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Other Skills</label>
            <input
              className="w-full border p-3"
              type="text"
              name="otherSkills"
              placeholder="Data Structures, Algorithms, OOP, DBMS"
              value={profile.otherSkills}
              onChange={handleChange}
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Enter skills separated by commas for each category. Lowercase names work best for icons.
          </p>
        </div>

        {/* Project Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button
              type="button"
              onClick={handleAddProject}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm flex items-center gap-1"
            >
              + Add Project
            </button>
          </div>

          {profile.projects && profile.projects.length === 0 && (
            <p className="text-gray-500 italic">No projects added yet. Click "+ Add Project" to add one.</p>
          )}

          {profile.projects && profile.projects.map((proj, idx) => {
            if (proj.isDeleted) {
              return (
                <div key={proj.id || proj.tempKey} className="border border-red-300 bg-red-50/50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="text-red-700 font-semibold">Project marked for deletion: </span>
                    <span className="text-gray-700 italic">{proj.title || "Untitled Project"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProjectFieldChange(idx, "isDeleted", false)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 font-semibold"
                  >
                    Undo Delete
                  </button>
                </div>
              );
            }

            return (
              <div key={proj.id || proj.tempKey} className="border border-gray-200 p-6 rounded-xl bg-gray-50/30 space-y-4 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1"
                >
                  Delete Project
                </button>

                <h3 className="font-bold text-lg text-gray-800">Project #{idx + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Project Title</label>
                    <input
                      type="text"
                      placeholder="Project Title"
                      className="w-full border p-3 bg-white"
                      value={proj.title}
                      onChange={(e) => handleProjectFieldChange(idx, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Project URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      className="w-full border p-3 bg-white"
                      value={proj.url}
                      onChange={(e) => handleProjectFieldChange(idx, "url", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">Project Description</label>
                  <textarea
                    placeholder="Project Description"
                    rows="3"
                    className="w-full border p-3 bg-white"
                    value={proj.description}
                    onChange={(e) => handleProjectFieldChange(idx, "description", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700 text-sm">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Django, MongoDB"
                    className="w-full border p-3 bg-white"
                    value={proj.tech}
                    onChange={(e) => handleProjectFieldChange(idx, "tech", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Main Thumbnail</label>
                    {proj.image && (
                      <div className="mb-2">
                        <img
                          src={proj.image instanceof File ? URL.createObjectURL(proj.image) : proj.image}
                          alt="Thumbnail Preview"
                          className="w-32 aspect-video object-cover rounded border border-gray-300"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full border p-2 bg-white text-sm"
                      onChange={(e) => handleProjectFileChange(idx, e)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Additional Screenshots (Gallery)</label>
                    
                    {/* Existing Gallery Images */}
                    {proj.images && proj.images.length > 0 && (
                      <div className="mb-3">
                        <span className="block text-xs font-semibold text-gray-500 mb-1">Current Gallery:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {proj.images.map((img) => {
                            const isImgDeleted = (proj.deleteGalleryImages || []).includes(img.id);
                            return (
                              <div key={img.id} className={`relative border rounded overflow-hidden aspect-video ${isImgDeleted ? 'opacity-40 border-red-500' : 'border-gray-200'}`}>
                                <img src={img.image} alt="Gallery item" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => handleToggleDeleteExistingGalleryImage(idx, img.id)}
                                  className={`absolute top-0.5 right-0.5 p-0.5 rounded-full text-white ${isImgDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} transition`}
                                  style={{ padding: '2px' }}
                                >
                                  <span className="material-symbols-outlined text-[12px] block" style={{ fontSize: '14px' }}>
                                    {isImgDeleted ? 'undo' : 'delete'}
                                  </span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* New Gallery uploads */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full border p-2 bg-white text-sm"
                      onChange={(e) => handleProjectGalleryChange(idx, e)}
                    />

                    {proj.newGalleryImages && proj.newGalleryImages.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {proj.newGalleryImages.map((file, fileIdx) => (
                          <div key={fileIdx} className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                            <span className="truncate max-w-[120px]">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveNewGalleryImage(idx, fileIdx)}
                              className="text-blue-500 hover:text-blue-800 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certification Section */}
        <div className="bg-white shadow rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold">Certifications</h2>
            <button
              type="button"
              onClick={handleAddCertificate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm flex items-center gap-1"
            >
              + Add Certificate
            </button>
          </div>

          {profile.certificates && profile.certificates.length === 0 && (
            <p className="text-gray-500 italic">No certificates added yet. Click "+ Add Certificate" to add one.</p>
          )}

          {profile.certificates && profile.certificates.map((cert, idx) => {
            if (cert.isDeleted) {
              return (
                <div key={cert.id || cert.tempKey} className="border border-red-300 bg-red-50/50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <span className="text-red-700 font-semibold">Certificate marked for deletion: </span>
                    <span className="text-gray-700 italic">{cert.name || "Untitled Certificate"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCertificateFieldChange(idx, "isDeleted", false)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 font-semibold"
                  >
                    Undo Delete
                  </button>
                </div>
              );
            }

            return (
              <div key={cert.id || cert.tempKey} className="border border-gray-200 p-6 rounded-xl bg-gray-50/30 space-y-4 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveCertificate(idx)}
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1"
                >
                  Delete Certificate
                </button>

                <h3 className="font-bold text-lg text-gray-800">Certificate #{idx + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Certification Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud Architecture"
                      className="w-full border p-3 bg-white"
                      value={cert.title}
                      onChange={(e) => handleCertificateFieldChange(idx, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Certificate Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="w-full border p-3 bg-white"
                      value={cert.name}
                      onChange={(e) => handleCertificateFieldChange(idx, "name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">Issued By</label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon Web Services"
                      className="w-full border p-3 bg-white"
                      value={cert.from_org}
                      onChange={(e) => handleCertificateFieldChange(idx, "from_org", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white ml-96 px-8 py-3 rounded-lg hover:opacity-90 transition duration-200"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;

