import { useState, useEffect } from "react";

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null); // ✅ for window width

  useEffect(() => {
    // Trigger initial animation
    setTimeout(() => setIsVisible(true), 200);

    // ✅ Only runs in browser
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const cardData = [
    {
      title: "Card 1",
      description: "This should be a styled card with shadow.",
      accent: "rgba(59, 130, 246, 0.1)",
    },
    {
      title: "Card 2", 
      description: "Hover over cards to see shadow change.",
      accent: "rgba(147, 51, 234, 0.1)",
    },
    {
      title: "Card 3",
      description: "Grid should be responsive.",
      accent: "rgba(16, 185, 129, 0.1)",
    }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #c7d2fe 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ... background blobs code stays same ... */}

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h1
            style={{
              fontSize: windowWidth && windowWidth <= 768 ? '48px' : '72px', // ✅ safe check
              fontWeight: '800',
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 24px 0',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
            }}
          >
            Tailwind CSS Test
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#64748b',
              margin: '0 0 32px 0',
              lineHeight: '1.6',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: '500',
            }}
          >
            If you can see this styled text with colors and spacing, Tailwind is working!
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: windowWidth && windowWidth <= 768 
              ? '1fr' 
              : 'repeat(3, 1fr)', // ✅ safe check
            gap: '24px',
            marginBottom: '48px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          {cardData.map((card, index) => (
            // ... rest of your card code same ...
            <div key={index} /* etc. */>
              {/* Card content */}
            </div>
          ))}
        </div>

        {/* Button code stays same */}
      </div>

      {/* CSS Keyframe animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-20px) scale(1.05);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
}
