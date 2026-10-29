import React, { useEffect, useRef, useState } from 'react';

interface WinterNoelCapybaraProps {
  enabled: boolean;
  currentWord: string;
  onPetCapybara: (capyName: string, bonusXp: number, quoteEn: string) => void;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
  isStar: boolean;
}

const CAPY_QUOTES: Record<string, { quoteEn: string; quoteVi: string }[]> = {
  sleigh: [
    {
      quoteEn: 'Ho ho ho! Master collocations, not isolated words!',
      quoteVi: 'Hô hô hô! Học theo cụm Collocation nhớ lâu gấp 3 lần đó!',
    },
    {
      quoteEn: 'Glide through TOEIC & IELTS like a Capybara on snow!',
      quoteVi: 'Lướt qua đề TOEIC & IELTS mượt như Capybara trượt tuyết nhé!',
    },
  ],
  onsen: [
    {
      quoteEn: 'Stay chill like a Capybara and review your SRS daily!',
      quoteVi: 'Cứ bình tĩnh như Capybara đội quýt, ôn SRS đều đặn mỗi ngày!',
    },
    {
      quoteEn: 'Warm tea, cozy Santa coat, and 10 C1 words a day!',
      quoteVi: 'Trà ấm, áo Noel đỏ và 10 từ vựng chuẩn C1 mỗi ngày!',
    },
  ],
  reindeer: [
    {
      quoteEn: 'Special Christmas delivery: Band 8.0 Lexical Resource!',
      quoteVi: 'Shipper Tuần lộc Capy giao quà: Band 8.0 từ vựng học thuật!',
    },
    {
      quoteEn: 'Click any chunk to hear native US/UK pronunciation!',
      quoteVi: 'Bấm vào từng cụm từ để nghe giọng đọc bản xứ Anh-Mỹ nhé!',
    },
  ],
};

/**
 * SVG Illustration: Capybara wearing a cozy Santa coat, white fur trim, Santa hat, and a tangerine on top
 */
