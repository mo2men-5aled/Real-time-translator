import { useState } from 'react';
import { Box, VStack, Text, Flex, Highlight } from '@chakra-ui/react';

import LanguageSelector from './ControlPanel';

const MAX_PHRASES = 4;

const TranslationBox = ({ translation }) => {
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');

  const [text, setText] = useState('');
  // Split the translation into phrases
  const textPhrases = text.split('. '); // Assuming that periods represent the end of a phrase
  const translationPhrases = translation.split('. ');

  const textBoxes = [];
  const translationBoxes = [];

  const HilightWords = ['momen', 'contains ', 'Lorem', 'phrases', '112', '150'];

  for (let i = 0; i < textPhrases.length; i += MAX_PHRASES) {
    const textChunk = textPhrases.slice(i, i + MAX_PHRASES);
    textChunk.length && textBoxes.push(textChunk);
  }

  for (let i = 0; i < translationPhrases.length; i += MAX_PHRASES) {
    const translationChunk = translationPhrases.slice(i, i + MAX_PHRASES);
    translationChunk.length && translationBoxes.push(translationChunk);
  }

  return (
    <Box width={'full'}>
      <LanguageSelector
        setText={setText}
        text={text}
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
      />
      <Flex width={'full'} gap={4}>
        <VStack width={'full'} spacing={4}>
          {textBoxes.map((textChunk, index) => (
            <Box
              key={index}
              padding={4}
              borderWidth="0.1rem"
              borderRadius="md"
              mr={2} // Margin to separate the boxes
              width={'full'}
            >
              <Text fontWeight="bold">
                {index === 0 ? 'Original Text:' : ''}
              </Text>
              <Box width="100%">
                {textChunk.map((phrase, phraseIndex) => (
                  <Text
                    lineHeight={'tall'}
                    key={phraseIndex}
                    style={{ marginLeft: `${phraseIndex * 1}rem` }}
                  >
                    <Highlight
                      query={HilightWords}
                      styles={{
                        px: '2',
                        py: '1',
                        rounded: 'full',
                        bg: 'red.100',
                      }}
                    >
                      {phrase}
                    </Highlight>
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
        </VStack>

        <VStack spacing={4} width={'full'}>
          {translationBoxes.map((translationChunk, index) => (
            <Box
              key={index}
              padding={4}
              borderWidth="0.1rem"
              borderRadius="md"
              width={'full'}
            >
              <Text fontWeight="bold">{index === 0 ? 'Translation:' : ''}</Text>
              <Box width="100%">
                {translationChunk.map((phrase, phraseIndex) => (
                  <Text
                    lineHeight={'tall'}
                    key={phraseIndex}
                    style={{ marginLeft: `${phraseIndex * 1}rem` }}
                  >
                    <Highlight
                      query={HilightWords}
                      styles={{
                        px: '2',
                        py: '1',
                        rounded: 'full',
                        bg: 'red.100',
                      }}
                    >
                      {phrase}
                    </Highlight>
                  </Text>
                ))}
              </Box>
            </Box>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default TranslationBox;
