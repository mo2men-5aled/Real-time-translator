import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { Button, HStack } from '@chakra-ui/react';

const Dictaphone = ({ fromLanguage, setText, toLanguage }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListenign = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: fromLanguage,
    });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleResetText = () => {
    resetTranscript();
    setText('');
  };

  if (listening) {
    setText(transcript);
  }

  return (
    <HStack>
      <Button
        isDisabled={fromLanguage && toLanguage ? false : true}
        onClick={listening ? handleStopListening : handleStartListenign}
        colorScheme={listening ? 'blue' : 'teal'}
      >
        {listening ? 'Stop' : 'Start'}
      </Button>

      <Button
        isDisabled={listening || !transcript ? true : false}
        onClick={handleResetText}
        colorScheme="red"
      >
        Remove Text
      </Button>
    </HStack>
  );
};
export default Dictaphone;
