import React, { useEffect, useState, useRef } from 'react';
import { HStack, Button, Icon } from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import FileUpload from './fileUploadeButton';
import { HiTranslate } from 'react-icons/hi';
import initializeWebSocket from '../connection/wsConnection';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  text,
  setText,
  setTranslation,
  setSelectedFile,
  selectedFile,
  isSpeaking,
  websocket,
  setWebsocket,
  setTranslationHighlightWords,
  setSpeechHighlightWords,
}) => {
  const [mediaOnBase64, setMediaOnBase64] = useState(null);
  const inputRef = useRef(null); // Create a reference to the file input element

  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const mediaBase64 = reader.result;
      setMediaOnBase64(mediaBase64);
    };
  };

  useEffect(() => {
    initializeWebSocket(setWebsocket, 'ws://localhost:8000/audio-stream');
  }, [setWebsocket]);

  const sendToServer = data => {
    console.log(JSON.stringify(data));
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(data));
      websocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setTranslation(data.translation);
        setText(data.text);
        setTranslationHighlightWords(data.highlightedWords);
        setSpeechHighlightWords(data.speechHighlitedWords);
      };
    }
  };

  const handleTranslation = () => {
    // prepare data to send to the server
    const data = {
      from: fromLanguage,
      to: toLanguage,
      data: mediaOnBase64,
    };
    sendToServer(data);
  };

  const handleFileDeletion = () => {
    // remove the uploaded media premanently
    setSelectedFile(null);

    // Clear the file input value
    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
        inputRef={inputRef}
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
