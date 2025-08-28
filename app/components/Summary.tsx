import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import { useState } from "react";

const Category = ({ title, score }: { title: string; score: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const textColorStyle = 
    score > 70
      ? { color: "#059669" }
      : score > 49
      ? { color: "#d97706" }
      : { color: "#dc2626" };

  const glowColor = 
    score > 70
      ? "rgba(16, 185, 129, 0.1)"
      : score > 49
      ? "rgba(245, 158, 11, 0.1)"
      : "rgba(239, 68, 68, 0.1)";

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isHovered 
          ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        padding: '16px 20px',
        borderRadius: '16px',
        border: isHovered ? `1px solid ${glowColor.replace('0.1', '0.3')}` : '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: isHovered
          ? `0 8px 32px ${glowColor}, 0 4px 16px rgba(0, 0, 0, 0.1)`
          : '0 2px 8px rgba(148, 163, 184, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
        transform: isHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle animated background accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(200%)' : 'translateX(0)',
          transition: 'all 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Left side - Title + Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </p>
        <ScoreBadge score={score} />
      </div>

      {/* Right side - Score */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: '18px',
            fontWeight: '700',
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            gap: '2px',
          }}
        >
          <span
            style={{
              ...textColorStyle,
              textShadow: `0 0 20px ${glowColor.replace('0.1', '0.3')}`,
              transition: 'all 0.3s ease',
            }}
          >
            {score}
          </span>
          <span
            style={{
              color: '#9ca3af',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            /100
          </span>
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger staggered animations
  useState(() => {
    setTimeout(() => setIsVisible(true), 200);
  });

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
        width: '100%',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.02) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content container */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top section with gauge */}
        <div
          style={{
            display: 'flex',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            alignItems: 'center',
            gap: '32px',
            marginBottom: '32px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div style={{ flexShrink: 0 }}>
            <ScoreGauge score={feedback.overallScore} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: window.innerWidth <= 768 ? 'center' : 'left',
            }}
          >
            <h2
              style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#111827',
                margin: 0,
                background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '1.2',
              }}
            >
              Your Resume Score
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                fontWeight: '500',
                maxWidth: '400px',
                lineHeight: '1.5',
              }}
            >
              This score is calculated based on the variables listed below.
            </p>
          </div>
        </div>

        {/* Category scores */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {[
            { title: "Tone & Style", score: feedback.toneAndStyle.score, delay: '0.1s' },
            { title: "Content", score: feedback.content.score, delay: '0.2s' },
            { title: "Structure", score: feedback.structure.score, delay: '0.3s' },
            { title: "Skills", score: feedback.skills.score, delay: '0.4s' },
          ].map((category, index) => (
            <div
              key={category.title}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${category.delay}`,
              }}
            >
              <Category title={category.title} score={category.score} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating accent elements */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Summary;