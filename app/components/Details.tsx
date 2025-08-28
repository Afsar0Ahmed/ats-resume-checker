import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const getScoreStyles = () => {
    if (score > 69) {
      return {
        backgroundColor: '#dcfce7', // green-100
        color: '#166534' // green-800
      };
    } else if (score > 39) {
      return {
        backgroundColor: '#fef3c7', // yellow-100
        color: '#92400e' // yellow-800
      };
    } else {
      return {
        backgroundColor: '#fecaca', // red-100
        color: '#991b1b' // red-800
      };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: '9999px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease-in-out',
        ...getScoreStyles()
      }}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        style={{
          width: '16px',
          height: '16px'
        }}
      />
      <p 
        style={{
          fontSize: '14px',
          fontWeight: '600',
          margin: 0
        }}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        alignItems: 'center',
        padding: '12px 0'
      }}
    >
      <p 
        style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0
        }}
      >
        {title}
      </p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%'
      }}
    >
      {/* Quick Glance Summary */}
      <div 
        style={{
          backgroundColor: '#f9fafb',
          width: '100%',
          borderRadius: '12px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}
      >
        {tips.map((tip, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <img
              src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt="score"
              style={{
                width: '20px',
                height: '20px'
              }}
            />
            <p
              style={{
                fontSize: '16px',
                color: tip.type === "good" ? '#047857' : '#b45309',
                margin: 0
              }}
            >
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Explanations */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%'
        }}
      >
        {tips.map((tip, index) => {
          const getTipStyles = () => {
            if (tip.type === "good") {
              return {
                backgroundColor: '#f0fdf4', // green-50
                border: '1px solid #bbf7d0', // green-200
                color: '#166534' // green-800
              };
            } else {
              return {
                backgroundColor: '#fffbeb', // yellow-50
                border: '1px solid #fde68a', // yellow-200
                color: '#92400e' // yellow-800
              };
            }
          };

          return (
            <div
              key={index + tip.tip}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                ...getTipStyles()
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <img
                  src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt="score"
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
                <p 
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    margin: 0
                  }}
                >
                  {tip.tip}
                </p>
              </div>
              <p 
                style={{
                  color: '#4b5563',
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}
              >
                {tip.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%'
      }}
    >
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;