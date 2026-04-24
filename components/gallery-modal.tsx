"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";

export default function GalleryModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const total = project.photos.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowRight") next();
      if (ev.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(4,4,4,0.97)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{ padding: "24px 36px" }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.6rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Dự Án
          </p>
          <p
            style={{
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 300,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {project.name}
            {project.year && (
              <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: 12 }}>
                [{project.year}]
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
            }}
          >
            {idx + 1} / {total}
          </p>
          <button
            onClick={onClose}
            style={{
              color: "rgba(255,255,255,0.4)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "white")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.4)")
            }
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main image */}
      <div
        className="flex-1 flex items-center justify-center relative min-h-0"
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: 24,
            zIndex: 10,
            color: "rgba(255,255,255,0.4)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.8rem",
            padding: "16px 12px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "white")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.4)")
          }
        >
          ‹
        </button>
        <img
          key={project.photos[idx]}
          src={project.photos[idx]}
          alt={project.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
        <button
          onClick={next}
          style={{
            position: "absolute",
            right: 24,
            zIndex: 10,
            color: "rgba(255,255,255,0.4)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.8rem",
            padding: "16px 12px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = "white")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(255,255,255,0.4)")
          }
        >
          ›
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className="shrink-0 flex gap-2 overflow-x-auto"
        style={{ padding: "16px 36px 24px" }}
        onClick={(ev) => ev.stopPropagation()}
      >
        {project.photos.map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            style={{
              flex: "0 0 72px",
              height: 48,
              opacity: i === idx ? 1 : 0.35,
              transition: "opacity 0.2s",
              overflow: "hidden",
              border:
                i === idx
                  ? "1px solid rgba(255,255,255,0.5)"
                  : "1px solid transparent",
              background: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
