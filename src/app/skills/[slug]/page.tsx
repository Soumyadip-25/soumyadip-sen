import React from "react";
import { notFound } from "next/navigation";
import { skillTopics, getSkillTopicBySlug } from "@/data/skills";
import SkillsDetailView from "@/components/SkillsDetailView";

export function generateStaticParams() {
  const params = skillTopics.map((topic) => ({ slug: topic.slug }));
  // Add fallback alias for ai-ml-data-analysis
  params.push({ slug: "ai-ml-data-analysis" });
  return params;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSkillTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return <SkillsDetailView initialSlug={topic.slug} />;
}
