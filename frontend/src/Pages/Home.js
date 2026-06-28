import { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";
import About from "../components/About";
import Certificate from "../components/Certificate";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";


function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/portfolio/profile/`);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile on home page:", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased selection:bg-primary selection:text-on-primary  flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-section-gap gap-section-gap">
        <HeroSection profile={profile} />
        <About profile={profile} />
        <Skills profile={profile} />
        <Projects profile={profile} />
        <Certificate profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
