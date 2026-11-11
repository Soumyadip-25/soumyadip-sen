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
    category: "Full Stack & AI Dissemination",
    projectType: "Web Application",
    developmentType: "Team Project",
    description:
      "An integrated portal to archive, explore, and disseminate India's polar research, expedition reports, datasets, and outreach content.",
    longDescription:
      "An integrated portal to archive, explore, and disseminate India's polar research, expedition reports, datasets, and outreach content.",
    image: "/images/project-dhruva.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "LLM (Groq)", "Docker"],
    technologies: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "LLM (Groq)", icon: "groq" },
      { name: "Docker", icon: "docker" }
    ],
    timeline: "2024 – 2025",
    role: "Lead Full Stack & AI Architect",
    highlights: [
      "Archive & search polar expedition reports, papers and datasets.",
      "AI-powered summaries and bilingual (English/Hindi) content.",
      "Interactive polar map and knowledge exploration.",
      "Quizzes and learning resources for outreach and education.",
      "RBAC & embargo gate for secure and verified publishing."
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
    category: "IoT / Embedded & Cloud Health",
    projectType: "IoT System",
    developmentType: "Individual Project",
    description:
      "A clinical-grade, portable cardiac telemetry system capturing real-time ECG waveforms, SpO2, and instantaneous vitals with cloud-based arrhythmia detection.",
    longDescription:
      "Heartery is a clinical-grade, portable cardiac health telemetry system powered by ESP32 microcontrollers. It interfaces with AD8232 ECG sensor leads and MAX30102 photoplethysmography sensors to capture real-time cardiac waveforms, heart rate, and blood oxygen levels (SpO2). Digital signal filtering removes baseline wander and 50Hz mains noise, transmitting instantaneous vitals to cloud dashboards for clinical and emergency monitoring.",
    image: "/images/project-heartery.jpg",
    tags: ["ESP32", "AD8232 ECG", "MAX30102", "ThingSpeak", "Firebase"],
    technologies: [
      { name: "ESP32", icon: "cpu" },
      { name: "AD8232 ECG", icon: "activity" },
      { name: "MAX30102", icon: "heart" },
      { name: "ThingSpeak", icon: "cloud" },
      { name: "Firebase", icon: "database" }
    ],
    timeline: "2023 – 2024",
    role: "Embedded Systems & IoT Engineer",
    highlights: [
      "Dual-core FreeRTOS task scheduling for continuous sensor sampling.",
      "Digital IIR bandpass and notch filtering for crisp PQRST wave display.",
      "Real-time telemetry streaming to Firebase and cloud dashboards.",
      "97.5% heart-rate accuracy against commercial medical monitors.",
      "Automated arrhythmia threshold alerting for emergency care."
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
    category: "AI/ML & EdTech Platform",
    projectType: "Web Application",
    developmentType: "Individual Project",
    description:
      "An AI-driven career guidance engine mapping student aptitude to optimal academic pathways, competitive university cutoffs, and verified scholarships.",
    longDescription:
      "PathVista is an AI-driven career and educational navigation platform engineered to guide students toward their optimal academic pathways. By assessing individual strengths and career interests, PathVista maps personalized learning roadmaps, university cutoffs, institutional admissions, and scholarship options with multi-language accessibility.",
    image: "/images/project-pathvista.jpg",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "AI/ML"],
    technologies: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "server" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "AI/ML", icon: "ai" }
    ],
    timeline: "2024",
    role: "Full Stack & ML Developer",
    highlights: [
      "Aptitude assessment engine matching students to competitive degrees.",
      "Live database of verified scholarships and government academic grant schemes.",
      "Personalized curriculum roadmaps and university cutoff analytics.",
      "Multi-language accessibility enabling vernacular guidance for regional students.",
      "Progressive web architecture with offline-ready assessment modules."
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
    category: "Healthcare Telemedicine & WebRTC",
    projectType: "Web Application",
    developmentType: "Team Project",
    description:
      "A full-featured telehealth portal bridging patients with specialized healthcare practitioners via WebRTC video, encrypted chat, and digital records.",
    longDescription:
      "Anvit is a full-featured telehealth consultation platform bridging the gap between patients and specialized healthcare practitioners. Featuring WebRTC-powered high-definition video consultations, encrypted real-time chat, instant appointment scheduling, and secure digital health record management, Anvit provides rapid, accessible medical care anytime, anywhere.",
    image: "/images/project-anvit.jpg",
    tags: ["Next.js", "WebRTC", "Node.js", "MongoDB", "Socket.io"],
    technologies: [
      { name: "Next.js", icon: "nextjs" },
      { name: "WebRTC", icon: "video" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Socket.io", icon: "radio" }
    ],
    timeline: "2024",
    role: "Full Stack Engineer",
    highlights: [
      "Peer-to-peer WebRTC video/audio engine with adaptive bitrate streaming.",
      "HIPAA-aligned encrypted medical record repository for lab reports.",
      "Automated booking calendar with time-slot reservation and alerts.",
      "Doctor credentials verification and specialty search filtering.",
      "Real-time doctor-patient messaging with low-latency sockets."
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
    category: "Wearable IoT & Elderly Safety",
    projectType: "IoT System",
    developmentType: "Individual Project",
    description:
      "An intelligent wearable IoT safety device for elderly independent living, analyzing posture changes and dispatching emergency telemetry alerts.",
    longDescription:
      "FallGuard is an intelligent wearable IoT safety device dedicated to elderly care and independent living. Leveraging high-frequency tri-axial accelerometers and gyroscopes, FallGuard analyzes sudden impact and posture changes. Upon detecting a fall event, the system initiates an audible countdown before automatically dispatching emergency SMS and GPS location alerts to caregivers.",
    image: "/images/project-fallguard.jpg",
    tags: ["Embedded C++", "MPU6050", "ESP32", "Twilio API", "Cloud Telemetry"],
    technologies: [
      { name: "ESP32", icon: "cpu" },
      { name: "MPU6050", icon: "activity" },
      { name: "C++", icon: "code" },
      { name: "Twilio API", icon: "phone" },
      { name: "Cloud", icon: "cloud" }
    ],
    timeline: "2023 – 2024",
    role: "Hardware & IoT Systems Developer",
    highlights: [
      "Multi-stage impact thresholding algorithm to differentiate accidental falls.",
      "Automated emergency caregiver call and SMS dispatch with GPS coordinates.",
      "Pre-alert audible countdown preventing false positive dispatches.",
      "Low-power deep sleep mode delivering over 72 hours of wearable operation.",
      "Companion mobile dashboard for real-time battery and caregiver monitoring."
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
    category: "Fintech & Data Analytics",
    projectType: "Web Application",
    developmentType: "Individual Project",
    description:
      "An intelligent personal finance ecosystem providing expense categorization, dynamic budget caps, predictive spending insights, and goal planning.",
    longDescription:
      "Samridd is a personal finance ecosystem engineered to give users total control over their financial health. Through intelligent expense categorization, dynamic budget caps, predictive spending insights, and milestone-driven savings goals, Samridd transforms complex transaction data into clear, actionable financial intelligence.",
    image: "/images/project-samridd.jpg",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts"],
    technologies: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodejs" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Recharts", icon: "bar-chart" }
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
