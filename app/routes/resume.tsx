import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
  { title: 'Resumind | Review ' },
  { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main style={{ paddingTop: "0", fontFamily: "Inter, sans-serif" }}>
      {/* Top Navigation */}
      <nav style={{
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <Link to="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
        }}>
          <img src="/icons/back.svg" alt="logo" style={{ width: "12px", height: "12px" }} />
          <span style={{
            color: "#1f2937",
            fontSize: "14px",
            fontWeight: 600
          }}>
            Back to Homepage
          </span>
        </Link>
      </nav>

      {/* Layout */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        minHeight: "100vh"
      }}>
        {/* Left Resume Preview */}
        <section style={{
          backgroundImage: "url('/images/bg-small.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: "24px"
        }}>
          {imageUrl && resumeUrl && (
            <div style={{
              borderRadius: "16px",
              border: "2px solid transparent",
              background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #4f46e5, #9333ea) border-box",
              animation: "fadeIn 1s ease-in",
              maxHeight: "90%",
              width: "fit-content",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
            }}>
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "16px"
                  }}
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* Right Feedback Section */}
        <section style={{
          flex: 2,
          padding: "48px",
          background: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "16px"
          }}>
            Resume Review
          </h2>

          {feedback ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              animation: "fadeIn 1s ease-in"
            }}>
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" style={{ width: "100%", borderRadius: "12px" }} />
          )}
        </section>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  )
}

export default Resume;
