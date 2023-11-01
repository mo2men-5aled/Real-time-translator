import React, { useEffect, useState, useRef } from 'react';
import { HStack, Button, Icon } from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import FileUpload from './fileUploadeButton';
import { HiTranslate } from 'react-icons/hi';
import initializeWebSocket from '../connection/wsConnection';
import { useToast } from '@chakra-ui/react';

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

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

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
    initializeWebSocket(
      setWebsocket,
      'wss://smartmaxco.com/ws/app/translate/',
      toast
    );
  }, [setWebsocket, toast]);

  const sendToServer = data => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(data));
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });

      websocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setIsLoading(false);
        setTranslation(data.translation);
        setText(data.text);
        setTranslationHighlightWords(data.highlightedWords);
        setSpeechHighlightWords(data.speechHighlitedWords);
      };
    } else {
      toast({
        title: 'Error',
        description: 'Could not connect to the server',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const handleTranslation = () => {
    // prepare data to send to the server
    const data = {
      from: fromLanguage,
      to: toLanguage,
      data: mediaOnBase64,
    };
    setIsLoading(true);
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
        isDisabled={fromLanguage && toLanguage && selectedFile ? false : true}
        onClick={handleTranslation}
        colorScheme="yellow"
        leftIcon={<Icon as={HiTranslate} />}
        size="md"
        isLoading={isLoading}
        loadingText="Translating..."
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
