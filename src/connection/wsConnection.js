// Create a WebSocket connection
const initializeWebSocket = (setWebsocket, url, toast) => {
  const ws = new WebSocket(url);

  setWebsocket(ws);

  ws.onopen = () => {
    toast({
      title: 'Success',
      description: 'Connected to the server',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  ws.onclose = () => {
    toast({
      title: 'Oops',
      description: ' Connection Closed ',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  ws.onerror = error => {
    toast({
      title: 'Error',
      description: `Could not connect to the server because of ${error}`,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-left',
    });
  };
};

export default initializeWebSocket;
