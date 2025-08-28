import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [fs, imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      style={{
        display: 'block',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #f3f4f6',
          background: isHovered 
            ? 'linear-gradient(135deg, #fafafa 0%, #f9fafb 100%)' 
            : '#ffffff',
          transition: 'background 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
          {companyName && (
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: '1.2',
              }}
            >
              {companyName}
            </h2>
          )}
          {jobTitle && (
            <h3
              style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: '500',
              }}
            >
              {jobTitle}
            </h3>
          )}
          {!companyName && !jobTitle && (
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                lineHeight: '1.2',
              }}
            >
              Resume
            </h2>
          )}
        </div>
        <div style={{ flexShrink: 0, marginLeft: '16px' }}>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {/* Preview */}
      {resumeUrl && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={resumeUrl}
            alt="Resume preview"
            style={{
              width: '100%',
              height: window.innerWidth <= 640 ? '200px' : '350px',
              objectFit: 'cover',
              objectPosition: 'top',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          {/* Subtle corner accent */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              opacity: isHovered ? 0.8 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;