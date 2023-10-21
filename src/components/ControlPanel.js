import React, { useState, useEffect, useRef } from 'react';
import {
  HStack,
  VStack,
  Select,
  Box,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import { BsArrowRight } from 'react-icons/bs';

import { DeleteIcon } from '@chakra-ui/icons';
import Dictaphone from './voiceInput';

import FileUpload from './fileUploadeButton';
import VideoPlayer from './VideoPlayer';
import { HiTranslate } from 'react-icons/hi';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  setFromLanguage,
  setToLanguage,
  setText,
  text,
  setTranslation,
  translation,
}) => {
  const [websocket, setWebsocket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mediaRef = useRef(null);

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

  const languageOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'es-US', label: 'Spanish' },
    {
      value: 'ar-EG',
      label: 'Arabic',
    },

    // Add more language options here
  ];

  const handleFileDeletion = () => {
    setSelectedFile(null);
  };

  return (
    <Box width={'full'} marginBottom={'1rem'}>
      <VStack spacing={4} width={'full'}>
        <HStack width={'full'}>
          <Select
            isDisabled={isSpeaking ? true : false}
            placeholder="Translate from"
            onChange={e => setFromLanguage(e.target.value)}
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Icon as={BsArrowRight} color="gray.500" viewBox="0 0 100% 4" />

          <Select
            isDisabled={isSpeaking ? true : false}
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
        <HStack width={'full'}>
          <Dictaphone
            text={text}
            setText={setText}
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            selectedFile={selectedFile}
            setIsSpeaking={setIsSpeaking}
            setTranslation={setTranslation}
          />
          <Button
            isDisabled={
              fromLanguage && toLanguage && (text || selectedFile)
                ? false
                : true
            }
            onClick={handleTranslation}
            colorScheme="yellow"
            width={'full'}
            leftIcon={<Icon as={HiTranslate} />}
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
                fromLanguage && toLanguage && !(isSpeaking || text)
                  ? false
                  : true
              }
              width={'full'}
              leftIcon={<Icon as={IoIosCloudUpload} />}
              colorScheme="green"
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
          >
            Remove media
          </Button>
        </HStack>

        {selectedFile && (
          <Box
            width={'full'}
            borderWidth="0.1rem"
            borderRadius="md"
            padding={8}
          >
            <HStack
              width={'full'}
              justifyContent={'center'}
              marginBottom={'1rem'}
            >
              <Text fontWeight="bold" fontSize={'lg'} textAlign={'center'}>
                Selected File:
              </Text>
              <Text
                fontWeight="bold"
                fontSize={'lg'}
                textAlign={'center'}
                color={'blue.400'}
              >
                {' '}
                {selectedFile.name}
              </Text>
            </HStack>

            {selectedFile.type.startsWith('audio/') ? (
              <audio
                ref={mediaRef}
                controls
                style={{
                  width: '100%',
                }}
              >
                <source
                  src={URL.createObjectURL(selectedFile)}
                  type={selectedFile.type}
                />
              </audio>
            ) : (
              <VideoPlayer url={URL.createObjectURL(selectedFile)} />
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ControlPanel;
