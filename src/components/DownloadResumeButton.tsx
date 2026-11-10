import { Download } from "lucide-react";
import "./download-resume.css";

export default function DownloadResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download="Soumyadip_Sen_Resume.pdf"
      data-cursor="interactive"
      data-cursor-label="RESUME // DOWNLOAD"
      className="resume-button font-typewriter"
    >
      <Download size={25} strokeWidth={3} />
      <span>Download Resume</span>
    </a>
  );
}

