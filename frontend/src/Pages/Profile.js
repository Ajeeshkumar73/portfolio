import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    profilePic: null,
    skillCategory: "Frontend",
    skills: "",
    projectTitle: "",
    projectDescription: "",
    projectTech: "",
    projectUrl: "",
    projectImage: null,
    certificationTitle: "",
    certificateName: "",
    certificateFrom: "",
    images: [],
  });

  const [projectImagesFiles, setProjectImagesFiles] = useState([]);
  const [deletedImagesIds, setDeletedImagesIds] = useState([]);
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
          skillCategory: data.skillCategory || "Frontend",
          skills: data.skills || "",
          projectTitle: data.projectTitle || "",
          projectDescription: data.projectDescription || "",
          projectTech: data.projectTech || "",
          projectUrl: data.projectUrl || "",
          projectImage: data.projectImage || null,
          certificationTitle: data.certificationTitle || "",
          certificateName: data.certificateName || "",
          certificateFrom: data.certificateFrom || "",
          images: data.images || [],
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

  const handleMultipleFilesChange = (e) => {
    setProjectImagesFiles(Array.from(e.target.files));
  };

  const toggleDeleteImage = (id) => {
    if (deletedImagesIds.includes(id)) {
      setDeletedImagesIds(deletedImagesIds.filter((item) => item !== id));
    } else {
      setDeletedImagesIds([...deletedImagesIds, id]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      if (key !== "images") {
        if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      }
    });

    // Append new project images
    projectImagesFiles.forEach((file) => {
      formData.append("project_images", file);
    });

    // Append deleted image IDs
    deletedImagesIds.forEach((id) => {
      formData.append("delete_images", id);
    });

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
          skillCategory: data.skillCategory || "Frontend",
          skills: data.skills || "",
          projectTitle: data.projectTitle || "",
          projectDescription: data.projectDescription || "",
          projectTech: data.projectTech || "",
          projectUrl: data.projectUrl || "",
          projectImage: data.projectImage || null,
          certificationTitle: data.certificationTitle || "",
          certificateName: data.certificateName || "",
          certificateFrom: data.certificateFrom || "",
          images: data.images || [],
        });
        setProjectImagesFiles([]);
        setDeletedImagesIds([]);
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
          <label className="block mb-2">Profile Picture</label>
          <input
            className="w-full border p-3"
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <select
            className="w-full border p-3 mb-4"
            name="skillCategory"
            value={profile.skillCategory}
            onChange={handleChange}
          >
            <option value="Frontend"> Frontend </option>
            <option value="Backend"> Backend </option>
            <option value="Tools"> Tools </option>
            <option value="AI & ML"> AI & ML </option>
          </select>
          <input
            className="w-full border p-3"
            type="text"
            name="skills"
            placeholder="React, HTML, CSS, JavaScript"
            value={profile.skills}
            onChange={handleChange}
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter skills separated by commas.
          </p>
        </div>

        {/* Project Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4"> Project </h2>
          {profile.projectImage && typeof profile.projectImage === "string" && (
            <div className="mb-4">
              <img
                src={profile.projectImage}
                alt="Project Preview"
                className="w-48 h-32 object-cover rounded border border-gray-300"
              />
            </div>
          )}
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            className="w-full border p-3 mb-4"
            value={profile.projectTitle}
            onChange={handleChange}
          />
          <textarea
            name="projectDescription"
            placeholder="Project Description"
            rows="4"
            className="w-full border p-3 mb-4"
            value={profile.projectDescription}
            onChange={handleChange}
          />
          <input
            type="text"
            name="projectTech"
            placeholder="React, Django, MongoDB"
            className="w-full border p-3 mb-4"
            value={profile.projectTech}
            onChange={handleChange}
          />
          <input
            type="url"
            name="projectUrl"
            placeholder="https://github.com/..."
            className="w-full border p-3 mb-4"
            value={profile.projectUrl}
            onChange={handleChange}
          />
          <label className="block mb-2 font-medium text-gray-700">Project Main Thumbnail</label>
          <input
            type="file"
            name="projectImage"
            accept="image/*"
            className="w-full border p-3 mb-6"
            onChange={handleFileChange}
          />

          {/* Current Gallery Images */}
          {profile.images && profile.images.length > 0 && (
            <div className="mb-6 border-t pt-4">
              <label className="block mb-2 font-medium text-gray-700">Current Project Gallery ({profile.images.length})</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {profile.images.map((img) => {
                  const isDeleted = deletedImagesIds.includes(img.id);
                  return (
                    <div key={img.id} className={`relative border rounded overflow-hidden aspect-video ${isDeleted ? 'opacity-40 border-red-500' : 'border-gray-200'}`}>
                      <img src={img.image} alt="Project Gallery Screenshot" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => toggleDeleteImage(img.id)}
                        className={`absolute top-1 right-1 p-1 rounded-full text-white ${isDeleted ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} transition`}
                        title={isDeleted ? "Keep image" : "Delete image"}
                      >
                        <span className="material-symbols-outlined text-sm block" style={{ fontSize: '18px' }}>
                          {isDeleted ? 'undo' : 'delete'}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* New Project Images to Upload */}
          <div className="mb-6 border-t pt-4">
            <label className="block mb-2 font-medium text-gray-700">Upload Additional Project Screenshots</label>
            <input
              type="file"
              name="project_images"
              multiple
              accept="image/*"
              className="w-full border p-3"
              onChange={handleMultipleFilesChange}
            />
            {projectImagesFiles.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {projectImagesFiles.map((file, idx) => (
                  <div key={idx} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setProjectImagesFiles(projectImagesFiles.filter((_, i) => i !== idx))}
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

        {/* Certification Section */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4"> Certification </h2>
          <input
            type="text"
            name="certificationTitle"
            placeholder="Certification Title"
            className="w-full border p-3 mb-4"
            value={profile.certificationTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            name="certificateName"
            placeholder="Certificate Name"
            className="w-full border p-3 mb-4"
            value={profile.certificateName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="certificateFrom"
            placeholder="Issued By"
            className="w-full border p-3"
            value={profile.certificateFrom}
            onChange={handleChange}
          />
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