export const SantaCapybaraSvg: React.FC<{
  variant: 'sleigh' | 'onsen' | 'reindeer';
  className?: string;
}> = ({ variant, className = 'w-20 h-20' }) => {
  return (
    <svg
      viewBox="0 0 140 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shadow */}
      <ellipse cx="70" cy="124" rx="46" ry="7" fill="rgba(15, 23, 42, 0.18)" />

      {/* Sleigh / Snowboard for 'sleigh' variant */}
      {variant === 'sleigh' && (
        <g>
          <path
            d="M16 116 C35 122, 102 122, 124 108 C129 104, 132 98, 126 95"
            stroke="#B45309"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="26" y="106" width="82" height="8" rx="4" fill="#DC2626" />
          <rect x="38" y="112" width="6" height="7" rx="2" fill="#78350F" />
          <rect x="90" y="112" width="6" height="7" rx="2" fill="#78350F" />
          {/* Gift bag on back of sleigh */}
          <circle cx="34" cy="88" r="16" fill="#15803D" />
          <path d="M26 75 L42 75 L38 82 L30 82 Z" fill="#FBBF24" />
        </g>
      )}

      {/* Warm Winter Snow Cushion for 'onsen' variant */}
      {variant === 'onsen' && (
        <g>
          <ellipse cx="70" cy="113" rx="44" ry="12" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
          <ellipse cx="70" cy="111" rx="36" ry="8" fill="#BAE6FD" />
        </g>
      )}

      {/* Reindeer Antlers for 'reindeer' variant */}
      {variant === 'reindeer' && (
        <g stroke="#78350F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 30 L42 12 M45 18 L36 16 M48 22 L53 14" />
          <path d="M84 30 L94 12 M91 18 L100 16 M88 22 L83 14" />
        </g>
      )}

      {/* Capybara Body in Red Santa Coat */}
      <path
        d="M34 80 C32 60, 48 52, 70 52 C92 52, 106 62, 104 82 L106 105 C106 111, 96 114, 70 114 C44 114, 34 111, 34 105 Z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="2"
      />

      {/* Fluffy White Santa Coat Trim (Vertical & Bottom) */}
      <rect x="64" y="55" width="12" height="58" rx="6" fill="#FFFFFF" />
      <rect x="31" y="103" width="78" height="11" rx="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Santa Black Belt & Gold Buckle */}
      <rect x="34" y="88" width="72" height="7" fill="#1E293B" />
      <rect x="63" y="86" width="14" height="11" rx="2" stroke="#FBBF24" strokeWidth="2.5" fill="#1E293B" />

      {/* Capybara Little Brown Paws */}
      <ellipse cx="48" cy="113" rx="8" ry="5" fill="#854D0E" />
      <ellipse cx="92" cy="113" rx="8" ry="5" fill="#854D0E" />
      <ellipse cx="38" cy="84" rx="7" ry="5" transform="rotate(-20 38 84)" fill="#A16207" />
      <ellipse cx="102" cy="82" rx="7" ry="5" transform="rotate(20 102 82)" fill="#A16207" />

      {/* Capybara Ears */}
      <ellipse cx="49" cy="36" rx="6" ry="8" transform="rotate(-15 49 36)" fill="#713F12" />
      <ellipse cx="87" cy="36" rx="6" ry="8" transform="rotate(15 87 36)" fill="#713F12" />

      {/* Capybara Head (Classic chubby rounded snout) */}
      <rect
        x="43"
        y="32"
        width="56"
        height="40"
        rx="19"
        fill="#A16207"
        stroke="#713F12"
        strokeWidth="2"
      />

      {/* Darker Snout / Muzzle Front */}
      <rect
        x="73"
        y="38"
        width="28"
        height="28"
        rx="12"
        fill="#854D0E"
      />

      {/* Cute Nostrils & Peaceful Mouth */}
      <circle cx="84" cy="47" r="2" fill="#422006" />
      <circle cx="93" cy="47" r="2" fill="#422006" />
      {variant === 'reindeer' && (
        /* Glowing Red Rudolph Nose for Reindeer Capy */
        <circle cx="96" cy="46" r="5.5" fill="#EF4444" stroke="#FCA5A5" strokeWidth="1.5" />
      )}
      <path
        d="M84 56 Q88 60 92 56"
        stroke="#422006"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Chill Closed/Happy Eyes & Rosy Winter Cheeks */}
      <path
        d="M56 47 Q61 44 65 47"
        stroke="#27272A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="59" cy="54" rx="5" ry="3" fill="#FDA4AF" opacity="0.65" />

      {/* Cozy Green & Red Striped Scarf around neck */}
      <rect x="42" y="66" width="54" height="10" rx="5" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
      <rect x="52" y="66" width="7" height="10" fill="#DC2626" />
      <rect x="68" y="66" width="7" height="10" fill="#DC2626" />
      <rect x="84" y="66" width="7" height="10" fill="#DC2626" />
      <path d="M80 73 L86 92 L75 92 L72 73 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.2" />

      {/* Santa Hat on Head */}
      <path
        d="M46 33 C50 13, 76 11, 90 28 Z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="2"
      />
      {/* Santa Hat White Brim */}
      <rect x="43" y="28" width="46" height="9" rx="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Santa Hat White Pom-Pom */}
      <circle cx="92" cy="24" r="6.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Iconic Tangerine (Quả Quýt) balanced on head for 'onsen' variant */}
      {variant === 'onsen' && (
        <g>
          <ellipse cx="66" cy="14" rx="8" ry="6.5" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M66 7 C69 4, 73 5, 71 8 Z" fill="#22C55E" />
        </g>
      )}
    </svg>
  );
};

