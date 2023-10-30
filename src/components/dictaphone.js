import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  // split the transcript into phrases

  if (listening) {
    const sentenceRegex = /[.!?]+/;
    let sentences = transcript.split(sentenceRegex);
    console.log(sentences);
  }
  return (
    <Box>
      <Text>Microphone: {listening ? 'on' : 'off'}</Text>
      <HStack>
        <Button onClick={handleStartListening}>Start</Button>
        <Button onClick={handleStopListening}>Stop</Button>
        <Button onClick={resetTranscript}>Reset</Button>
      </HStack>
      <Text>{transcript}</Text>
    </Box>
  );
};
export default Dictaphone;
