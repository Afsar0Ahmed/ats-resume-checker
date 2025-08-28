import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  // Load resumes
  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ));
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
      setTimeout(() => setIsVisible(true), 200);
    };
    loadResumes();
  }, []);

  // Track window width safely
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headingFontSize = windowWidth && windowWidth <= 768 ? "32px" : "48px";

  return (
    <main
      style={{
        backgroundImage: "url('/images/bg-main.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* overlay animation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.02) 50%, rgba(79, 70, 229, 0.03) 100%)",
          animation: "backgroundPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <Navbar />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Page heading */}
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h1
            style={{
              fontSize: headingFontSize,
              fontWeight: "800",
              background:
                "linear-gradient(135deg, #1f2937 0%, #4f46e5 50%, #7c3aed 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 16px 0",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 16px rgba(79, 70, 229, 0.1)",
            }}
          >
            Track Your Applications & Resume Ratings
          </h1>
          {/* rest of your code unchanged */}
        </div>
      </section>

      <style>
        {`
          @keyframes backgroundPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-15px) scale(1.05); }
          }
        `}
      </style>
    </main>
  );
}
