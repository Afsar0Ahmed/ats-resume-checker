import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav 
      style={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Logo / Brand */}
      <Link 
        to="/" 
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none'
        }}
      >
        <p 
          style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0
          }}
        >
          RESUMIND
        </p>
      </Link>

      {/* Upload Button */}
      <Link
        to="/upload"
        style={{
          padding: '8px 20px',
          borderRadius: '12px',
          backgroundColor: '#4f46e5',
          color: 'white',
          fontWeight: '500',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          textDecoration: 'none',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#4338ca';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#4f46e5';
        }}
      >
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;