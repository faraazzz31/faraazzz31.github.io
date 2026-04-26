"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import {
  education,
  experiences,
  navItems,
  personalPicks,
  profile,
  projects,
  skills,
} from "./portfolio-data.mjs";
import "./globals.css";

const SectionLabel = ({ index, title, labelId }) => (
  <div className="section-label">
    <span>{index}</span>
    <span id={labelId}>{title}</span>
  </div>
);

const sectionTitles = {
  about: "About Me",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
};

const centeredSections = new Set(["about", "education", "skills"]);

const Section = ({ id, index, title, children, className = "" }) => (
  <section
    id={id}
    className={`resume-section ${className}`.trim()}
    aria-labelledby={`${id}-heading`}
  >
    <SectionLabel index={index} title={title} labelId={`${id}-heading`} />
    {children}
  </section>
);

const ProjectLink = ({ project }) => {
  const label = project.linkLabel || "GitHub";
  const Icon = label === "LinkedIn" ? Linkedin : Github;

  return (
    <a
      className="project-action"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.name} on ${label}`}
      title={label}
    >
      <Icon aria-hidden="true" size={18} />
      <ArrowUpRight aria-hidden="true" className="external-arrow" size={13} />
    </a>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const contentPanelRef = useRef(null);

  const socialLinks = useMemo(
    () => [
      { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
      { label: "GitHub", href: profile.github, icon: Github },
      { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
    ],
    [],
  );

  const activeIndex = Math.max(
    navItems.findIndex((item) => item.id === activeSection),
    0,
  );
  const activeItem = navItems[activeIndex];
  const isCenteredSection = centeredSections.has(activeSection);
  const activeSectionNumber = String(activeIndex + 1).padStart(2, "0");
  const activeSectionTitle = sectionTitles[activeSection] || activeItem.label;

  const handleSectionChange = (sectionId) => {
    if (!navItems.some((item) => item.id === sectionId)) {
      return;
    }

    setActiveSection(sectionId);
    if (typeof window !== "undefined") {
      const nextHash = `#${sectionId}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      } else {
        contentPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const syncSectionFromHash = () => {
      const sectionId = window.location.hash.slice(1);
      if (navItems.some((item) => item.id === sectionId)) {
        setActiveSection(sectionId);
      } else if (window.location.hash) {
        setActiveSection(navItems[0].id);
        window.history.replaceState(null, "", `#${navItems[0].id}`);
      }
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);
    window.addEventListener("popstate", syncSectionFromHash);

    return () => {
      window.removeEventListener("hashchange", syncSectionFromHash);
      window.removeEventListener("popstate", syncSectionFromHash);
    };
  }, []);

  useEffect(() => {
    contentPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "education":
        return (
          <Section
            id="education"
            index={activeSectionNumber}
            title={activeSectionTitle}
            className="centered-section education-section"
          >
            <div className="education-stack">
              {education.map((item, index) => (
                <article className="education-row" key={item.school} style={{ "--row-index": index }}>
                  <div>
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                    <p className="muted">{item.detail}</p>
                  </div>
                  <div className="education-meta">
                    <span>{item.dates}</span>
                    <span>{item.location}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="education-note" aria-label="Academic focus">
              <span>Academic focus</span>
              <strong>Computer Science, Statistics, and Machine Learning</strong>
            </div>
          </Section>
        );

      case "experience":
        return (
          <Section id="experience" index={activeSectionNumber} title={activeSectionTitle}>
            <div className="timeline-list">
              {experiences.map((item, index) => (
                <article
                  className="timeline-row experience-row"
                  key={`${item.company}-${item.role}`}
                  style={{ "--row-index": index }}
                >
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="timeline-meta">
                    <span>{item.dates}</span>
                    <span>{item.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        );

      case "projects":
        return (
          <Section id="projects" index={activeSectionNumber} title={activeSectionTitle}>
            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-row" key={project.name} style={{ "--row-index": index }}>
                  <div>
                    <div className="project-heading">
                      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                      <h3>{project.name}</h3>
                    </div>
                    <p>{project.description}</p>
                    <span className="project-stack">{project.stack}</span>
                  </div>
                  {project.href && <ProjectLink project={project} />}
                </article>
              ))}
            </div>
          </Section>
        );

      case "skills":
        return (
          <Section
            id="skills"
            index={activeSectionNumber}
            title={activeSectionTitle}
            className="centered-section skills-section"
          >
            <div className="skills-grid">
              {skills.map((group, index) => (
                <article className="skill-group" key={group.title} style={{ "--row-index": index }}>
                  <h3>{group.title}</h3>
                  <p>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        );

      case "about":
      default:
        return (
          <Section
            id="about"
            index={activeSectionNumber}
            title={activeSectionTitle}
            className="centered-section about-section"
          >
            <div className="intro-center">
              <div>
                <img src="/assets/profile-pic.jpg" alt="Faraaz Ahmed" className="mobile-intro-photo" />
                <div className="about-heading-block">
                  <h2>{profile.name}</h2>
                  <div className="about-social-links" aria-label="Contact links">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                      >
                        <Icon aria-hidden="true" size={14} />
                        <span>{label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <p className="intro-copy">{profile.summary}</p>
              </div>
              <div className="fact-strip" aria-label="Current profile details">
                <div>
                  <span>Focus</span>
                  <strong>{profile.focus}</strong>
                </div>
                <div>
                  <span>Based in</span>
                  <strong>{profile.location}</strong>
                </div>
              </div>
              <div className="personal-picks" aria-label="Interests">
                <span className="personal-picks-label">Interests</span>
                <div>
                  {personalPicks.map((group) => (
                    <article key={group.label}>
                      <span>{group.label}</span>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        );
    }
  };

  return (
    <main className="portfolio-shell">
      <div className="background-grid" aria-hidden="true" />

      <header className="mobile-header">
        <nav className="mobile-tabs" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "active" : ""}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => handleSectionChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="resume-document">
        <aside className="side-panel">
          <div>
            <button
              className="profile-photo-link"
              type="button"
              aria-label="Back to about section"
              onClick={() => handleSectionChange("about")}
            >
              <img src="/assets/profile-pic.jpg" alt="Faraaz Ahmed" className="profile-photo" />
            </button>
            <div className="identity-block">
              <h1>{profile.name}</h1>
              <p>{profile.role}</p>
            </div>
          </div>

          <nav
            className="side-nav"
            aria-label="Portfolio sections"
            style={{ "--active-nav-index": activeIndex }}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={activeSection === item.id ? "active" : ""}
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => handleSectionChange(item.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </button>
            ))}
          </nav>

        </aside>

        <div className="content-panel" ref={contentPanelRef}>
          <div className="accent-lights" key={`lights-${activeSection}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div
            className={`tab-panel-shell ${isCenteredSection ? "centered-panel" : ""}`}
            key={activeSection}
          >
            {renderActiveSection()}
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <span>Faraaz Ahmed</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
