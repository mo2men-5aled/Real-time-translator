import React, { useEffect, useState } from 'react';
import { HStack, Button, Icon } from '@chakra-ui/react';

import { IoIosCloudUpload } from 'react-icons/io';

import FileUpload from './fileUploadeButton';
import { HiTranslate } from 'react-icons/hi';
// import initializeWebSocket from '../connection/wsConnection';

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
  // setWebsocket,
  setHighlightWords,
}) => {
  const [base64Media, setBase64Media] = useState(null);
  const handleFileChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // convert the uploaded file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result.split(',')[1];
      setBase64Media(base64data);
    };
  };

  // useEffect(() => {
  //   initializeWebSocket(setWebsocket, 'ws://localhost:8000');
  // }, [setWebsocket]);

  const sendToServer = data => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      const data = {
        from: fromLanguage,
        to: toLanguage,
        data: base64Media,
      };
      websocket.send(JSON.stringify(data));
      websocket.onmessage = e => {
        const data = JSON.parse(e.data);
        setTranslation(data.translation);
        setText(data.text);
        setHighlightWords(data.highlightedWords);
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
        // leftIcon={<Icon as={DeleteIcon} />}
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
