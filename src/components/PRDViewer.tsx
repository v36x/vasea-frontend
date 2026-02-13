interface PRDViewerProps {
  prd: string
  onAccept: () => void
  onReject: (feedback: string) => void
}

export function PRDViewer({ prd, onAccept, onReject }: PRDViewerProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Generated PRD</h2>
      <pre className="whitespace-pre-wrap text-sm mb-6">{prd}</pre>
      <div className="flex gap-4">
        <button onClick={onAccept} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg">
          Accept & Proceed
        </button>
        <button 
          onClick={() => onReject("மேலும் தெளிவு + acceptance criteria சேர்க்கவும்")} 
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          Reject with Feedback
        </button>
      </div>
    </div>
  )
}
