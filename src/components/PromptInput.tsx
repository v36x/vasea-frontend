import { useState } from 'react'
import { Send } from 'lucide-react'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
}

export function PromptInput({ onSubmit }: PromptInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim())
      setValue('')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="என்ன project வேணும்? Describe in detail..."
        className="w-full h-32 p-5 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-white"
      />
      <button 
        onClick={handleSubmit}
        className="self-start flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium"
      >
        <Send size={18} /> Start Generation
      </button>
    </div>
  )
}
