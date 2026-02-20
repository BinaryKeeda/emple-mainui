import React, { useState, useRef, useEffect } from 'react'
import { Drawer, IconButton, Tooltip } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import { Sparkles } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Message {
  role: 'user' | 'model'
  text: string
}

interface GeminiDrawerProps {
  open: boolean
  onClose: () => void
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

export default function GeminiDrawer({ open, onClose }: GeminiDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }))
      const chat = model.startChat({ history })
      const result = await chat.sendMessage(userMessage)
      const text = result.response.text()
      setMessages(prev => [...prev, { role: 'model', text }])
    } catch (err: any) {
  console.error('Gemini Error:', err)
  setMessages(prev => [
    ...prev,
    { role: 'model', text: `⚠️ Error: ${err?.message || 'Unknown error'}` },
  ])
}finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 600 },
          display: 'flex',
          flexDirection: 'column',
          background: '#fafafa',
          borderLeft: '1px solid rgba(249,115,22,0.15)',
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(249,115,22,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={20} color="white" />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
              Emple AI
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
              Powered by Gemini
            </div>
          </div>
        </div>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              marginTop: 60,
              color: '#9ca3af',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#374151', marginBottom: 6 }}>
              Emple AI se poocho!
            </div>
            <div style={{ fontSize: 13 }}>
              Koi bhi sawaal poocho — career, coding, interview prep...
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius:
                  msg.role === 'user'
                    ? '18px 18px 4px 18px'
                    : '18px 18px 18px 4px',
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #f97316, #ea580c)'
                    : 'white',
                color: msg.role === 'user' ? 'white' : '#1f2937',
                fontSize: 14,
                lineHeight: 1.6,
                boxShadow:
                  msg.role === 'user'
                    ? '0 2px 8px rgba(249,115,22,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.08)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                background: 'white',
                borderRadius: '18px 18px 18px 4px',
                padding: '12px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#f97316',
                    animation: 'bounce 1.2s infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #f3f4f6',
          background: 'white',
          display: 'flex',
          gap: 8,
          alignItems: 'flex-end',
        }}
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Kuch bhi poocho..."
          rows={1}
          style={{
            flex: 1,
            border: '1.5px solid #e5e7eb',
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: 14,
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            lineHeight: 1.5,
            transition: 'border-color 0.2s',
            background: '#f9fafb',
          }}
          onFocus={e => (e.target.style.borderColor = '#f97316')}
          onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
        />
        <Tooltip title="Send (Enter)">
          <span>
            <IconButton
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              sx={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                width: 44,
                height: 44,
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                },
                '&:disabled': {
                  background: '#e5e7eb',
                  color: '#9ca3af',
                },
              }}
            >
              <Send fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </Drawer>
  )
}