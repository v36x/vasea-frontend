export type Message = { type: string; content?: string; [key: string]: any };
import { useEffect, useState } from 'react';
import { connectWebSocket, onMessage, send } from '@/lib/websocket';

type Message = { type: string; content?: string; [key: string]: any };

export function useVasea() {
  const [logs, setLogs] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [prd, setPrd] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    connectWebSocket();

    const unsubConnected = onMessage('connected', (data) => {
      setThreadId(data.thread_id);
    });

    onMessage('log', (data) => setLogs(prev => [...prev, data]));
    onMessage('error', (data) => setLogs(prev => [...prev, { ...data, type: 'error' }]));
    onMessage('prd', (data) => setPrd(data.content || ''));
    onMessage('review', (data) => setReview(data.content || ''));
    onMessage('code_file', (data) => setFiles(prev => [...prev, data]));
    onMessage('final', (data) => setLogs(prev => [...prev, data]));
    onMessage('clear', () => {
      setLogs([]);
      setPrd('');
      setReview('');
      setFiles([]);
    });

    return () => {
      unsubConnected();
      // add more unsub if needed
    };
  }, []);

  const startProject = () => {
    if (!prompt.trim() || !threadId) return;
    send({ type: 'new_project', prompt });
    setPrompt('');
  };

  const respondToPRD = (choice: 'accept' | 'reject', extra = '') => {
    send({ type: 'response', target: 'prd', choice, extra });
  };

  return {
    logs,
    threadId,
    prd,
    review,
    files,
    prompt,
    setPrompt,
    startProject,
    respondToPRD,
  };
}
