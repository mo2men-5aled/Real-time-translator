import { HStack, Select, Icon } from '@chakra-ui/react';

import { BsArrowRight } from 'react-icons/bs';

const LnaguageSelectors = ({
  setFromLanguage,
  setToLanguage,
  fromLanguage,
  toLanguage,
  isSpeaking,
}) => {
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    {
      value: 'ar',
      label: 'Arabic',
    },
    {
      value: 'it',
      label: 'Italian',
    },
  ];

  return (
    <HStack width={'full'} pt={'1rem'} pb={'1rem'}>
      <Select
        isDisabled={isSpeaking ? true : false}
        placeholder="Translate from"
        onChange={e => setFromLanguage(e.target.value)}
      >
        {languageOptions.map(option => {
          if (toLanguage === option.value) {
            return null;
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </Select>
      <Icon as={BsArrowRight} color="gray.500" viewBox="0 0 100% 4" />

      <Select
        isDisabled={isSpeaking ? true : false}
        placeholder="Translate to"
        onChange={e => setToLanguage(e.target.value)}
      >
        {languageOptions.map(option => {
          if (fromLanguage === option.value) {
            return null;
          } else {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          }
        })}
      </Select>
    </HStack>
  );
};

export default LnaguageSelectors;
