import React from 'react'

// Custom Markdown Renderer
function MarkdownRenderer({ source }) {
  if (!source) return null

  const renderMarkdown = (text) => {
    const lines = text.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className='text-base font-semibold text-gray-900 mt-4 mb-2'>{line.slice(4)}</h3>)
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className='text-lg font-semibold text-gray-900 mt-6 mb-3'>{line.slice(3)}</h2>)
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className='text-xl font-bold text-gray-900 mt-4 mb-3'>{line.slice(2)}</h1>)
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const codeLines = []
        i++
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        elements.push(
          <pre key={i} className='bg-gray-50 text-gray-900 p-3 rounded-md my-3 overflow-x-auto font-mono text-xs border border-gray-300'>
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
      }
      // Bullet lists
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listItems = []
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().slice(2))
          i++
        }
        i--
        elements.push(
          <ul key={i} className='space-y-1 my-3 ml-4 list-disc'>
            {listItems.map((item, idx) => (
              <li key={idx} className='text-gray-700 text-sm leading-relaxed'>
                <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
              </li>
            ))}
          </ul>
        )
      }
      // Numbered lists
      else if (/^\d+\.\s/.test(line.trim())) {
        const listItems = []
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''))
          i++
        }
        i--
        elements.push(
          <ol key={i} className='space-y-1 my-3 ml-4 list-decimal'>
            {listItems.map((item, idx) => (
              <li key={idx} className='text-gray-700 text-sm leading-relaxed'>
                <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
              </li>
            ))}
          </ol>
        )
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<div key={i} className='h-1'></div>)
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={i} className='text-gray-700 text-sm leading-relaxed mb-3' dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
        )
      }
      i++
    }
    return elements
  }

  const parseInline = (text) => {
    return text
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-300">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic text-gray-800">$1</em>')
      .replace(/_([^_]+)_/g, '<em class="italic text-gray-800">$1</em>')
  }

  return <div className='prose-formal'>{renderMarkdown(source)}</div>
}

export default function TestProblemDescription({ problem }) {
  if (!problem) {
    return (
      <div className='flex-[0.6] bg-white h-[calc(100%-0px)] flex items-center justify-center min-w-[200px] border-l border-gray-200'>
        <div className='text-center'>
          <div className='w-12 h-12 mx-auto mb-3 text-gray-400'>
            <svg className='w-full h-full' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
          </div>
          <p className='text-gray-500 text-sm font-medium'>Select a problem</p>
        </div>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'hard': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className='flex-[0.6] bg-white h-[calc(100%-0px)] overflow-y-auto border-l border-gray-200 min-w-[200px]'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        
        {/* Title Section */}
        <div className='mb-6 pb-6 border-b border-gray-200'>
          <div className='flex items-baseline gap-4 mb-3'>
           
            {problem.id && (
              <span className='text-xs text-gray-500 font-medium'>
                #{problem.id}
              </span>
            )}
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>
            {problem.title || 'Problem Description'}
          </h1>
        </div>

        {/* Description */}
        <div className='mb-8 pb-8 border-b border-gray-200'>
          <MarkdownRenderer source={problem?.description} />
        </div>

        {/* Constraints */}
        {problem?.constraints && problem.constraints.length > 0 && (
          <div className='mb-8 pb-8 border-b border-gray-200'>
            <h2 className='text-base font-semibold text-gray-900 mb-3'>Constraints:</h2>
            <ul className='space-y-2 ml-4 list-disc'>
              {problem.constraints.map((constraint, i) => (
                <li key={i} className='text-sm text-gray-700 font-mono'>
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Topics */}
        {problem?.topics && problem.topics.length > 0 && (
          <div className='mb-8 pb-8 border-b border-gray-200'>
            <h2 className='text-base font-semibold text-gray-900 mb-3'>Topics:</h2>
            <div className='flex flex-wrap gap-2'>
              {problem.topics.map((topic, i) => (
                <span
                  key={i}
                  className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-300 font-medium'
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        {problem?.examples?.length > 0 && (
          <div className='mb-8 pb-8 border-b border-gray-200'>
            <h2 className='text-base font-semibold text-gray-900 mb-4'>Examples:</h2>
            <div className='space-y-6'>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className='bg-gray-50 rounded-md border border-gray-300 overflow-hidden'>
                  <div className='px-4 py-3 bg-gray-100 border-b border-gray-300'>
                    <span className='text-xs font-semibold text-gray-700'>Example {idx + 1}</span>
                  </div>
                  <div className='p-4 space-y-4'>
                    <div>
                      <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                        Input:
                      </label>
                      <pre className='bg-white text-gray-900 px-3 py-2 rounded text-xs font-mono border border-gray-300 overflow-x-auto'>
{typeof ex?.input === 'string' ? ex.input : Array.isArray(ex?.input) ? ex.input.join('\n') : String(ex?.input ?? '')}
                      </pre>
                    </div>
                    <div>
                      <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                        Output:
                      </label>
                      <pre className='bg-white text-gray-900 px-3 py-2 rounded text-xs font-mono border border-gray-300 overflow-x-auto'>
{ex.output}
                      </pre>
                    </div>
                    {ex.explanation && (
                      <div>
                        <label className='text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block'>
                          Explanation:
                        </label>
                        <p className='text-gray-700 text-sm leading-relaxed bg-white px-3 py-2 rounded border border-gray-300'>
                          {ex.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hints */}
        {problem?.hints && problem.hints.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-base font-semibold text-gray-900 mb-3'>Hints:</h2>
            <div className='space-y-2'>
              {problem.hints.map((hint, i) => (
                <div key={i} className='flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-200'>
                  <span className='font-semibold text-gray-500 flex-shrink-0'>Hint {i + 1}:</span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}