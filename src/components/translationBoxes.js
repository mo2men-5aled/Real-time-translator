import { Box, VStack, Text, Flex, Textarea } from '@chakra-ui/react';

import HighlightedText from './HighlightedText';

const TranslationBoxes = ({ text, setText, translation, highlightWords }) => {
  const handleInputChange = e => {
    setText(e.target.value);
  };

  return (
    <Box width={'full'}>
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
          <HighlightedText text={translation} highlightWords={highlightWords} />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TranslationBoxes;
