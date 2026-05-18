// ── Shared types for the GitHub heatmap feature ──────────────────────────────

export interface ContributionDay {
  date: string
  count: number
  weekday: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionsPayload {
  username: string
  totalContributions: number
  weeks: ContributionWeek[]
}

// ── GitHub REST API types ─────────────────────────────────────────────────────

export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  fork: boolean
  private: boolean
}

export type GitHubEventType =
  | 'PushEvent'
  | 'CreateEvent'
  | 'WatchEvent'
  | 'PullRequestEvent'
  | 'ForkEvent'

export interface GitHubEvent {
  id: string
  type: GitHubEventType | string
  created_at: string
  repo: { name: string; url: string }
  payload: Record<string, unknown>
}
