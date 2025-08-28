interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeStyles = {};
  let badgeText = "";

  if (score > 70) {
    badgeStyles = {
      backgroundColor: '#f0fdf4',
      color: '#15803d',
      border: '1px solid #bbf7d0',
      boxShadow: '0 0 0 1px rgba(34, 197, 94, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
    };
    badgeText = "Strong";
  } else if (score > 49) {
    badgeStyles = {
      backgroundColor: '#fefce8',
      color: '#a16207',
      border: '1px solid #fde047',
      boxShadow: '0 0 0 1px rgba(234, 179, 8, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
    };
    badgeText = "Good Start";
  } else {
    badgeStyles = {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fca5a5',
      boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
    };
    badgeText = "Needs Work";
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.025em',
        textTransform: 'uppercase',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        userSelect: 'none',
        ...badgeStyles,
      }}
    >
      {badgeText}
    </div>
  );
};

export default ScoreBadge;