interface CodeBlockProps {
  content: string
  language?: string
}

export function CodeBlock({ content, language = 'text' }: CodeBlockProps) {
  return (
    <pre className="bg-black p-4 rounded-lg overflow-x-auto text-sm text-green-300 font-mono">
      <code>{content}</code>
    </pre>
  )
}
