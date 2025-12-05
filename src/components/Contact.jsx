import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <footer id="contact" style={{ textAlign: 'center', padding: '100px 0', background: 'linear-gradient(to top, #111, #050505)' }}>
      <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
          <h2 className="text-cyan" style={{ fontSize: '3rem', marginBottom: '40px' }}>ESTABLISH_CONNECTION</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
              <a href="mailto:sombriodonaldio@gmail.com" className="text-main" style={{ fontSize: '2rem', color: '#fff' }}><FaEnvelope /></a>
              <a href="#" className="text-main" style={{ fontSize: '2rem', color: '#fff' }}><FaGithub /></a>
              <a href="#" className="text-main" style={{ fontSize: '2rem', color: '#fff' }}><FaLinkedin /></a>
          </div>
          <p style={{ marginTop: '50px', fontFamily: 'Orbitron', color: '#444' }}>SYSTEM STATUS: ONLINE © 2025</p>
      </motion.div>
    </footer>
  );
};

export default Contact;