interface CodeProps {
  raw: string
  language?: 'javascript' | 'curl' | 'python' | 'ruby' | 'php' | 'java'
}

export default function Code({ raw, language = 'javascript' }: CodeProps) {
  return (
    <pre className="rounded-lg custom-scrollbar">
      <code className={`language-${language}`} style={{ fontSize: 14 }}>
        {raw}
      </code>
    </pre>
  )
}
