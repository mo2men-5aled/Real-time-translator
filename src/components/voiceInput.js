import React, { useState, useEffect } from 'react';
import { Button, Icon, HStack } from '@chakra-ui/react';

import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

const Dectaphone = ({
  text,
  setText,
  fromLanguage,
  toLanguage,
  selectedFile,
  setIsSpeaking,
  isSpeaking,
  setTranslation,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [websocket, setWebSocket] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000');
    setWebSocket(websocket);

    websocket.onopen = function () {
      console.log('WebSocket connection established.');
    };
    websocket.onclose = function () {
      console.log('WebSocket connection closed.');
    };
    websocket.onerror = function (error) {
      console.error('WebSocket error: ', error);
    };
  }, []);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = function (e) {
          if (e.data.size > 0) {
            setAudioChunks(chunks => [...chunks, e.data]);
          }
        };

        recorder.onstop = function () {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

          blobToBytes(audioBlob, function (bytes) {
            websocket.send(JSON.stringify({ bytes }));
            console.log(bytes.buffer);
          });
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsSpeaking(true);
      })
      .catch(function (error) {
        console.error('Error accessing the microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    setIsSpeaking(false);
  };

  function blobToBytes(blob, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      const bytes = new Uint8Array(arrayBuffer);
      callback(bytes);
    };

    reader.readAsArrayBuffer(blob);
  }

  return (
    <Button
      onClick={isSpeaking ? stopRecording : startRecording}
      size="sm"
      colorScheme={isSpeaking ? 'red' : 'blue'}
      isDisabled={fromLanguage && toLanguage && !selectedFile ? false : true}
      leftIcon={<Icon as={isSpeaking ? BsFillMicMuteFill : BsFillMicFill} />}
    >
      {isSpeaking ? 'Stop' : 'Start'} Speaking
    </Button>
  );
};

export default Dectaphone;
