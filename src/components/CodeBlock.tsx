import { useMemo, useState, type ReactNode } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { Icon } from './Icon'

const KEYWORDS = new Set([
  'def',
  'class',
  'return',
  'if',
  'else',
  'elif',
  'for',
  'while',
  'import',
  'from',
  'const',
  'let',
  'var',
  'function',
  'async',
  'await',
  'new',
  'try',
  'catch',
  'except',
  'finally',
  'with',
  'as',
  'in',
  'not',
  'and',
  'or',
  'True',
  'False',
  'None',
  'null',
  'true',
  'false',
  'type',
  'interface',
  'yield',
  'raise',
  'lambda',
  'match',
  'case',
  'export',
  'default',
  'on',
  'jobs',
  'steps',
  'name',
])

function highlightLine(line: string): ReactNode[] {
  const parts: ReactNode[] = []
  const pattern =
    /(\/\/.*$|#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d+(?:\.\d+)?)\b|([A-Za-z_][A-Za-z0-9_]*)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(line))) {
    if (match.index > last) parts.push(line.slice(last, match.index))
    const [text, comment, str, num, word] = match
    if (comment) parts.push(<span key={key++} className="tok-com">{comment}</span>)
    else if (str) parts.push(<span key={key++} className="tok-str">{str}</span>)
    else if (num) parts.push(<span key={key++} className="tok-num">{num}</span>)
    else if (word && KEYWORDS.has(word)) parts.push(<span key={key++} className="tok-key">{word}</span>)
    else if (word) parts.push(text)
    last = match.index + text.length
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

export function CodeBlock({
  code,
  lang = 'text',
  title,
  note,
}: {
  code: string
  lang?: string
  title?: string
  note?: string
}) {
  const { lang: uiLang } = useLang()
  const [copied, setCopied] = useState(false)

  const lines = useMemo(() => code.split('\n'), [code])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <figure className="codeblock">
      <div className="code-head">
        <div className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="code-title">{title ?? lang}</span>
        <span className="code-lang">{lang}</span>
        <button className="code-copy" onClick={copy} aria-label={uiLang === 'zh' ? '复制代码' : 'Copy code'}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          {copied ? (uiLang === 'zh' ? '已复制' : 'Copied') : uiLang === 'zh' ? '复制' : 'Copy'}
        </button>
      </div>
      <div className="code-body">
        <pre>
          <code>
            {lines.map((line, i) => (
              <span className="code-line" key={i}>
                <span className="code-num" aria-hidden="true">
                  {String(i + 1).padStart(2, ' ')}
                </span>
                <span className="code-text">{highlightLine(line)}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  )
}
