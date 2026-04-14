"use client";

import { useEffect, useRef, useState } from "react";
import LiquidCursor from "./cursor";
import WaterCanvas from "./water";

const NAV = ["Dịch Vụ", "Dự Án", "Quy Trình", "Liên Hệ"];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(i);
        },
        { root: container, threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const goTo = (i: number) => {
    const el = sectionRefs.current[i];
    const c = containerRef.current;
    if (el && c) c.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  const ref = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
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
        <ul className="flex items-center gap-12">
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
      </nav>

      {/* SIDE DOTS */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[10px]">
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
          scrollSnapType: "y mandatory",
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
            <source src="/photos/background.mov" type="video/quicktime" />
            <source src="/photos/background.mov" type="video/mp4" />
          </video>

          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-white/50 text-[10px] tracking-[0.7em] uppercase mb-8">
              Thiết Kế & Thi Công
            </p>
            <div
              className="border border-white/20 flex flex-col items-center"
              style={{ padding: "52px 88px", backdropFilter: "blur(6px)" }}
            >
              <h1
                className="text-white font-thin uppercase"
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
          <div style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}>
            <Label>Dịch Vụ</Label>
            <h2
              className="text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 64px",
              }}
            >
              Những Gì Chúng Tôi Làm
            </h2>

            <div
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
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#080808" }}
        >
          <div style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}>
            <Label>Dự Án</Label>
            <h2
              className="text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 56px",
              }}
            >
              Công Trình Tiêu Biểu
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {[
                { name: "Biệt Thự Nghỉ Dưỡng", loc: "Đà Nẵng" },
                { name: "Khu Resort 5 Sao", loc: "Phú Quốc" },
                { name: "Penthouse Cao Cấp", loc: "TP. Hồ Chí Minh" },
                { name: "Villa Sân Vườn", loc: "Hội An" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    aspectRatio: "16/9",
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    <p className="text-white font-light text-sm tracking-widest uppercase">
                      {p.name}
                    </p>
                    <p
                      className="text-xs tracking-widest uppercase mt-2"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {p.loc}
                    </p>
                  </div>
                  <div className="absolute bottom-4 left-5 group-hover:opacity-0 transition-opacity duration-300">
                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {p.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section
          ref={ref(3)}
          id="quy-trinh"
          className="h-screen w-full flex items-center justify-center"
          style={{ scrollSnapAlign: "start", background: "#0b0b0b" }}
        >
          <div style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}>
            <Label>Quy Trình</Label>
            <h2
              className="text-white font-light text-center"
              style={{
                fontSize: "2.6rem",
                letterSpacing: "0.02em",
                margin: "20px 0 72px",
              }}
            >
              Cách Chúng Tôi Làm Việc
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 40,
              }}
            >
              {[
                {
                  n: "01",
                  t: "Tư Vấn",
                  d: "Lắng nghe và phân tích nhu cầu cụ thể của từng khách hàng.",
                },
                {
                  n: "02",
                  t: "Thiết Kế",
                  d: "Phác thảo ý tưởng và hoàn thiện bản vẽ kỹ thuật chi tiết.",
                },
                {
                  n: "03",
                  t: "Thi Công",
                  d: "Triển khai xây dựng theo đúng tiêu chuẩn và tiến độ cam kết.",
                },
                {
                  n: "04",
                  t: "Bàn Giao",
                  d: "Kiểm tra chất lượng và bàn giao công trình hoàn chỉnh.",
                },
              ].map((p, idx) => (
                <div
                  key={p.n}
                  className="flex flex-col"
                  style={{ paddingTop: idx % 2 === 1 ? 32 : 0 }}
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
            className="relative z-10"
            style={{ width: "100%", maxWidth: 960, padding: "0 56px" }}
          >
            <div
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
                    { label: "Email", value: "info@linhlinhdan.com" },
                    { label: "Điện Thoại", value: "+84 919992424" },
                    {
                      label: "Địa Chỉ",
                      value: "49L Quốc Hương, Thảo Điền, An Khánh, Hồ Chí Minh",
                    },
                  ].map((c) => (
                    <div key={c.label}>
                      <p
                        className="text-[10px] tracking-[0.4em] uppercase mb-1"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="text-sm font-light"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {c.value}
                      </p>
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
