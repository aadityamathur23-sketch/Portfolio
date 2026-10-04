/**
 * Aaditya Mathur - Personal Portfolio Centralized Configuration
 * 
 * ============================================================================
 * EDITABLE CONFIGURATION FILE
 * ============================================================================
 * Update this single file to change all personal information, education,
 * skills, hobbies, contact info, and terminal responses across the website.
 * No need to modify HTML or CSS templates!
 */

const PORTFOLIO_DATA = {
  // 1. Personal & Hero Information
  personal: {
    name: "Aaditya Mathur",
    course: "B.Tech",
    year: "First Year",
    university: "JECRC University",
    location: "Jaipur, Rajasthan, India",
    tagline: "B.Tech Student | AI Learner | Future Tech Enthusiast",
    shortBio: "I'm a first-year B.Tech student at JECRC University, Jaipur, exploring Artificial Intelligence, Generative AI, Prompt Engineering, and digital productivity while building my skills for the future of technology.",
    statusBadge: "AVAILABLE TO LEARN",
    statusDetail: "First-Year B.Tech Student • AI Learner",
    avatar: "assets/images/levi_avatar.jpg",
    avatarAlt: "Aaditya Mathur Portfolio Visual - Levi Ackerman Tactical Aesthetic",
    // HUD tags surrounding profile visual
    hudLabels: [
      { id: "learner", text: "AI LEARNER", position: "top-left" },
      { id: "college", text: "JECRC UNIVERSITY", position: "top-right" },
      { id: "location", text: "JAIPUR / IN", position: "bottom-left" },
      { id: "status", text: "01 / STUDENT", position: "bottom-right" }
    ],
    // Hero draggable floating chips
    heroChips: [
      { id: "chip-ai", label: "AI", color: "blue", category: "Core Focus" },
      { id: "chip-genai", label: "GEN AI", color: "cyan", category: "Emerging Tech" },
      { id: "chip-prompt", label: "PROMPTING", color: "sky", category: "Applied AI" },
      { id: "chip-prod", label: "PRODUCTIVITY", color: "indigo", category: "Workflows" },
      { id: "chip-tech", label: "TECH", color: "emerald", category: "Foundation" }
    ]
  },

  // 2. About Section Exploration & Stats
  about: {
    title: "01 — ABOUT ME",
    heading: "Curiosity-Driven First-Year B.Tech Student",
    intro: "I am a first-year B.Tech student at JECRC University in Jaipur, passionate about the frontiers of Artificial Intelligence and modern software. Rather than claiming years of professional mastery, my focus is disciplined curiosity: actively understanding algorithmic concepts, experimenting with modern AI workflows, and constructing a solid foundation for future engineering challenges.",
    stats: [
      { value: "01", label: "YEAR", caption: "B.Tech Engineering Journey" },
      { value: "04+", label: "LEARNING AREAS", caption: "AI, GenAI, Prompts, Workflows" },
      { value: "∞", label: "CURIOSITY", caption: "Unconstrained Eagerness to Build" }
    ],
    currentlyExploring: [
      {
        name: "Artificial Intelligence",
        icon: "cpu",
        focus: "Fundamentals of machine learning, logic, and intelligent systems",
        badge: "Core"
      },
      {
        name: "Generative AI",
        icon: "sparkles",
        focus: "Diffusion models, transformer architectures, and generative tooling",
        badge: "Active"
      },
      {
        name: "Prompt Engineering",
        icon: "terminal",
        focus: "Structured reasoning, iterative chaining, and context steering",
        badge: "Practical"
      },
      {
        name: "Digital Productivity",
        icon: "zap",
        focus: "High-leverage developer workflows, automation, and knowledge management",
        badge: "Systems"
      }
    ]
  },

  // 3. Education Timeline (Zero-Falsification Policy)
  education: {
    title: "02 — EDUCATION",
    subtitle: "Academic trajectory & ongoing engineering foundational studies.",
    items: [
      {
        id: "jecrc-btech",
        institution: "JECRC University",
        degree: "Bachelor of Technology (B.Tech)",
        year: "First Year (Current)",
        location: "Jaipur, Rajasthan, India",
        isCurrent: true,
        badgeText: "CURRENT",
        description: "Engaged in first-year engineering coursework, focusing on computing fundamentals, problem-solving, and expanding practical knowledge in artificial intelligence and modern web technologies.",
        topics: [
          "Artificial Intelligence Foundations",
          "Generative AI & LLM Exploration",
          "Prompt Engineering Strategies",
          "Digital Productivity & Tooling",
          "Foundational Web Technologies",
          "Algorithmic Thinking"
        ]
      },
      {
        id: "school-placeholder",
        institution: "School Education Details",
        degree: "Secondary & Higher Secondary Education",
        year: "Coming Soon",
        location: "Rajasthan, India",
        isCurrent: false,
        badgeText: "DETAILS PENDING",
        description: "School education details coming soon. (Placeholder: easily editable to add high school name, board, and year).",
        topics: [
          "Science & Mathematics Foundation",
          "Logical Reasoning",
          "Academic Curiosity"
        ]
      }
    ]
  },

  // 4. Skills & Interests (10 Skills + 7 Hobbies)
  skillsAndHobbies: {
    title: "03 — SKILLS & INTERESTS",
    subtitle: "A realistic breakdown of my current skill acquisition and personal interests.",
    
    // Skills (Educational and beginner-appropriate descriptions)
    skills: [
      {
        id: "ai-fundamentals",
        name: "AI Fundamentals",
        category: "Artificial Intelligence",
        icon: "cpu",
        shortDesc: "Basic principles of how machines process data and recognize patterns.",
        fullDesc: "Learning the core concepts of artificial intelligence, machine learning pipelines, evaluation metrics, and how mathematical models interpret patterns in data."
      },
      {
        id: "generative-ai",
        name: "Generative AI",
        category: "Artificial Intelligence",
        icon: "sparkles",
        shortDesc: "Exploring modern generative models and multimodal AI workflows.",
        fullDesc: "Exploring how modern generative AI systems work and experimenting with AI-powered tools and workflows to generate code, text, and visual assets."
      },
      {
        id: "prompt-engineering",
        name: "Prompt Engineering",
        category: "Applied AI",
        icon: "terminal",
        shortDesc: "Structured system prompting, few-shot prompting, and chain-of-thought.",
        fullDesc: "Learning how structured prompts can improve the quality, consistency, and usefulness of AI outputs through role prompting, iterative refinement, and markdown formatting."
      },
      {
        id: "digital-productivity",
        name: "Digital Productivity",
        category: "Productivity",
        icon: "zap",
        shortDesc: "Leveraging digital workflows, markdown notes, and automation tools.",
        fullDesc: "Building personal knowledge management systems, keyboard-first shortcuts, and automated pipelines to maximize learning retention and project execution speed."
      },
      {
        id: "problem-solving",
        name: "Problem Solving",
        category: "Core Competency",
        icon: "compass",
        shortDesc: "Breaking complex questions into logical, manageable steps.",
        fullDesc: "Approaching engineering and algorithmic problems methodically by analyzing edge cases, decomposing requirements, and synthesizing clean step-by-step solutions."
      },
      {
        id: "communication",
        name: "Communication",
        category: "Professional",
        icon: "message-square",
        shortDesc: "Articulating technical thoughts clearly with peers and collaborators.",
        fullDesc: "Practicing clear, concise documentation, empathetic pair-programming discussions, and structured technical explanations for college and project collaboration."
      },
      {
        id: "basic-web-dev",
        name: "Basic Web Development",
        category: "Development",
        icon: "code",
        shortDesc: "HTML5, CSS3, modern JavaScript, and responsive UI foundations.",
        fullDesc: "Understanding the building blocks of the web, semantic markup, reactive UI paradigms, CSS flexbox/grid architectures, and modern browser APIs."
      },
      {
        id: "research-analysis",
        name: "Research & Information Analysis",
        category: "Core Competency",
        icon: "search",
        shortDesc: "Evaluating tech documentation, research summaries, and emerging tools.",
        fullDesc: "Developing the skill to read technical documentation, verify facts, synthesize emerging AI research papers, and distinguish practical utility from hype."
      },
      {
        id: "teamwork",
        name: "Teamwork",
        category: "Professional",
        icon: "users",
        shortDesc: "Collaborating on college initiatives, group projects, and discussions.",
        fullDesc: "Valuing diverse perspectives, proactive contribution, active listening, and collective accountability in group academic and engineering endeavors."
      },
      {
        id: "time-management",
        name: "Time Management",
        category: "Productivity",
        icon: "clock",
        shortDesc: "Balancing first-year university academics with self-guided tech exploration.",
        fullDesc: "Structuring daily routines, setting focused study sprints, and balancing rigorous B.Tech coursework with dedicated extracurricular technology exploration."
      }
    ],

    // Hobbies (7 interactive cards with 3D tilt)
    hobbies: [
      {
        id: "exploring-ai",
        title: "Exploring AI Tools",
        icon: "bot",
        accent: "#38bdf8",
        desc: "Testing novel AI models, agentic workflows, and creative tooling as they release."
      },
      {
        id: "watching-anime",
        title: "Watching Anime",
        icon: "tv",
        accent: "#60a5fa",
        desc: "Appreciating complex narratives, tactical depth, and cinematic animation art (Attack on Titan fan)."
      },
      {
        id: "listening-music",
        title: "Listening to Music",
        icon: "headphones",
        accent: "#818cf8",
        desc: "Soundtracks, lofi, and instrumental scores that fuel deep concentration sessions."
      },
      {
        id: "photography",
        title: "Photography",
        icon: "camera",
        accent: "#06b6d4",
        desc: "Capturing architectural geometry, light contrasts, and everyday perspectives."
      },
      {
        id: "gaming",
        title: "Gaming",
        icon: "gamepad-2",
        accent: "#3b82f6",
        desc: "Strategy and tactical games requiring quick reflexes, planning, and resource allocation."
      },
      {
        id: "new-technologies",
        title: "Learning New Technologies",
        icon: "sparkle",
        accent: "#22d3ee",
        desc: "Constantly seeking out open-source repositories, developer tools, and framework tutorials."
      },
      {
        id: "reading-tech",
        title: "Reading about Technology",
        icon: "book-open",
        accent: "#93c5fd",
        desc: "Tech publications, engineering blogs, and future outlook essays on artificial intelligence."
      }
    ]
  },

  // 5. Current Mission (Learning Journey - 4 Nodes)
  mission: {
    title: "04 — CURRENT MISSION",
    tagline: "LEARNING → EXPERIMENTING → BUILDING → IMPROVING",
    intro: "As a first-year student, my journey is rooted in consistent curiosity and deliberate practice rather than exaggerated claims. Here is my current roadmap:",
    nodes: [
      {
        step: "01",
        name: "LEARNING",
        status: "Active Focus",
        summary: "Understanding AI and emerging technologies.",
        detail: "Grasping mathematical foundations, Python syntax, core machine learning paradigms, and computer science fundamentals at JECRC University."
      },
      {
        step: "02",
        name: "EXPERIMENTING",
        status: "Active Focus",
        summary: "Trying AI tools, prompts, and productivity workflows.",
        detail: "Pushing the limits of modern generative models, testing reasoning chains, and benchmarking digital productivity setups for maximum efficiency."
      },
      {
        step: "03",
        name: "BUILDING",
        status: "In Progress",
        summary: "Applying knowledge through small projects and web experiments.",
        detail: "Translating concepts into responsive web interfaces, interactive components, and utility scripts that solve everyday student problems."
      },
      {
        step: "04",
        name: "IMPROVING",
        status: "Continuous",
        summary: "Continuously developing technical and communication skills.",
        detail: "Seeking mentorship, sharing insights with fellow students, writing clean documentation, and preparing for future internships."
      }
    ]
  },

  // 6. Interactive Terminal Data
  terminal: {
    prompt: "aaditya@jecrc:~$",
    initialLines: [
      "SYSTEM BOOT // AADITYA_TERMINAL v1.0.4",
      "CONNECTED TO SURVEY_CORPS_NODE [JAIPUR_IN]",
      "Type a command or click a quick tag below to inspect profile."
    ],
    commands: {
      "whoami": "Aaditya Mathur — First-Year B.Tech Student at JECRC University, Jaipur.",
      "focus": "Artificial Intelligence + Generative AI + Prompt Engineering + Digital Productivity.",
      "current_status": "Learning & Building (Active 1st Year Undergraduate).",
      "location": "Jaipur, Rajasthan, India.",
      "about": "Curious engineering student with a tactical, disciplined approach to learning emerging tech. Subtle AoT enthusiast.",
      "skills": "AI Fundamentals • Generative AI • Prompt Engineering • Digital Productivity • Basic Web Dev • Problem Solving",
      "education": "JECRC University, Jaipur (B.Tech First Year — 2024 to Present). School education details coming soon.",
      "contact": "Email: [your.email@example.com] | Phone: [+91 XXXXX XXXXX] (Placeholders clearly marked)",
      "mission": "LEARNING → EXPERIMENTING → BUILDING → IMPROVING",
      "help": "Available commands: whoami, focus, current_status, location, about, skills, education, mission, contact, clear"
    }
  },

  // 7. Contact Section (Strict Placeholders)
  contact: {
    title: "05 — LET'S CONNECT",
    subtitle: "Open to student collaborations, peer discussions, and tech exploration opportunities.",
    email: "your.email@example.com",
    emailPlaceholderNote: "Placeholder — Replace with your real email address",
    phone: "+91 XXXXX XXXXX",
    phonePlaceholderNote: "Placeholder — Replace with your real phone number",
    location: "Jaipur, Rajasthan, India",
    university: "JECRC University, Jaipur",
    formNote: "Frontend interaction enabled. Backend webhook or Formspree integration can be connected in `main.js`."
  },

  // 8. Footer Info
  footer: {
    name: "Aaditya Mathur",
    tagline: "B.Tech Student • AI Learner • Future Tech Enthusiast",
    motto: "Built with curiosity.",
    quote: "Still learning. Still building. Still curious.",
    copyrightYear: 2026
  }
};

// Export for module environments if needed, while maintaining global window scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
