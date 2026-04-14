"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import LiquidCursor from "./cursor";
import WaterCanvas from "./water";

const NAV = ["Dịch Vụ", "Dự Án", "Quy Trình", "Liên Hệ"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentIdx = useRef(0);
  const animating = useRef(false);

  const goTo = (i: number) => {
    const el = sectionRefs.current[i];
    const c = containerRef.current;
    if (!el || !c) return;
    animating.current = true;
    currentIdx.current = i;
    setActive(i);
    gsap.to(c, {
      scrollTop: el.offsetTop,
      duration: 0.85,
      ease: "power2.inOut",
      onComplete: () => {
        animating.current = false;
      },
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animating.current) return;
      if (Math.abs(e.deltaY) < 20) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(
        0,
        Math.min(sectionRefs.current.length - 1, currentIdx.current + dir)
      );
      if (next === currentIdx.current) return;
      goTo(next);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50 || animating.current) return;
      const dir = diff > 0 ? 1 : -1;
      const next = Math.max(
        0,
        Math.min(sectionRefs.current.length - 1, currentIdx.current + dir)
      );
      if (next !== currentIdx.current) goTo(next);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="nav-pad fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          padding: "28px 56px",
          background:
            active > 0 && active < 4 ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: active > 0 && active < 4 ? "blur(16px)" : "none",
        }}
      >
        <button
          onClick={() => goTo(0)}
          className="text-white uppercase font-light tracking-[0.4em] text-sm"
        >
          LLD
        </button>

        {/* Desktop nav */}
        <ul className="nav-links flex items-center gap-12">
          {NAV.map((label, i) => (
            <li key={label}>
              <button
                onClick={() => goTo(i + 1)}
                className="text-xs uppercase tracking-widest transition-all duration-300"
                style={{
                  color:
                    active === i + 1
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.4)",
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn flex flex-col justify-center gap-[5px]"
          onClick={() => setMenuOpen((o) => !o)}
          style={{ width: 24, padding: 0, background: "none", border: "none" }}
        >
          <span
            style={{
              display: "block",
              width: menuOpen ? "100%" : "100%",
              height: 1,
              background: "white",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              height: 1,
              background: "white",
              transition: "opacity 0.3s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "100%",
              height: 1,
              background: "white",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{
            background: "rgba(4,4,4,0.96)",
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
              className="text-white uppercase font-light tracking-[0.4em] text-xl transition-opacity duration-200"
              style={{ opacity: active === i + 1 ? 1 : 0.45 }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* SIDE DOTS */}
      <div className="side-dots fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[10px]">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: 5,
              height: active === i ? 20 : 5,
              borderRadius: 99,
              background: active === i ? "white" : "rgba(255,255,255,0.22)",
              transition: "all 0.35s ease",
              display: "block",
            }}
          />
        ))}
      </div>

      {/* SCROLL CONTAINER */}
      <div
        ref={containerRef}
        style={{
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {/* ─── HERO ─── */}
        <section
          ref={ref(0)}
          className="relative h-screen w-full overflow-hidden flex items-center justify-center"
          style={{ scrollSnapAlign: "start" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-white/50 text-[10px] tracking-[0.7em] uppercase mb-8">
              Thiết Kế & Thi Công
            </p>
            <div
              className="hero-box border border-white/20 flex flex-col items-center"
              style={{ padding: "52px 88px", backdropFilter: "blur(6px)" }}
            >
              <h1
                className="hero-title text-white font-thin uppercase"
                style={{
                  fontSize: "5rem",
                  letterSpacing: "0.6em",
                  lineHeight: 1,
                }}
              >
                LLD
              </h1>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "rgba(255,255,255,0.35)",
                  margin: "24px 0",
                }}
              />
              <p className="text-white/55 text-xs tracking-[0.4em] uppercase">
                Hồ Bơi Cao Cấp
              </p>
            </div>
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
          style={{ scrollSnapAlign: "start", background: "#0b0b0b" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <Label>Dịch Vụ</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 64px",
              }}
            >
              Những Gì Chúng Tôi Làm
            </h2>

            <div
              className="services-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
                background: "rgba(255,255,255,0.07)",
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
                  style={{ background: "#0b0b0b", padding: "44px 36px 44px" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#0b0b0b")
                  }
                >
                  <div
                    style={{
                      width: 28,
                      height: 1,
                      background: "rgba(255,255,255,0.3)",
                      marginBottom: 32,
                      transition: "width 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.width = "56px")}
                  />
                  <h3
                    className="text-white font-light"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "0.04em",
                      marginBottom: 16,
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(255,255,255,0.38)" }}
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
          className="h-screen w-full flex flex-col justify-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#080808" }}
        >
          <div
            className="portfolio-header"
            style={{ padding: "0 56px", marginBottom: 40 }}
          >
            <Label>Dự Án</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 0",
              }}
            >
              Công Trình Tiêu Biểu
            </h2>
          </div>
          <Portfolio />
        </section>

        {/* ─── PROCESS ─── */}
        <section
          ref={ref(3)}
          id="quy-trinh"
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#0b0b0b" }}
        >
          <div
            className="section-inner"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <Label>Quy Trình</Label>
            <h2
              className="section-title text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 72px",
              }}
            >
              Cách Chúng Tôi Làm Việc
            </h2>

            <div
              className="process-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 32,
              }}
            >
              {[
                {
                  n: "01",
                  t: "Giới Thiệu",
                  d: "Hơn 26 năm kinh nghiệm tư vấn, thiết kế và thi công hồ bơi, khu vui chơi nước và spa với thiết bị nhập khẩu từ Tây Ban Nha, Úc, New Zealand và Thụy Điển.",
                },
                {
                  n: "02",
                  t: "Khảo Sát",
                  d: "Đội ngũ kỹ thuật khảo sát thực địa, lập báo cáo chi tiết và đề xuất giải pháp tối ưu phù hợp với điều kiện thực tế của công trình.",
                },
                {
                  n: "03",
                  t: "Thiết Kế",
                  d: "Lựa chọn vật liệu từ bộ sưu tập đa dạng, tự do điều chỉnh kích thước và hình dạng để tạo nên hồ bơi độc đáo theo phong cách riêng.",
                },
                {
                  n: "04",
                  t: "Thi Công",
                  d: "Lập kế hoạch và dự toán chi tiết từng hạng mục. Đội thi công chuyên nghiệp đảm bảo tiêu chuẩn kỹ thuật, an toàn và tiến độ cam kết.",
                },
                {
                  n: "05",
                  t: "Bàn Giao",
                  d: "Kiểm tra toàn diện trước bàn giao, hướng dẫn vận hành và bảo trì. Chính sách bảo hành rõ ràng và hỗ trợ lâu dài sau khi sử dụng.",
                },
              ].map((p, idx) => (
                <div
                  key={p.n}
                  className="flex flex-col"
                  style={{ paddingTop: idx % 2 === 1 ? 40 : 0 }}
                >
                  <span
                    className="font-thin"
                    style={{
                      fontSize: "3.5rem",
                      color: "rgba(255,255,255,0.08)",
                      lineHeight: 1,
                      marginBottom: 24,
                    }}
                  >
                    {p.n}
                  </span>
                  <div
                    style={{
                      width: 24,
                      height: 1,
                      background: "rgba(255,255,255,0.2)",
                      marginBottom: 20,
                    }}
                  />
                  <h3
                    className="text-white font-light"
                    style={{
                      fontSize: "0.9rem",
                      letterSpacing: "0.06em",
                      marginBottom: 14,
                    }}
                  >
                    {p.t}
                  </h3>
                  <p
                    className="text-sm leading-7"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section
          ref={ref(4)}
          id="lien-he"
          className="relative h-screen w-full flex items-center justify-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            backgroundImage: "url('/photos/tilebg.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <WaterCanvas />

          <div
            className="contact-outer relative z-10"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <div
              className="contact-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.4fr",
                gap: 80,
                alignItems: "center",
                background: "rgba(256, 256, 256, 0.00)",
                backdropFilter: "blur(4px)",
                padding: "56px 64px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Left — info */}
              <div>
                <Label left>Liên Hệ</Label>
                <h2
                  className="text-white font-light"
                  className="contact-title"
                  style={{
                    fontSize: "2.8rem",
                    letterSpacing: "0.01em",
                    margin: "20px 0 24px",
                    lineHeight: 1.15,
                  }}
                >
                  Bắt Đầu
                  <br />
                  Dự Án Của Bạn
                </h2>
                <p
                  className="text-sm leading-7"
                  style={{ color: "rgba(255,255,255,0.65)", marginBottom: 48 }}
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
                        style={{ color: "rgba(255,255,255,0.45)" }}
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
                        style={{ color: "rgba(255,255,255,0.9)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#60A5FA")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.9)")
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
                            background: "white",
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
                            background: "white",
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
                    className="w-full bg-transparent text-white text-sm placeholder-white/40 focus:outline-none resize-none leading-7"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.25)",
                      padding: "16px 0",
                      transition: "border-color 0.2s",
                      display: "block",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(255,255,255,0.7)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderBottomColor =
                        "rgba(255,255,255,0.25)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="text-xs tracking-[0.35em] uppercase transition-all duration-300 hover:bg-white/20 hover:text-black"
                  style={{
                    marginTop: 36,
                    padding: "16px 0",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    letterSpacing: "0.3em",
                  }}
                >
                  Gửi Yêu Cầu
                </button>

                <p
                  className="text-center text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.18)", marginTop: 32 }}
                >
                  © {new Date().getFullYear()} LLD. All rights reserved.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
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
      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/40"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        padding: "16px 0",
        color: "white",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) =>
        (e.target.style.borderBottomColor = "rgba(255,255,255,0.7)")
      }
      onBlur={(e) =>
        (e.target.style.borderBottomColor = "rgba(255,255,255,0.25)")
      }
    />
  );
}

