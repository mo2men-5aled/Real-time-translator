import { useState } from 'react';
import { Box, VStack, Text, Flex, Textarea } from '@chakra-ui/react';

import HighlightedText from './HighlightedText';

import ControlPanel from './ControlPanel';

const TranslationBox = () => {
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');

  const handleInputChange = e => {
    setText(e.target.value);
    setTranslation(e.target.value);
  };

  return (
    <Box width={'full'}>
      <ControlPanel
        text={text}
        setText={setText}
        translation={translation}
        setTranslation={setTranslation}
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
      />
      <Flex width={'full'} gap={4}>
        <VStack width={'50%'} spacing={4}>
          <Text fontWeight="bold" fontSize={'lg'}>
            Original Text
          </Text>
          <Textarea
            width={'full'}
            value={text}
            onChange={handleInputChange}
            placeholder="Enter text here"
            resize="vertical"
            rows={10}
          />
        </VStack>

        <VStack spacing={4} width={'50%'}>
          <Text fontWeight="bold" fontSize={'lg'}>
            Translation
          </Text>
          <HighlightedText text={translation} />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TranslationBox;
