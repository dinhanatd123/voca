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

/**
 * Animated Chibi Santa Capybara Sprite SVG with Walk Cycle (pose 0..3), Action Gestures, & Rally Swing
 */
export const SantaCapybaraSvg: React.FC<{
  variant: 'sleigh' | 'onsen' | 'reindeer';
  pose?: number;
  actionType?: 'idle' | 'walk' | 'wave' | 'rally-out' | 'rally-in' | 'celebrate';
  facingLeft?: boolean;
  className?: string;
}> = ({
  variant,
  pose = 0,
  actionType = 'idle',
  facingLeft = false,
  className = 'w-24 h-24',
}) => {
  // Compute limb offsets from pose (0..3) for lively walking gait like TBY chibi sprite sheet
  const legLeftY =
    actionType === 'walk' ? (pose === 1 ? -5 : pose === 3 ? 2 : 0) : 0;
  const legRightY =
    actionType === 'walk' ? (pose === 3 ? -5 : pose === 1 ? 2 : 0) : 0;
  const armWaveRot =
    actionType === 'wave' || actionType === 'celebrate'
      ? pose % 2 === 0
        ? -38
        : 18
      : actionType === 'rally-out'
      ? -52
      : actionType === 'rally-in'
      ? 24
      : actionType === 'walk'
      ? pose % 2 === 0
        ? 14
        : -14
      : 0;

  const bodyJumpY =
    actionType === 'celebrate' ? (pose % 2 === 0 ? -7 : 0) : 0;

  return (
    <svg
      viewBox="0 0 140 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: facingLeft ? 'scaleX(-1)' : undefined,
        overflow: 'visible',
      }}
    >
      {/* Ground Soft Shadow */}
      <ellipse cx="70" cy="124" rx="38" ry="6" fill="rgba(15, 23, 42, 0.18)" />

      <g transform={`translate(0, ${bodyJumpY})`}>
        {/* Reindeer Antlers for Buddy Capybara */}
        {variant === 'reindeer' && (
          <g
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M52 30 L42 12 M45 18 L36 16 M48 22 L53 14" />
            <path d="M84 30 L94 12 M91 18 L100 16 M88 22 L83 14" />
          </g>
        )}

        {/* Stepping Feet (Animated during walk cycle) */}
        <ellipse
          cx="52"
          cy={115 + legLeftY}
          rx="9"
          ry="5.5"
          fill="#713F12"
          stroke="#422006"
          strokeWidth="1.5"
        />
        <ellipse
          cx="88"
          cy={115 + legRightY}
          rx="9"
          ry="5.5"
          fill="#713F12"
          stroke="#422006"
          strokeWidth="1.5"
        />

        {/* Capybara Body in Festive Red Santa Coat */}
        <path
          d="M36 80 C34 60, 48 52, 70 52 C92 52, 104 62, 102 82 L104 105 C104 111, 94 114, 70 114 C46 114, 36 111, 36 105 Z"
          fill={variant === 'reindeer' ? '#B91C1C' : '#DC2626'}
          stroke="#7F1D1D"
          strokeWidth="2"
        />

        {/* Fluffy White Santa Coat Trim */}
        <rect x="64" y="55" width="12" height="58" rx="6" fill="#FFFFFF" />
        <rect
          x="33"
          y="103"
          width="74"
          height="10"
          rx="5"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Santa Black Belt & Gold Buckle */}
        <rect x="36" y="88" width="68" height="7" fill="#1E293B" />
        <rect
          x="63"
          y="86"
          width="14"
          height="11"
          rx="2"
          stroke="#FBBF24"
          strokeWidth="2.5"
          fill="#1E293B"
        />

        {/* Left Arm */}
        <ellipse
          cx="36"
          cy="84"
          rx="8"
          ry="5"
          transform={`rotate(${-18 - armWaveRot * 0.5} 36 84)`}
          fill="#A16207"
          stroke="#713F12"
          strokeWidth="1.5"
        />

        {/* Right Arm + Noel Racket / Candy Cane during Rally or Wave */}
        <g transform={`rotate(${armWaveRot} 98 80)`}>
          <ellipse
            cx="102"
            cy="82"
            rx="8"
            ry="5.5"
            fill="#A16207"
            stroke="#713F12"
            strokeWidth="1.5"
          />
          {(actionType === 'rally-out' || actionType === 'rally-in') && (
            <g>
              {/* Festive Noel Badminton Racket */}
              <line
                x1="106"
                y1="80"
                x2="124"
                y2="62"
                stroke="#FBBF24"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <ellipse
                cx="130"
                cy="55"
                rx="11"
                ry="14"
                transform="rotate(35 130 55)"
                stroke="#EF4444"
                strokeWidth="3"
                fill="rgba(255,255,255,0.35)"
              />
            </g>
          )}
        </g>

        {/* Capybara Ears */}
        <ellipse
          cx="49"
          cy="36"
          rx="6"
          ry="8"
          transform="rotate(-15 49 36)"
          fill="#713F12"
        />
        <ellipse
          cx="87"
          cy="36"
          rx="6"
          ry="8"
          transform="rotate(15 87 36)"
          fill="#713F12"
        />

        {/* Capybara Head */}
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

        {/* Darker Snout Front */}
        <rect x="73" y="38" width="28" height="28" rx="12" fill="#854D0E" />

        {/* Nostrils & Mouth */}
        <circle cx="84" cy="47" r="2" fill="#422006" />
        <circle cx="93" cy="47" r="2" fill="#422006" />
        {variant === 'reindeer' && (
          <circle
            cx="96"
            cy="46"
            r="5"
            fill="#EF4444"
            stroke="#FCA5A5"
            strokeWidth="1.5"
          />
        )}
        <path
          d="M84 56 Q88 60 92 56"
          stroke="#422006"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Expressive Eyes & Rosy Cheeks */}
        {actionType === 'celebrate' ? (
          <path
            d="M55 47 L60 43 L65 47"
            stroke="#27272A"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <circle cx="60" cy="46" r="3" fill="#1E293B" />
        )}
        <ellipse cx="59" cy="54" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />

        {/* Cozy Green & Red Striped Scarf */}
        <rect
          x="42"
          y="66"
          width="54"
          height="10"
          rx="5"
          fill="#16A34A"
          stroke="#14532D"
          strokeWidth="1.5"
        />
        <rect x="52" y="66" width="7" height="10" fill="#DC2626" />
        <rect x="68" y="66" width="7" height="10" fill="#DC2626" />
        <rect x="84" y="66" width="7" height="10" fill="#DC2626" />

        {/* Santa Hat */}
        <path
          d="M46 33 C50 13, 76 11, 90 28 Z"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="2"
        />
        <rect
          x="43"
          y="28"
          width="46"
          height="9"
          rx="4.5"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <circle
          cx="92"
          cy="24"
          r="6.5"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Tangerine on head for 'onsen' or celebrate */}
        {(variant === 'onsen' || actionType === 'celebrate') && (
          <g>
            <ellipse
              cx="66"
              cy="14"
              rx="7.5"
              ry="6"
              fill="#F97316"
              stroke="#C2410C"
              strokeWidth="1.5"
            />
            <path d="M66 7 C69 4, 73 5, 71 8 Z" fill="#22C55E" />
          </g>
        )}
      </g>
    </svg>
  );
};

