import express from 'express'
import { fetchContributions } from '../services/githubService.js'

export const githubRouter = express.Router()

/**
 * GET /api/github/contributions
 *
 * Optional query param:  ?username=yassinet-1
 * Falls back to the GITHUB_USERNAME env variable.
 *
 * Returns a frontend-friendly JSON object:
 * {
 *   username: string,
 *   totalContributions: number,
 *   weeks: Array<{
 *     contributionDays: Array<{
 *       date: string,           // "YYYY-MM-DD"
 *       count: number,
 *       weekday: number,        // 0=Sun … 6=Sat
 *       level: 0|1|2|3|4       // intensity bucket (0 = none)
 *     }>
 *   }>
 * }
 */
githubRouter.get('/contributions', async (req, res) => {
  try {
    const username =
      (req.query.username as string) ||
      process.env.GITHUB_USERNAME ||
      ''

    if (!username) {
      return res.status(400).json({ error: 'No GitHub username provided.' })
    }

    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: 'Server is missing GITHUB_TOKEN.' })
    }

    const data = await fetchContributions(username)
    res.json(data)
  } catch (err: unknown) {
    console.error('[GitHub API Error]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(502).json({ error: 'Failed to fetch GitHub contributions.', detail: message })
  }
})
