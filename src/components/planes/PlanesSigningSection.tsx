"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cultureValues } from "../../data/cultureContent";

type FloatingItem =
  | {
      id: string;
      kind: "pill";
      text: string;
      color: string;
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      mass: number;
    }
  | {
      id: string;
      kind: "avatar";
      src: string;
      alt: string;
      x: number;
      y: number;
      size: number;
      mass: number;
    }
  | {
      id: string;
      kind: "logo";
      rows: [string, string][];
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      mass: number;
    };

type SimBody = FloatingItem & {
  vx: number;
  vy: number;
  vr: number;
  phase: number;
};

export type PlanesSigningSectionProps = {
  title?: string;
  logoRows?: [string, string][];
  /** Color del texto del logo central (ej. "#ffffff" o "#0a0a0a") */
  logoColor?: string;
  /** Sombra del logo — útil con texto claro sobre fondo claro */
  logoTextShadow?: string;
};

const AVATARS = [
  {
    src: "https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-2.jpg",
    alt: "Team member",
  },
  {
    src: "https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-1.jpg",
    alt: "Team member",
  },
  {
    src: "https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-3.jpg",
    alt: "Team member",
  },
  {
    src: "https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-4.jpg",
    alt: "Team member",
  },
  {
    src: "https://kota-content.b-cdn.net/app/uploads/2023/11/culture-row-5.jpg",
    alt: "Team member",
  },
];

const DEFAULT_LAYOUT: FloatingItem[] = [
  {
    id: "pill-legacy",
    kind: "pill",
    text: cultureValues[4].title,
    color: cultureValues[4].color,
    x: 0.2,
    y: 0.1,
    width: 210,
    height: 56,
    rotation: 38,
    mass: 1.1,
  },
  {
    id: "pill-crumbs",
    kind: "pill",
    text: cultureValues[3].title,
    color: cultureValues[3].color,
    x: 0.68,
    y: 0.06,
    width: 220,
    height: 56,
    rotation: -6,
    mass: 1,
  },
  {
    id: "pill-tune",
    kind: "pill",
    text: cultureValues[0].title,
    color: cultureValues[0].color,
    x: 0.1,
    y: 0.62,
    width: 150,
    height: 56,
    rotation: -28,
    mass: 0.95,
  },
  {
    id: "pill-dirty",
    kind: "pill",
    text: cultureValues[1].title,
    color: cultureValues[1].color,
    x: 0.34,
    y: 0.78,
    width: 170,
    height: 56,
    rotation: 4,
    mass: 1,
  },
  {
    id: "pill-diverse",
    kind: "pill",
    text: cultureValues[2].title,
    color: cultureValues[2].color,
    x: 0.88,
    y: 0.42,
    width: 200,
    height: 56,
    rotation: 90,
    mass: 1.05,
  },
  {
    id: "pill-content",
    kind: "pill",
    text: cultureValues[5].title,
    color: cultureValues[5].color,
    x: 0.52,
    y: 0.14,
    width: 200,
    height: 56,
    rotation: 18,
    mass: 1,
  },
  {
    id: "pill-ads",
    kind: "pill",
    text: cultureValues[6].title,
    color: cultureValues[6].color,
    x: 0.76,
    y: 0.86,
    width: 190,
    height: 56,
    rotation: -22,
    mass: 0.98,
  },
  {
    id: "avatar-1",
    kind: "avatar",
    src: AVATARS[0].src,
    alt: AVATARS[0].alt,
    x: 0.07,
    y: 0.18,
    size: 92,
    mass: 1.2,
  },
  {
    id: "avatar-2",
    kind: "avatar",
    src: AVATARS[1].src,
    alt: AVATARS[1].alt,
    x: 0.84,
    y: 0.14,
    size: 88,
    mass: 1.15,
  },
  {
    id: "avatar-3",
    kind: "avatar",
    src: AVATARS[2].src,
    alt: AVATARS[2].alt,
    x: 0.04,
    y: 0.48,
    size: 96,
    mass: 1.25,
  },
  {
    id: "avatar-4",
    kind: "avatar",
    src: AVATARS[3].src,
    alt: AVATARS[3].alt,
    x: 0.16,
    y: 0.82,
    size: 84,
    mass: 1.1,
  },
  {
    id: "avatar-5",
    kind: "avatar",
    src: AVATARS[4].src,
    alt: AVATARS[4].alt,
    x: 0.74,
    y: 0.72,
    size: 90,
    mass: 1.2,
  },
  {
    id: "logo",
    kind: "logo",
    rows: [
      ["IN", "NO"],
      ["VA", "FY"],
    ],
    x: 0.48,
    y: 0.46,
    width: 220,
    height: 220,
    rotation: -32,
    mass: 2.4,
  },
];

