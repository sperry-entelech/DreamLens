// Vercel Serverless Function for Dream Interpretation
// Securely calls Claude API with server-side API key

import type { VercelRequest, VercelResponse } from '@vercel/node'

interface InterpretRequest {
  systemPrompt: string
  fewShotExamples: string
  userMessage: string
  lens: string
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Validate API key exists
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured')
    return res.status(500).json({ error: 'API configuration error' })
  }

  try {
    const { systemPrompt, fewShotExamples, userMessage, lens } = req.body as InterpretRequest

    // Validate required fields
    if (!systemPrompt || !userMessage) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Build the full prompt with few-shot examples
    const fullSystemPrompt = `${systemPrompt}\n\n${fewShotExamples || ''}`

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        system: fullSystemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Claude API error: ${response.status}`, errorText)
      return res.status(response.status).json({
        error: `Claude API error: ${response.status}`,
        details: errorText
      })
    }

    const data = await response.json()

    // Extract the text content from Claude's response
    const interpretation = data.content?.[0]?.text || ''

    if (!interpretation) {
      return res.status(500).json({ error: 'Empty response from Claude API' })
    }

    // Return the interpretation
    return res.status(200).json({
      success: true,
      interpretation,
      lens,
      usage: {
        inputTokens: data.usage?.input_tokens,
        outputTokens: data.usage?.output_tokens
      }
    })

  } catch (error) {
    console.error('Interpretation error:', error)
    return res.status(500).json({
      error: 'Failed to generate interpretation',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
