import type { ContributionDay, ContributionWeek } from './types'

// ── Month label helpers ───────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export interface MonthLabel {
  label: string
  weekIndex: number
}

export function buildMonthLabels(weeks: ContributionWeek[]): MonthLabel[] {
  const labels: MonthLabel[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return
    const month = new Date(firstDay.date).getUTCMonth()
    if (month !== lastMonth) {
      labels.push({ label: MONTH_NAMES[month], weekIndex })
      lastMonth = month
    }
  })

  return labels
}

// ── Weekday label helpers ─────────────────────────────────────────────────────

export const WEEKDAY_LABELS: { label: string; row: number }[] = [
  { label: 'Mon', row: 1 },
  { label: 'Wed', row: 3 },
  { label: 'Fri', row: 5 },
]

// ── Date formatter ────────────────────────────────────────────────────────────

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatCount(count: number): string {
  return count.toLocaleString('en-US')
}

export function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

// ── Level → color ─────────────────────────────────────────────────────────────
// Using subtle warm-tinted greens to complement the dark portfolio palette.

export function levelToHex(level: ContributionDay['level']): string {
  switch (level) {
    case 0: return 'rgba(255,255,255,0.04)'
    case 1: return 'rgba(74,222,128,0.18)'
    case 2: return 'rgba(74,222,128,0.40)'
    case 3: return 'rgba(74,222,128,0.70)'
    case 4: return 'rgb(74,222,128)'
    default: return 'rgba(255,255,255,0.04)'
  }
}

// ── Language colors ───────────────────────────────────────────────────────────

export function langColor(lang: string | null): string {
  const map: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
    Dart: '#00B4AB',
  }
  return map[lang ?? ''] ?? 'rgba(255,255,255,0.3)'
}
