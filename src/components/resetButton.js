import { Button } from '@chakra-ui/react';

const ResetBoxes = ({
  text,
  translation,
  setText,
  setTranslation,
  isSpeaking,
  selectedFile,
}) => {
  const handleResetBoxes = () => {
    setText('');
    setTranslation('');
  };
  return (
    <Button
      isDisabled={
        (!text && !translation) || (isSpeaking && !!selectedFile) ? true : false
      }
      onClick={handleResetBoxes}
      colorScheme="red"
      size={'md'}
    >
      Reset Text
    </Button>
  );
};

export default ResetBoxes;
