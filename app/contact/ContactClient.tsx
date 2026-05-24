"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FIELD_BASE: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(242,237,228,0.12)",
  color: "#F2EDE4",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  padding: "12px 0",
  width: "100%",
  outline: "none",
  transition: "border-color 0.3s",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "9px",
  color: "#C84B2A",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "8px",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Photo + Video");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const timer = setTimeout(() => {
      left.style.opacity = "1";
      left.style.transform = "translateY(0)";
      right.style.opacity = "1";
      right.style.transform = "translateY(0)";
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry — ${projectType}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject Type: ${projectType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:aiden@aidenurbine.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const focusStyle = (focused: boolean): React.CSSProperties => ({
    ...FIELD_BASE,
    borderBottom: focused
      ? "1px solid #C84B2A"
      : "1px solid rgba(242,237,228,0.12)",
  });

  return (
    <main
      style={{
        background: "#0E0B08",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Back link */}
      <Link
        href="/home"
        style={{
          position: "fixed",
          top: 32,
          left: 56,
          zIndex: 100,
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          color: backHover ? "#F2EDE4" : "#8C7B65",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "color 0.3s",
        }}
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
      >
        ← Work
      </Link>

      {/* Page body */}
      <div
        className="contact-layout"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "140px 56px 80px",
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
        }}
      >
        {/* Left — contact info */}
        <div
          ref={leftRef}
          style={{
            flex: 1,
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "#C84B2A",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Contact
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(48px, 6vw, 80px)",
              color: "#F2EDE4",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            LET'S WORK
            <br />
            TOGETHER
          </h1>

          <div
            style={{
              width: 48,
              height: 1,
              background: "#C84B2A",
              opacity: 0.4,
              margin: "32px 0",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "16px",
              color: "#8C7B65",
              lineHeight: 1.8,
              maxWidth: 360,
              margin: "0 0 48px",
            }}
          >
            Based in Missoula, Montana. Available for brand campaigns, product
            launches, ambassador content, and editorial shoots across the West.
          </p>

          {/* Contact items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                label: "Email",
                value: "aiden@aidenurbine.com",
                href: "mailto:aiden@aidenurbine.com",
              },
              {
                label: "Instagram",
                value: "@urbineaiden",
                href: "https://instagram.com/urbineaiden",
              },
              { label: "Location", value: "Missoula, Montana", href: null },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "#8C7B65",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    minWidth: 72,
                  }}
                >
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#F2EDE4",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C84B2A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#F2EDE4")}
                  >
                    {value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#F2EDE4",
                    }}
                  >
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div
          ref={rightRef}
          style={{
            flex: 1.2,
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          <div
            style={{
              background: "rgba(242,237,228,0.03)",
              border: "1px solid rgba(242,237,228,0.07)",
              padding: 48,
            }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 320,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 48,
                    color: "#F2EDE4",
                    letterSpacing: "-0.02em",
                    margin: "0 0 16px",
                  }}
                >
                  SENT.
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: 16,
                    color: "#8C7B65",
                    margin: 0,
                  }}
                >
                  I'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <FocusField label="Name">
                  {(focused, handlers) => (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      style={focusStyle(focused)}
                      {...handlers}
                    />
                  )}
                </FocusField>

                <FocusField label="Email">
                  {(focused, handlers) => (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      style={focusStyle(focused)}
                      {...handlers}
                    />
                  )}
                </FocusField>

                <FocusField label="Project Type">
                  {(focused, handlers) => (
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      style={{
                        ...focusStyle(focused),
                        appearance: "none",
                        WebkitAppearance: "none",
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238C7B65'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 4px center",
                        cursor: "pointer",
                      }}
                      {...handlers}
                    >
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                      <option value="Photo + Video">Photo + Video</option>
                      <option value="Other">Other</option>
                    </select>
                  )}
                </FocusField>

                <FocusField label="Message">
                  {(focused, handlers) => (
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      style={{
                        ...focusStyle(focused),
                        resize: "none",
                        lineHeight: 1.7,
                      }}
                      {...handlers}
                    />
                  )}
                </FocusField>

                <button
                  type="submit"
                  style={{
                    marginTop: 8,
                    width: "100%",
                    padding: "16px",
                    background: btnHover ? "#C84B2A" : "transparent",
                    border: btnHover
                      ? "1px solid #C84B2A"
                      : "1px solid rgba(242,237,228,0.2)",
                    color: btnHover ? "#F2EDE4" : "#D4CFC4",
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.3s, border-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            flex-direction: column !important;
            gap: 60px !important;
            padding: 100px 24px 60px !important;
          }
        }
        select option {
          background: #0E0B08;
          color: #F2EDE4;
        }
        ::placeholder {
          color: rgba(242,237,228,0.25);
        }
      `}</style>
    </main>
  );
}

function FocusField({
  label,
  children,
}: {
  label: string;
  children: (
    focused: boolean,
    handlers: {
      onFocus: () => void;
      onBlur: () => void;
    }
  ) => React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "32px" }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children(focused, {
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
      })}
    </div>
  );
}
