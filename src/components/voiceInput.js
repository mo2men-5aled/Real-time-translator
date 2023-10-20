import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { Button, HStack, Icon } from '@chakra-ui/react';

import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

import { CgPlayListRemove } from 'react-icons/cg';

const Dictaphone = ({ fromLanguage, setText, toLanguage, text }) => {
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
    <HStack width={'full'}>
      <Button
        width={'full'}
        isDisabled={fromLanguage && toLanguage ? false : true}
        onClick={listening ? handleStopListening : handleStartListenign}
        colorScheme={listening ? 'blue' : 'teal'}
        leftIcon={<Icon as={listening ? BsFillMicMuteFill : BsFillMicFill} />}
      >
        {listening ? 'Stop' : 'Start'}
      </Button>

      <Button
        width={'full'}
        isDisabled={listening || (!transcript && !text) ? true : false}
        onClick={handleResetText}
        colorScheme="red"
        leftIcon={<Icon as={CgPlayListRemove} />}
      >
        Remove Text
      </Button>
    </HStack>
  );
};
export default Dictaphone;