export const WinterNoelCapybara: React.FC<WinterNoelCapybaraProps> = ({
  enabled,
  currentWord,
  onPetCapybara,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeBubble, setActiveBubble] = useState<{
    capy: string;
    en: string;
    vi: string;
  } | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<
    { id: number; x: number; label: string }[]
  >([]);

  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);

  // Track window scroll for Capybara Sledding & Snow Parallax
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, currentY / maxScroll));
      const delta = currentY - lastScrollY.current;

      setScrollProgress(progress);
      if (Math.abs(delta) > 2) {
        setScrollDirection(delta > 0 ? 'down' : 'up');
      }
      const clampedVel = Math.max(-18, Math.min(18, delta * 0.45));
      velocityRef.current = clampedVel;
      setScrollVelocity(clampedVel);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled]);

  // Snowfall Canvas Animation
  useEffect(() => {
    if (!enabled) return;
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
    };
    window.addEventListener('resize', handleResize);

    const flakeCount = Math.min(65, Math.floor(width / 22));
    const flakes: Snowflake[] = Array.from({ length: flakeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.2 + 1.5,
      speedY: Math.random() * 0.9 + 0.45,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.55 + 0.3,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.008,
      isStar: i % 7 === 0,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      // Gradually decay scroll velocity effect
      velocityRef.current *= 0.92;

      for (const f of flakes) {
        f.swing += f.swingSpeed;
        f.x += f.speedX + Math.sin(f.swing) * 0.45;
        // Scroll parallax makes snow swirl gently when scrolling
        f.y += f.speedY - velocityRef.current * 0.12;

        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        } else if (f.y < -15) {
          f.y = height + 10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 10) f.x = -10;
        if (f.x < -10) f.x = width + 10;

        ctx.save();
        ctx.beginPath();
        if (f.isStar) {
          ctx.font = `${Math.round(f.radius * 3.8)}px sans-serif`;
          ctx.fillStyle = `rgba(186, 230, 253, ${f.opacity})`;
          ctx.fillText('❄', f.x, f.y);
        } else {
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
          ctx.shadowColor = 'rgba(14, 165, 233, 0.35)';
          ctx.shadowBlur = 4;
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  const triggerCapyInteraction = (
    key: 'sleigh' | 'onsen' | 'reindeer',
    name: string,
    xPercent: number
  ) => {
    const pool = CAPY_QUOTES[key];
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setActiveBubble({
      capy: name,
      en: picked.quoteEn,
      vi: picked.quoteVi,
    });
    const id = Date.now() + Math.random();
    setFloatingHearts((prev) => [
      ...prev.slice(-4),
      { id, x: xPercent, label: '🎄 +5 XP 🍊' },
    ]);
    onPetCapybara(name, 5, picked.quoteEn);
  };

  // Compute vertical position of the Scroll-Sledding Capybara (from 28% below header to 80% of viewport height)
  const sledTopPercent = 28 + scrollProgress * 52;
  const sledTiltDeg = Math.max(-14, Math.min(14, scrollVelocity * 1.1));

  return (
    <>
      {/* 1. Fullscreen Non-Interactive Falling Snow Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-40"
      />

      {/* 2. Top Festive Christmas String Lights Garland */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden pointer-events-none select-none bg-gradient-to-r from-red-950/90 via-emerald-950/90 to-red-950/90 border-b border-red-800/40 py-1 px-3"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-bold text-amber-300">
              🎄 Mùa Đông Noel Capybara
            </span>
            <span className="text-emerald-200 hidden md:inline">
              • Cuộn trang để xem đàn Capybara mặc áo Noel trượt tuyết &amp; bấm vào Capybara để nhận quà XP!
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 text-red-400 animate-bulb-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 text-amber-300 animate-bulb-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 text-emerald-400 animate-bulb-3" />
            <span className="w-2.5 h-2.5 rounded-full bg-sky-300 text-sky-300 animate-bulb-1" />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 text-rose-400 animate-bulb-2" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300 text-amber-300 animate-bulb-3" />
          </div>
        </div>
      </div>

      {/* 3. Capybara #1: Scroll-Sledding Santa Capybara on the Right Edge */}
      <div
        style={{
          top: `${sledTopPercent}%`,
          transform: `translateY(-50%) rotate(${sledTiltDeg}deg)`,
          transition: 'top 0.18s ease-out, transform 0.2s ease-out',
        }}
        className="fixed right-3 sm:right-5 z-40 hidden sm:flex flex-col items-end group"
      >
        <button
          type="button"
          onClick={() =>
            triggerCapyInteraction('sleigh', 'Capy Santa Trượt Tuyết', 88)
          }
          title="Bấm vào Capybara trượt tuyết để nhận +5 XP & nghe câu chúc Noel!"
          className="relative cursor-pointer focus:outline-none group-hover:scale-110 transition-transform flex flex-col items-end"
        >
          <div className="mb-0.5 whitespace-nowrap px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold shadow-md border border-amber-300">
            🛷 Cuộn: {Math.round(scrollProgress * 100)}%
          </div>
          <div
            style={{
              transform: `scaleX(${scrollDirection === 'up' ? -1 : 1})`,
            }}
          >
            <SantaCapybaraSvg variant="sleigh" className="w-16 h-16 drop-shadow-lg" />
          </div>
        </button>
      </div>

      {/* 4. Bottom Snowy Noel Village Ridge with Capybara #2 (Onsen Tangerine) & Capybara #3 (Reindeer) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none flex items-end justify-between px-3 sm:px-8 pb-1 overflow-hidden">
        {/* Left: Capybara #2 — Chill Santa Capybara with Tangerine */}
        <div className="pointer-events-auto flex items-end gap-2">
          <button
            type="button"
            onClick={() =>
              triggerCapyInteraction('onsen', 'Capy Noel Đội Quýt', 12)
            }
            className="group relative flex items-end cursor-pointer focus:outline-none"
            title="Bấm để xoa đầu Capybara Noel Đội Quýt (+5 XP)"
          >
            <div className="animate-capy-bob">
              <SantaCapybaraSvg
                variant="onsen"
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="mb-2 -ml-1 px-2 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-red-600 dark:text-amber-300 border border-red-200 dark:border-red-800 text-[10px] font-extrabold shadow-xs">
              🍊 Capy Quýt Noel
            </span>
          </button>
        </div>

        {/* Center Interactive Speech Bubble when user clicks any Capybara */}
        {activeBubble && (
          <div className="pointer-events-auto mb-2 max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-red-400 dark:border-red-700 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-3 animate-bounce">
            <span className="text-xl">🎅</span>
            <div className="text-xs">
              <div className="font-extrabold text-red-600 dark:text-red-400">
                {activeBubble.capy} nói:
              </div>
              <div className="font-bold text-slate-900 dark:text-white">
                “{activeBubble.en}”
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {activeBubble.vi}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveBubble(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Right: Capybara #3 — Reindeer Antlers Postman Capybara Waddling in the Snow */}
        <div className="pointer-events-auto flex items-end gap-2 mr-12 sm:mr-20">
          <button
            type="button"
            onClick={() =>
              triggerCapyInteraction('reindeer', 'Capy Tuần Lộc Phát Quà', 75)
            }
            className="group relative flex items-end cursor-pointer focus:outline-none"
            title="Bấm vào Capybara Tuần Lộc để nhận quà từ vựng (+5 XP)"
          >
            <span className="mb-2 -mr-1 px-2 py-0.5 rounded-full bg-emerald-700 text-white border border-amber-300 text-[10px] font-extrabold shadow-xs hidden md:inline">
              🦌 Capy Tuần Lộc
            </span>
            <div className="animate-capy-waddle">
              <SantaCapybaraSvg
                variant="reindeer"
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Floating +XP / Tangerine Burst on Petting */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          style={{ left: `${h.x}%`, bottom: '85px' }}
          className="fixed z-50 pointer-events-none font-extrabold text-xs px-2.5 py-1 rounded-full bg-red-600 text-white shadow-lg border border-amber-300 animate-float-up"
        >
          {h.label}
        </div>
      ))}
    </>
  );
};