export const WinterNoelCapybara: React.FC<WinterNoelCapybaraProps> = ({
  enabled,
  currentWord,
  onPetCapybara,
}) => {
  const snowCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mascotRef = useRef<HTMLDivElement | null>(null);
  const buddyRef = useRef<HTMLDivElement | null>(null);
  const shuttleRef = useRef<HTMLDivElement | null>(null);
  const spectatorsRef = useRef<HTMLDivElement | null>(null);

  const [mascotState, setMascotState] = useState<{
    pose: number;
    facingLeft: boolean;
    actionType: 'idle' | 'walk' | 'wave' | 'rally-out' | 'rally-in' | 'celebrate';
    statusLabel: string;
  }>({
    pose: 0,
    facingLeft: false,
    actionType: 'walk',
    statusLabel: '',
  });

  const [buddyState, setBuddyState] = useState<{
    visible: boolean;
    pose: number;
    facingLeft: boolean;
    actionType: 'idle' | 'walk' | 'wave' | 'rally-out' | 'rally-in' | 'celebrate';
  }>({
    visible: false,
    pose: 0,
    facingLeft: true,
    actionType: 'walk',
  });

  const [spectatorState, setSpectatorState] = useState<{
    visible: boolean;
    bounce: number;
  }>({
    visible: false,
    bounce: 0,
  });

  const [floatingBursts, setFloatingBursts] = useState<
    { id: number; x: number; y: number; text: string }[]
  >([]);

  // ============================================================================
  // 1. TBY Scroll-Driven 3D Page Depth & Pointer-Tilt Engine (motion.js port)
  // ============================================================================
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('page-depth-ready');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    const cardSelector = [
      '#tab-tier > div',
      '#tab-matrix > div',
      '#tab-practice > div',
      '#tab-phrasebook > div',
      '#vocabSidebar',
    ].join(',');

    const tracked = new Map<
      HTMLElement,
      { strength: number; pointerX: number; pointerY: number }
    >();
    const active = new Set<HTMLElement>();
    const playedReveal = new Set<HTMLElement>();
    let frame = 0;

    const clamp = (val: number, min = -1, max = 1) =>
      Math.min(max, Math.max(min, val));

    // Entrance Reveal Observer (like TBY motion.js first observer)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          revealObserver.unobserve(el);
          if (playedReveal.has(el) || reducedMotion.matches) continue;
          playedReveal.add(el);
          el.animate(
            [
              { opacity: 0.55, transform: 'translateY(14px)' },
              { opacity: 1, transform: 'translateY(0px)' },
            ],
            {
              duration: 420,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            }
          );
        }
      },
      { threshold: 0, rootMargin: '0px 0px -24px 0px' }
    );

    // 3D Depth Active Viewport Observer
    const depthObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        });
        requestTick();
      },
      { rootMargin: '18% 0px 18% 0px', threshold: 0 }
    );

    const updateDepth = () => {
      frame = 0;
      if (document.hidden || reducedMotion.matches) return;

      const viewport = Math.max(1, window.innerHeight);
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - viewport
      );
      const scrollProgress = clamp(window.scrollY / maxScroll, 0, 1);
      document.documentElement.style.setProperty(
        '--scroll-progress',
        scrollProgress.toFixed(4)
      );

      // Update ambient background orbs
      const orbShiftY = (scrollProgress - 0.5) * -48;
      const orbShiftX = (scrollProgress - 0.5) * 24;
      document.documentElement.style.setProperty(
        '--section-depth-y',
        `${orbShiftY.toFixed(1)}px`
      );
      document.documentElement.style.setProperty(
        '--section-depth-x',
        `${orbShiftX.toFixed(1)}px`
      );

      const mobile = coarsePointer.matches || window.innerWidth < 769;

      active.forEach((el) => {
        if (!el.isConnected) {
          active.delete(el);
          tracked.delete(el);
          return;
        }
        const meta = tracked.get(el);
        if (!meta) return;
        const rect = el.getBoundingClientRect();
        const position = clamp(
          (rect.top + rect.height * 0.5 - viewport * 0.5) / (viewport * 0.82)
        );
        const strength = meta.strength;
        const scrollY = position * (mobile ? -7 : -14) * strength;
        const depthZ =
          (1 - Math.min(1, Math.abs(position))) * (mobile ? 6 : 12) * strength;
        const scrollRotate = position * (mobile ? -0.8 : -1.35) * strength;
        const pointerRotateX = mobile ? 0 : -meta.pointerY * 4.5 * strength;
        const pointerRotateY = mobile ? 0 : meta.pointerX * 5.5 * strength;

        el.style.setProperty('--motion-y', `${scrollY.toFixed(2)}px`);
        el.style.setProperty('--motion-z', `${depthZ.toFixed(2)}px`);
        el.style.setProperty(
          '--motion-rx',
          `${(scrollRotate + pointerRotateX).toFixed(2)}deg`
        );
        el.style.setProperty('--motion-ry', `${pointerRotateY.toFixed(2)}deg`);
      });
    };

    const requestTick = () => {
      if (!frame && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(updateDepth);
      }
    };

    const registerCard = (el: HTMLElement) => {
      if (tracked.has(el)) return;
      const isSidebar = el.id === 'vocabSidebar';
      const meta = {
        strength: isSidebar ? 0.35 : 0.85,
        pointerX: 0,
        pointerY: 0,
      };
      tracked.set(el, meta);
      el.classList.add('motion-depth', 'motion-depth-card');

      if (!coarsePointer.matches) {
        el.addEventListener(
          'pointermove',
          (e) => {
            const r = el.getBoundingClientRect();
            meta.pointerX = clamp(
              (e.clientX - r.left) / Math.max(1, r.width) - 0.5,
              -0.5,
              0.5
            );
            meta.pointerY = clamp(
              (e.clientY - r.top) / Math.max(1, r.height) - 0.5,
              -0.5,
              0.5
            );
            requestTick();
          },
          { passive: true }
        );
        el.addEventListener(
          'pointerleave',
          () => {
            meta.pointerX = 0;
            meta.pointerY = 0;
            requestTick();
          },
          { passive: true }
        );
      }

      revealObserver.observe(el);
      depthObserver.observe(el);
    };

    const collectCards = () => {
      main.querySelectorAll<HTMLElement>(cardSelector).forEach(registerCard);
      requestTick();
    };

    const mutObserver = new MutationObserver(() => {
      window.requestAnimationFrame(collectCards);
    });
    mutObserver.observe(main, { childList: true, subtree: true });

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    collectCards();

    return () => {
      mutObserver.disconnect();
      revealObserver.disconnect();
      depthObserver.disconnect();
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // ============================================================================
  // 2. TBY Mascot Autonomous Patrol + Duo Snowball/Shuttle Rally + Spectators
  //    (mascot-scene-r21.js port with 3 Santa Capybaras)
  // ============================================================================
  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let timerId = 0;
    const isSmall = () => window.innerWidth <= 760;
    const size = () => (isSmall() ? 84 : 106);
    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const bounds = () => {
      const width = document.documentElement.clientWidth || window.innerWidth;
      const height =
        document.documentElement.clientHeight || window.innerHeight;
      const s = size();
      return {
        minX: 16,
        maxX: Math.max(16, width - s - 16),
        minY: 16,
        maxY: Math.max(16, height - s - 10),
      };
    };

    let x = 36;
    let y = bounds().maxY;
    let facing = 0; // 0 = right, 1 = left
    let gaitTime = 0;
    let restCount = 0;
    let nextDuo = 1; // Trigger the first Duo Rally quickly!
    let lastTime: number | null = null;

    let route: {
      sx: number;
      ex: number;
      duration: number;
      elapsed: number;
    } | null = null;

    let action: {
      duration: number;
      elapsed: number;
    } | null = null;

    let duoScene: {
      phase: 'corner' | 'invite' | 'enter' | 'greet' | 'rally' | 'celebrate' | 'leave';
      elapsed: number;
      start: number;
      home: number;
      partner: number;
      outside: number;
      left: boolean;
      duration: number;
      entryDuration: number;
    } | null = null;

    const placeMain = (posX: number, posY: number, bobY = 0) => {
      if (mascotRef.current) {
        mascotRef.current.style.transform = `translate3d(${posX.toFixed(
          1
        )}px, ${(posY + bobY).toFixed(1)}px, 0)`;
      }
    };

    const placeBuddy = (posX: number, posY: number, opacity = 1) => {
      if (buddyRef.current) {
        buddyRef.current.style.transform = `translate3d(${posX.toFixed(
          1
        )}px, ${posY.toFixed(1)}px, 0)`;
        buddyRef.current.style.opacity = String(opacity);
      }
    };

    const placeShuttle = (
      posX: number,
      posY: number,
      angleDeg: number,
      visible: boolean
    ) => {
      if (shuttleRef.current) {
        shuttleRef.current.style.display = visible ? 'block' : 'none';
        shuttleRef.current.style.transform = `translate3d(${posX.toFixed(
          1
        )}px, ${posY.toFixed(1)}px, 0) rotate(${angleDeg.toFixed(1)}deg)`;
      }
    };

    const placeSpectators = (
      posX: number,
      posY: number,
      opacity: number,
      visible: boolean
    ) => {
      if (spectatorsRef.current) {
        spectatorsRef.current.style.display = visible ? 'flex' : 'none';
        spectatorsRef.current.style.opacity = String(opacity);
        spectatorsRef.current.style.transform = `translate3d(${posX.toFixed(
          1
        )}px, ${posY.toFixed(1)}px, 0)`;
      }
    };

    const updateMainState = (next: {
      pose: number;
      facingLeft: boolean;
      actionType: 'idle' | 'walk' | 'wave' | 'rally-out' | 'rally-in' | 'celebrate';
      statusLabel: string;
    }) => {
      setMascotState((prev) =>
        prev.pose === next.pose &&
        prev.facingLeft === next.facingLeft &&
        prev.actionType === next.actionType &&
        prev.statusLabel === next.statusLabel
          ? prev
          : next
      );
    };

    const updateBuddyState = (next: {
      visible: boolean;
      pose: number;
      facingLeft: boolean;
      actionType: 'idle' | 'walk' | 'wave' | 'rally-out' | 'rally-in' | 'celebrate';
    }) => {
      setBuddyState((prev) =>
        prev.visible === next.visible &&
        prev.pose === next.pose &&
        prev.facingLeft === next.facingLeft &&
        prev.actionType === next.actionType
          ? prev
          : next
      );
    };

    const updateSpectatorState = (next: { visible: boolean; bounce: number }) => {
      setSpectatorState((prev) =>
        prev.visible === next.visible && prev.bounce === next.bounce
          ? prev
          : next
      );
    };

    const planNextWalk = (delay = 900) => {
      window.clearTimeout(timerId);
      timerId = window.setTimeout(startWalk, delay);
    };

    const startWalk = () => {
      const b = bounds();
      y = b.maxY;
      x = clamp(x, b.minX, b.maxX);
      let ex = facing === 0 ? b.maxX : b.minX;
      if (Math.abs(ex - x) < 20) {
        facing = facing === 0 ? 1 : 0;
        ex = facing === 0 ? b.maxX : b.minX;
      }
      const speed = isSmall() ? 55 : 78;
      const stretch = Math.min(
        speed * (2.5 + Math.random() * 2),
        (b.maxX - b.minX) * 0.42
      );
      if (Math.abs(ex - x) > stretch) {
        ex = x + Math.sign(ex - x) * stretch;
      }
      const duration = Math.max(1100, (Math.abs(ex - x) / speed) * 1000);
      route = { sx: x, ex, duration, elapsed: 0 };
      lastTime = null;
      rafId = window.requestAnimationFrame(stepWalk);
    };

    const stepWalk = (now: number) => {
      if (!route) return;
      const delta = lastTime === null ? 16 : Math.min(now - lastTime, 60);
      lastTime = now;
      route.elapsed += delta;
      const u = Math.min(1, route.elapsed / route.duration);
      const eased = u * u * (3 - 2 * u);
      x = route.sx + (route.ex - route.sx) * eased;
      y = bounds().maxY;

      gaitTime += delta;
      const phase = gaitTime / 520;
      const poseIdx = Math.floor(phase * 4) % 4;
      const bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * 2.4;

      placeMain(x, y, bob);
      updateMainState({
        pose: poseIdx,
        facingLeft: route.ex < route.sx,
        actionType: 'walk',
        statusLabel: '',
      });

      if (u >= 1) {
        facing = route.ex < route.sx ? 0 : 1;
        route = null;
        startAction();
        return;
      }
      rafId = window.requestAnimationFrame(stepWalk);
    };

    const startAction = () => {
      action = { duration: 1500, elapsed: 0 };
      lastTime = null;
      rafId = window.requestAnimationFrame(stepAction);
    };

    const stepAction = (now: number) => {
      if (!action) return;
      const delta = lastTime === null ? 16 : Math.min(now - lastTime, 60);
      lastTime = now;
      action.elapsed += delta;
      const poseIdx = Math.floor(action.elapsed / 200) % 4;

      placeMain(x, bounds().maxY, 0);
      updateMainState({
        pose: poseIdx,
        facingLeft: facing === 1,
        actionType: 'wave',
        statusLabel: '🎄 Chào mùa đông!',
      });

      if (action.elapsed >= action.duration) {
        action = null;
        restCount++;
        if (restCount >= nextDuo) {
          startDuo();
        } else {
          planNextWalk(400);
        }
        return;
      }
      rafId = window.requestAnimationFrame(stepAction);
    };

    const startDuo = () => {
      const b = bounds();
      const span = b.maxX - b.minX;
      if (span < size() * 1.4) {
        planNextWalk(800);
        return;
      }
      const left = x < (b.minX + b.maxX) / 2;
      const home = left ? b.minX + 18 : b.maxX - 18;
      const courtDist = Math.min(span * 0.56, size() + 260);
      const partner = home + (left ? 1 : -1) * courtDist;
      const outside = left ? b.maxX + size() : b.minX - size();

      duoScene = {
        phase: 'corner',
        elapsed: 0,
        start: x,
        home,
        partner,
        outside,
        left,
        duration: Math.max(700, (Math.abs(home - x) / 85) * 1000),
        entryDuration: Math.max(1200, Math.min(3400, (Math.abs(outside - partner) / 130) * 1000)),
      };
      restCount = 0;
      nextDuo = 2;
      lastTime = null;
      rafId = window.requestAnimationFrame(stepDuo);
    };

    const switchDuoPhase = (
      phase: NonNullable<typeof duoScene>['phase']
    ) => {
      if (!duoScene) return;
      duoScene.phase = phase;
      duoScene.elapsed = 0;
      lastTime = null;
    };

    const stepDuo = (now: number) => {
      if (!duoScene) return;
      const delta = lastTime === null ? 16 : Math.min(now - lastTime, 60);
      lastTime = now;
      duoScene.elapsed += delta;
      const d = duoScene;
      const t = d.elapsed;
      const s = size();
      y = bounds().maxY;

      if (d.phase === 'corner') {
        const p = Math.min(1, t / d.duration);
        const u = p * p * (3 - 2 * p);
        x = d.start + (d.home - d.start) * u;
        placeMain(x, y, 0);
        updateMainState({
          pose: Math.floor(t / 150) % 4,
          facingLeft: d.home < d.start,
          actionType: 'walk',
          statusLabel: '',
        });
        if (p >= 1) {
          switchDuoPhase('invite');
        }
      } else if (d.phase === 'invite') {
        placeMain(d.home, y, 0);
        updateMainState({
          pose: Math.floor(t / 180) % 4,
          facingLeft: !d.left,
          actionType: 'wave',
          statusLabel: '🦌 Gọi Capy Tuần Lộc ra sân!',
        });
        if (t >= 950) {
          updateBuddyState({
            visible: true,
            pose: 0,
            facingLeft: d.left,
            actionType: 'walk',
          });
          placeBuddy(d.outside, y, 0);
          switchDuoPhase('enter');
        }
      } else if (d.phase === 'enter' || d.phase === 'leave') {
        const entering = d.phase === 'enter';
        const p = Math.min(1, t / d.entryDuration);
        const u = p * p * (3 - 2 * p);
        const bx = entering
          ? d.outside + (d.partner - d.outside) * u
          : d.partner + (d.outside - d.partner) * u;
        const op = entering ? Math.min(1, p * 4) : Math.min(1, (1 - p) * 4);

        placeBuddy(bx, y, op);
        updateBuddyState({
          visible: true,
          pose: Math.floor(t / 150) % 4,
          facingLeft: entering ? d.left : !d.left,
          actionType: 'walk',
        });
        updateMainState({
          pose: Math.floor(t / 200) % 4,
          facingLeft: !d.left,
          actionType: 'wave',
          statusLabel: entering ? '🎄 Đồng đội đang tới!' : '👋 Tạm biệt đồng đội!',
        });

        if (p >= 1) {
          if (entering) {
            switchDuoPhase('greet');
          } else {
            updateBuddyState({
              visible: false,
              pose: 0,
              facingLeft: true,
              actionType: 'walk',
            });
            placeShuttle(0, 0, 0, false);
            placeSpectators(0, 0, 0, false);
            duoScene = null;
            planNextWalk(700);
            return;
          }
        }
      } else if (d.phase === 'greet' || d.phase === 'celebrate') {
        const isCelebrate = d.phase === 'celebrate';
        placeMain(d.home, y, 0);
        placeBuddy(d.partner, y, 1);
        updateMainState({
          pose: Math.floor(t / 180) % 4,
          facingLeft: !d.left,
          actionType: isCelebrate ? 'celebrate' : 'wave',
          statusLabel: isCelebrate ? '🎉 Tuyệt vời! +XP' : '🤝 Chào đồng đội!',
        });
        updateBuddyState({
          visible: true,
          pose: Math.floor(t / 180) % 4,
          facingLeft: d.left,
          actionType: isCelebrate ? 'celebrate' : 'wave',
        });
        if (t >= 1300) {
          switchDuoPhase(isCelebrate ? 'leave' : 'rally');
        }
      } else if (d.phase === 'rally') {
        const beat = 860;
        const hit = Math.floor(t / beat);
        const p = (t % beat) / beat;
        const leftX = Math.min(d.home, d.partner);
        const rightX = Math.max(d.home, d.partner);
        const from = leftX + s * 0.78;
        const to = rightX + s * 0.12;
        const goRight = hit % 2 === 0;
        const q = goRight ? p : 1 - p;
        const sx = from + (to - from) * q;
        const arc = Math.min(76, (to - from) * 0.38);
        const sy = y + s * 0.42 - 4 * arc * p * (1 - p);
        const angle =
          (Math.atan2(
            -4 * arc * (1 - 2 * p),
            goRight ? to - from : -(to - from)
          ) *
            180) /
            Math.PI +
          180;

        placeShuttle(sx - 14, sy - 12, angle, true);

        const mainOutgoing = goRight === d.left;
        updateMainState({
          pose: Math.floor(t / 180) % 4,
          facingLeft: !d.left,
          actionType: mainOutgoing && p < 0.35 ? 'rally-out' : 'rally-in',
          statusLabel: `🏸 Đánh cầu tuyết: "${currentWord}"`,
        });
        updateBuddyState({
          visible: true,
          pose: Math.floor(t / 180) % 4,
          facingLeft: d.left,
          actionType: !mainOutgoing && p < 0.35 ? 'rally-out' : 'rally-in',
        });

        const b = bounds();
        const specX = d.left ? b.maxX - 110 : b.minX + 10;
        const specY = y + 10;
        const specOpacity = Math.min(1, t / 600);
        placeSpectators(specX, specY, specOpacity, true);
        updateSpectatorState({
          visible: true,
          bounce: Math.floor(t / 350) % 2,
        });

        if (t >= beat * 8) {
          placeShuttle(0, 0, 0, false);
          placeSpectators(specX, specY, 0, false);
          switchDuoPhase('celebrate');
        }
      }

      rafId = window.requestAnimationFrame(stepDuo);
    };

    startWalk();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
    };
  }, [enabled, currentWord]);

  // ============================================================================
  // 3. Gentle Winter Snowflakes Canvas
  // ============================================================================
  useEffect(() => {
    if (!enabled) return;
    const canvas = snowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const count = Math.min(50, Math.floor(width / 28));
    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1.4,
      speedY: Math.random() * 0.75 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.25,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.018 + 0.007,
      isStar: i % 8 === 0,
    }));

    const renderSnow = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.swing += f.swingSpeed;
        f.x += f.speedX + Math.sin(f.swing) * 0.4;
        f.y += f.speedY;
        if (f.y > height + 10) {
          f.y = -10;
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
          ctx.fill();
        }
        ctx.restore();
      }
      animId = window.requestAnimationFrame(renderSnow);
    };
    renderSnow();

    return () => {
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(animId);
    };
  }, [enabled]);

  const handleClickMascot = (
    e: React.MouseEvent,
    name: string,
    quoteEn: string
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setFloatingBursts((prev) => [
      ...prev.slice(-4),
      {
        id: Date.now() + Math.random(),
        x: rect.left + rect.width / 2,
        y: rect.top,
        text: '🎄 +5 XP 🍊',
      },
    ]);
    onPetCapybara(name, 5, quoteEn);
  };

  return (
    <>
      {/* Top Scroll Progress Bar (#tbyScrollBar) */}
      <div id="tbyScrollBar" aria-hidden="true" />

      {/* TBY Ambient 3D Parallax Depth Orbs */}
      <span className="section-depth-orb" aria-hidden="true" />
      <span
        className="section-depth-orb section-depth-orb-alt"
        aria-hidden="true"
      />

      {enabled && (
        <>
          {/* Gentle Winter Snow Canvas */}
          <canvas
            ref={snowCanvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-40"
          />

          {/* Mascot #1: Autonomous Patrol & Rally Leader (Santa Capybara) */}
          <div
            ref={mascotRef}
            onClick={(e) =>
              handleClickMascot(
                e,
                'Capy Santa Đội Trưởng',
                `Let's practice the word ${currentWord}!`
              )
            }
            title="Bấm vào Capybara Đội Trưởng để nhận +5 XP!"
            className="fixed left-0 top-0 z-40 w-[84px] h-[84px] sm:w-[106px] sm:h-[106px] cursor-pointer select-none will-change-transform"
          >
            {mascotState.statusLabel && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-slate-900/90 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold shadow-md pointer-events-none">
                {mascotState.statusLabel}
              </div>
            )}
            <SantaCapybaraSvg
              variant="sleigh"
              pose={mascotState.pose}
              actionType={mascotState.actionType}
              facingLeft={mascotState.facingLeft}
              className="w-full h-full drop-shadow-md"
            />
          </div>

          {/* Mascot #2: Duo Rally Partner (Reindeer Santa Capybara) */}
          <div
            ref={buddyRef}
            onClick={(e) =>
              handleClickMascot(
                e,
                'Capy Tuần Lộc Đồng Đội',
                'Great rally! Keep learning your collocations!'
              )
            }
            style={{ opacity: buddyState.visible ? 1 : 0 }}
            className={`fixed left-0 top-0 z-40 w-[84px] h-[84px] sm:w-[106px] sm:h-[106px] cursor-pointer select-none will-change-transform ${
              buddyState.visible ? '' : 'pointer-events-none hidden'
            }`}
          >
            <SantaCapybaraSvg
              variant="reindeer"
              pose={buddyState.pose}
              actionType={buddyState.actionType}
              facingLeft={buddyState.facingLeft}
              className="w-full h-full drop-shadow-md"
            />
          </div>

          {/* Flying Noel Shuttlecock / Golden Snowball during Duo Rally */}
          <div
            ref={shuttleRef}
            aria-hidden="true"
            style={{ display: 'none' }}
            className="fixed left-0 top-0 z-40 w-7 h-6 pointer-events-none will-change-transform"
          >
            <svg viewBox="0 0 28 24" className="w-full h-full drop-shadow">
              <path
                d="m8 12 18-7M8 12h20M8 12l18 7"
                fill="none"
                stroke="#FDE047"
                strokeWidth="2"
              />
              <ellipse
                cx="6"
                cy="12"
                rx="4.5"
                ry="5.5"
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Mascot #3: Cheering Spectators (Onsen Tangerine Capybara & Snowman) */}
          <div
            ref={spectatorsRef}
            style={{ display: 'none' }}
            onClick={(e) =>
              handleClickMascot(
                e,
                'Khán giả Capy Đội Quýt',
                'Awesome teamwork!'
              )
            }
            className="fixed left-0 top-0 z-39 items-end gap-1 cursor-pointer select-none will-change-transform"
          >
            <div
              style={{
                transform: `translateY(${spectatorState.bounce ? -4 : 0}px)`,
              }}
              className="flex flex-col items-center"
            >
              <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[9px] font-extrabold shadow border border-amber-300 mb-0.5">
                👏 Cổ vũ!
              </span>
              <SantaCapybaraSvg
                variant="onsen"
                pose={spectatorState.bounce}
                actionType="celebrate"
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow"
              />
            </div>
          </div>

          {/* Floating +5 XP Burst on Click */}
          {floatingBursts.map((b) => (
            <div
              key={b.id}
              style={{ left: `${b.x - 32}px`, top: `${b.y - 16}px` }}
              className="fixed z-50 pointer-events-none font-extrabold text-xs px-2.5 py-1 rounded-full bg-red-600 text-white shadow-lg border border-amber-300 animate-float-up"
            >
              {b.text}
            </div>
          ))}
        </>
      )}
    </>
  );
};
