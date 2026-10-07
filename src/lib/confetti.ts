import confetti from 'canvas-confetti';

export function triggerConfetti(origin?: { x: number; y: number }) {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: origin || { x: 0.5, y: 0.6 },
      colors: ['#FFE600', '#FF4757', '#00E5FF', '#2ED573', '#9C27B0', '#FFA502'],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.1,
      shapes: ['square', 'circle'],
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn('Confetti trigger failed:', err);
  }
}

export function triggerBurst() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFE600', '#FF4757', '#00E5FF', '#2ED573'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  } catch (err) {
    console.warn('Burst trigger failed:', err);
  }
}
