import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // ✅ Gradient colors based on score
  const getGradientColors = () => {
    if (score > 69) {
      return {
        background: 'linear-gradient(to bottom, rgba(220, 252, 231, 0.9), rgba(240, 253, 244, 1), white)'
      };
    } else if (score > 49) {
      return {
        background: 'linear-gradient(to bottom, rgba(254, 249, 195, 0.9), rgba(254, 252, 232, 1), white)'
      };
    } else {
      return {
        background: 'linear-gradient(to bottom, rgba(254, 226, 226, 0.9), rgba(254, 242, 242, 1), white)'
      };
    }
  };

  // ✅ Icon
  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  // ✅ Subtitle
  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

  // ✅ Progress bar color
  const getProgressBarColor = () => {
    if (score > 69) return '#10b981'; // green-500
    if (score > 49) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div
      style={{
        ...getGradientColors(),
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        width: '100%',
        padding: '32px',
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      }}
    >
      {/* Top Section */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '24px'
        }}
      >
        <img 
          src={iconSrc} 
          alt="ATS Score Icon" 
          style={{
            width: '56px',
            height: '56px'
          }}
        />
        <div>
          <h2 
            style={{
              fontSize: '30px',
              fontWeight: '800',
              color: '#111827',
              margin: 0,
              marginBottom: '4px'
            }}
          >
            ATS Score –{' '}
            <span 
              style={{
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {score}/100
            </span>
          </h2>
          <p 
            style={{
              color: '#4b5563',
              margin: 0,
              fontSize: '16px'
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        style={{
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          height: '12px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '12px',
            borderRadius: '9999px',
            backgroundColor: getProgressBarColor(),
            width: `${score}%`,
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </div>

      {/* Suggestions */}
      <div 
        style={{
          marginBottom: '24px'
        }}
      >
        <h3 
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '12px',
            margin: 0
          }}
        >
          Suggestions
        </h3>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                style={{
                  width: '24px',
                  height: '24px',
                  marginTop: '4px',
                  flexShrink: 0
                }}
              />
              <p
                style={{
                  fontSize: '16px',
                  color: suggestion.type === "good" ? '#047857' : '#d97706',
                  margin: 0,
                  lineHeight: '1.5'
                }}
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p 
        style={{
          color: '#374151',
          fontStyle: 'italic',
          textAlign: 'center',
          margin: 0,
          fontSize: '16px',
          lineHeight: '1.5'
        }}
      >
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters 🚀
      </p>
    </div>
  );
};

export default ATS;