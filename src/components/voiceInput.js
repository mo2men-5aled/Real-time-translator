import React, { useEffect } from 'react';
import { Button, Text, Icon, HStack } from '@chakra-ui/react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

const Dictaphone = ({
  text,
  setText,
  fromLanguage,
  toLanguage,
  isRecording,
  useSpeechRecognition,
  SpeechRecognition,
  browserSupportsSpeechRecognition,
  listening,
  transcript,
  resetTranscript,
}) => {
  const startAudioStream = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: fromLanguage,
    });
  };

  const stopAudioStream = () => {
    SpeechRecognition.stopListening();
  };

  // Set the transcript to the text state when it changes
  useEffect(() => {
    setText(transcript);
  }, [transcript, setText]);

  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }

  return (
    <HStack gap={4}>
      <Button
        isDisabled={fromLanguage && toLanguage && !isRecording ? false : true}
        size={'md'}
        colorScheme={listening ? 'red' : 'blue'}
        onClick={listening ? stopAudioStream : startAudioStream}
        leftIcon={<Icon as={listening ? BsFillMicMuteFill : BsFillMicFill} />}
      >
        {listening ? 'Stop' : 'Start'} Speaking
      </Button>
      <Button
        isDisabled={
          fromLanguage && toLanguage && text && !isRecording && !listening
            ? false
            : true
        }
        size={'md'}
        colorScheme={'red'}
        onClick={resetTranscript}
      >
        Reset
      </Button>
    </HStack>
  );
};

export default Dictaphone;
