import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8 }}
      style={{ 
        padding: '20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #333',
        background: 'rgba(5,5,5,0.9)', // Slight transparency
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div className="brand text-cyan" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DGS_DEV_V1</div>
      <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#projects" style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Orbitron' }}>PROJECTS</a>
          <a href="#contact" style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Orbitron' }}>CONTACT</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;