const PHOTOS = [
  {
    src: "/photos/portfolio/B%E1%BB%91n%20Bi%E1%BB%83n%20resort.jpeg",
    name: "Bốn Biển Resort",
  },
  {
    src: "/photos/portfolio/L%C3%A0ng%20Chuy%C3%AAn%20Gia%20The%20oasis.jpeg",
    name: "Làng Chuyên Gia The Oasis",
  },
  {
    src: "/photos/portfolio/L%C3%A0ng%20C%C3%A1%20Voi.jpg",
    name: "Làng Cá Voi",
  },
  { src: "/photos/portfolio/M%E1%BA%AFt%20Xanh.jpeg", name: "Mắt Xanh" },
  {
    src: "/photos/portfolio/Ocean%20Dunes%20Resort.jpeg",
    name: "Ocean Dunes Resort",
  },
  { src: "/photos/portfolio/Sunrise%20Village.jpeg", name: "Sunrise Village" },
  { src: "/photos/portfolio/S%C3%B4ng%20B%C3%A9.jpeg", name: "Sông Bé" },
  { src: "/photos/portfolio/The%20Anam%201.jpeg", name: "The Anam" },
  { src: "/photos/portfolio/The%20Anam%202.jpeg", name: "The Anam" },
  { src: "/photos/portfolio/The%20Anam%203.jpeg", name: "The Anam" },
  { src: "/photos/portfolio/The%20Anam%204.jpeg", name: "The Anam" },
  { src: "/photos/portfolio/IMG_0005.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0007.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0012.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0013.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0014.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0016.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0017.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0019.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0021.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0023.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0024.JPG", name: "Công Trình" },
  { src: "/photos/portfolio/IMG_0025.JPG", name: "Công Trình" },
];

