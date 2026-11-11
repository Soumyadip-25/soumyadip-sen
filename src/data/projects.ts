export interface ProjectTechnology {
  name: string;
  icon?: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  projectType: "Web Application" | "Mobile Application" | "IoT System" | string;
  developmentType: "Individual Project" | "Team Project" | string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  technologies?: ProjectTechnology[];
  timeline: string;
  role: string;
  highlights: string[];
  github?: string;
  demo?: string;
  metrics?: { label: string; value: string }[];
}

export const projects: ProjectData[] = [
  {
    id: "dhruva",
    slug: "dhruva",
    title: "Dhruva - Polar Knowledge System",
    subtitle: "Polar Science Outreach & AI Dissemination Portal",
    category: "AI / Full-Stack / Research Technology",
    projectType: "Web Application",
    developmentType: "Team Project",
    description:
      "DHRUVA is an integrated digital knowledge platform designed to bring India's polar research resources into a unified ecosystem. It leverages AI-powered document processing, intelligent retrieval, and multi-LLM integration to make scientific information easier to discover and understand. The platform bridges the gap between complex research documentation and accessible scientific knowledge.",
    longDescription:
      "DHRUVA is an integrated digital knowledge platform designed to bring India's polar research resources into a unified ecosystem. It leverages AI-powered document processing, intelligent retrieval, and multi-LLM integration to make scientific information easier to discover and understand. The platform bridges the gap between complex research documentation and accessible scientific knowledge.",
    image: "/images/project-dhruva.jpg",
    tags: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "pgvector", "LangChain", "Groq API"],
    technologies: [
      { name: "React 19", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "pgvector", icon: "pgvector" },
      { name: "LangChain", icon: "langchain" },
      { name: "Groq API", icon: "groq" }
    ],
    timeline: "2024 – 2025",
    role: "Lead Full Stack & AI Architect",
    highlights: [
      "Extracts contextual insights from extensive scientific documents using hybrid search.",
      "Integrates multiple language models with intelligent provider fallback mechanisms.",
      "Converts unstructured research publications into searchable structured information.",
      "Generates research summaries and educational resources in multiple languages.",
      "Connects research repositories with maps, quizzes, and multimedia resources."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Search Latency", value: "< 240ms" },
      { label: "Data Indexed", value: "10,000+ Docs" },
      { label: "Languages", value: "8 Supported" }
    ]
  },
  {
    id: "heartery",
    slug: "heartery",
    title: "Heartery - Smart Heart Health Monitoring System",
    subtitle: "IoT Cardiac Telemetry & Arrhythmia Detection",
    category: "IoT / Embedded Systems / Healthcare",
    projectType: "IoT System",
    developmentType: "Individual Project",
    description:
      "HEARTTERY is an IoT-driven healthcare monitoring system that combines biomedical sensors with real-time data acquisition to track essential cardiac parameters. It captures ECG signals, monitors heart rate, and measures blood oxygen saturation through an ESP32-based architecture. The system provides a connected approach to continuous health observation and remote monitoring.",
    longDescription:
      "HEARTTERY is an IoT-driven healthcare monitoring system that combines biomedical sensors with real-time data acquisition to track essential cardiac parameters. It captures ECG signals, monitors heart rate, and measures blood oxygen saturation through an ESP32-based architecture. The system provides a connected approach to continuous health observation and remote monitoring.",
    image: "/images/project-heartery.jpg",
    tags: ["ESP32", "Embedded C/C++", "AD8232", "MAX30102", "I2C", "Firebase", "MQTT"],
    technologies: [
      { name: "ESP32", icon: "esp32" },
      { name: "Embedded C/C++", icon: "cpp" },
      { name: "AD8232", icon: "ad8232" },
      { name: "MAX30102", icon: "max30102" },
      { name: "I2C", icon: "i2c" },
      { name: "Firebase", icon: "firebase" },
      { name: "MQTT", icon: "mqtt" }
    ],
    timeline: "2023 – 2024",
    role: "Embedded Systems & IoT Engineer",
    highlights: [
      "Captures continuous cardiac electrical signals through integrated biomedical sensors.",
      "Tracks heart rate, ECG signals, and oxygen saturation simultaneously.",
      "Combines ESP32, AD8232, and MAX30102 for synchronized measurements.",
      "Transmits sensor readings to connected cloud-based monitoring infrastructure.",
      "Presents recorded cardiac measurements through organized monitoring dashboards."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "ECG Accuracy", value: "97.5%" },
      { label: "Sample Rate", value: "250 Hz" },
      { label: "Alert Latency", value: "< 1.2s" }
    ]
  },
  {
    id: "pathvista",
    slug: "pathvista",
    title: "PathVista - AI-Powered Career & Education Advisor",
    subtitle: "Aptitude Mapping, Curriculum Pathways & Scholarship Discovery",
    category: "AI / Machine Learning / EdTech",
    projectType: "Web Application",
    developmentType: "Individual Project",
    description:
      "PATHVISTA is an intelligent guidance platform designed to help individuals navigate academic and professional opportunities with greater clarity. By evaluating personal interests, skills, and career aspirations, it delivers tailored career recommendations, educational pathways, and learning roadmaps. It aims to make career exploration more personalized, structured, and accessible.",
    longDescription:
      "PATHVISTA is an intelligent guidance platform designed to help individuals navigate academic and professional opportunities with greater clarity. By evaluating personal interests, skills, and career aspirations, it delivers tailored career recommendations, educational pathways, and learning roadmaps. It aims to make career exploration more personalized, structured, and accessible.",
    image: "/images/project-pathvista.jpg",
    tags: ["Python", "FastAPI", "Scikit-learn", "Sentence Transformers", "Hugging Face", "PostgreSQL", "LLM API"],
    technologies: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Scikit-learn", icon: "scikit" },
      { name: "Sentence Transformers", icon: "transformers" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "LLM API", icon: "llm" }
    ],
    timeline: "2024",
    role: "Full Stack & ML Developer",
    highlights: [
      "Maps individual interests and competencies to relevant professional opportunities.",
      "Generates tailored career pathways based on individual profiles and aspirations.",
      "Identifies missing competencies against targeted professional role requirements.",
      "Structures personalized learning journeys around career-specific skill requirements.",
      "Delivers contextual guidance through natural language-powered interactions."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Match Precision", value: "94%" },
      { label: "Universities", value: "500+" },
      { label: "Curriculums", value: "50+" }
    ]
  },
  {
    id: "anvit",
    slug: "anvit",
    title: "Anvit - Online Doctor Consultation Platform",
    subtitle: "Telemedicine Platform & Real-Time Clinical Consultations",
    category: "HealthTech / Full-Stack Development",
    projectType: "Web Application",
    developmentType: "Team Project",
    description:
      "ANVIT is a digital healthcare platform that connects patients with healthcare professionals through a unified online consultation experience. It simplifies doctor discovery, appointment scheduling, and remote medical interactions through video, audio, and real-time chat. The platform aims to make healthcare consultation more accessible, convenient, and connected.",
    longDescription:
      "ANVIT is a digital healthcare platform that connects patients with healthcare professionals through a unified online consultation experience. It simplifies doctor discovery, appointment scheduling, and remote medical interactions through video, audio, and real-time chat. The platform aims to make healthcare consultation more accessible, convenient, and connected.",
    image: "/images/project-anvit.jpg",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "WebRTC", "Socket.IO"],
    technologies: [
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma ORM", icon: "prisma" },
      { name: "WebRTC", icon: "webrtc" },
      { name: "Socket.IO", icon: "socketio" }
    ],
    timeline: "2024",
    role: "Full Stack Engineer",
    highlights: [
      "Connects patients with relevant specialists through location-based filtering.",
      "Handles doctor availability, scheduling, rescheduling, and consultation bookings.",
      "Enables direct patient-doctor interactions through integrated video communication.",
      "Supports secure messaging, audio calls, and real-time notifications.",
      "Organizes patient histories, prescriptions, and consultation documentation."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Stream Latency", value: "< 140ms" },
      { label: "Specialties", value: "20+" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "fallguard",
    slug: "fallguard",
    title: "FallGuard - Smart Fall Detection System",
    subtitle: "Wearable IoT Safety & Emergency Caregiver Telemetry",
    category: "IoT / Embedded Systems / Elderly Care",
    projectType: "IoT System",
    developmentType: "Individual Project",
    description:
      "FALLGUARD is an IoT-based elderly safety solution designed to identify potential fall incidents through motion-sensing technology. Using accelerometer and gyroscope data, the system analyzes sudden movement patterns and detects suspected falls. It triggers emergency notifications to designated caregivers, supporting faster awareness and assistance.",
    longDescription:
      "FALLGUARD is an IoT-based elderly safety solution designed to identify potential fall incidents through motion-sensing technology. Using accelerometer and gyroscope data, the system analyzes sudden movement patterns and detects suspected falls. It triggers emergency notifications to designated caregivers, supporting faster awareness and assistance.",
    image: "/images/project-fallguard.jpg",
    tags: ["ESP32", "Embedded C/C++", "MPU6050", "Sensor Fusion", "Kalman Filter", "Bluetooth Low Energy", "Firebase"],
    technologies: [
      { name: "ESP32", icon: "esp32" },
      { name: "Embedded C/C++", icon: "cpp" },
      { name: "MPU6050", icon: "mpu6050" },
      { name: "Sensor Fusion", icon: "sensorfusion" },
      { name: "Kalman Filter", icon: "kalman" },
      { name: "Bluetooth Low Energy", icon: "ble" },
      { name: "Firebase", icon: "firebase" }
    ],
    timeline: "2023 – 2024",
    role: "Hardware & IoT Systems Developer",
    highlights: [
      "Continuously monitors acceleration and orientation through integrated motion sensors.",
      "Identifies abnormal movement patterns using sensor-based detection algorithms.",
      "Combines accelerometer and gyroscope measurements for accurate movement interpretation.",
      "Notifies designated caregivers immediately following suspected fall detection.",
      "Maintains connected monitoring and records detected incidents for caregivers."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Detection Rate", value: "98.2%" },
      { label: "Response Time", value: "< 2s" },
      { label: "Battery Life", value: "72+ Hrs" }
    ]
  },
  {
    id: "samridd",
    slug: "samridd",
    title: "Samridd - Personal Finance Management Platform",
    subtitle: "Intelligent Expense Tracking, Budget Forecasting & Goal Planning",
    category: "FinTech / Full-Stack / Data Analytics",
    projectType: "Web Application",
    developmentType: "Individual Project",
    description:
      "SAMRIDD is a comprehensive financial management platform designed to give individuals greater visibility and control over their personal finances. It brings income tracking, expense management, budgeting, and savings goals together within a unified dashboard. Through interactive financial analytics and spending insights, it helps users understand their financial habits and make more informed monetary decisions.",
    longDescription:
      "SAMRIDD is a comprehensive financial management platform designed to give individuals greater visibility and control over their personal finances. It brings income tracking, expense management, budgeting, and savings goals together within a unified dashboard. Through interactive financial analytics and spending insights, it helps users understand their financial habits and make more informed monetary decisions.",
    image: "/images/project-samridd.jpg",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Recharts", "Supabase"],
    technologies: [
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma ORM", icon: "prisma" },
      { name: "Recharts", icon: "recharts" },
      { name: "Supabase", icon: "supabase" }
    ],
    timeline: "2023",
    role: "Full Stack Developer",
    highlights: [
      "Interactive financial dashboard visualizing Cash Flow, Expense, and Budget graphs.",
      "Customizable budget alerts notifying users when approaching categorical limits.",
      "Compound interest savings goal planner tracking financial milestones.",
      "Personal financial records secured with bank-grade AES-256 encryption.",
      "Automated transaction categorization and budget trend analysis."
    ],
    github: "https://github.com/Soumyadip-25",
    demo: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Encryption", value: "AES-256" },
      { label: "Analytics", value: "Instant" },
      { label: "Budgets", value: "Unlimited" }
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}
