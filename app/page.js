"use client";

import React, {useState, useEffect, useRef} from 'react';
import { Github, Linkedin, Mail, MenuIcon, X, ExternalLink, ChevronDown, Lock } from 'lucide-react';

import "./globals.css";

const WaveParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size to match container
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.baseY = this.y;
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.phase += this.frequency;

        // Wave motion
        this.y = this.baseY + Math.sin(this.phase) * this.amplitude;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${this.size / 3})`;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 51, 234, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    setCanvasSize();
    init();
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
      />
  );
};

const TypewriterText = ({ text, delay = 100, isGradient = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const hasTypedRef = useRef(false);

  useEffect(() => {
    if (!hasTypedRef.current) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTypingDone(true);
          hasTypedRef.current = true;
        }
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [text, delay]);

  return (
      <span className={`inline-block ${isGradient ? 'bg-gradient-to-r from-purple-500 to-blue-800 bg-clip-text text-transparent' : ''}`}>
      {displayText}
        {!isTypingDone && (
            <span className="inline-block w-0.5 h-8 bg-purple-500 animate-blink ml-1" />
        )}
    </span>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

// Mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

// Combined scroll and animation effect
  useEffect(() => {
    if (!isMounted) return; // Don't run until component is mounted

    // Scroll progress and active section handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      const sections = ['profile', 'work', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all elements with the scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((element) => {
      // Reset the initial state
      element.classList.remove('animate-in');
      observer.observe(element);
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [isMounted]); // Only depend on isMounted


  return (
      <div className="bg-gray-900 min-h-screen text-gray-100">
        {/* Progress Bar */}
        <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-300"
            style={{width: `${scrollProgress}%`}}
        />

        {/* Navigation */}
        <nav className="fixed w-full bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
            <span
                className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-800 bg-clip-text text-transparent hover:scale-110 transition-transform">
              FA
            </span>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {[
                  {name: 'Experience', id: 'work'},
                  {name: 'Tech Stack', id: 'experience'},
                  {name: 'Projects', id: 'projects'},
                  {name: 'Contact', id: 'contact'}
                ].map((item) => (
                    <a
                        key={item.name}
                        href={`#${item.id}`}
                        className={`text-sm font-extrabold transition-all hover:text-purple-400 hover:scale-105 ${
                            activeSection === item.id
                                ? 'text-purple-400'
                                : 'text-gray-400'
                        }`}
                    >
                      {item.name}
                    </a>
                ))}
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-purple-400">
                  {isMenuOpen ? <X className="animate-spin-once"/> : <MenuIcon/>}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slideDown">
                <div className="px-4 py-2 space-y-2">
                  {[
                    {name: 'Experience', id: 'work'},
                    {name: 'Tech Stack', id: 'experience'},
                    {name: 'Projects', id: 'projects'},
                    {name: 'Contact', id: 'contact'}
                  ].map((item) => (
                      <a
                          key={item.name}
                          href={`#${item.id}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 text-gray-400 hover:text-purple-400"
                      >
                        {item.name}
                      </a>
                  ))}
                </div>
              </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="profile"
                 className="relative min-h-screen flex items-center px-4 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="absolute inset-0">
            <WaveParticlesBackground/>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full pt-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24 min-h-[calc(100vh-4rem)]">
              <div className="relative group md:ml-16 mt-8 md:mt-0">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 animate-pulse-slow transition-all duration-300 group-hover:opacity-90 group-hover:blur-xl">
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-spin-slow transition-all duration-300 group-hover:opacity-80 group-hover:-inset-3">
                </div>
                <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden">
                  <img
                      src='./assets/faraaz.png'
                      alt="Faraaz Ahmed"
                      className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center w-full md:w-auto md:flex-1">
                <div className="animate-fadeIn md:pl-8">
                  <div className="text-left">
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">
                      <span className="block text-xl md:text-3xl mb-2 md:mb-4">Hello, I'm</span>
                      <TypewriterText
                          text="Faraaz Ahmed"
                          delay={125}
                          isGradient={true}
                      />
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg text-justify max-w-2xl mb-6 md:mb-12">
                      A 3rd Year Computer Science and Statistics student at the University of Toronto. I love exploring
                      new technologies and building cool things. When I'm not coding, you can find me trying out new
                      food spots around the city, planning my next trip, or experimenting with photography.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6 md:mb-8">
                      <button
                          onClick={() => window.open('./assets/Resume_Faraaz_Ahmed.pdf')}
                          className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-blue-800 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2 group"
                      >
                        Resume
                        <ExternalLink size={16} className="group-hover:rotate-45 transition-transform"/>
                      </button>
                      <button
                          onClick={() => document.getElementById('contact').scrollIntoView()}
                          className="px-4 md:px-6 py-2 md:py-3 border-2 border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 hover:scale-105 transition-all"
                      >
                        Contact Me
                      </button>
                    </div>
                    <div className="flex gap-4">
                      {[
                        {Icon: Linkedin, href: "https://www.linkedin.com/in/faraaz-ahmed-b470221b4/"},
                        {Icon: Github, href: "https://github.com/faraazzz31"},
                        {Icon: Mail, href: "mailto:faraaz.ahmed31@gmail.com"}
                      ].map(({Icon, href}, index) => (
                          <a
                              key={index}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-purple-400 hover:scale-110 transition-all"
                          >
                            <Icon size={20} className="md:w-6 md:h-6"/>
                          </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
            <ChevronDown size={32} className="text-purple-400 animate-bounce"/>
          </div>
        </section>

        {/* Experience Section */}
        <section id="work" className="py-16 bg-gray-800/50 px-4 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Where I've worked and what I've done
            </p>
            <div className="space-y-8">
              {[
                {
                  date: 'Dec 2023 - Present',
                  title: 'Senior Data Quality Specialist',
                  company: 'Cohere',
                  location: 'Toronto, ON',
                  points: [
                    'Specializing in code review of LLM data',
                    'Performed quality assurance and evaluation of code generation (RLHF) across various programming languages (Python, Java, HTML/CSS, JavaScript, C, SQL, TypeScript), achieving 13.5% performance improvement while reducing operational costs by 50%',
                    'Conducted data curation and annotation tasks for Command R/R+ (104B parameters), collaborating with teams to enhance LLM performance',
                    'Carried comprehensive validation processes including prompt engineering, debugging, and code testing to optimize model outputs across diverse technical domains'
                  ]
                },
                {
                  date: 'Sep 2023 - Dec 2023',
                  title: 'Data Quality Specialist',
                  company: 'Cohere',
                  location: 'Toronto, ON',
                  points: [
                    'Evaluated and ranked machine learning outputs to identify errors and optimize model responses',
                    'Optimized datasets through annotation and quality assurance testing to improve model performance metrics'
                  ]
                }
              ].map((exp, index) => (
                  <div
                      key={index}
                      className="group hover:scale-[1.02] transition-all duration-300 scroll-animate opacity-0 translate-y-8"
                      style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                      <div className="flex flex-col space-y-2">
                        <h3 className="text-xl font-semibold text-gray-100">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400">{exp.company}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{exp.location}</span>
                        </div>
                        <span className="text-sm text-gray-400">{exp.date}</span>
                      </div>
                      <ul className="space-y-3 mt-4">
                        {exp.points.map((point, idx) => (
                            <li key={idx} className="text-gray-300 flex items-center gap-3">
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-500"/>
                              {point}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="experience" className="py-16 px-4 bg-gray-900 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Technologies I've been working with
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Programming Languages',
                  skills: ['Python', 'Java', 'C', 'Bash/Shell', 'JavaScript', 'R', 'TypeScript', 'SQL', 'Swift']
                },
                {
                  title: 'Frameworks & Libraries',
                  skills: ['React', 'Next.js', 'Tailwind CSS', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Ggplot2']
                },
                {
                  title: 'Tools & Platforms',
                  skills: ['Git', 'Docker', 'Node.js', 'Prisma', 'Jira', 'Figma', 'REST APIs', 'Unix', 'MongoDB', 'SQLite', 'Postman', 'AWS Lambda', 'AWS DynamoDB']
                }
              ].map((category, index) => (
                  <div key={index}
                       className="group bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                          <span
                              key={idx}
                              className="px-3 py-1 bg-gray-900/50 text-gray-300 rounded-full text-sm hover:bg-purple-500/20 hover:text-purple-400 transition-colors"
                          >
                      {skill}
                    </span>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 px-4 bg-gray-800/50 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-gray-400 text-center mb-12 text-lg">
              Some cool things I've built and worked on
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Scriptorium',
                  description: 'A full-stack collaborative code sharing platform using TypeScript, Next.js, Prisma, and SQLite, featuring syntax highlighting, blog post sharing, and code template forking capabilities. Implemented responsive frontend with React, TypeScript, TailwindCSS and used Docker for secure, isolated deployments.',
                  image: './assets/scriptorium.webp',
                  link: 'https://github.com/faraazzz31/scriptorium',
                  type: 'github'
                },
                {
                  title: 'A11YMOLY',
                  description: 'A web accessibility testing platform for 0 Barriers Foundation (nonprofit) ' +
                      'using React, MongoDB, and Tailwind CSS that automates WCAG compliance scanning and PDF ' +
                      'accessibility testing. Implemented detailed violation reporting and compliance scoring system.',
                  image: './assets/wcag.png',
                  type: 'private'
                },
                {
                  title: 'UofT ASA DataFest 2024',
                  description: 'Secured 3rd place in University of Toronto\'s ASA DataFest 2024, delivering a comprehensive student engagement analysis report for CourseKata using Python (pandas, matplotlib) and R.',
                  image: './assets/project-3.png',
                  link: 'https://www.linkedin.com/feed/update/urn:li:activity:7192002351891652608/',
                  type: 'linkedin'
                },
                {
                  title: 'Meal Master',
                  description: 'A meal planning application in Java following SOLID principles and Clean Architecture to generate personalized recipes with features such as calorie tracking, weekly meal scheduling, and grocery list creation.',
                  image: './assets/project-1.png',
                  link: 'https://github.com/faraazzz31/Meal-Master',
                  type: 'github'
                },
                {
                  title: 'Grade Tracker',
                  description: 'A native macOS application using SwiftUI and Swift that helps students consolidate and track assignment grades in a single platform. Built smart grade calculation features including weighted averages, target grade tracking, and predictive insights for required scores.',
                  image: './assets/grade.jpeg',
                  link: 'https://github.com/faraazzz31/Grade-Tracker',
                  type: 'github'
                },
                {
                  title: 'Movie Match',
                  description: 'A Python software that uses community-sourced movie reviews and graph algorithms with cosine similarity. It uses MovieLens dataset with 100,000 ratings from 600 users across 9,000 movies.',
                  image: './assets/project-2.png',
                  link: 'https://github.com/faraazzz31/Movie-Match',
                  type: 'github'
                }
              ].map((project, index) => (
                  <div key={index}
                       className="group bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                          className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </div>
                    <div className="p-6 flex flex-col min-h-[315px]">
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-purple-400">{project.title}</h3>
                        <p className="text-gray-400">{project.description}</p>
                      </div>
                      <div className="mt-4">
                        {project.type === 'github' && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform"
                            >
                              View <Github size={16} className="ml-1"/>
                              <ExternalLink size={16} className="ml-1 group-hover:rotate-45 transition-transform"/>
                            </a>
                        )}
                        {project.type === 'linkedin' && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform"
                            >
                              View <Linkedin size={16} className="ml-1"/>
                              <ExternalLink size={16} className="ml-1 group-hover:rotate-45 transition-transform"/>
                            </a>
                        )}
                        {project.type === 'inProgress' && (
                            <span className="inline-flex items-center text-purple-400">
                    In Progress <Github size={16} className="ml-1"/>
                  </span>
                        )}
                        {project.type === 'private' && (
                            <span className="inline-flex items-center text-purple-400">
                    Private Repository <Github size={16} className="ml-1"/> <Lock size={16} className="ml-1"/>
                  </span>
                        )}
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-gray-900 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse"/>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Get in Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <a
                  href="mailto:faraaz.ahmed31@gmail.com"
                  className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-4">
                  <Mail className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform"/>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">Email</h3>
                    <p className="text-gray-400 group-hover:text-purple-400 transition-colors">
                      faraaz.ahmed31@gmail.com
                    </p>
                  </div>
                </div>
              </a>

              <a
                  href="https://www.linkedin.com/in/faraaz-ahmed-b470221b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center gap-4">
                  <Linkedin className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform"/>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">LinkedIn</h3>
                    <p className="text-gray-400 group-hover:text-purple-400 transition-colors">
                      Connect with me
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-16 max-w-md mx-auto">
              <p className="text-gray-400 mb-8">
                I'm always open to new opportunities and interesting projects.
                Feel free to reach out!
              </p>
              <div className="p-px bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg animate-pulse">
                <button
                    onClick={() => window.open('mailto:faraaz.ahmed31@gmail.com')}
                    className="w-full px-8 py-4 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors"
                >
                  Send a Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-800/50 border-t border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400">Website by Faraaz Ahmed</p>
                <p className="text-sm text-gray-500 mt-1">© {new Date().getFullYear()} All rights reserved</p>
              </div>

              <div className="flex gap-4">
                <a
                    href="#profile"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Back to Top
                </a>
                <span className="text-gray-600">|</span>
                {[
                  {name: 'Experience', id: 'work'},
                  {name: 'Tech Stack', id: 'experience'},
                  {name: 'Projects', id: 'projects'},
                  {name: 'Contact', id: 'contact'}
                ].map((item) => (
                    <a
                        key={item.name}
                        href={`#${item.id}`}
                        className="text-gray-400 hover:text-purple-400 transition-colors hidden md:inline"
                    >
                      {item.name}
                    </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }

          .animate-blink {
            animation: blink 1s infinite;
          }
        `}</style>
      </div>
  );
};

export default Portfolio;