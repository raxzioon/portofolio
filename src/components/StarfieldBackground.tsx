import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleDirection: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Star generation
    const starColors = ['#ffffff', '#e0e7ff', '#bfdbfe', '#93c5fd', '#60a5fa'];
    let stars: Star[] = [];

    const initStars = () => {
      const starCount = Math.floor((width * height) / 2500); // density
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          baseAlpha: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
          color: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const maxShootingStars = 2;

    const spawnShootingStar = () => {
      if (shootingStars.filter((s) => s.active).length < maxShootingStars) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // ~45 deg downward
          alpha: 1,
          active: true
        });
      }
    };

    // Trigger meteors randomly
    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnShootingStar();
      }
    }, 2800);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.03;
      targetMouseY = (e.clientY - height / 2) * 0.03;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const render = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle space background gradient
      const bgGradient = ctx.createRadialGradient(
        width * 0.5 + mouseX,
        height * 0.3 + mouseY,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGradient.addColorStop(0, '#060b1e');
      bgGradient.addColorStop(0.5, '#040714');
      bgGradient.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw deep space nebulas (soft glowing orbs)
      const nebula1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 0.5,
        height * 0.25 + mouseY * 0.5,
        0,
        width * 0.2,
        height * 0.25,
        width * 0.4
      );
      nebula1.addColorStop(0, 'rgba(44, 103, 237, 0.08)');
      nebula1.addColorStop(0.5, 'rgba(30, 64, 175, 0.03)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.85 - mouseX * 0.4,
        height * 0.65 - mouseY * 0.4,
        0,
        width * 0.85,
        height * 0.65,
        width * 0.45
      );
      nebula2.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      nebula2.addColorStop(0.6, 'rgba(44, 103, 237, 0.02)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Render & update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle update
        star.alpha += star.twinkleSpeed * star.twinkleDirection;
        if (star.alpha > star.baseAlpha + 0.3 || star.alpha > 0.95) {
          star.twinkleDirection = -1;
        } else if (star.alpha < star.baseAlpha - 0.2 || star.alpha < 0.15) {
          star.twinkleDirection = 1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(
          star.x + mouseX * (star.size * 0.3),
          star.y + mouseY * (star.size * 0.3),
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.alpha));
        ctx.fill();

        // Glow for larger stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(
            star.x + mouseX * (star.size * 0.3),
            star.y + mouseY * (star.size * 0.3),
            star.size * 2.5,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'rgba(44, 103, 237, 0.25)';
          ctx.fill();
        }
      }

      // Render & update shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];
        if (!s.active) continue;

        ctx.save();
        ctx.beginPath();
        const headX = s.x;
        const headY = s.y;
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, 'rgba(44, 103, 237, 0)');
        gradient.addColorStop(0.6, 'rgba(56, 189, 248, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Glowing tip
        ctx.beginPath();
        ctx.arc(headX, headY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#2c67ed';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Advance shooting star
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.012;

        if (s.x > width + 100 || s.y > height + 100 || s.alpha <= 0) {
          s.active = false;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(shootingInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
