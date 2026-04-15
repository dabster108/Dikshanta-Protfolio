import { useEffect, useMemo, useState } from "react";
import { Application, Graphics, Container, Point } from "pixi.js";

interface Particle {
  sprite: Graphics;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 75;

const PixiParticleField = () => {
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const mobileAgent = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    return mobileAgent || navigator.hardwareConcurrency <= 4;
  }, []);

  useEffect(() => {
    if (!host || isLowPower) return;

    const app = new Application();
    const stage = new Container();
    const cursor = new Point(-1000, -1000);
    const particles: Particle[] = [];

    const createParticle = (width: number, height: number) => {
      const particle = new Graphics();
      const radius = Math.random() * 1.7 + 0.9;
      particle.circle(0, 0, radius).fill({ color: 0x8e7aff, alpha: 0.45 });
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
      return particle;
    };

    const init = async () => {
      await app.init({
        resizeTo: host,
        antialias: true,
        backgroundAlpha: 0,
        preference: "webgl",
      });

      host.appendChild(app.canvas);
      app.stage.addChild(stage);

      const { width, height } = app.screen;
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const sprite = createParticle(width, height);
        stage.addChild(sprite);
        particles.push({
          sprite,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
        });
      }

      app.stage.eventMode = "static";
      app.stage.hitArea = app.screen;
      app.stage.on("pointermove", (e) => {
        cursor.x = e.global.x;
        cursor.y = e.global.y;
      });

      app.ticker.maxFPS = 60;
      app.ticker.add(() => {
        const maxX = app.screen.width;
        const maxY = app.screen.height;

        for (const particle of particles) {
          const p = particle.sprite;
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 120 - distance) / 120;

          p.x += particle.vx + dx * influence * 0.008;
          p.y += particle.vy + dy * influence * 0.008;

          if (p.x < 0 || p.x > maxX) particle.vx *= -1;
          if (p.y < 0 || p.y > maxY) particle.vy *= -1;
        }
      });
    };

    void init();

    return () => {
      app.destroy(true, { children: true, texture: true });
    };
  }, [host, isLowPower]);

  if (isLowPower) return null;

  return (
    <div
      ref={setHost}
      className="fixed inset-0 pointer-events-none z-0 opacity-55"
      aria-hidden="true"
    />
  );
};

export default PixiParticleField;
