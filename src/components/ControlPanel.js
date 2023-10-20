import { HStack, Select, Box, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import VoiceStreamer from './voiceInput';

const ControlPanel = ({
  fromLanguage,
  toLanguage,
  setFromLanguage,
  setToLanguage,
  setText,
  text,
}) => {
  const languageOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'es-US', label: 'Spanish' },
    {
      value: 'ar-EG',
      label: 'Arabic',
    },

    // Add more language options here
  ];

  const data = {
    from: fromLanguage,
    to: toLanguage,
    text: text,
  };
  const handleTranslation = () => {
    console.log(data);
  };
  return (
    <Box width={'full'} marginBottom={'1rem'}>
      <HStack spacing={4}>
        <HStack>
          <VoiceStreamer
            setText={setText}
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
          />
          <Button
            isDisabled={fromLanguage && toLanguage && text ? false : true}
            onClick={handleTranslation}
            colorScheme="yellow"
          >
            translate
          </Button>
        </HStack>
        <Select
          placeholder="Translate from"
          onChange={e => setFromLanguage(e.target.value)}
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronRightIcon />
        <Select
          placeholder="Translate to"
          onChange={e => setToLanguage(e.target.value)}
        >
          {languageOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </HStack>
    </Box>
  );
};

export default ControlPanel;
