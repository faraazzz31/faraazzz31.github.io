export const navItems = [
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
];

export const profile = {
  name: "Faraaz Ahmed",
  role: "Software Engineer",
  location: "Toronto, ON",
  email: "faraaz.ahmed31@gmail.com",
  github: "https://github.com/faraazzz31",
  linkedin: "https://www.linkedin.com/in/faraaz-ahmed-b470221b4/",
  focus: "Full-stack applications, data pipelines, and ML systems",
  summary:
    "I’m a software engineer working across full-stack applications, data pipelines, and machine learning systems. I studied Computer Science and Statistics at the University of Toronto and I’m now pursuing an MS in Computer Science at Georgia Tech. When I’m away from my laptop, I’m usually playing tennis, hunting for good coffee, or taking photos around the city.",
};

export const personalPicks = [
  {
    label: "Hobbies",
    items: ["Tennis", "Running", "Cooking"],
  },
  {
    label: "Shows",
    items: ["Breaking Bad", "Game of Thrones", "Death Note"],
  },
  {
    label: "Music",
    items: ["Coldplay", "ABBA", "Tame Impala"],
  },
  {
    label: "Games",
    items: ["Elden Ring", "Far Cry 4", "Uncharted 3"],
  },
];

export const education = [
  {
    school: "University of Toronto",
    degree: "Honours Bachelor of Science",
    detail: "Majors in Computer Science and Statistics",
    location: "Toronto, ON",
    dates: "Sep 2022 - Dec 2025",
  },
  {
    school: "Georgia Institute of Technology",
    degree: "Master of Science in Computer Science",
    detail: "Specialization in Machine Learning",
    location: "Remote, Part-Time",
    dates: "Jan 2026 - Present",
  },
];

export const experiences = [
  {
    role: "Software Engineer",
    company: "Insight Pest Solutions",
    location: "Burlington, ON",
    dates: "Feb 2026 - Present",
    bullets: [
      "Built ETL pipelines supporting financial reporting and transaction auditing across 13+ branches using Snowflake, PostgreSQL, Flask, and Google Cloud Run, integrating QuickBooks, Esso, and WorkWave APIs.",
      "Optimized database systems processing 100M+ records and reduced lock time by 80% with incremental syncs, cursor tracking, indexing strategy, and concurrency controls.",
      "Built a routing analytics and planning dashboard with React, Next.js, TypeScript, PostgreSQL, and Google Maps API, enabling capacity planning and branch-level reporting for 120+ users across 16 branches.",
      "Developed a full-stack employee file system supporting role-based permissions and secure document management for 500+ users.",
    ],
  },
  {
    role: "Machine Learning Research Assistant",
    company: "FinHub Lab, Rotman School of Management",
    location: "Toronto, ON",
    dates: "May 2025 - Aug 2025",
    bullets: [
      "Built a financial reinforcement learning environment in Stable-Baselines3 for Rotman's trading simulator.",
      "Developed a PPO model achieving 93% arbitrage accuracy.",
      "Extended the system to a distributed multi-agent PPO training framework in Ray RLlib to analyze liquidity dynamics and emergent behavior in illiquid markets.",
    ],
  },
  {
    role: "Data Engineering Research Assistant",
    company: "Rotman School of Management",
    location: "Toronto, ON",
    dates: "Mar 2025 - Jun 2025",
    bullets: [
      "Implemented an ETL pipeline to collect, parse, normalize, and store data from external APIs and web sources.",
      "Used asynchronous network requests with urllib and asyncio to improve data ingestion throughput by 60%.",
      "Automated daily collection and processing workflows with GitHub Actions, scheduled cron jobs, and Dropbox SDK storage management.",
    ],
  },
  {
    role: "Software Developer and IT Intern",
    company: "World Wide Logistics Inc",
    location: "Toronto, ON",
    dates: "May 2025 - Jul 2025",
    bullets: [
      "Maintained and updated company websites using WordPress, PHP templates, themes, and plugins.",
      "Managed IT infrastructure including VPN, firewall, remote desktops, and Office 365 user administration.",
    ],
  },
  {
    role: "AI Data Analyst",
    company: "Cohere",
    location: "Toronto, ON",
    dates: "Sep 2023 - Mar 2025",
    bullets: [
      "Curated and optimized code-focused LLM datasets through prompt engineering, RLHF, and data analysis.",
      "Worked on model coding performance for Cohere Command R and R+ models.",
      "Collaborated with the synthetic data team on large-scale common crawl web scraping for LLM training pipelines.",
    ],
  },
];

export const projects = [
  {
    name: "Scriptorium",
    stack: "TypeScript, React, Next.js, SQLite, Docker",
    href: "https://github.com/faraazzz31/scriptorium",
    description:
      "Full-stack online code execution and code sharing platform with syntax highlighting, blog post sharing, template forking, JWT authentication, role-based access control, and Docker-based isolated execution.",
  },
  {
    name: "A11YMOLY",
    stack: "JavaScript, Node.js, React, REST APIs, MongoDB",
    description:
      "Accessibility platform for evaluating web and PDF content against WCAG and PDF/UA guidelines. Integrated Puppeteer, AXE, Cheerio, and Adobe PDF Accessibility APIs to reduce testing time through automated validation and batch testing.",
  },
  {
    name: "UofT ASA DataFest 2024",
    stack: "Python, R, Pandas, Matplotlib",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7192002351891652608/",
    linkLabel: "LinkedIn",
    description:
      "Third-place University of Toronto ASA DataFest project analyzing student engagement data for CourseKata with Python and R.",
  },
  {
    name: "Meal Master",
    stack: "Java, SOLID, Clean Architecture",
    href: "https://github.com/faraazzz31/Meal-Master",
    description:
      "Meal planning application that generates personalized recipes and supports calorie tracking, weekly meal scheduling, and grocery list creation.",
  },
  {
    name: "Grade Tracker",
    stack: "Swift, SwiftUI, macOS",
    href: "https://github.com/faraazzz31/Grade-Tracker",
    description:
      "Native macOS application for consolidating assignment grades with weighted averages, target grade tracking, and predictive score insights.",
  },
  {
    name: "Movie Match",
    stack: "Python, Graph Algorithms, MovieLens",
    href: "https://github.com/faraazzz31/Movie-Match",
    description:
      "Movie recommendation tool using community-sourced ratings, graph algorithms, and cosine similarity across the MovieLens dataset.",
  },
];

export const skills = [
  {
    title: "Languages",
    items: ["Python", "TypeScript/JavaScript", "SQL", "C", "C++", "Java", "Swift", "R"],
  },
  {
    title: "Web Frameworks",
    items: ["React", "Next.js", "Flask", "Express.js", "Tailwind CSS", "REST APIs"],
  },
  {
    title: "Data and Cloud",
    items: ["PostgreSQL", "Snowflake", "SQLite", "MongoDB", "Docker", "GCP", "Google Cloud Run", "GitHub Actions"],
  },
  {
    title: "ML and Research",
    items: ["PyTorch", "Pandas", "Stable-Baselines3", "Ray RLlib", "Weights & Biases", "Reinforcement Learning"],
  },
];
