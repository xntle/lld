"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidCursor from "./cursor";
import WaterCanvas from "./water";
import PROJECTS, { type Project } from "@/data/projects";
import GalleryModal from "@/components/gallery-modal";

const NAV = ["Dịch Vụ", "Dự Án", "Quy Trình"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const currentIdx = useRef(0);

  const goTo = (i: number) => {
    const el = sectionRefs.current[i];
    if (!el) return;
    currentIdx.current = i;
    setActive(i);
    el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (i !== -1) {
              setActive(i);
              currentIdx.current = i;
            }
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center"
        style={{
          padding: "0 56px",
          height: 64,
          background: "transparent",
        }}
      >
        {/* Left: Logo */}
        <button
          onClick={() => goTo(0)}
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="Saigon Pool"
            width={52}
            height={52}
            style={{ objectFit: "contain" }}
          />
        </button>

        {/* Center nav — absolutely centered */}
        <ul
          className="nav-center"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 2,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV.map((label, i) => (
            <li key={label}>
              <button
                onClick={() => goTo(i + 1)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 99,
                  fontSize: "0.72rem",
                  letterSpacing: "0.05em",
                  background:
                    active === i + 1
                      ? active === 0
                        ? "rgba(255,255,255,0.2)"
                        : "#111"
                      : "transparent",
                  color:
                    active === i + 1
                      ? "white"
                      : active === 0
                      ? "rgba(255,255,255,0.7)"
                      : "#555",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                  fontWeight: active === i + 1 ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (active !== i + 1)
                    (e.currentTarget as HTMLButtonElement).style.color =
                      active === 0 ? "white" : "#111";
                }}
                onMouseLeave={(e) => {
                  if (active !== i + 1)
                    (e.currentTarget as HTMLButtonElement).style.color =
                      active === 0 ? "rgba(255,255,255,0.7)" : "#555";
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: phone pill + language toggle */}
        <div
          className="nav-right"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Phone pill */}
          <a
            href="tel:02835190313"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background:
                active === 0 ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${
                active === 0 ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.10)"
              }`,
              borderRadius: 99,
              padding: "6px 14px",
              color: active === 0 ? "rgba(255,255,255,0.9)" : "#333",
              fontSize: "0.7rem",
              letterSpacing: "0.04em",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s, border-color 0.2s, color 0.3s",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            028 3519 0313
          </a>

          {/* Language toggle pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              background:
                active === 0 ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)",
              border: `1px solid ${
                active === 0 ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.10)"
              }`,
              borderRadius: 99,
              padding: 3,
              transition: "background 0.3s, border-color 0.3s",
            }}
          >
            {(["vi", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  if (l !== lang) setLangOpen(true);
                }}
                style={{
                  padding: "4px 13px",
                  borderRadius: 99,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background:
                    lang === l
                      ? active === 0
                        ? "rgba(255,255,255,0.9)"
                        : "#111"
                      : "transparent",
                  color:
                    lang === l
                      ? active === 0
                        ? "#111"
                        : "white"
                      : active === 0
                      ? "rgba(255,255,255,0.6)"
                      : "#777",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {l === "vi" ? "VI" : "EN"}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn flex flex-col justify-center gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            marginLeft: "auto",
            width: 24,
            padding: 0,
            background: "none",
            border: "none",
          }}
        >
          {[
            menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            "none",
            menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
          ].map((transform, idx) => (
            <span
              key={idx}
              style={{
                display: "block",
                width: "100%",
                height: 1.5,
                background: active === 0 ? "white" : "#111",
                transition: "transform 0.3s, opacity 0.3s, background 0.3s",
                transform,
                opacity: idx === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                goTo(i + 1);
                setMenuOpen(false);
              }}
              style={{
                fontSize: "1.1rem",
                fontWeight: active === i + 1 ? 600 : 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: active === i + 1 ? "#111" : "#999",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              {label}
            </button>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 12,
            }}
          >
            <a
              href="tel:02835190313"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 99,
                padding: "8px 18px",
                color: "#333",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              028 3519 0313
            </a>
            <div
              style={{
                display: "flex",
                gap: 3,
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.10)",
                borderRadius: 99,
                padding: 3,
              }}
            >
              {(["vi", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMenuOpen(false);
                    if (l !== lang) setLangOpen(true);
                  }}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 99,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: lang === l ? "#111" : "transparent",
                    color: lang === l ? "white" : "#777",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {l === "vi" ? "VI" : "EN"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SIDE DOTS */}
      <div className="side-dots fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[10px]">
        {[...Array(4)].map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: 5,
              height: active === i ? 20 : 5,
              borderRadius: 99,
              background:
                active === 0
                  ? active === i
                    ? "white"
                    : "rgba(255,255,255,0.28)"
                  : active === i
                  ? "#111"
                  : "rgba(0,0,0,0.18)",
              transition: "all 0.35s ease",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* Language popup */}
      {langOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setLangOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#F8F8F6",
              border: "1px solid rgba(0,0,0,0.09)",
              borderRadius: 20,
              padding: "44px 48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
              minWidth: 320,
              maxWidth: "90vw",
              boxShadow: "0 8px 48px rgba(0,0,0,0.10)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "rgba(0,0,0,0.35)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Language / Ngôn ngữ
              </p>
              <p
                style={{
                  color: "#111",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  lineHeight: 1.45,
                }}
              >
                Bạn muốn xem trang web
                <br />
                bằng ngôn ngữ nào?
              </p>
              <p
                style={{
                  color: "rgba(0,0,0,0.4)",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  marginTop: 8,
                }}
              >
                Which language do you prefer?
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              {[
                {
                  l: "vi" as const,
                  flag: "🇻🇳",
                  primary: "Tiếng Việt",
                  secondary: "Vietnamese",
                },
                {
                  l: "en" as const,
                  flag: "🇬🇧",
                  primary: "English",
                  secondary: "Tiếng Anh",
                },
              ].map(({ l, flag, primary, secondary }) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    background: lang === l ? "#111" : "rgba(0,0,0,0.03)",
                    border: `1px solid ${
                      lang === l ? "#111" : "rgba(0,0,0,0.10)"
                    }`,
                    borderRadius: 14,
                    padding: "18px 30px",
                    color: lang === l ? "white" : "#222",
                    cursor: "pointer",
                    transition:
                      "background 0.2s, border-color 0.2s, color 0.2s",
                    minWidth: 118,
                  }}
                  onMouseEnter={(e) => {
                    if (lang !== l) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(0,0,0,0.07)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(0,0,0,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (lang !== l) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(0,0,0,0.03)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(0,0,0,0.10)";
                    }
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{flag}</span>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {primary}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      opacity: 0.5,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {secondary}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setLangOpen(false)}
              style={{
                color: "rgba(0,0,0,0.25)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(0,0,0,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(0,0,0,0.25)";
              }}
            >
              Đóng / Close
            </button>
          </div>
        </div>
      )}

      {/* SCROLL CONTAINER */}
      <div ref={containerRef}>
        {/* ─── HERO ─── */}
        <section
          ref={ref(0)}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
          style={{
            scrollSnapAlign: "start",
            background: "#000",
            backgroundImage: "url('/photos/tilebg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <WaterCanvas />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <Image
              src="/logo.png"
              alt="Saigonpool"
              width={280}
              height={112}
              style={{ objectFit: "contain" }}
            />
            <p className="text-white/50 text-[11px] tracking-[0.45em] uppercase">
              Premium Swimming Pool & Saunas Since 1998
            </p>
          </div>

          <button
            onClick={() => goTo(1)}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[10px] tracking-[0.5em] uppercase">
              Khám Phá
            </span>
            <div
              className="w-px h-10 animate-pulse"
              style={{ background: "rgba(255,255,255,0.25)" }}
            />
          </button>
        </section>

        {/* ─── SERVICES ─── */}
        <section
          ref={ref(1)}
          id="dich-vu"
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#F8F8F6" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 1400, padding: "0 56px" }}
          >
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12, fontWeight: 500 }}>
                Dịch Vụ
              </p>
              <h2
                className="section-title"
                style={{ fontSize: "2.8rem", fontWeight: 300, letterSpacing: "-0.01em", color: "#111", marginBottom: 20, lineHeight: 1.15 }}
              >
                Những Gì<br />Chúng Tôi Làm
              </h2>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(0,0,0,0.45)", maxWidth: 360 }}>
                Dịch vụ toàn diện từ tư vấn, thiết kế đến thi công và bảo trì — mỗi công trình đạt chuẩn cao nhất.
              </p>
            </div>

            <div
              className="services-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
                background: "rgba(0,0,0,0.07)",
              }}
            >
              {[
                {
                  t: "Thiết Kế Hồ Bơi",
                  d: "Thiết kế theo yêu cầu, tối ưu không gian và thẩm mỹ cho từng công trình riêng biệt.",
                },
                {
                  t: "Thi Công & Xây Dựng",
                  d: "Đội ngũ thi công chuyên nghiệp với vật liệu cao cấp và quy trình kiểm soát chặt chẽ.",
                },
                {
                  t: "Bảo Trì & Vận Hành",
                  d: "Dịch vụ bảo trì định kỳ, đảm bảo hồ bơi luôn trong tình trạng hoàn hảo.",
                },
              ].map((s) => (
                <div
                  key={s.t}
                  className="group transition-colors duration-400"
                  style={{ background: "#F8F8F6", padding: "44px 36px 44px" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: "rgba(0,0,0,0.2)",
                      marginBottom: 32,
                      transition: "width 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.width = "56px")}
                  />
                  <h3
                    className="font-light"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      marginBottom: 16,
                      color: "#111",
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    {s.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PORTFOLIO ─── */}
        <section
          ref={ref(2)}
          id="du-an"
          className="w-full flex flex-col"
          style={{ background: "#F8F8F6", padding: "72px 0 64px" }}
        >
          <div
            className="portfolio-header"
            style={{ maxWidth: 1400, width: "100%", padding: "0 56px", marginBottom: 36, margin: "0 auto 36px" }}
          >
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12, fontWeight: 500 }}>
                Dự Án
              </p>
              <h2
                className="section-title"
                style={{ fontSize: "2.8rem", fontWeight: 300, letterSpacing: "-0.01em", color: "#111", marginBottom: 20, lineHeight: 1.15 }}
              >
                Công Trình<br />Tiêu Biểu
              </h2>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(0,0,0,0.45)", maxWidth: 360 }}>
                Hơn 26 năm với hàng trăm công trình hồ bơi, sauna và khu vui chơi nước trên khắp Việt Nam.
              </p>
            </div>
          </div>

          <PortfolioGrid />
        </section>

        {/* ─── STATS ─── */}
        <section
          style={{ background: "#111", padding: "72px 0" }}
        >
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            >
              {[
                { value: "26+", label: "Năm Kinh Nghiệm", sub: "Từ năm 1998" },
                { value: "500+", label: "Hồ Bơi & Sauna", sub: "Đã hoàn thành" },
                { value: "30+", label: "Đối Tác", sub: "Doanh nghiệp lớn" },
                { value: "100%", label: "Bảo Hành", sub: "Mỗi công trình" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#111",
                    padding: "48px 40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: "3.2rem",
                      fontWeight: 200,
                      letterSpacing: "-0.02em",
                      color: "white",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {s.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CLIENTS ─── */}
        <section style={{ background: "#F8F8F6", padding: "80px 0" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px" }}>
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12, fontWeight: 500 }}>
                Đối Tác
              </p>
              <h2
                style={{ fontSize: "2.8rem", fontWeight: 300, letterSpacing: "-0.01em", color: "#111", marginBottom: 20, lineHeight: 1.15 }}
              >
                Khách Hàng<br />Tiêu Biểu
              </h2>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(0,0,0,0.45)", maxWidth: 360 }}>
                Tin tưởng bởi các tập đoàn, khách sạn và khu nghỉ dưỡng hàng đầu tại Việt Nam.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 1,
                background: "rgba(0,0,0,0.07)",
              }}
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                <div
                  key={n}
                  style={{
                    background: "#F8F8F6",
                    padding: "28px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "3/2",
                  }}
                >
                  <img
                    src={`/saigonpool_client_logo/${n}.png.avif`}
                    alt={`Client ${n}`}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "75%",
                      objectFit: "contain",
                      filter: "grayscale(1)",
                      opacity: 0.55,
                      transition: "opacity 0.3s, filter 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)";
                      (e.currentTarget as HTMLImageElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1)";
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.55";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section
          ref={ref(3)}
          id="quy-trinh"
          className="w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#F8F8F6", padding: "80px 0" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 1400, padding: "0 56px" }}
          >
            <div style={{ marginBottom: 72 }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 12, fontWeight: 500 }}>
                Quy Trình
              </p>
              <h2
                className="section-title"
                style={{ fontSize: "2.8rem", fontWeight: 300, letterSpacing: "-0.01em", color: "#111", marginBottom: 20, lineHeight: 1.15 }}
              >
                Cách Chúng Tôi<br />Làm Việc
              </h2>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(0,0,0,0.45)", maxWidth: 360 }}>
                10 bước chuẩn hoá đảm bảo tiến độ, chất lượng và minh bạch trong từng giai đoạn thi công.
              </p>
            </div>

            <div
              className="process-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "48px 56px",
              }}
            >
              {[
                {
                  n: "01",
                  t: "Khảo Sát Hiện Trạng",
                  d: "Đội ngũ kỹ thuật đến tận nơi khảo sát địa hình, đo đạc và đánh giá điều kiện thực tế của công trình.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="22" cy="22" r="10" />
                      <line x1="30" y1="30" x2="40" y2="40" />
                      <line x1="22" y1="16" x2="22" y2="28" />
                      <line x1="16" y1="22" x2="28" y2="22" />
                    </svg>
                  ),
                },
                {
                  n: "02",
                  t: "Chuẩn Bị Mặt Bằng",
                  d: "San lấp, dọn dẹp và chuẩn bị mặt bằng thi công, đảm bảo điều kiện an toàn và thuận lợi cho các bước tiếp theo.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="30" width="36" height="10" rx="1" />
                      <path d="M12 30V20l6-8h12l6 8v10" />
                      <line x1="6" y1="40" x2="42" y2="40" />
                    </svg>
                  ),
                },
                {
                  n: "03",
                  t: "Khoan / Đào Hố",
                  d: "Tiến hành khoan hoặc đào hố hồ bơi theo đúng kích thước thiết kế, đảm bảo độ sâu và hình dạng chính xác.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M24 8v24" />
                      <path d="M16 20l8 12 8-12" />
                      <ellipse cx="24" cy="36" rx="12" ry="4" />
                    </svg>
                  ),
                },
                {
                  n: "04",
                  t: "Lắp Đặt Hệ Thống Cấp Nước",
                  d: "Lắp đặt đường ống cấp, thoát nước và hệ thống tuần hoàn theo tiêu chuẩn kỹ thuật quốc tế.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 24h8l4-8 6 16 4-10 4 6h6" />
                      <path d="M8 36c0 0 4-4 8 0s8 0 8 0 4-4 8 0 8 0 8 0" />
                    </svg>
                  ),
                },
                {
                  n: "05",
                  t: "Thi Công Phần Móng",
                  d: "Đổ bê tông và gia cố kết cấu móng hồ bơi, đảm bảo độ bền vững và chịu lực lâu dài cho toàn bộ công trình.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="8" y="32" width="32" height="8" rx="1" />
                      <rect x="14" y="22" width="20" height="10" />
                      <rect x="18" y="14" width="12" height="8" />
                    </svg>
                  ),
                },
                {
                  n: "06",
                  t: "Xây Tường Hồ Bơi",
                  d: "Xây dựng tường bao quanh hồ bơi bằng vật liệu chất lượng cao, đảm bảo độ phẳng, thẳng và kín hoàn toàn.",
                  icon: (
                    <img src="/steps/6.png" alt="Xây Tường Hồ Bơi" style={{ objectFit: "contain", objectPosition: "left", width: "100%", height: "100%" }} />
                  ),
                },
                {
                  n: "07",
                  t: "Hệ Thống Chống Thấm",
                  d: "Thi công lớp chống thấm chuyên dụng toàn bộ bề mặt hồ, ngăn ngừa rò rỉ và bảo vệ kết cấu bê tông.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M24 8c0 0-12 10-12 20a12 12 0 0 0 24 0C36 18 24 8 24 8z" />
                      <path d="M24 24l-4 4" strokeOpacity="0.5" />
                    </svg>
                  ),
                },
                {
                  n: "08",
                  t: "Lắp Đặt Máy Lọc Nước",
                  d: "Lắp đặt hệ thống lọc, bơm và thiết bị xử lý nước nhập khẩu từ các thương hiệu hàng đầu châu Âu.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="24" cy="24" r="10" />
                      <circle cx="24" cy="24" r="4" />
                      <line x1="24" y1="8" x2="24" y2="14" />
                      <line x1="24" y1="34" x2="24" y2="40" />
                      <line x1="8" y1="24" x2="14" y2="24" />
                      <line x1="34" y1="24" x2="40" y2="24" />
                    </svg>
                  ),
                },
                {
                  n: "09",
                  t: "Ốp Lát Gạch",
                  d: "Ốp lát gạch mosaic hoặc đá cao cấp toàn bộ bề mặt hồ bơi, tạo nên vẻ đẹp thẩm mỹ và độ bền theo thời gian.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="8" y="8" width="14" height="14" rx="1" />
                      <rect x="26" y="8" width="14" height="14" rx="1" />
                      <rect x="8" y="26" width="14" height="14" rx="1" />
                      <rect x="26" y="26" width="14" height="14" rx="1" />
                    </svg>
                  ),
                },
                {
                  n: "10",
                  t: "Bàn Giao & Hướng Dẫn",
                  d: "Kiểm tra toàn diện, bàn giao công trình, hướng dẫn vận hành và bảo trì. Bảo hành rõ ràng và hỗ trợ lâu dài.",
                  icon: (
                    <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#5BA8A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 24l10 10 18-18" />
                      <circle cx="24" cy="24" r="18" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <div key={p.n} className="flex flex-col" style={{ gap: 16 }}>
                  {/* Icon */}
                  <div style={{ width: "100%", height: 56 }}>
                    {p.icon}
                  </div>
                  {/* Step label */}
                  <div>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#5BA8A0",
                        marginBottom: 4,
                        fontWeight: 600,
                      }}
                    >
                      Quy Trình {p.n}
                    </p>
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        color: "#111",
                      }}
                    >
                      {p.t}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(0,0,0,0.45)" }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT REMOVED */}
        <div style={{ display: "none" }}
        >
              {/* Left — info */}
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 16 }}>Liên Hệ</p>
                <h2
                  className="font-light contact-title"
                  style={{
                    fontSize: "2.8rem",
                    letterSpacing: "0.01em",
                    margin: "20px 0 24px",
                    lineHeight: 1.15,
                    color: "#111",
                  }}
                >
                  Bắt Đầu
                  <br />
                  Dự Án Của Bạn
                </h2>
                <p
                  className="text-sm leading-7"
                  style={{ color: "rgba(0,0,0,0.45)", marginBottom: 48 }}
                >
                  Hãy để chúng tôi biến ý tưởng của bạn thành hiện thực. Liên hệ
                  để được tư vấn miễn phí.
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      label: "Email",
                      value: "info@linhlinhdan.com",
                      href: "mailto:info@linhlinhdan.com",
                      tip: "Gửi email",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <polyline points="2,4 12,13 22,4" />
                        </svg>
                      ),
                    },
                    {
                      label: "Điện Thoại",
                      value: "+84 919 992 424",
                      href: "tel:+84919992424",
                      tip: "Gọi ngay",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Địa Chỉ",
                      value: "49L Quốc Hương, Thảo Điền, An Khánh, Hồ Chí Minh",
                      href: "https://maps.app.goo.gl/fkEcdE9EKqoS3T5Q9",
                      tip: "Xem bản đồ",
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      ),
                    },
                  ].map((c) => (
                    <div key={c.label} className="relative group/item">
                      <p
                        className="text-[10px] tracking-[0.4em] uppercase mb-1"
                        style={{ color: "rgba(0,0,0,0.35)" }}
                      >
                        {c.label}
                      </p>
                      <a
                        href={c.href}
                        target={c.label === "Địa Chỉ" ? "_blank" : undefined}
                        rel={
                          c.label === "Địa Chỉ"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-sm font-light transition-colors duration-200"
                        style={{ color: "#111" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#5BA8A0")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#111")
                        }
                      >
                        {c.value}
                      </a>
                      {/* Bubble tooltip */}
                      <div
                        className="pointer-events-none absolute left-0 bottom-full mb-2 opacity-0 group-hover/item:opacity-100 transition-all duration-200 translate-y-1 group-hover/item:translate-y-0"
                        style={{ whiteSpace: "nowrap", zIndex: 10 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "#F8F8F6",
                            color: "#000",
                            fontSize: "0.65rem",
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            padding: "5px 10px",
                            borderRadius: 99,
                          }}
                        >
                          {c.icon}
                          {c.tip}
                        </div>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            background: "#F8F8F6",
                            transform: "rotate(45deg)",
                            margin: "-3px 14px 0",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <form className="flex flex-col gap-0">
                {[
                  { type: "text", placeholder: "Họ & Tên", half: true },
                  { type: "tel", placeholder: "Số Điện Thoại", half: true },
                  { type: "email", placeholder: "Email", half: false },
                ].reduce<React.ReactNode[]>((acc, field, idx, arr) => {
                  if (field.half && arr[idx - 1]?.half && idx % 2 === 1)
                    return acc;
                  if (field.half && arr[idx + 1]?.half) {
                    acc.push(
                      <div
                        key={idx}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 24,
                        }}
                      >
                        <UnderlineInput
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                        <UnderlineInput
                          type={arr[idx + 1].type}
                          placeholder={arr[idx + 1].placeholder}
                        />
                      </div>
                    );
                  } else {
                    acc.push(
                      <UnderlineInput
                        key={idx}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    );
                  }
                  return acc;
                }, [])}

                <div style={{ marginTop: 0 }}>
                  <textarea
                    rows={3}
                    placeholder="Mô tả dự án của bạn..."
                    className="w-full bg-transparent text-sm focus:outline-none resize-none leading-7"
                    style={{
                      color: "#111",
                      borderBottom: "1px solid rgba(0,0,0,0.15)",
                      padding: "16px 0",
                      transition: "border-color 0.2s",
                      display: "block",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor = "rgba(0,0,0,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor = "rgba(0,0,0,0.15)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="text-xs tracking-[0.35em] uppercase transition-all duration-300"
                  style={{
                    marginTop: 36,
                    padding: "16px 0",
                    border: "1px solid rgba(0,0,0,0.2)",
                    color: "#111",
                    letterSpacing: "0.3em",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#111";
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#111";
                  }}
                >
                  Gửi Yêu Cầu
                </button>

                <p
                  className="text-center text-xs tracking-widest"
                  style={{ color: "rgba(0,0,0,0.2)", marginTop: 32 }}
                >
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#F8F8F6" }}>

        {/* CTA bar */}
        <div
          style={{
            background: "#111",
            padding: "13px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Đặt Hẹn Dịch Vụ Của Chúng Tôi Ngay Hôm Nay!
          </span>
          <a
            href="tel:02835190313"
            style={{
              color: "white",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textDecoration: "none",
              opacity: 0.85,
            }}
          >
            028 3519 0313
          </a>
        </div>

        {/* Main: heading + map */}
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "80px 56px 64px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <h2
              style={{
                fontSize: "2.8rem",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                color: "#111",
                lineHeight: 1.15,
                marginBottom: 32,
              }}
            >
              Bạn Quan Tâm Đến Việc
              <br />
              Hiện Thực Hóa Ước Mơ?
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.8,
                color: "rgba(0,0,0,0.45)",
                maxWidth: 400,
                marginBottom: 40,
              }}
            >
              Điền vào mẫu liên hệ hoặc liên lạc trực tiếp để bắt đầu dự án
              của bạn. Chúng tôi sẵn sàng tư vấn miễn phí.
            </p>

            {/* Contact pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  href: "tel:02835190313",
                  text: "028 3519 0313",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                },
                {
                  href: "https://maps.app.goo.gl/fkEcdE9EKqoS3T5Q9",
                  text: "49L Quốc Hương, Thảo Điền, An Khánh, Hồ Chí Minh 70000",
                  icon: (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.09)",
                    borderRadius: 99,
                    padding: "10px 18px",
                    color: "#222",
                    fontSize: "0.75rem",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    width: "fit-content",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,0,0,0.09)";
                  }}
                >
                  {item.icon}
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          {/* Right: map */}
          <div
            style={{
              overflow: "hidden",
              borderRadius: 4,
              height: 380,
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d106.7456!3d10.8031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587!2sLinh+Linh+Dan+Pool+%26+Spa!5e0!3m2!1svi!2svn!4v1&q=49L+Qu%E1%BB%91c+H%C6%B0%C6%A1ng%2C+Th%E1%BA%A3o+%C4%90i%E1%BB%81n%2C+H%E1%BB%93+Ch%C3%AD+Minh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Sub-row: tagline + community */}
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "40px 56px 56px",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: "rgba(0,0,0,0.4)",
              maxWidth: 420,
            }}
          >
            Ưu tiên hàng đầu của Linh Linh Đan là cung cấp những sản phẩm tốt
            nhất cho từng nhu cầu của bạn.
          </p>

          <div>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 300,
                letterSpacing: "0.01em",
                color: "#111",
                lineHeight: 1.3,
                marginBottom: 20,
              }}
            >
              Cộng Đồng
              <br />
              Của Chúng Tôi.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[
                {
                  href: "#",
                  label: "Facebook",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  href: "#",
                  label: "X",
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  href: "#",
                  label: "Instagram",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  href: "#",
                  label: "LinkedIn",
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(0,0,0,0.35)",
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 8,
                    transition: "color 0.2s, background 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#111";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,0,0,0.04)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom nav bar */}
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding: "18px 56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[
              { label: "Trang Chủ", href: "/" },
              { label: "Dịch Vụ", scroll: 1 },
              { label: "Dự Án", scroll: 2 },
              { label: "Quy Trình", scroll: 3 },
              { label: "Liên Hệ", scroll: 4 },
              { label: "Thư Viện", href: "/gallery" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href ?? "#"}
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.38)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#111")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.38)")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "rgba(0,0,0,0.25)",
            }}
          >
            © {new Date().getFullYear()} Saigon Pool — Linh Linh Đan Co., Ltd.
          </p>
        </div>
      </footer>
    </>
  );
}

function UnderlineInput({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm focus:outline-none"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        padding: "16px 0",
        color: "#111",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) =>
        (e.target.style.borderBottomColor = "rgba(0,0,0,0.5)")
      }
      onBlur={(e) =>
        (e.target.style.borderBottomColor = "rgba(0,0,0,0.15)")
      }
    />
  );
}


function ProjectCard({
  project,
  onClick,
  featured = false,
}: {
  project: Project;
  onClick: () => void;
  featured?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#F8F8F6',
        ...(featured ? { display: 'flex', flexDirection: 'column', height: '100%' } : {}),
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          ...(featured ? { flex: 1, minHeight: 0 } : { aspectRatio: '4/3' }),
        }}
      >
        <img
          src={project.cover}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 14px',
          borderTop: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#111',
          }}
        >
          {project.name}
        </span>
        {project.year && (
          <span style={{ fontSize: '0.62rem', color: '#999', flexShrink: 0, marginLeft: 8 }}>
            [{project.year}]
          </span>
        )}
      </div>
    </div>
  );
}

function PortfolioGrid() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const top6 = PROJECTS.slice(0, 6);

  useEffect(() => {
    // Preload all cover images in background so they're cached before the user scrolls
    PROJECTS.forEach((p) => {
      const img = new window.Image();
      img.src = p.cover;
    });
  }, []);

  return (
    <>
      <div style={{ maxWidth: 1400, width: "100%", padding: '0 56px', margin: "0 auto" }}>
        {/* Top row: featured (2/3) + 2 stacked (1/3) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: 4,
            marginBottom: 4,
            alignItems: 'stretch',
          }}
        >
          <ProjectCard
            project={top6[0]}
            featured
            onClick={() => setActiveProject(top6[0])}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ProjectCard project={top6[1]} onClick={() => setActiveProject(top6[1])} />
            <ProjectCard project={top6[2]} onClick={() => setActiveProject(top6[2])} />
          </div>
        </div>

        {/* Bottom row: 3 equal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 4,
          }}
        >
          {top6.slice(3).map((p) => (
            <ProjectCard key={p.name} project={p} onClick={() => setActiveProject(p)} />
          ))}
        </div>

        {/* See All */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <Link
            href="/gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#111',
              textDecoration: 'none',
              padding: '12px 28px',
              border: '1px solid rgba(0,0,0,0.15)',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#111';
              (e.currentTarget as HTMLAnchorElement).style.color = 'white';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = '#111';
            }}
          >
            Xem Tất Cả
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {activeProject && (
        <GalleryModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}


