import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { Button, HStack, Icon } from '@chakra-ui/react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import { CgPlayListRemove } from 'react-icons/cg';

const Dictaphone = ({
  text,
  setText,
  fromLanguage,
  toLanguage,
  selectedFile,
  setIsSpeaking,
  setTranslation,
}) => {
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
    setIsSpeaking(true);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setIsSpeaking(false);
  };

  const handleResetText = () => {
    resetTranscript();
    setText('');
    setTranslation('');
  };

  if (listening) {
    setText(transcript);
  }

  return (
    <HStack width={'full'}>
      <Button
        isDisabled={fromLanguage && toLanguage && !selectedFile ? false : true}
        onClick={listening ? handleStopListening : handleStartListenign}
        colorScheme={listening ? 'blue' : 'teal'}
        leftIcon={<Icon as={listening ? BsFillMicMuteFill : BsFillMicFill} />}
        size="sm"
        width={'full'}
      >
        {listening ? 'Stop' : 'Start'}
      </Button>

      <Button
        isDisabled={listening || (!transcript && !text) ? true : false}
        onClick={handleResetText}
        colorScheme="red"
        // leftIcon={<Icon as={CgPlayListRemove} />}
        size="sm"
        width={'full'}
      >
        Remove Text
      </Button>
    </HStack>
  );
};
export default Dictaphone;
