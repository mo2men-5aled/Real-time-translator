import React, { useState, useEffect } from 'react';
import { HStack, Select, Box, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import VoiceStreamer from './voiceInput';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  setFromLanguage,
  setToLanguage,
  setText,
  text,
}) => {
  const [websocket, setWebsocket] = useState(null);

  // Create a WebSocket connection
  const initializeWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8000');

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
  useEffect(() => {
    initializeWebSocket();
  }, []);

  const sendToServer = data => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(data));
    }
  };

  const handleTranslation = () => {
    const data = {
      from: fromLanguage,
      to: toLanguage,
      text: text,
    };
    sendToServer(data);
    console.log('Data sent to the server:', data);
  };

  const languageOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'es-US', label: 'Spanish' },
    {
      value: 'ar-EG',
      label: 'Arabic',
    },

    // Add more language options here
  ];

  return (
    <Box width={'full'} marginBottom={'1rem'}>
      <HStack spacing={4}>
        <HStack>
          <VoiceStreamer
            setText={setText}
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
          />
          <Button
            isDisabled={fromLanguage && toLanguage && text ? false : true}
            onClick={handleTranslation}
            colorScheme="yellow"
          >
            translate
          </Button>
        </HStack>
        <Select
          placeholder="Translate from"
          onChange={e => setFromLanguage(e.target.value)}
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronRightIcon />
        <Select
          placeholder="Translate to"
          onChange={e => setToLanguage(e.target.value)}
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default ControlPanel;
