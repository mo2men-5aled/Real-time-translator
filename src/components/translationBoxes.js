import { Box, VStack, Text, Flex } from '@chakra-ui/react';

import HighlightedText from './HighlightedText';

const TranslationBoxes = ({
  transcript,
  translation,
  translationHighlightWords,
  speechHighlightWords,
  fromLanguage,
  toLanguage,
}) => {
  return (
    <Box width={'full'}>
      <Flex width={'full'} gap={4}>
        <VStack spacing={4} width={'50%'}>
          <Text fontWeight="bold" fontSize={'lg'}>
            Original Text
          </Text>
          <HighlightedText
            text={transcript}
            highlightWords={speechHighlightWords}
            fromLanguage={fromLanguage}
            discription={'your speech will be displayed in this section'}
          />
        </VStack>

        <VStack spacing={4} width={'50%'}>
          <Text fontWeight="bold" fontSize={'lg'}>
            Translation
          </Text>
          <HighlightedText
            text={transcript}
            highlightWords={translationHighlightWords}
            toLanguage={toLanguage}
            discription={'Translated text will be displayed in this section'}
          />
        </VStack>
      </Flex>
    </Box>
  );
};

export default TranslationBoxes;
