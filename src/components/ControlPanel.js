import React, { useState, useEffect } from 'react';
import { HStack, Button, Icon } from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import { DeleteIcon } from '@chakra-ui/icons';
import FileUpload from './fileUploadeButton';
import { HiTranslate } from 'react-icons/hi';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  text,
  setTranslation,
  setSelectedFile,
  selectedFile,
  isSpeaking,
}) => {
  const [websocket, setWebsocket] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

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
      websocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setTranslation(data.text);
      };
    }
  };

  const handleTranslation = () => {
    const data = {
      from: fromLanguage,
      to: toLanguage,
      text: text,
      media: selectedFile,
    };
    sendToServer(data);
    console.log('Data sent to the server:', data);
  };

  const handleFileDeletion = () => {
    setSelectedFile(null);
  };

  return (
    <HStack width={'full'}>
      <Button
        isDisabled={
          fromLanguage && toLanguage && (text || selectedFile) ? false : true
        }
        onClick={handleTranslation}
        colorScheme="yellow"
        leftIcon={<Icon as={HiTranslate} />}
        width={'full'}
        size="sm"
      >
        Translate
      </Button>

      <FileUpload
        accept={'audio/*,video/*'}
        multiple
        handleChange={handleFileChange}
      >
        <Button
          isDisabled={
            fromLanguage && toLanguage && !(isSpeaking || text) ? false : true
          }
          width={'full'}
          leftIcon={<Icon as={IoIosCloudUpload} />}
          colorScheme="green"
          size="sm"
        >
          Upload
        </Button>
      </FileUpload>

      <Button
        isDisabled={selectedFile ? false : true}
        width={'full'}
        leftIcon={<Icon as={DeleteIcon} />}
        onClick={handleFileDeletion}
        colorScheme="red"
        size="sm"
      >
        Remove media
      </Button>
    </HStack>
  );
};

export default ControlPanel;
