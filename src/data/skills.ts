export interface SkillTopic {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "Code2" | "Layers" | "Database" | "Brain" | "Cpu" | "ShieldCheck";
  skills: { name: string; level?: string; category?: string }[];
  tools: string[];
  // Bounding box percentages inside the 1024x576 CRT image
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
    title: "Programming Languages",
    subtitle: "Core Syntax, Object-Oriented & Systems Programming",
    description:
      "Core foundations across high-performance, object-oriented, scripting, and declarative query languages used to build scalable systems, machine learning pipelines, and low-level firmware.",
    iconName: "Code2",
    skills: [
      { name: "Python", level: "Advanced", category: "AI / Data / Backend" },
      { name: "C++", level: "Proficient", category: "Systems / DSA" },
      { name: "JavaScript (ES6+)", level: "Advanced", category: "Web / Frontend" },
      { name: "TypeScript", level: "Proficient", category: "Type-Safe Full Stack" },
      { name: "Java", level: "Proficient", category: "OOP / Applications" },
      { name: "C", level: "Intermediate", category: "Embedded / Low-Level" },
      { name: "SQL", level: "Advanced", category: "Relational Queries" },
    ],
    tools: ["GCC / G++", "Python 3.12", "Node.js", "JDK", "TypeScript Compiler"],
    rect: {
      leftPct: 26.37,
      topPct: 19.1,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
  {
    id: "full-stack-development",
    slug: "full-stack-development",
    number: "02",
    title: "Full Stack Development",
    subtitle: "Modern Web Frameworks, Responsive UI & Server Architectures",
    description:
      "End-to-end web engineering from reactive client interfaces with fluid micro-interactions to high-concurrency microservices, RESTful endpoints, and real-time WebSockets.",
    iconName: "Layers",
    skills: [
      { name: "React.js", level: "Advanced", category: "Frontend" },
      { name: "Next.js (App Router)", level: "Advanced", category: "Full Stack SSR" },
      { name: "Tailwind CSS", level: "Advanced", category: "Styling / UI" },
      { name: "Node.js & Express", level: "Advanced", category: "Backend Runtime" },
      { name: "FastAPI", level: "Proficient", category: "High-Speed Python APIs" },
      { name: "HTML5 & CSS3", level: "Advanced", category: "Semantic Web" },
      { name: "REST APIs", level: "Advanced", category: "API Design" },
      { name: "WebSockets / WebRTC", level: "Proficient", category: "Real-Time Telemetry" },
    ],
    tools: ["Next.js 15/16", "Vite", "Postman", "Framer Motion", "Shadcn/UI"],
    rect: {
      leftPct: 49.22,
      topPct: 19.1,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
  {
    id: "databases-cloud",
    slug: "databases-cloud",
    number: "03",
    title: "Databases & Cloud",
    subtitle: "Data Storage, Vector Databases & Scalable Cloud Deployments",
    description:
      "Relational, document-oriented, vector databases, and cloud infrastructure engineered for resilient telemetry, indexing, transactional integrity, and serverless compute.",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", level: "Advanced", category: "RDBMS" },
      { name: "MongoDB", level: "Proficient", category: "NoSQL Document Store" },
      { name: "MySQL", level: "Proficient", category: "Relational DB" },
      { name: "Firebase / Firestore", level: "Advanced", category: "Real-time DB / Auth" },
      { name: "ChromaDB / pgvector", level: "Proficient", category: "Vector Embeddings" },
      { name: "DuckDB", level: "Proficient", category: "In-Process OLAP" },
      { name: "Google Cloud Platform (GCP)", level: "Intermediate", category: "Cloud Hosting & AI" },
    ],
    tools: ["Docker", "Firebase Console", "Vercel", "Supabase", "GCP Cloud Console"],
    rect: {
      leftPct: 72.46,
      topPct: 19.1,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
  {
    id: "ai-ml-data-analysis",
    slug: "ai-ml-data-analysis",
    number: "04",
    title: "AI, ML & Data Analysis",
    subtitle: "RAG Systems, Predictive Models & Quantitative Analytics",
    description:
      "Applied machine learning, natural language intelligence, vector embeddings retrieval (RAG), exploratory data analytics, and predictive modeling for real-world decision systems.",
    iconName: "Brain",
    skills: [
      { name: "Machine Learning", level: "Proficient", category: "Supervised & Unsupervised" },
      { name: "RAG & LLM Integration", level: "Advanced", category: "Generative AI" },
      { name: "Prompt Engineering", level: "Advanced", category: "AI Orchestration" },
      { name: "Pandas & NumPy", level: "Advanced", category: "Data Manipulation" },
      { name: "Scikit-Learn", level: "Proficient", category: "Classical ML" },
      { name: "Data Visualization", level: "Advanced", category: "Seaborn / Matplotlib / Recharts" },
      { name: "Statistical Hypothesis Testing", level: "Proficient", category: "Quantitative Methods" },
    ],
    tools: ["Jupyter Notebooks", "LangChain", "OpenAI / Gemini APIs", "Hugging Face"],
    rect: {
      leftPct: 26.37,
      topPct: 53.47,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
  {
    id: "tools-platforms-iot",
    slug: "tools-platforms-iot",
    number: "05",
    title: "Tools, Platforms & IoT",
    subtitle: "Microcontrollers, Sensor Telemetry & Developer Toolchains",
    description:
      "Physical computing with microcontroller firmware, sensor interfacing, hardware communication protocols, and developer workflows for rapid prototyping and automated deployment.",
    iconName: "Cpu",
    skills: [
      { name: "ESP32 & Arduino", level: "Advanced", category: "Embedded Firmware" },
      { name: "AD8232 & MAX30102", level: "Proficient", category: "Biometric Sensors" },
      { name: "I2C / SPI / UART", level: "Proficient", category: "Hardware Protocols" },
      { name: "Git & GitHub", level: "Advanced", category: "Version Control" },
      { name: "Linux / Bash", level: "Proficient", category: "Terminal & Shell Scripting" },
      { name: "ThingSpeak & MQTT", level: "Proficient", category: "IoT Cloud Telemetry" },
      { name: "Postman", level: "Advanced", category: "API Testing & Debugging" },
    ],
    tools: ["Arduino IDE", "PlatformIO", "VS Code", "Git CLI", "Twilio API"],
    rect: {
      leftPct: 49.22,
      topPct: 53.47,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
  {
    id: "core-competencies",
    slug: "core-competencies",
    number: "06",
    title: "Core Competencies",
    subtitle: "System Design, Algorithms, Problem Solving & Research Rigor",
    description:
      "Theoretical computer science fundamentals, algorithmic problem solving, clean code architecture, data privacy, and mathematical rigor underpinning reliable software.",
    iconName: "ShieldCheck",
    skills: [
      { name: "Data Structures & Algorithms", level: "Advanced", category: "CS Core" },
      { name: "Object-Oriented Programming (OOP)", level: "Advanced", category: "Architecture" },
      { name: "Database Management Systems (DBMS)", level: "Advanced", category: "Data Systems" },
      { name: "Operating Systems Principles", level: "Proficient", category: "Process & Concurrency" },
      { name: "Computer Networks", level: "Proficient", category: "TCP/IP & Web Architecture" },
      { name: "Differential Privacy & Responsible AI", level: "Proficient", category: "Data Ethics" },
      { name: "Technical Research & Documentation", level: "Advanced", category: "Dissemination" },
    ],
    tools: ["LeetCode", "System Design Patterns", "UML", "Academic Research Tools"],
    rect: {
      leftPct: 72.46,
      topPct: 53.47,
      widthPct: 16.11,
      heightPct: 21.18,
    },
  },
];

export function getSkillTopicBySlug(slug: string): SkillTopic | undefined {
  return skillTopics.find((t) => t.slug === slug);
}

