let ws: WebSocket | null = null;
const listeners: Map<string, ((payload: any) => void)[]> = new Map();

export function connectWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = import.meta.env.VITE_WS_URL || '127.0.0.1:8000';
  const url = `${protocol}//${host}/ws`;

  ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('🟢 WS Connected');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const type = data.type;
      listeners.get(type)?.forEach(cb => cb(data));
    } catch (e) {
      console.error('WS parse error', e);
    }
  };

  ws.onclose = () => console.log('🔴 WS Closed');
  ws.onerror = (err) => console.error('WS error', err);
}

export function send(payload: any) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  } else {
    console.warn('WS not open');
  }
}

export function onMessage(type: string, callback: (payload: any) => void) {
  if (!listeners.has(type)) listeners.set(type, []);
  listeners.get(type)!.push(callback);
  return () => {
    const arr = listeners.get(type)!;
    listeners.set(type, arr.filter(cb => cb !== callback));
  };
}

export function getWs() {
  return ws;
}