function getBounds(item: FloatingItem) {
  if (item.kind === "avatar") {
    return { w: item.size, h: item.size };
  }
  if (item.kind === "logo") {
    return { w: item.width, h: item.height };
  }
  return { w: item.width, h: item.height };
}

function createBodies(
  layout: FloatingItem[],
  width: number,
  height: number
): SimBody[] {
  return layout.map((item, index) => {
    const { w, h } = getBounds(item);
    const baseX =
      item.kind === "avatar" ? item.x * width : item.x * width - w / 2;
    const baseY =
      item.kind === "avatar" ? item.y * height : item.y * height - h / 2;

    return {
      ...item,
      x: baseX,
      y: baseY,
      vx: 0,
      vy: 0,
      vr: 0,
      phase: index * 1.37,
    };
  });
}

export default function PlanesSigningSection({
  logoRows,
  logoColor = "#0a0a0a",
  logoTextShadow,
}: PlanesSigningSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<SimBody[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const dragRef = useRef<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const pointerVelRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const layout = useMemo(
    () =>
      DEFAULT_LAYOUT.map((item) =>
        item.kind === "logo" && logoRows ? { ...item, rows: logoRows } : item
      ),
    [logoRows]
  );

  const syncBodiesToDom = useCallback(() => {
    if (!arenaRef.current) return;
    bodiesRef.current.forEach((body) => {
      const el = arenaRef.current?.querySelector<HTMLElement>(
        `[data-float-id="${body.id}"]`
      );
      if (!el) return;

      const rot = body.kind === "avatar" ? 0 : body.rotation + body.vr * 12;

      el.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${rot}deg)`;
    });
  }, []);

  const initSimulation = useCallback(() => {
    if (!arenaRef.current) return;
    const { width, height } = arenaRef.current.getBoundingClientRect();
    bodiesRef.current = createBodies(layout, width, height);
    syncBodiesToDom();
  }, [layout, syncBodiesToDom]);

  useEffect(() => {
    initSimulation();

    const onResize = () => initSimulation();
    window.addEventListener("resize", onResize);

    let time = 0;
    const step = () => {
      const arena = arenaRef.current;
      const bodies = bodiesRef.current;
      if (arena && bodies.length) {
        const { width, height } = arena.getBoundingClientRect();
        const mouse = mouseRef.current;
        const mx = mouse.x * width;
        const my = mouse.y * height;
        time += 0.016;

        bodies.forEach((body) => {
          if (dragRef.current?.id === body.id) return;

          const { w, h } = getBounds(body);
          const cx = body.x + w / 2;
          const cy = body.y + h / 2;

          if (mouse.active) {
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.hypot(dx, dy) || 1;
            const radius = Math.max(width, height) * 0.22;
            if (dist < radius) {
              const force = ((radius - dist) / radius) * (140 / body.mass);
              body.vx += (dx / dist) * force * 0.016;
              body.vy += (dy / dist) * force * 0.016;
            }
          }

          body.vx += Math.sin(time * 0.9 + body.phase) * 0.018;
          body.vy += Math.cos(time * 0.75 + body.phase) * 0.018;
          body.vr += Math.sin(time * 0.6 + body.phase) * 0.0008;

          body.vx *= 0.985;
          body.vy *= 0.985;
          body.vr *= 0.94;

          body.x += body.vx;
          body.y += body.vy;

          const pad = 12;
          if (body.x < pad) {
            body.x = pad;
            body.vx *= -0.55;
          }
          if (body.y < pad) {
            body.y = pad;
            body.vy *= -0.55;
          }
          if (body.x + w > width - pad) {
            body.x = width - w - pad;
            body.vx *= -0.55;
          }
          if (body.y + h > height - pad) {
            body.y = height - h - pad;
            body.vy *= -0.55;
          }
        });

        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            const aBounds = getBounds(a);
            const bBounds = getBounds(b);
            const ax = a.x + aBounds.w / 2;
            const ay = a.y + aBounds.h / 2;
            const bx = b.x + bBounds.w / 2;
            const by = b.y + bBounds.h / 2;
            const dx = bx - ax;
            const dy = by - ay;
            const dist = Math.hypot(dx, dy) || 1;
            const minDist =
              (Math.max(aBounds.w, aBounds.h) +
                Math.max(bBounds.w, bBounds.h)) *
              0.42;

            if (dist < minDist) {
              const overlap = (minDist - dist) / dist;
              const pushX = dx * overlap * 0.22;
              const pushY = dy * overlap * 0.22;
              if (dragRef.current?.id !== a.id) {
                a.vx -= pushX / a.mass;
                a.vy -= pushY / a.mass;
              }
              if (dragRef.current?.id !== b.id) {
                b.vx += pushX / b.mass;
                b.vy += pushY / b.mass;
              }
            }
          }
        }

        syncBodiesToDom();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initSimulation, syncBodiesToDom]);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    pointerVelRef.current = {
      x: event.movementX,
      y: event.movementY,
    };
    mouseRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active: true,
    };

    const drag = dragRef.current;
    if (!drag) return;

    const body = bodiesRef.current.find((item) => item.id === drag.id);
    if (!body) return;

    const { w, h } = getBounds(body);
    body.x = event.clientX - rect.left - drag.offsetX;
    body.y = event.clientY - rect.top - drag.offsetY;
    body.vx = 0;
    body.vy = 0;

    const pad = 12;
    body.x = Math.max(pad, Math.min(body.x, rect.width - w - pad));
    body.y = Math.max(pad, Math.min(body.y, rect.height - h - pad));
    syncBodiesToDom();
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
    id: string
  ) => {
    if (!arenaRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);

    const rect = arenaRef.current.getBoundingClientRect();
    const body = bodiesRef.current.find((item) => item.id === id);
    if (!body) return;

    dragRef.current = {
      id,
      offsetX: event.clientX - rect.left - body.x,
      offsetY: event.clientY - rect.top - body.y,
    };
  };

  const handlePointerUp = () => {
    if (dragRef.current) {
      const body = bodiesRef.current.find(
        (item) => item.id === dragRef.current?.id
      );
      if (body) {
        body.vx = pointerVelRef.current.x * 0.35;
        body.vy = pointerVelRef.current.y * 0.35;
      }
    }
    dragRef.current = null;
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    dragRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] w-full overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden />

      <div
        ref={arenaRef}
        className="relative z-[2] mx-auto mt-8 h-[min(82vh,860px)] min-h-[520px] w-full max-w-[calc(1400px+15%)] touch-none select-none px-[4%] min-[850px]:mt-12 min-[850px]:px-[7%]"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerUp}
      >
        {layout.map((item) => {
          if (item.kind === "pill") {
            return (
              <div
                key={item.id}
                data-float-id={item.id}
                onPointerDown={(event) => handlePointerDown(event, item.id)}
                className="absolute left-0 top-0 z-[2] cursor-grab active:cursor-grabbing"
                style={{ width: item.width, height: item.height }}
              >
                <div
                  className="flex h-full w-full items-center justify-center rounded-full px-6 font-dmsans text-[clamp(0.95rem,2vw,1.35rem)] font-medium leading-none text-black shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  style={{ backgroundColor: item.color }}
                >
                  {item.text}
                </div>
              </div>
            );
          }

          if (item.kind === "avatar") {
            return (
              <div
                key={item.id}
                data-float-id={item.id}
                onPointerDown={(event) => handlePointerDown(event, item.id)}
                className="absolute left-0 top-0 z-[2] cursor-grab overflow-hidden rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.12)] active:cursor-grabbing"
                style={{ width: item.size, height: item.size }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          }

          return (
            <div
              key={item.id}
              data-float-id={item.id}
              onPointerDown={(event) => handlePointerDown(event, item.id)}
              className="absolute left-0 top-0 z-[3] cursor-grab active:cursor-grabbing"
              style={{ width: item.width, height: item.height }}
            >
              <div
                className="grid h-full w-full grid-cols-2 place-items-center font-dmsans text-[clamp(3.5rem,10vw,6.5rem)] font-black leading-[0.82] tracking-[-0.05em]"
                style={{
                  color: logoColor,
                  textShadow: logoTextShadow,
                }}
              >
                {item.rows.map((row, rowIndex) =>
                  row.map((cell, cellIndex) => (
                    <span key={`${rowIndex}-${cellIndex}`}>{cell}</span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
