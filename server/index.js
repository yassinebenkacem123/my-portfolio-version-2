import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { githubRouter } from './routes/github.js'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Allow requests from the Vite dev server (and your production domain)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.FRONTEND_URL, // set in production
  ].filter(Boolean),
}))

app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/github', githubRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
})
