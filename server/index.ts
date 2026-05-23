import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { githubRouter } from './routes/github.js'
import { contactRouter } from './routes/contact.js'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Allow requests from the Vite dev server and production domain
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://my-portfolio-version-2.vercel.app',
    process.env.FRONTEND_URL, // set this in production
  ].filter(Boolean) as string[],
}))

app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/github', githubRouter)
app.use('/api/contact', contactRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.get('/test', (req,res)=> res.json({
  status:true,
  message:"API Server is runing..."
})) 
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`)
})
