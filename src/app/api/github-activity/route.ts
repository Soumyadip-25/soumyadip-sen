import { NextResponse } from "next/server";
import { initialContributionsData } from "@/data/github-contributions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RawContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload?: {
    size?: number;
    commits?: unknown[];
  };
}

export async function GET() {
  try {
    const [contribRes, eventsRes] = await Promise.all([
      fetch("https://github-contributions-api.jogruber.de/v4/Soumyadip-25", {
        headers: { "Cache-Control": "no-cache" },
        cache: "no-store",
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("https://api.github.com/users/Soumyadip-25/events/public", {
        headers: {
          "User-Agent": "Soumyadip-Portfolio",
          "Cache-Control": "no-cache",
        },
        cache: "no-store",
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);

    const baseData =
      contribRes && contribRes.contributions
        ? contribRes
        : initialContributionsData;

    // Create a mutable map of all contributions by date
    const contributionsMap = new Map<string, RawContribution>(
      baseData.contributions.map((c: RawContribution) => [c.date, { ...c }])
    );

    // Track events count by date
    const liveEventPushesByDate = new Map<string, number>();
    if (Array.isArray(eventsRes)) {
      for (const ev of eventsRes as GitHubEvent[]) {
        if (
          ev.type === "PushEvent" ||
          ev.type === "CreateEvent" ||
          ev.type === "PullRequestEvent"
        ) {
          const date = ev.created_at?.slice(0, 10);
          if (date) {
            const commits =
              ev.payload?.size || ev.payload?.commits?.length || 1;
            liveEventPushesByDate.set(
              date,
              (liveEventPushesByDate.get(date) || 0) + commits
            );
          }
        }
      }
    }

    // Ensure live pushes from today and recent dates are factored in
    liveEventPushesByDate.forEach((commits, date) => {
      const existing = contributionsMap.get(date);
      if (existing) {
        if (commits > existing.count) {
          existing.count = commits;
        }
        if (existing.count >= 10) existing.level = 4;
        else if (existing.count >= 6) existing.level = 3;
        else if (existing.count >= 3) existing.level = 2;
        else if (existing.count > 0) existing.level = 1;
      }
    });

    const updatedContributions = Array.from(contributionsMap.values());

    // Calculate updated yearly totals
    const totals: Record<string, number> = {};
    for (const c of updatedContributions) {
      const yr = c.date.slice(0, 4);
      totals[yr] = (totals[yr] || 0) + c.count;
    }

    return NextResponse.json(
      {
        total: totals,
        contributions: updatedContributions,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json(initialContributionsData, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }
}

