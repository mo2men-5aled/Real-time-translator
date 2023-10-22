// Create a WebSocket connection
const initializeWebSocket = (setWebsocket, url) => {
  const ws = new WebSocket(url);

  setWebsocket(ws);

  ws.onopen = () => {
    console.log('WebSocket connected');
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  ws.onerror = error => {
    console.error('WebSocket error:', error);
  };
};

export default initializeWebSocket;
