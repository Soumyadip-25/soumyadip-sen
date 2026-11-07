export interface SkillItem {
  name: string;
  category?: string;
  level?: string;
  highlight?: boolean;
}

export interface SkillTopic {
  id: string;
  slug: string;
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "Code2" | "Layers" | "Database" | "Brain" | "Cpu" | "ShieldCheck";
  skills: SkillItem[];
  subsections?: {
    title: string;
    skills: SkillItem[];
  }[];
  tools: string[];
  // 16:9 stage coordinate percentages for physical CRT monitor placement
  rect: {
    leftPct: number;
    topPct: number;
    widthPct: number;
    heightPct: number;
  };
}

export const skillTopics: SkillTopic[] = [
  {
    id: "programming-languages",
    slug: "programming-languages",
    number: "01",
    shortTitle: "Programming",
    title: "Programming Languages",
    subtitle: "Languages I use to build, script and bring ideas to life.",
    description:
      "Core foundations across high-performance, object-oriented, scripting, and declarative query languages used to build scalable systems, machine learning pipelines, and low-level firmware.",
    iconName: "Code2",
    skills: [
      { name: "Python", category: "AI / Data / Backend", level: "Advanced" },
      { name: "Java", category: "OOP / Applications", level: "Proficient" },
      { name: "JavaScript", category: "Web / Interactive", level: "Advanced" },
      { name: "TypeScript", category: "Type-Safe Full Stack", level: "Proficient" },
      { name: "C", category: "Embedded / Low-Level", level: "Intermediate" },
      { name: "C++", category: "Systems / Performance", level: "Proficient" },
      { name: "SQL", category: "Relational Queries", level: "Advanced" },
    ],
    tools: ["GCC / G++", "Python 3.12", "Node.js", "JDK", "TypeScript Compiler"],
    rect: {
      leftPct: 27.25,
      topPct: 20.19,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
  {
    id: "full-stack-development",
    slug: "full-stack-development",
    number: "02",
    shortTitle: "Development",
    title: "Full Stack Development",
    subtitle: "Frameworks and libraries that help me build faster and better.",
    description:
      "End-to-end web engineering from reactive client interfaces with fluid micro-interactions to high-concurrency microservices, RESTful endpoints, and secure API gateways.",
    iconName: "Layers",
    skills: [
      { name: "HTML5", category: "Frontend", level: "Advanced" },
      { name: "CSS3", category: "Frontend", level: "Advanced" },
      { name: "React.js", category: "Frontend", level: "Advanced" },
      { name: "Next.js", category: "Frontend", level: "Advanced" },
      { name: "Vite", category: "Frontend", level: "Proficient" },
      { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
      { name: "Node.js", category: "Backend", level: "Advanced" },
      { name: "Express.js", category: "Backend", level: "Advanced" },
      { name: "REST APIs", category: "Backend", level: "Advanced" },
      { name: "JWT", category: "Backend", level: "Proficient" },
      { name: "Authentication", category: "Backend", level: "Advanced" },
      { name: "API Integration", category: "Backend", level: "Advanced" },
    ],
    subsections: [
      {
        title: "Frontend Development",
        skills: [
          { name: "HTML5", category: "Structure" },
          { name: "CSS3", category: "Styling" },
          { name: "React.js", category: "Component UI" },
          { name: "Next.js", category: "Full-Stack SSR" },
          { name: "Vite", category: "Build Tool" },
          { name: "Tailwind CSS", category: "Utility CSS" },
        ],
      },
      {
        title: "Backend Development",
        skills: [
          { name: "Node.js", category: "Runtime" },
          { name: "Express.js", category: "Microservices" },
          { name: "REST APIs", category: "API Design" },
          { name: "JWT", category: "Token Security" },
          { name: "Authentication", category: "Identity & Access" },
          { name: "API Integration", category: "3rd-Party Endpoints" },
        ],
      },
    ],
    tools: ["Next.js 16", "Vite", "Postman", "Tailwind CLI", "Framer Motion"],
    rect: {
      leftPct: 50.0,
      topPct: 20.19,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
  {
    id: "databases-cloud",
    slug: "databases-cloud",
    number: "03",
    shortTitle: "Databases",
    title: "Databases & Cloud",
    subtitle: "Tools for data storage, management and cloud infrastructure.",
    description:
      "Relational, document-oriented, vector databases, and cloud infrastructure engineered for resilient telemetry, high-throughput indexing, transactional integrity, and serverless compute.",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", category: "Relational DB", level: "Advanced" },
      { name: "MySQL", category: "Relational DB", level: "Proficient" },
      { name: "MongoDB", category: "NoSQL Document", level: "Proficient" },
      { name: "Supabase", category: "Backend-as-a-Service", level: "Advanced" },
      { name: "Firebase", category: "Real-time DB / Auth", level: "Advanced" },
      { name: "pgvector", category: "Vector Store", level: "Proficient" },
    ],
    tools: ["PostgreSQL CLI", "Supabase Studio", "Firebase Console", "Docker", "DBeaver"],
    rect: {
      leftPct: 73.0,
      topPct: 20.19,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
  {
    id: "ai-ml-data-analytics",
    slug: "ai-ml-data-analytics",
    number: "04",
    shortTitle: "AI & ML",
    title: "AI / ML & Data Analytics",
    subtitle: "Technologies that help me build intelligent systems and find insights in data.",
    description:
      "Applied machine learning, natural language intelligence, vector retrieval pipelines (RAG), predictive modeling, synthetic datasets, and prompt engineering for real-world decision systems.",
    iconName: "Brain",
    skills: [
      { name: "Machine Learning", category: "Supervised & Unsupervised", level: "Proficient" },
      { name: "NLP", category: "Language Processing", level: "Proficient" },
      { name: "LLMs", category: "Foundation Models", level: "Advanced" },
      { name: "RAG", category: "Retrieval-Augmented Gen", level: "Advanced" },
      { name: "Predictive Analytics", category: "Quantitative Forecasting", level: "Proficient" },
      { name: "Synthetic Data Generation", category: "Data Augmentation", level: "Proficient" },
      { name: "Prompt Engineering", category: "AI Orchestration", level: "Advanced" },
    ],
    tools: ["Jupyter Notebooks", "LangChain", "OpenAI / Gemini APIs", "Hugging Face", "ChromaDB"],
    rect: {
      leftPct: 27.25,
      topPct: 52.5,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
  {
    id: "tools-platforms-iot",
    slug: "tools-platforms-iot",
    number: "05",
    shortTitle: "Tools",
    title: "Tools / Platforms & IoT",
    subtitle: "Development environments, version control, platforms and analytical tools.",
    description:
      "Physical computing with microcontroller firmware, sensor interfacing, hardware communication protocols, and developer workflows for rapid prototyping and automated deployment.",
    iconName: "Cpu",
    skills: [
      { name: "Git", category: "Version Control", level: "Advanced" },
      { name: "GitHub", category: "Collaboration & CI/CD", level: "Advanced" },
      { name: "Docker", category: "Containerization", level: "Proficient" },
      { name: "Postman", category: "API Testing", level: "Advanced" },
      { name: "VS Code", category: "IDE & Tooling", level: "Advanced" },
      { name: "Figma", category: "UI/UX Prototyping", level: "Proficient" },
      { name: "Canva", category: "Design & Presentation", level: "Proficient" },
      { name: "NumPy", category: "Numerical Arrays", level: "Advanced" },
      { name: "Pandas", category: "Data Wrangling", level: "Advanced" },
    ],
    tools: ["Git CLI", "GitHub Actions", "Docker Desktop", "VS Code", "Postman"],
    rect: {
      leftPct: 50.5,
      topPct: 52.4,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
  {
    id: "core-competencies",
    slug: "core-competencies",
    number: "06",
    shortTitle: "Core",
    title: "Core Competencies",
    subtitle: "Foundational analytical methodologies, privacy standards and engineering principles.",
    description:
      "Theoretical computer science fundamentals, statistical evaluation, data visualization, differential privacy safeguards, and ethical AI architectures underpinning reliable systems.",
    iconName: "ShieldCheck",
    skills: [
      { name: "Statistics", category: "Inference & Probability", level: "Advanced" },
      { name: "Data Processing", category: "ETL & Pipelines", level: "Advanced" },
      { name: "Data Visualisation", category: "Visual Analytics", level: "Advanced" },
      { name: "Model Evaluation", category: "Metrics & Validation", level: "Proficient" },
      { name: "Differential Privacy", category: "Data Protection & Privacy", level: "Proficient" },
      { name: "Responsible AI", category: "Ethics & Fairness", level: "Proficient" },
    ],
    tools: ["Statistical Testing", "Matplotlib / Seaborn", "Differential Privacy Frameworks", "Evaluation Metrics"],
    rect: {
      leftPct: 73.55,
      topPct: 52.5,
      widthPct: 15.82,
      heightPct: 20.83,
    },
  },
];

export function getSkillTopicBySlug(slug: string): SkillTopic | undefined {
  if (slug === "ai-ml-data-analysis" || slug === "ai-ml-data-analytics") {
    return skillTopics.find((t) => t.id === "ai-ml-data-analytics");
  }
  return skillTopics.find((t) => t.slug === slug || t.id === slug);
}
