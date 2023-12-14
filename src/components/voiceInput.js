import { Button, Text, Icon } from '@chakra-ui/react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

const Dictaphone = ({
  fromLanguage,
  toLanguage,
  SpeechRecognition,
  browserSupportsSpeechRecognition,
  listening,
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

  if (!browserSupportsSpeechRecognition) {
    return <Text>Browser doesn't support speech recognition.</Text>;
  }

  return (
    <Button
      isDisabled={fromLanguage && toLanguage ? false : true}
      size={'md'}
      colorScheme={listening ? 'red' : 'blue'}
      onClick={listening ? stopAudioStream : startAudioStream}
      leftIcon={<Icon as={listening ? BsFillMicMuteFill : BsFillMicFill} />}
    >
      {listening ? 'Stop' : 'Start'} Speaking
    </Button>
  );
};

export default Dictaphone;
