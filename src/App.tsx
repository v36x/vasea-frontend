import { useVasea } from '@/hooks/useVaseaWebSocket';
import { Send, Plus } from 'lucide-react';

function App() {
  const { prompt, setPrompt, startProject, logs, prd, respondToPRD, files, review } = useVasea();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-emerald-400">
          VASEA – AI Full Project Generator
        </h1>

        <div className="flex flex-col gap-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="என்ன project உருவாக்கணும்? (English/Tamil OK)"
            className="w-full h-32 p-5 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />

          <button
            onClick={startProject}
            className="self-start flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition"
          >
            <Send size={18} /> Generate Project
          </button>

          <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-800 max-h-80 overflow-y-auto font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className={log.type === 'error' ? 'text-red-400' : ''}>
                {log.content}
              </div>
            ))}
          </div>

          {prd && (
            <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-3">PRD</h2>
              <pre className="whitespace-pre-wrap text-sm">{prd}</pre>
              <div className="mt-4 flex gap-4">
                <button onClick={() => respondToPRD('accept')} className="px-5 py-2 bg-green-600 rounded hover:bg-green-700">
                  Accept
                </button>
                <button onClick={() => respondToPRD('reject', 'மேலும் விவரங்கள் சேர்க்கவும்')} className="px-5 py-2 bg-red-600 rounded hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          )}

          {review && <pre className="bg-gray-900 p-4 rounded text-yellow-300">{review}</pre>}

          {files.length > 0 && (
            <div>
              <h2 className="text-xl mb-3">Files</h2>
              {files.map((f, i) => (
                <details key={i} className="mb-2">
                  <summary className="cursor-pointer font-medium">{f.path}</summary>
                  <pre className="bg-black p-3 mt-2 rounded text-green-300 text-xs overflow-auto">{f.content}</pre>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
