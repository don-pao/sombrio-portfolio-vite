import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaAws } from 'react-icons/fa';
import { SiKotlin } from 'react-icons/si';

// Manual SVG for ServiceNow (Matched to your uploaded "Green Donut" image)
const ServiceNowIcon = () => (
  <svg 
    viewBox="0 0 100 100" 
    height="1em" 
    width="1em" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer shape with the specific "indented bottom" curve */}
    <path d="M 50 0 A 50 50 0 1 1 85.3 85.3 C 75 72 65 65 50 65 C 35 65 25 72 14.7 85.3 A 50 50 0 0 1 50 0 Z M 50 22 A 20 20 0 1 0 50 62 A 20 20 0 1 0 50 22 Z" />
  </svg>
);

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    {
        name: "ServiceNow",
        icon: <ServiceNowIcon />,
        color: "#81B5A1", // The specific green tone
        desc: "Certified System Administrator & Developer. Experienced in workflows, UI Builder, and automation."
    },
    {
        name: "Java",
        icon: <FaJava />,
        color: "#f89820", 
        desc: "Strong backend foundation. Capable of building robust logic and data structures."
    },
    {
        name: "Kotlin",
        icon: <SiKotlin />,
        color: "#7F52FF",
        desc: "Modern Android development. Used in creating the 'FitMe' and 'BarangayFix' mobile apps."
    },
    {
        name: "Python",
        icon: <FaPython />,
        color: "#306998", 
        desc: "Scripting and automation. Used for data processing and backend logic."
    },
    {
        name: "JavaScript",
        icon: <FaJs />,
        color: "#F7DF1E",
        desc: "Interactive web logic. Core technology for my React projects."
    },
    {
        name: "HTML5",
        icon: <FaHtml5 />,
        color: "#e34c26", 
        desc: "Semantic structure ensuring web accessibility and clean DOM layouts."
    },
    {
        name: "CSS3",
        icon: <FaCss3Alt />,
        color: "#264de4",
        desc: "Advanced styling, flexbox/grid layouts, and responsive design implementation."
    },
    {
        name: "AWS",
        icon: <FaAws />,
        color: "#FF9900",
        desc: "Cloud foundations. Knowledgeable in deploying and managing serverless architectures."
    }
  ];

  return (
    <div style={{ background: 'var(--bg-panel)', padding: '60px 0', borderTop: '1px solid var(--neon-cyan)', borderBottom: '1px solid var(--neon-cyan)' }}>
      
      {/* Container widened to 1200px to allow ~5 items per row */}
      <div className="container" style={{ maxWidth: '1200px', width: '95%', margin: '0 auto' }}>
        <h2 className="text-cyan" style={{ textAlign: 'center', marginBottom: '50px', fontFamily: 'Orbitron' }}> // TECH_STACK_INIT</h2>
        
        {/* Flex layout with centering and wrapping */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
            {skills.map((skill, index) => (
                <motion.div 
                    key={index}
                    className="skill-card"
                    onHoverStart={() => setActiveSkill(index)}
                    onHoverEnd={() => setActiveSkill(null)}
                    onClick={() => setActiveSkill(activeSkill === index ? null : index)}
                    whileHover={{ scale: 1.1, y: -5, borderColor: skill.color }}
                    style={{ 
                        background: '#1a1a1a', 
                        padding: '25px', 
                        borderRadius: '12px', 
                        textAlign: 'center', 
                        border: '1px solid #333',
                        /* Fixed width helps alignment; 180px * 5 = 900px, fitting easily in 1200px */
                        width: '180px', 
                        position: 'relative', 
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{ fontSize: '3.5rem', color: skill.color, marginBottom: '15px' }}>{skill.icon}</div>
                    <h3 style={{ fontSize: '1rem', color: '#fff', fontFamily: 'Orbitron' }}>{skill.name}</h3>
                    
                    <AnimatePresence>
                        {activeSkill === index && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '120%', 
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'white',
                                    color: 'black',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    width: '200px',
                                    marginLeft: '-100px', 
                                    zIndex: 10,
                                    fontSize: '0.85rem',
                                    boxShadow: `0 0 15px ${skill.color}`,
                                    pointerEvents: 'none',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', bottom: '-6px', left: '50%', marginLeft: '-6px',
                                    width: 0, height: 0, 
                                    borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid white'
                                }}></div>
                                <strong>// ANALYSIS:</strong> <br/>
                                {skill.desc}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;