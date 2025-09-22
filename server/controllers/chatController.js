import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Helper: safe project search (very limited, text only)
// Resolve project root based on this file location (server/controllers)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..')
const SEARCH_DIRS = [
  path.join(PROJECT_ROOT, 'client', 'src'),
  path.join(PROJECT_ROOT, 'server')
]
const ALLOWED_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.env', '.css']

const listFilesRecursive = (baseDir) => {
  const results = []
  const walk = (dir) => {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const it of items) {
      const full = path.join(dir, it.name)
      if (it.isDirectory()) {
        // skip node_modules and build folders
        if (/node_modules|dist|build|\.git/i.test(full)) continue
        walk(full)
      } else {
        if (ALLOWED_EXTS.includes(path.extname(full))) results.push(full)
      }
    }
  }
  walk(baseDir)
  return results
}

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.json({ success: false, message: 'No messages provided' })
    }

    const openaiKey = process.env.OPENAI_API_KEY?.trim()
    if (!openaiKey) {
      // Fallback: simple heuristic response
      const last = messages[messages.length - 1]?.content || ''
      return res.json({ success: true, reply: `PixelBot (local): I received your message: "${last}". I can help you explore features, pricing, and usage. Add an OPENAI_API_KEY on the server to enable advanced answers.` })
    }

    // Call OpenAI Chat Completions
    const r = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are PixelBot, a helpful, friendly robot assistant for the PixelScribe app. Be concise, engaging, and helpful. Use bullet points where useful.' },
          ...messages
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    )

    const reply = r.data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'
    res.json({ success: true, reply })
  } catch (error) {
    const status = error?.response?.status
    const data = error?.response?.data
    console.error('chatWithAI error:', status, data || error.message)
    if (status === 401) {
      return res.json({ success: false, message: 'OpenAI authentication failed. Please verify OPENAI_API_KEY.' })
    }
    if (status === 429) {
      return res.json({ success: false, message: 'OpenAI rate limit reached. Please wait a moment and try again.' })
    }
    res.json({ success: false, message: data?.error?.message || error.message })
  }
}

export const searchProject = async (req, res) => {
  try {
    const { query } = req.body || {}
    if (!query || String(query).trim().length < 2) {
      return res.json({ success: false, message: 'Query too short' })
    }

    const results = []

    for (const dir of SEARCH_DIRS) {
      if (!fs.existsSync(dir)) continue
      const files = listFilesRecursive(dir)
      for (const fp of files) {
        try {
          const content = fs.readFileSync(fp, 'utf-8')
          if (content.toLowerCase().includes(query.toLowerCase())) {
            const idx = content.toLowerCase().indexOf(query.toLowerCase())
            const start = Math.max(0, idx - 120)
            const end = Math.min(content.length, idx + query.length + 120)
            const snippet = content.slice(start, end)
            results.push({
              file: path.relative(PROJECT_ROOT, fp),
              snippet
            })
            if (results.length >= 20) break
          }
        } catch {}
      }
    }

    res.json({ success: true, results })
  } catch (error) {
    console.error('searchProject error:', error.message)
    res.json({ success: false, message: error.message })
  }
}
