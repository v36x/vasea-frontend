import { Message } from '@/hooks/useVaseaWebSocket'

interface ChatLogProps {
  logs: Message[]
}

export function ChatLog({ logs }: ChatLogProps) {
  return (
    <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-800 max-h-80 overflow-y-auto font-mono text-sm text-green-300">
      {logs.length === 0 && <div className="text-gray-500">Waiting for logs...</div>}
      {logs.map((log, i) => (
        <div key={i} className={log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : ''}>
          {log.content}
        </div>
      ))}
    </div>
  )
}
