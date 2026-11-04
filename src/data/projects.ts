export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
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
    title: "DHRUVA – Polar Knowledge System",
    subtitle: "Polar Science Outreach & AI Dissemination Portal",
    category: "Full Stack & AI Dissemination",
    description: "Integrated polar research, RAG & media dissemination portal.",
    longDescription:
      "DHRUVA is a centralized digital repository and AI-powered intelligence portal designed to organize polar research expeditions, scientific datasets, and climate science publications. It incorporates retrieval-augmented generation (RAG) for natural language querying across thousands of expedition logs and ice-core datasets, alongside multi-language AI translation for public science outreach.",
    image: "/images/project-dhruva.jpg",
    tags: ["RAG / AI", "Polar Expeditions", "Knowledge Base", "Full Stack", "Vector Search"],
    timeline: "2024 – 2025",
    role: "Lead Full Stack & AI Architect",
    highlights: [
      "Built RAG pipeline indexing polar research papers and expedition logs with sub-second hybrid retrieval.",
      "Engineered responsive interactive portal allowing researchers and students to explore Arctic and Antarctic datasets.",
      "Integrated automated content translation pipeline enabling multi-language public science dissemination.",
      "Designed secure role-based access architecture for scientific data governance."
    ],
    github: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Search Latency", value: "< 240ms" },
      { label: "Data Indexed", value: "10,000+ Docs" },
      { label: "Languages", value: "8 Supported" }
    ]
  },
  {
    id: "heartery",
    slug: "heartery",
    title: "HEARTERY – Smart Heart Health Monitoring System",
    subtitle: "IoT Cardiac Telemetry & Arrhythmia Detection",
    category: "IoT / Embedded & Cloud Health",
    description: "Portable IoT cardiac monitor with real-time ECG, SpO2 & Cloud telemetry.",
    longDescription:
      "Heartery is a clinical-grade, portable cardiac health telemetry system powered by ESP32 microcontrollers. It interfaces with AD8232 ECG sensor leads and MAX30102 photoplethysmography sensors to capture real-time cardiac waveforms, heart rate, and blood oxygen levels (SpO2). Digital signal filtering removes baseline wander and 50Hz mains noise, transmitting instantaneous vitals to cloud dashboards for clinical and emergency monitoring.",
    image: "/images/project-heartery.jpg",
    tags: ["ESP32", "AD8232 ECG", "MAX30102", "ThingSpeak", "Firebase", "Signal Processing"],
    timeline: "2023 – 2024",
    role: "Embedded Systems & IoT Engineer",
    highlights: [
      "Programmed ESP32 firmware with dual-core FreeRTOS task scheduling for continuous sensor sampling without jitter.",
      "Implemented digital IIR bandpass and notch filtering for crisp PQRST electrocardiogram wave display.",
      "Built real-time telemetry pipeline streaming sensor metrics to Firebase and ThingSpeak cloud brokers.",
      "Achieved 97.5% heart-rate accuracy against commercial medical pulse monitors."
    ],
    github: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "ECG Accuracy", value: "97.5%" },
      { label: "Sample Rate", value: "250 Hz" },
      { label: "Alert Latency", value: "< 1.2s" }
    ]
  },
  {
    id: "pathvista",
    slug: "pathvista",
    title: "PATHVISTA – AI-Powered Career & Education Advisor",
    subtitle: "Aptitude Mapping, Curriculum Pathways & Scholarship Discovery",
    category: "AI/ML & EdTech Platform",
    description: "Personalized career guidance engine mapping student aptitude to courses & opportunities.",
    longDescription:
      "PathVista is an AI-driven career and educational navigation platform engineered to guide students toward their optimal academic pathways. By assessing individual strengths and career interests, PathVista maps personalized learning roadmaps, university cutoffs, institutional admissions, and scholarship options with multi-language accessibility.",
    image: "/images/project-pathvista.jpg",
    tags: ["React.js", "Node.js", "Express", "PostgreSQL", "AI/ML", "Education Tech"],
    timeline: "2024",
    role: "Full Stack & ML Developer",
    highlights: [
      "Designed algorithmic recommendation engine matching user aptitude to competitive college criteria.",
      "Integrated live database of verified scholarships and government academic grant schemes.",
      "Engineered multi-language accessibility enabling vernacular guidance for regional students.",
      "Constructed progressive web architecture with offline-ready assessment modules."
    ],
    github: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Match Precision", value: "94%" },
      { label: "Universities", value: "500+" },
      { label: "Curriculums", value: "50+" }
    ]
  },
  {
    id: "anvit",
    slug: "anvit",
    title: "ANVIT – Online Doctor Consultation Platform",
    subtitle: "Telemedicine Platform & Real-Time Clinical Consultations",
    category: "Healthcare Telemedicine & WebRTC",
    description: "Comprehensive telemedicine platform connecting patients with verified healthcare specialists.",
    longDescription:
      "Anvit is a full-featured telehealth consultation platform bridging the gap between patients and specialized healthcare practitioners. Featuring WebRTC-powered high-definition video consultations, encrypted real-time chat, instant appointment scheduling, and secure digital health record management, Anvit provides rapid, accessible medical care anytime, anywhere.",
    image: "/images/project-anvit.jpg",
    tags: ["Next.js", "WebRTC", "Node.js", "MongoDB", "Socket.io", "Telehealth"],
    timeline: "2024",
    role: "Full Stack Engineer",
    highlights: [
      "Built peer-to-peer WebRTC video/audio engine with adaptive bitrate streaming for low-bandwidth clinics.",
      "Implemented automated booking calendar with time-slot reservation and instant notifications.",
      "Designed HIPAA-aligned encrypted medical record repository for lab reports and prescriptions.",
      "Constructed doctor verification workflow with credentials validation."
    ],
    github: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Stream Latency", value: "< 140ms" },
      { label: "Specialties", value: "20+" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "fallguard",
    slug: "fallguard",
    title: "FALLGUARD – Smart Fall Detection System",
    subtitle: "Wearable IoT Safety & Emergency Caregiver Telemetry",
    category: "Wearable IoT & Elderly Safety",
    description: "Sensor-driven wearable for elderly safety with instant caregiver telemetry.",
    longDescription:
      "FallGuard is an intelligent wearable IoT safety device dedicated to elderly care and independent living. Leveraging high-frequency tri-axial accelerometers and gyroscopes, FallGuard analyzes sudden impact and posture changes. Upon detecting a fall event, the system initiates an audible countdown before automatically dispatching emergency SMS and GPS location alerts to caregivers.",
    image: "/images/project-fallguard.jpg",
    tags: ["Embedded C++", "MPU6050", "ESP32", "Twilio API", "Cloud Telemetry"],
    timeline: "2023 – 2024",
    role: "Hardware & IoT Systems Developer",
    highlights: [
      "Engineered multi-stage impact thresholding algorithm to differentiate accidental falls from sitting down.",
      "Automated emergency caregiver call and SMS dispatch with Google Maps location coordinates.",
      "Implemented low-power deep sleep mode delivering over 72 hours of continuous wearable operation.",
      "Paired with companion responsive dashboard for real-time battery and activity monitoring."
    ],
    github: "https://github.com/Soumyadip-25",
    metrics: [
      { label: "Detection Rate", value: "98.2%" },
      { label: "Response Time", value: "< 2s" },
      { label: "Battery Life", value: "72+ Hrs" }
    ]
  },
  {
    id: "samridd",
    slug: "samridd",
    title: "SAMRIDD – Personal Finance Management Platform",
    subtitle: "Intelligent Expense Tracking, Budget Forecasting & Goal Planning",
    category: "Fintech & Data Analytics",
    description: "Intelligent personal finance platform with expense tracking and budget forecasting.",
    longDescription:
      "Samridd is a personal finance ecosystem engineered to give users total control over their financial health. Through intelligent expense categorization, dynamic budget caps, predictive spending insights, and milestone-driven savings goals, Samridd transforms complex transaction data into clear, actionable financial intelligence.",
    image: "/images/project-samridd.jpg",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts", "Fintech"],
    timeline: "2023",
    role: "Full Stack Developer",
    highlights: [
      "Engineered responsive financial dashboard with interactive Cash Flow, Expense, and Budget graphs.",
      "Implemented customizable budget alerts that notify users when approaching categorical limits.",
      "Designed compound interest savings goal planner tracking milestones toward financial independence.",
      "Secured personal financial records using AES-256 encryption at rest and in transit."
    ],
    github: "https://github.com/Soumyadip-25",
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
