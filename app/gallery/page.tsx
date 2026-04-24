"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PROJECTS, { type Project } from "@/data/projects";
import GalleryModal from "@/components/gallery-modal";

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        overflow: "hidden",
        background: "#F8F8F6",
      }}
    >
      <div
        style={{ overflow: "hidden", aspectRatio: "4/3", position: "relative" }}
      >
        <img
          src={project.cover}
          alt={project.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.04)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          borderTop: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <span
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#111",
          }}
        >
          {project.name}
        </span>
        {project.year && (
          <span style={{ fontSize: "0.62rem", color: "#999", flexShrink: 0 }}>
            [{project.year}]
          </span>
        )}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const preload = () => {
      PROJECTS.forEach((p) => {
        const cover = new window.Image();
        cover.src = p.cover;
        // Also preload the first gallery photo so the modal opens instantly
        if (p.photos[0] !== p.cover) {
          const first = new window.Image();
          first.src = p.photos[0];
        }
      });
    };
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(preload);
    } else {
      setTimeout(preload, 500);
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#F8F8F6",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 56px",
          gap: 20,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#888",
            textDecoration: "none",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#111")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "#888")
          }
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Trang Chủ
        </Link>

        <div
          style={{ width: 1, height: 16, background: "rgba(0,0,0,0.12)" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/logo.png"
            alt="Saigon Pool"
            width={22}
            height={22}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#111",
            }}
          >
            saigonpool
          </span>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.35)",
            }}
          >
            {PROJECTS.length} Công Trình
          </span>
        </div>
      </header>

      {/* Page title */}
      <div style={{ padding: "56px 56px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 20,
              height: 1,
              background: "rgba(0,0,0,0.15)",
            }}
          />
          <span
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.38)",
            }}
          >
            Dự Án
          </span>
        </div>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: 300,
            letterSpacing: "0.02em",
            color: "#111",
          }}
        >
          Công Trình Tiêu Biểu
        </h1>
      </div>

      {/* 3-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
          padding: "0 56px 80px",
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onClick={() => setActive(project)}
          />
        ))}
      </div>

      {active && (
        <GalleryModal project={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
