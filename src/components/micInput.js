import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';

const SpeechRecognitionComponent = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  const sendRequest = text => {
    console.log(text); // Replace this with your request handling logic.
  };

  recognition.onresult = e => {
    const text = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    setRecognizedText(text);
    if (e.results[0].isFinal) {
      sendRequest(text);
    }
  };

  recognition.onerror = () => {
    setRecognizedText('');
  };

  const startRecognition = () => {
    recognition.start();
    setIsSpeaking(true);
  };

  const stopRecognition = () => {
    recognition.stop();
    setIsSpeaking(false);
  };

  return (
    <div>
      <h1>Mic State : {isSpeaking ? 'ON' : 'OFF'}</h1>
      <Button isDisabled={isSpeaking} onClick={startRecognition}>
        Start
      </Button>
      <Button isDisabled={!isSpeaking} onClick={stopRecognition}>
        Stop
      </Button>
      <p>Recognized Text: {recognizedText}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
