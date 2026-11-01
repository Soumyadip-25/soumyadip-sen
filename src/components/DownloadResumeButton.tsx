import { Download } from "lucide-react";
import { Special_Elite } from "next/font/google";
import "./download-resume.css";

const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
});

export default function DownloadResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download="Soumyadip_Sen_Resume.pdf"
      className={`resume-button ${typewriter.className}`}
    >
      <Download size={25} strokeWidth={3} />
      <span>Download Resume</span>
    </a>
  );
}

