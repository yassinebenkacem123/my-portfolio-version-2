import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { githubRouter } from './routes/github.js'
import { contactRouter } from './routes/contact.js'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Dynamic CORS configuration allowing localhost and production domains
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://my-portfolio-version-2.vercel.app',
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl, postman, server-to-server, or local dev tools)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) ||
                      // Match frontend preview or staging URLs hosted on Vercel
                      origin.startsWith('https://my-portfolio-version-2');
                      
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200,
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
