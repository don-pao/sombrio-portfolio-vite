import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Game State Refs (Mutable for performance, no re-renders)
  const gameState = useRef({
    shipX: 0,
    bullets: [],
    enemies: [],
    particles: [], // Explosion particles
    score: 0,
    lastFrame: 0,
    spawnTimer: 0
  });

  // --- ENGINE SETTINGS ---
  const ENEMY_SPAWN_RATE = 60; // Frames between spawns (Higher = Slower spawn)
  const BULLET_SPEED = 8;
  const ENEMY_SPEED = 2;
  const SHIP_Y_OFFSET = 80; // Distance from bottom

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // --- RESIZE HANDLER (CRISP RESOLUTION) ---
    const handleResize = () => {
      const parent = containerRef.current;
      if (parent) {
        // Set actual size in memory (scaled to match device pixel ratio for sharpness)
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        
        // Scale CSS size
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
        
        // Normalize coordinate system
        ctx.scale(dpr, dpr);
        gameState.current.width = parent.clientWidth;
        gameState.current.height = parent.clientHeight;
        
        // Center ship initially
        if (gameState.current.shipX === 0) gameState.current.shipX = parent.clientWidth / 2;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    // --- DRAWING FUNCTIONS ---
    const drawShip = (x, y) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00f3ff';
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#000';

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 15, y + 40);
      ctx.lineTo(x, y + 30); // Engine notch
      ctx.lineTo(x + 15, y + 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Engine Flame
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0055';
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.moveTo(x - 5, y + 35);
      ctx.lineTo(x, y + 50 + Math.random() * 10); // Flicker
      ctx.lineTo(x + 5, y + 35);
      ctx.fill();
    };

    const drawEnemy = (e) => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0055';
      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 2;
      
      const size = 20;
      ctx.strokeRect(e.x - size/2, e.y - size/2, size, size);
      
      // Inner core
      ctx.fillStyle = 'rgba(255, 0, 85, 0.5)';
      ctx.fillRect(e.x - size/4, e.y - size/4, size/2, size/2);
    };

    const drawBullet = (b) => {
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00f3ff';
      ctx.fillStyle = '#00f3ff';
      ctx.fillRect(b.x - 2, b.y, 4, 15);
    };

    const drawParticles = () => {
      gameState.current.particles.forEach((p, i) => {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillStyle = `rgba(255, 0, 85, ${p.life / 30})`;
        ctx.fillRect(p.x, p.y, 3, 3);
      });
      gameState.current.particles = gameState.current.particles.filter(p => p.life > 0);
    };

    // --- MAIN GAME LOOP ---
    const loop = () => {
      const { width, height } = gameState.current;
      
      // Clear Screen
      ctx.clearRect(0, 0, width, height);

      // 1. Spawning
      gameState.current.spawnTimer++;
      if (gameState.current.spawnTimer > ENEMY_SPAWN_RATE) {
        gameState.current.enemies.push({
          x: Math.random() * (width - 40) + 20,
          y: -20
        });
        gameState.current.spawnTimer = 0;
      }

      // 2. Update & Draw Bullets
      gameState.current.bullets.forEach(b => {
        b.y -= BULLET_SPEED;
        drawBullet(b);
      });
      // Remove off-screen bullets
      gameState.current.bullets = gameState.current.bullets.filter(b => b.y > -20);

      // 3. Update & Draw Enemies
      gameState.current.enemies.forEach(e => {
        e.y += ENEMY_SPEED;
        drawEnemy(e);
      });
      // Remove off-screen enemies
      gameState.current.enemies = gameState.current.enemies.filter(e => e.y < height + 20);

      // 4. Collision Detection
      gameState.current.bullets.forEach((b, bIdx) => {
        gameState.current.enemies.forEach((e, eIdx) => {
          const dx = b.x - e.x;
          const dy = b.y - e.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 20) {
            // HIT!
            gameState.current.bullets[bIdx].dead = true;
            gameState.current.enemies[eIdx].dead = true;
            gameState.current.score += 100;

            // Spawn Particles
            for(let i=0; i<8; i++) {
              gameState.current.particles.push({
                x: e.x, y: e.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 30
              });
            }
          }
        });
      });

      // Cleanup dead entities
      gameState.current.bullets = gameState.current.bullets.filter(b => !b.dead);
      gameState.current.enemies = gameState.current.enemies.filter(e => !e.dead);

      // 5. Draw Particles
      drawParticles();

      // 6. Draw Ship
      drawShip(gameState.current.shipX, height - SHIP_Y_OFFSET);

      // 7. Draw Score (Directly on canvas for max performance)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
      ctx.font = '20px Orbitron';
      ctx.fillText(`SCORE: ${gameState.current.score}`, 20, 40);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- INPUT HANDLERS ---
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Smooth clamping so ship doesn't leave screen
    gameState.current.shipX = Math.max(20, Math.min(x, rect.width - 20));
  };

  const handleClick = () => {
    // Fire bullet
    gameState.current.bullets.push({
      x: gameState.current.shipX,
      y: gameState.current.height - SHIP_Y_OFFSET - 20
    });
  };

  // --- UI ANIMATIONS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const shakeVariant = {
    hover: {
      x: [0, -2, 2, -2, 2, 0],
      scale: 1.02,
      textShadow: "0px 0px 10px rgb(0, 243, 255)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95, color: "var(--neon-pink)" }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ 
        height: '90vh', 
        position: 'relative', 
        overflow: 'hidden', 
        cursor: 'crosshair',
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)'
      }}
    >
      
      {/* === CANVAS GAME LAYER === */}
      <canvas 
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
      />

      {/* === UI LAYER === */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--neon-pink)', letterSpacing: '5px' }}>
            SYSTEM ONLINE // WELCOME USER
            </h2>
            
            <motion.h1 
                className="glitch-hover" 
                variants={shakeVariant}
                whileHover="hover"
                whileTap="tap"
                style={{ 
                    fontSize: '5rem', 
                    margin: '20px 0', 
                    textShadow: '4px 4px 0px #000',
                    cursor: 'pointer',
                    pointerEvents: 'auto' 
                }}
            >
            DONALD GRANT <span className="text-cyan">SOMBRIO</span>
            </motion.h1>

            <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto 40px', color: '#ccc', textShadow: '0 2px 4px black' }}>
            Building <span className="text-yellow">Professional Solutions</span> in a Digital World.
            </p>
            
            <div style={{ pointerEvents: 'auto' }}> 
                <a href="#projects" className="cyber-btn" onClick={(e) => e.stopPropagation()}>
                    INITIALIZE_PORTFOLIO
                </a>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;