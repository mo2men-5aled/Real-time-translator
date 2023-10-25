import React, { useEffect, useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';

function AudioStreamer() {
  const [socket, setSocket] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const initAudioStream = async () => {
      // Initialize the WebSocket connection
      const ws = new WebSocket('ws://127.0.0.1:8000/audio-stream');
      setSocket(ws);

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      // Initialize the audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
    };

    initAudioStream();
  }, []);

  const startRecording = () => {
    if (audioStream) {
      const mediaRecorder = new MediaRecorder(audioStream);
      const recordedChunks = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (recordedChunks.length > 0) {
          const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });

          // Convert Blob to base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            socket.send(base64data);
          };
          reader.readAsDataURL(audioBlob);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Stop recording after a set time or when the user clicks the stop button
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Adjust the time or use another mechanism to stop recording
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <HStack>
      <Button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </Button>
      <Button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </Button>
    </HStack>
  );
}

export default AudioStreamer;
