import { useEffect, useRef, useState, useMemo } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
      // Trigger animation after a short delay
      setTimeout(() => setIsAnimated(true), 100);
    }
  }, []);

  // Pick gradient colors and styling based on score
  const { gradientId, colors, glowColor } = useMemo(() => {
    if (score > 70) {
      return {
        gradientId: "gradGreen",
        colors: { start: "#10b981", middle: "#059669", end: "#047857" },
        glowColor: "rgba(16, 185, 129, 0.3)"
      };
    }
    if (score > 49) {
      return {
        gradientId: "gradYellow",
        colors: { start: "#f59e0b", middle: "#d97706", end: "#b45309" },
        glowColor: "rgba(245, 158, 11, 0.3)"
      };
    }
    return {
      gradientId: "gradRed",
      colors: { start: "#ef4444", middle: "#dc2626", end: "#b91c1c" },
      glowColor: "rgba(239, 68, 68, 0.3)"
    };
  }, [score]);

  const label = useMemo(() => {
    if (score > 70) return "Strong 💪";
    if (score > 49) return "Good Start 🙂";
    return "Needs Work ⚡";
  }, [score]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '80px',
          padding: '8px',
          borderRadius: '80px 80px 0 0',
          background: `radial-gradient(ellipse at bottom, ${glowColor}, transparent 70%)`,
          boxShadow: `0 8px 32px ${glowColor}, 0 4px 12px rgba(0, 0, 0, 0.1)`,
          transition: 'all 0.3s ease',
        }}
      >
        <svg
          viewBox="0 0 100 50"
          style={{
            width: '100%',
            height: '100%',
            filter: `drop-shadow(0 2px 8px ${glowColor})`,
          }}
        >
          <defs>
            <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>

            {/* Enhanced glow effect */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Background gradient */}
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#bgGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            style={{
              opacity: 0.4,
            }}
          />

          {/* Foreground arc */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={isAnimated ? pathLength * (1 - percentage) : pathLength}
            filter="url(#glow)"
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          {/* Score indicator dot */}
          {isAnimated && (
            <circle
              cx={10 + 80 * percentage}
              cy={50 - Math.sin(Math.PI * percentage) * 40}
              r="4"
              fill="#ffffff"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              style={{
                filter: `drop-shadow(0 2px 6px ${glowColor})`,
                animation: 'pulse 2s infinite',
              }}
            />
          )}
        </svg>

        {/* Centered score */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '8px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#1f2937',
              lineHeight: '1',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {score}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '500',
              marginTop: '2px',
              opacity: 0.8,
            }}
          >
            /100
          </div>
        </div>

        {/* Animated pulse rings */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            border: `2px solid ${colors.start}`,
            opacity: 0.1,
            animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Label under gauge */}
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          textAlign: 'center',
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        {label}
      </p>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          @keyframes ping {
            75%, 100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ScoreGauge;