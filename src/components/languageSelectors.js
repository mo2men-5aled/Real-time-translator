import { HStack, Select, Icon } from '@chakra-ui/react';

import { BsArrowRight } from 'react-icons/bs';

const LnaguageSelectors = ({ setFromLanguage, setToLanguage, isSpeaking }) => {
  const languageOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'es-US', label: 'Spanish' },
    {
      value: 'ar-EG',
      label: 'Arabic',
    },

    // Add more language options here
  ];
  return (
    <HStack width={'full'}>
      <Select
        isDisabled={isSpeaking ? true : false}
        placeholder="Translate from"
        onChange={e => setFromLanguage(e.target.value)}
      >
        {languageOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Icon as={BsArrowRight} color="gray.500" viewBox="0 0 100% 4" />

      <Select
        isDisabled={isSpeaking ? true : false}
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
  );
};

export default LnaguageSelectors;
