import { useMemo } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Pick gradient and colors based on score range
  const { gradientId, colors } = useMemo(() => {
    if (score > 70) {
      return {
        gradientId: "gradGreen",
        colors: { start: "#10b981", end: "#059669", shadow: "rgba(16, 185, 129, 0.2)" }
      };
    }
    if (score > 49) {
      return {
        gradientId: "gradYellow", 
        colors: { start: "#f59e0b", end: "#d97706", shadow: "rgba(245, 158, 11, 0.2)" }
      };
    }
    return {
      gradientId: "gradRed",
      colors: { start: "#ef4444", end: "#dc2626", shadow: "rgba(239, 68, 68, 0.2)" }
    };
  }, [score]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        padding: '4px',
        background: `conic-gradient(from 0deg, ${colors.shadow}, transparent, ${colors.shadow})`,
        boxShadow: `0 4px 20px ${colors.shadow}, 0 2px 10px rgba(0, 0, 0, 0.1)`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            transform: 'rotate(-90deg)',
            filter: `drop-shadow(0 2px 4px ${colors.shadow})`,
          }}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            stroke="#f1f5f9"
            strokeWidth={stroke}
            fill="transparent"
            style={{
              opacity: 0.3,
            }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gradGreen" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="gradYellow" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="gradRed" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={normalizedRadius}
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              strokeWidth: `${stroke}px`,
            }}
          />
        </svg>

        {/* Score Display */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontWeight: '700',
              fontSize: '20px',
              color: '#1f2937',
              lineHeight: '1',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#9ca3af',
              fontWeight: '500',
              marginTop: '2px',
              opacity: 0.8,
            }}
          >
            /100
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;