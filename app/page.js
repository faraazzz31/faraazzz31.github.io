"use client";

import React, {useState, useEffect, useRef} from 'react';
import { Github, Linkedin, Mail, MenuIcon, X, ExternalLink, ChevronDown } from 'lucide-react';

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
      <span className={`inline-block ${isGradient ? 'bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
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

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Active section detection
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="bg-gray-900 min-h-screen text-gray-100">
        {/* Progress Bar */}
        <div
            className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 z-50 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
        />

        {/* Navigation */}
        <nav className="fixed w-full bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
            <span
                className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent hover:scale-110 transition-transform">
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
                    key = {item.name}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-all hover:text-purple-400 hover:scale-105 ${
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
                    { name: 'Experience', id: 'work' },
                    { name: 'Tech Stack', id: 'experience' },
                    { name: 'Projects', id: 'projects' },
                    { name: 'Contact', id: 'contact' }
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
        <section id="profile" className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                {/* Base animated glow effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 animate-pulse-slow transition-all duration-300 group-hover:opacity-90 group-hover:blur-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-spin-slow transition-all duration-300 group-hover:opacity-80 group-hover:-inset-3"></div>
                {/* Profile image container */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                  <img
                      src='./assets/faraaz.png'
                      alt="Faraaz Ahmed"
                      className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="animate-fadeIn">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-2xl md:text-3xl">Hello, I'm</span> <br/>
                    <TypewriterText
                        text="Faraaz Ahmed"
                        delay={50}
                        isGradient={true}
                    />
                  </h1>
                  <p className="text-gray-400 text-lg mb-6">
                    A third-year Computer Science and Statistics student at the University of Toronto
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <button
                        onClick={() => window.open('./assets/Resume_Faraaz_Ahmed.pdf')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2 group"
                    >
                      Download CV
                      <ExternalLink size={18} className="group-hover:rotate-45 transition-transform" />
                    </button>
                    <button
                        onClick={() => document.getElementById('contact').scrollIntoView()}
                        className="px-6 py-3 border-2 border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 hover:scale-105 transition-all"
                    >
                      Contact Me
                    </button>
                  </div>
                  <div className="flex justify-center gap-4">
                    {[
                      { Icon: Linkedin, href: "https://www.linkedin.com/in/faraaz-ahmed-b470221b4/" },
                      { Icon: Github, href: "https://github.com/faraazzz31" },
                      { Icon: Mail, href: "mailto:faraaz.ahmed31@gmail.com" }
                    ].map(({ Icon, href }, index) => (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-purple-400 hover:scale-110 transition-all"
                        >
                          <Icon size={24} />
                        </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <ChevronDown size={32} className="text-purple-400 animate-bounce" />
          </div>
        </section>

        {/* Experience Section */}
        <section id="work" className="py-16 bg-gray-800/50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-8">
              {[
                {
                  date: 'December 2023 - Present',
                  title: 'Senior Data Quality Specialist',
                  company: 'Cohere',
                  points: [
                    'Specializing in code review of LLM data',
                    'Q/A and testing LLM code outputs in Python, Java, HTML/CSS, C and SQL'
                  ]
                },
                {
                  date: 'September 2023',
                  title: 'Data Quality Specialist',
                  company: 'Cohere',
                  points: [
                    'Ranking and analyzing machine learning data to identify errors and inaccuracies',
                    'Generating and optimizing data to improve the performance of LLMs'
                  ]
                }
              ].map((exp, index) => (
                  <div key={index} className="flex gap-6 group hover:scale-[1.02] transition-all duration-300">
                    <div className="hidden md:block w-32 pt-1 text-sm text-gray-400">
                      {exp.date}
                    </div>
                    <div className="flex-1 bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                      <h3 className="text-xl font-semibold text-gray-100">{exp.title}</h3>
                      <p className="text-purple-400 mb-4">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.points.map((point, idx) => (
                            <li key={idx} className="text-gray-400 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
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
        <section id="experience" className="py-16 px-4 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Programming Languages',
                  skills: ['Python', 'Java', 'C', 'Bash/Shell', 'JavaScript', 'R', 'TypeScript', 'SQL']
                },
                {
                  title: 'Frameworks & Libraries',
                  skills: ['React', 'Next.js', 'Tailwind CSS', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Ggplot2']
                },
                {
                  title: 'Tools & Platforms',
                  skills: ['Git', 'Docker', 'Node.js', 'Prisma', 'Jira', 'Figma', 'REST APIs', 'Unix']
                }
              ].map((category, index) => (
                  <div key={index} className="group bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
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
        <section id="projects" className="py-16 px-4 bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Meal Master',
                  description: 'A Java-based meal planning app using SOLID principles and Clean Architecture.',
                  image: './assets/project-1.png',
                  link: 'https://github.com/faraazzz31/Meal-Master',
                  type: 'github'
                },
                {
                  title: 'Movie Match',
                  description: 'A Python software that uses community-sourced movie reviews and graph algorithms with cosine similarity.',
                  image: './assets/project-2.png',
                  link: 'https://github.com/faraazzz31/Movie-Match',
                  type: 'github'
                },
                {
                  title: 'UofT ASA DataFest 2024',
                  description: '3rd place in data hackathon analyzing student engagement with CourseKata materials.',
                  image: './assets/project-3.png',
                  link: 'https://www.linkedin.com/feed/update/urn:li:activity:7192002351891652608/',
                  type: 'linkedin'
                }
              ].map((project, index) => (
                  <div key={index} className="group bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-purple-400">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:translate-x-2 transition-transform"
                      >
                        View {' '}
                        {project.type === 'github' ? (
                            <Github size={16} className="ml-1" />
                        ) : (
                            <Linkedin size={16} className="ml-1" />
                        )}
                        <ExternalLink size={16} className="ml-1 group-hover:rotate-45 transition-transform" />
                      </a>
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
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
                  <Mail className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
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
                  <Linkedin className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
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
                  { name: 'Experience', id: 'work' },
                  { name: 'Tech Stack', id: 'experience' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Contact', id: 'contact' }
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

        {/* Add these keyframes to your CSS */}
        <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
      </div>
  );
};

export default Portfolio;