import express from 'express'
import { sendContactEmail } from '../services/emailService.js'

export const contactRouter = express.Router()

/**
 * POST /api/contact
 *
 * Body parameters:
 * {
 *   "email": "user@example.com",
 *   "name": "John Doe",       // optional
 *   "message": "Hello world"  // optional
 * }
 *
 * Validates parameters and calls sendContactEmail using the Brevo integration.
 */
contactRouter.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email address is required.' })
    }

    const trimmedEmail = email.trim()

    // Loose email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' })
    }

    // Optional parameters validation
    if (name !== undefined && typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string value.' })
    }

    if (message !== undefined && typeof message !== 'string') {
      return res.status(400).json({ error: 'Message must be a string value.' })
    }

    await sendContactEmail({
      userEmail: trimmedEmail,
      name: name ? name.trim() : undefined,
      message: message ? message.trim() : undefined,
    })

    res.json({
      success: true,
      message: 'Your message was sent successfully! I will reach out soon.',
    })
  } catch (err: unknown) {
    console.error('[Contact API Error]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({
      error: 'Failed to deliver the contact request.',
      detail: message,
    })
  }
})
