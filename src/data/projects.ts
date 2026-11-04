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
  }
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

