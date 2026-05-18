import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RefreshCw, Star, GitFork, GitCommit, GitPullRequest, Eye, Folder } from 'lucide-react'
import type { ContributionsPayload, GitHubUser, GitHubRepo, GitHubEvent } from './types'
import { formatCount, formatRelativeTime, levelToHex, langColor } from './utils'
import ContributionGrid from './ContributionGrid'

// ── Config ────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL ?? ''

// ── Fade-in variant ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || target === 0) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return { ref, value }
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const PulseBox: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div
    className={`animate-pulse rounded-xl ${className}`}
    style={{ backgroundColor: 'rgba(255,255,255,0.05)', ...style }}
  />
)

const Skeleton: React.FC = () => (
  <div className="flex flex-col gap-8">
    {/* Header skeleton */}
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="flex flex-col gap-3">
        <PulseBox style={{ width: 100, height: 22 }} />
        <PulseBox style={{ width: 260, height: 48 }} />
        <PulseBox style={{ width: 180, height: 18 }} />
      </div>
      <PulseBox style={{ width: 140, height: 70 }} />
    </div>
    {/* Heatmap skeleton */}
    <div className="w-full rounded-[24px] p-6" style={{ backgroundColor: 'rgb(17,17,17)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex gap-1 ml-8">
        {Array.from({ length: 52 }, (_, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, di) => (
              <div key={di} className="w-[11px] h-[11px] rounded-sm animate-pulse" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ))}
      </div>
    </div>
    {/* Bottom grid skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PulseBox style={{ height: 260 }} />
      <PulseBox style={{ height: 260 }} />
    </div>
  </div>
)

// ── Error state ───────────────────────────────────────────────────────────────
const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
      <RefreshCw className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} />
    </div>
    <p className="text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{message}</p>
    <button
      onClick={onRetry}
      className="px-5 py-2 rounded-full text-xs font-medium transition-colors"
      style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
    >
      Try again
    </button>
  </div>
)

// ── Stat chip ─────────────────────────────────────────────────────────────────
const StatChip: React.FC<{ label: string; value: number; delay?: number }> = ({ label, value, delay = 0 }) => {
  const { ref, value: animated } = useCountUp(value)
  return (
    <motion.div {...fadeUp(delay)} className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <span ref={ref} className="text-2xl font-semibold tabular-nums" style={{ color: '#fff', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', letterSpacing: '-0.03em' }}>
        {formatCount(animated)}
      </span>
      <span className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
        {label}
      </span>
    </motion.div>
  )
}

// ── Event icon helper ─────────────────────────────────────────────────────────
function eventIcon(type: string) {
  const cls = 'w-3.5 h-3.5 flex-shrink-0'
  const col = 'rgba(255,255,255,0.45)'
  switch (type) {
    case 'PushEvent':       return <GitCommit className={cls} style={{ color: col }} />
    case 'PullRequestEvent':return <GitPullRequest className={cls} style={{ color: col }} />
    case 'WatchEvent':      return <Star className={cls} style={{ color: col }} />
    case 'ForkEvent':       return <GitFork className={cls} style={{ color: col }} />
    case 'CreateEvent':     return <Folder className={cls} style={{ color: col }} />
    default:                return <Eye className={cls} style={{ color: col }} />
  }
}

function eventTitle(ev: GitHubEvent): string {
  const repo = ev.repo.name.split('/')[1] ?? ev.repo.name
  switch (ev.type) {
    case 'PushEvent': {
      const commits = (ev.payload as { commits?: unknown[] }).commits?.length ?? 1
      return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repo}`
    }
    case 'CreateEvent': return `Created ${(ev.payload as { ref_type?: string }).ref_type ?? 'branch'} in ${repo}`
    case 'WatchEvent':  return `Starred ${repo}`
    case 'ForkEvent':   return `Forked ${repo}`
    case 'PullRequestEvent': {
      const action = (ev.payload as { action?: string }).action ?? 'opened'
      return `${action.charAt(0).toUpperCase() + action.slice(1)} PR in ${repo}`
    }
    default: return `Activity in ${repo}`
  }
}

// ── Legend ────────────────────────────────────────────────────────────────────
const Legend: React.FC = () => (
  <div className="flex items-center gap-2">
    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Less</span>
    <div className="flex gap-[3px] items-center">
      {([0, 1, 2, 3, 4] as const).map((l) => (
        <span key={l} className="w-[10px] h-[10px] rounded-sm inline-block" style={{ backgroundColor: levelToHex(l) }} aria-hidden />
      ))}
    </div>
    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>More</span>
  </div>
)

// ── Card wrapper ──────────────────────────────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    {...fadeUp(delay)}
    className={`rounded-[24px] flex flex-col overflow-hidden ${className}`}
    style={{ backgroundColor: 'rgb(17,17,17)', border: '1px solid rgba(255,255,255,0.07)' }}
  >
    {children}
  </motion.div>
)

// ── Card header ───────────────────────────────────────────────────────────────
const CardHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center gap-2.5 px-6 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <span style={{ color: 'rgba(255,255,255,0.35)' }}>{icon}</span>
    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>{title}</span>
  </div>
)

// ── GitHub icon inline SVG ────────────────────────────────────────────────────
const GitHubIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 20, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

// ── Main section ──────────────────────────────────────────────────────────────
interface GitHubContributionSectionProps {
  username?: string
}

const GitHubContributionSection: React.FC<GitHubContributionSectionProps> = ({ username }) => {
  const [data, setData] = useState<ContributionsPayload | null>(null)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      // 1. Contributions (proxied)
      const params = username ? `?username=${encodeURIComponent(username)}` : ''
      const res = await fetch(`${API_BASE}/api/github/contributions${params}`)
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? `HTTP ${res.status}`)
      }
      const json: ContributionsPayload = await res.json()
      setData(json)

      // 2. GitHub public API
      const ghUser = json.username
      const [userRes, reposRes, eventsRes] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${ghUser}`),
        fetch(`https://api.github.com/users/${ghUser}/repos?per_page=100&sort=updated`),
        fetch(`https://api.github.com/users/${ghUser}/events?per_page=20`),
      ])

      if (userRes.status === 'fulfilled' && userRes.value.ok)
        setUser(await userRes.value.json())

      if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
        const all: GitHubRepo[] = await reposRes.value.json()
        const nonFork = all.filter(r => !r.fork && !r.private)
        setRepos(
          nonFork
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 4)
        )
      }

      if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
        const all: GitHubEvent[] = await eventsRes.value.json()
        const filtered = all.filter(e =>
          ['PushEvent', 'CreateEvent', 'WatchEvent', 'PullRequestEvent', 'ForkEvent'].includes(e.type)
        ).slice(0, 5)
        setEvents(filtered)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load GitHub data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [username])

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)

  return (
    <section
      id="github-activity"
      className="w-full bg-white flex justify-center"
      style={{ backgroundColor: 'rgb(15,15,15)', padding: '80px 0' }}
    >
      <div className="w-[70%] flex flex-col gap-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}
            >
              // Open Source
            </span>
            <h2 className="text-heading-2 flex items-center gap-3" style={{ color: '#fff' }}>
              <GitHubIcon size={36} style={{ color: '#fff', flexShrink: 0 }} />
              GitHub Activity
            </h2>
            <p className="text-body-18-regular" style={{ color: 'rgba(255,255,255,0.4)' }}>
              A live snapshot of my open-source contributions and repositories.
            </p>
          </div>

          {/* Right: Stats */}
          {!loading && data && (
            <div className="flex flex-row gap-3 sm:flex-shrink-0">
              <StatChip label="Contributions" value={data.totalContributions} delay={0.1} />
              {user && <StatChip label="Repos" value={user.public_repos} delay={0.15} />}
              {user && <StatChip label="Followers" value={user.followers} delay={0.2} />}
              {totalStars > 0 && <StatChip label="Stars" value={totalStars} delay={0.25} />}
            </div>
          )}
        </motion.div>

        {/* ── States ─────────────────────────────────────────────────────── */}
        {loading && <Skeleton />}
        {!loading && error && <ErrorState message={error} onRetry={fetchAll} />}

        {/* ── Heatmap Card ───────────────────────────────────────────────── */}
        {!loading && data && (
          <>
            <Card delay={0.1}>
              {/* Card header row */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2">
                  <GitHubIcon size={15} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}>
                    Contribution Graph
                  </span>
                </div>
                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium transition-colors"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                >
                  @{data.username} ↗
                </a>
              </div>

              <div className="px-6  py-5">
                <ContributionGrid weeks={data.weeks} />
              </div>

              {/* Legend footer */}
              <div className="px-6 pb-5 flex items-center justify-end">
                <Legend />
              </div>
            </Card>

            {/* ── Bottom two-col grid ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Recent Activity */}
              <Card delay={0.15}>
                <CardHeader title="Recent Activity" icon={<GitCommit className="w-4 h-4" />} />
                <div className="flex flex-col divide-y" style={{ divideColor: 'rgba(255,255,255,0.05)' }}>
                  {events.length === 0 ? (
                    <p className="px-6 py-8 text-sm text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>No recent activity</p>
                  ) : events.map((ev, i) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 px-6 py-4"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {eventIcon(ev.type)}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif' }}>
                          {eventTitle(ev)}
                        </span>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {formatRelativeTime(ev.created_at)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Top Repositories */}
              <Card delay={0.2}>
                <CardHeader title="Top Repositories" icon={<Star className="w-4 h-4" />} />
                <div className="flex flex-col divide-y" style={{ divideColor: 'rgba(255,255,255,0.05)' }}>
                  {repos.length === 0 ? (
                    <p className="px-6 py-8 text-sm text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>No repositories found</p>
                  ) : repos.map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-2 px-6 py-4 group transition-colors no-underline"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-sm font-semibold truncate transition-colors"
                          style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Space Grotesk Variable, Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}
                        >
                          {repo.name}
                        </span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
                              <Star className="w-3 h-3" /> {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
                              <GitFork className="w-3 h-3" /> {repo.forks_count}
                            </span>
                          )}
                        </div>
                      </div>
                      {repo.description && (
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          {repo.description}
                        </p>
                      )}
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: langColor(repo.language) }}
                          />
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{repo.language}</span>
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </Card>

            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default GitHubContributionSection
