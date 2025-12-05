import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "CommerceFlow",
      desc: "A streamlined e-commerce application built on the ServiceNow platform, featuring custom landing pages and unified branding.",
      tech: "ServiceNow / UI Builder",
      color: "#81B5A1", 
      link: "https://dev281594.service-now.com/cf"
    },
    {
      title: "Readle Teacher",
      desc: "Gamified learning management system (Teacher View) for tracking student reading progress.",
      tech: "Full Stack / Education",
      color: "var(--neon-cyan)",
      link: "https://readle-pi.vercel.app/"
    },
    {
      title: "QPS Plumbing Solutions",
      desc: "Emergency infrastructure service platform with location mapping and instant service catalogs.",
      tech: "Web / Services",
      color: "#00f3ff",
      link: "https://www.qpsplumbingandmaintenanceservices.com/"
    },
    {
      title: "Rapid Roofing Maintenance",
      desc: "Professional roofing service platform designed for quick quotes, emergency repairs, and maintenance scheduling.",
      tech: "Web / Service Industry",
      color: "#ff9900", // Orange for construction/safety
      link: "https://www.rapidroofingsw.co.uk/"
    },
    {
      title: "The Scroll Shelf",
      desc: "Immersive e-commerce bookstore platform featuring audio previews and digital downloads.",
      tech: "React / UX",
      color: "var(--neon-yellow)",
      link: "https://www.thescrollshelf.com/"
    },
    {
      title: "BarangayFix",
      desc: "Smart community issue reporter for quick resolution of civic problems. Built using ServiceNow.",
      tech: "ServiceNow / Mobile",
      color: "var(--neon-pink)",
      link: "/src/projects/barangay-fix.html"
    },
    {
      title: "MM Boxing Academy",
      desc: "Online boxing academy with e-commerce for digital training assets. (Discontinued Project)",
      tech: "E-Commerce / Legacy",
      color: "#555",
      // File path for internal page
      link: "/src/projects/mm-boxing.html"
    },
    {
      title: "FitMe",
      desc: "Mobile fitness tracking application with automated BMI calculation and workout plans.",
      tech: "Mobile / Health Tech",
      color: "var(--neon-cyan)",
      // File path for internal page
      link: "/src/projects/fit-me.html" 
    }
  ];

  return (
    <section id="projects" style={{ padding: '100px 20px' }}>
      <div className="container">
        <motion.h2 
          initial={{ x: -100, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          className="text-yellow" 
          style={{ marginBottom: '50px', borderLeft: '5px solid var(--neon-yellow)', paddingLeft: '20px' }}
        >
          //PROJECTS
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {projects.map((project, index) => (
            <motion.a 
              href={project.link ? project.link : "#"}
              // MODIFIED: Only open in new tab if link starts with 'http' (is external)
              target={project.link && project.link.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, boxShadow: `0 0 20px ${project.color}` }}
              transition={{ duration: 0.3 }}
              style={{ 
                background: 'var(--bg-panel)', 
                padding: '30px', 
                border: '1px solid #333',
                borderTop: `3px solid ${project.color}`,
                position: 'relative',
                textDecoration: 'none',
                display: 'block',
                cursor: project.link ? 'pointer' : 'default'
              }}
            >
              <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.8rem', color: '#555', fontFamily: 'Orbitron' }}>0{index + 1}</div>
              <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px' }}>
                {project.title} 
                {/* MODIFIED: Show external link icon only if it starts with http */}
                {project.link && project.link.startsWith('http') && <span style={{ fontSize: '0.8rem', marginLeft: '10px', color: project.color }}>↗</span>}
                {/* You might want a different icon for internal links if desired, or none */}
              </h3>
              <span style={{ color: project.color, fontFamily: 'Orbitron', fontSize: '0.9rem', border: `1px solid ${project.color}`, padding: '2px 8px' }}>
                  {project.tech}
              </span>
              <p style={{ marginTop: '20px', color: '#aaa', lineHeight: '1.8' }}>{project.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects