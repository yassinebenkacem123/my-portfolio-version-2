/**
 * GitHub GraphQL service
 *
 * Fetches and transforms the contribution calendar data for a given user.
 * In-memory cache avoids hammering the GitHub API on every page load.
 */

// ── Types ────────────────────────────────────────────────────────────────────

interface RawDay {
  date: string
  contributionCount: number
  weekday: number
  color: string
}

interface RawWeek {
  contributionDays: RawDay[]
}

interface RawCalendar {
  totalContributions: number
  weeks: RawWeek[]
}

interface RawResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: RawCalendar
      }
    }
  }
  errors?: { message: string }[]
}

export interface ContributionDay {
  date: string      // "YYYY-MM-DD"
  count: number
  weekday: number   // 0 = Sunday … 6 = Saturday
  level: 0 | 1 | 2 | 3 | 4  // intensity bucket
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionsPayload {
  username: string
  totalContributions: number
  weeks: ContributionWeek[]
}

// ── Simple in-memory cache ───────────────────────────────────────────────────

interface CacheEntry {
  data: ContributionsPayload
  expiresAt: number
}

const cache = new Map<string, CacheEntry>()
/** Cache TTL: 1 hour (milliseconds) */
const CACHE_TTL_MS = 60 * 60 * 1000

// ── GitHub GraphQL query ─────────────────────────────────────────────────────

const CONTRIBUTIONS_QUERY = `
  query Contributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
              color
            }
          }
        }
      }
    }
  }
`

// ── Intensity bucket helper ──────────────────────────────────────────────────

/**
 * Converts a raw contribution count into a 0-4 intensity level,
 * matching GitHub's color scale thresholds.
 */
function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

// ── Main service function ────────────────────────────────────────────────────

/**
 * Fetches contribution calendar data from GitHub GraphQL API.
 * Returns cached data if still valid.
 */
export async function fetchContributions(
  username: string
): Promise<ContributionsPayload> {

  // --- Check cache ---
  const cached = cache.get(username)
  if (cached && Date.now() < cached.expiresAt) {
    console.log(`[GitHub Service] Returning cached data for "${username}"`)
    return cached.data
  }

  // --- Fetch from GitHub ---
  console.log(`[GitHub Service] Fetching fresh data for "${username}"`)

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Token is ONLY read server-side — never exposed to the browser
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub API returned HTTP ${response.status}`)
  }

  const json = (await response.json()) as RawResponse

  // --- Handle GraphQL-level errors ---
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '))
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    throw new Error(`No contribution calendar found for user "${username}".`)
  }

  // --- Transform to frontend-friendly shape ---
  const payload: ContributionsPayload = {
    username,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
        level: toLevel(day.contributionCount),
      })),
    })),
  }

  // --- Store in cache ---
  cache.set(username, { data: payload, expiresAt: Date.now() + CACHE_TTL_MS })

  return payload
}