function Portfolio() {
  const [current, setCurrent] = useState(0);
  const total = PHOTOS.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Show 3 cards: prev, active, next
  const indices = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <div
      className="portfolio-wrap relative w-full"
      style={{ padding: "0 56px" }}
    >
      {/* Cards */}
      <div
        className="flex items-center justify-center gap-4"
        style={{ height: 420 }}
      >
        {indices.map((idx, pos) => {
          const isActive = pos === 1;
          return (
            <div
              key={idx}
              onClick={() => {
                if (pos === 0) prev();
                if (pos === 2) next();
              }}
              className={`${
                isActive ? "portfolio-main" : "portfolio-side"
              } relative overflow-hidden transition-all duration-500`}
              style={{
                flex: isActive ? "0 0 54%" : "0 0 22%",
                height: isActive ? 400 : 300,
                opacity: isActive ? 1 : 0.45,
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <Image
                src={PHOTOS[idx].src}
                alt={PHOTOS[idx].name}
                fill
                sizes="(max-width: 768px) 100vw, 54vw"
                className="object-cover"
                quality={90}
              />
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-end"
                  style={{
                    padding: "32px 28px 24px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                  }}
                >
                  <p className="text-white font-light text-sm tracking-widest uppercase">
                    {PHOTOS[idx].name}
                  </p>
                  <p
                    className="text-xs tracking-widest ml-auto"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {current + 1} / {total}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="portfolio-arrows absolute left-8 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:opacity-100"
        style={{
          width: 40,
          height: 40,
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
          opacity: 0.5,
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        className="portfolio-arrows absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:opacity-100"
        style={{
          width: 40,
          height: 40,
          border: "1px solid rgba(255,255,255,0.2)",
          color: "white",
          opacity: 0.5,
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 20 : 5,
              height: 5,
              borderRadius: 99,
              background: i === current ? "white" : "rgba(255,255,255,0.22)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Label({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 ${left ? "" : "justify-center"}`}>
      <div
        style={{ width: 20, height: 1, background: "rgba(255,255,255,0.28)" }}
      />
      <span
        className="text-[10px] tracking-[0.5em] uppercase"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        {children}
      </span>
      {!left && (
        <div
          style={{ width: 20, height: 1, background: "rgba(255,255,255,0.28)" }}
        />
      )}
    </div>
  );
}
