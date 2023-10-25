import React, { useEffect } from 'react';
import { HStack, Button, Icon } from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import FileUpload from './fileUploadeButton';
import { HiTranslate } from 'react-icons/hi';
import initializeWebSocket from '../connection/wsConnection';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  text,
  setTranslation,
  setSelectedFile,
  selectedFile,
  isSpeaking,
  websocket,
  setWebsocket,
  setTranslationHighlightWords,
  setSpeechHighlightWords,
}) => {
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    initializeWebSocket(setWebsocket, 'ws://localhost:8000/audio-stream');
  }, [setWebsocket]);

  const sendToServer = data => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(data));
      websocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setTranslation(data.text);
        setTranslationHighlightWords(data.highlightedWords);
        setSpeechHighlightWords(data.speechHighlitedWords);
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
  };

  const handleFileDeletion = () => {
    setSelectedFile(null);
  };

  return (
    <HStack>
      <Button
        isDisabled={
          fromLanguage && toLanguage && (text || selectedFile) ? false : true
        }
        onClick={handleTranslation}
        colorScheme="yellow"
        leftIcon={<Icon as={HiTranslate} />}
        size="md"
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
          leftIcon={<Icon as={IoIosCloudUpload} />}
          colorScheme="green"
          size="md"
        >
          Upload
        </Button>
      </FileUpload>

      <Button
        isDisabled={selectedFile ? false : true}
        onClick={handleFileDeletion}
        colorScheme="red"
        size="md"
      >
        Remove media
      </Button>
    </HStack>
  );
};

export default ControlPanel;
