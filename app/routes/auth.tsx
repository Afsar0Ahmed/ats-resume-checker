import {usePuterStore} from "~/lib/puter";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [buttonHovered, setButtonHovered] = useState(false);

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 200);
    }, []);

    const getButtonStyles = () => {
        const baseStyles = {
            width: '100%',
            padding: '16px 24px',
            borderRadius: '16px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        };

        if (isLoading) {
            return {
                ...baseStyles,
                background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                color: '#64748b',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            };
        }

        if (auth.isAuthenticated) {
            return {
                ...baseStyles,
                background: buttonHovered 
                    ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)'
                    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1b 100%)',
                color: '#ffffff',
                transform: buttonHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: buttonHovered 
                    ? '0 16px 48px rgba(220, 38, 38, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15)'
                    : '0 8px 32px rgba(220, 38, 38, 0.2), 0 4px 16px rgba(0, 0, 0, 0.08)',
            };
        }

        return {
            ...baseStyles,
            background: buttonHovered
                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)'
                : 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #2563eb 100%)',
            color: '#ffffff',
            transform: buttonHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: buttonHovered 
                ? '0 16px 48px rgba(59, 130, 246, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15)'
                : '0 8px 32px rgba(59, 130, 246, 0.2), 0 4px 16px rgba(0, 0, 0, 0.08)',
        };
    };

    return (
        <main 
            style={{
                backgroundImage: "url('/images/bg-auth.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                position: 'relative',
            }}
        >
            {/* Animated background overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)',
                    animation: 'backgroundShift 8s ease-in-out infinite',
                }}
            />

            {/* Gradient border container */}
            <div
                style={{
                    padding: '3px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.8) 0%, rgba(59, 130, 246, 0.6) 25%, rgba(147, 51, 234, 0.8) 50%, rgba(59, 130, 246, 0.6) 75%, rgba(79, 70, 229, 0.8) 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease-in-out infinite',
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.15), 0 10px 40px rgba(79, 70, 229, 0.2)',
                    position: 'relative',
                    zIndex: 1,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <section
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
                        borderRadius: '25px',
                        padding: '48px',
                        minWidth: '400px',
                        maxWidth: '90vw',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Floating accent elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
                            borderRadius: '50%',
                            filter: 'blur(20px)',
                            animation: 'float 6s ease-in-out infinite',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-15px',
                            left: '-15px',
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)',
                            borderRadius: '50%',
                            filter: 'blur(15px)',
                            animation: 'float 4s ease-in-out infinite reverse',
                        }}
                    />

                    {/* Header section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '36px',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #8b5cf6 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                lineHeight: '1.2',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Welcome
                        </h1>
                        <h2
                            style={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#6b7280',
                                margin: 0,
                                lineHeight: '1.4',
                                maxWidth: '300px',
                            }}
                        >
                            Log In to Continue Your Job Journey
                        </h2>
                    </div>

                    {/* Button section */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <button
                            style={getButtonStyles()}
                            onClick={isLoading ? undefined : (auth.isAuthenticated ? auth.signOut : auth.signIn)}
                            onMouseEnter={() => setButtonHovered(true)}
                            onMouseLeave={() => setButtonHovered(false)}
                            disabled={isLoading}
                        >
                            {/* Button glow effect */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: '16px',
                                    background: buttonHovered && !isLoading
                                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)'
                                        : 'transparent',
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            
                            {/* Button text */}
                            <p style={{ 
                                margin: 0, 
                                position: 'relative', 
                                zIndex: 1,
                                textShadow: !isLoading ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none',
                            }}>
                                {isLoading 
                                    ? 'Signing you in...'
                                    : auth.isAuthenticated 
                                        ? 'Log Out' 
                                        : 'Log In'
                                }
                            </p>
                        </button>
                    </div>
                </section>
            </div>

            {/* CSS Keyframe animations */}
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                    @keyframes gradientShift {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes backgroundShift {
                        0%, 100% { opacity: 0.8; }
                        50% { opacity: 0.4; }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) scale(1); }
                        50% { transform: translateY(-10px) scale(1.05); }
                    }
                `}
            </style>
        </main>
    )
}

export default Auth