import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// 1. Define all social links in a single object for easy management
const SOCIAL_LINKS = {
  // *** REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL URLs ***
  github: 'https://github.com/don-pao', 
  linkedin: 'https://www.linkedin.com/in/donald-sombrio-ba3766142/', 
  // --------------------------------------------------------
  email: 'mailto:sombriodonaldio@gmail.com',
};

const Contact = () => {
    // Define the style for the social icons and the hover effect
    const iconStyle = { 
        fontSize: '2.5rem', // Slightly larger for better tap targets
        color: '#fff', 
        transition: 'color 0.3s ease-in-out', // Smooth transition for hover
    };

    // Define the common attributes for external links
    const externalLinkProps = {
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-main',
    };

    return (
        <footer 
            id="contact" 
            style={{ 
                textAlign: 'center', 
                padding: '100px 0', 
                background: 'linear-gradient(to top, #111, #050505)' 
            }}
        >
            <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }} // Ensures animation only runs once
            >
                <h2 className="text-cyan" style={{ fontSize: '3rem', marginBottom: '40px' }}>
                    ESTABLISH_CONNECTION
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    {/* EMAIL Link */}
                    <a 
                        href={SOCIAL_LINKS.email} 
                        className="text-main" 
                        aria-label="Email Address"
                        style={iconStyle}
                    >
                        <FaEnvelope />
                    </a>

                    {/* GITHUB Link */}
                    <a 
                        href={SOCIAL_LINKS.github} 
                        {...externalLinkProps} // Spreads target and rel props
                        aria-label="GitHub Profile"
                        style={iconStyle}
                        // Simple inline hover effect using the parent element
                        onMouseEnter={(e) => e.currentTarget.style.color = '#00ADB5'} // Example hover color
                        onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                    >
                        <FaGithub />
                    </a>

                    {/* LINKEDIN Link */}
                    <a 
                        href={SOCIAL_LINKS.linkedin} 
                        {...externalLinkProps}
                        aria-label="LinkedIn Profile"
                        style={iconStyle}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#00ADB5'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                    >
                        <FaLinkedin />
                    </a>
                </div>

                <p style={{ marginTop: '50px', fontFamily: 'Orbitron', color: '#444' }}>
                    SYSTEM STATUS: ONLINE © 2025
                </p>
            </motion.div>
        </footer>
    );
};

export default Contact;