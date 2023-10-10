import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

interface MarkdownProps {
  children: string
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className="
            prose prose-sm
            break-words 
            text-font font-medium leading-relaxed
            max-w-none text-[15px]
            prose-headings:text-font prose-headings:font-semibold
            prose-h1:text-xl 
            prose-h2:text-lg prose-h3:text-[15px] 
            prose-h4:text-base prose-h5:text-[13px]
            prose-h6:text-[8px] prose-a:text-primary
            lg:prose-h1:text-[24px] lg:prose-h2:text-[18px]
            lg:prose-h3:text-lg lg:prose-h4:text-base
            lg:prose-h5:text-sm
            lg:prose-h6:text-xs 
            lg:prose-code:text-base
            prose-strong:text-font prose-strong:font-bold prose-strong:text-sm
            prose-code:bg-sideBar/90 prose-code:font-mono prose-code:p-1 prose-code:rounded prose-code:text-font prose-code:break-words"
    >
      {children}
    </ReactMarkdown>
  )
}
