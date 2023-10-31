import { Box, VStack, Text, Flex } from '@chakra-ui/react';

import HighlightedText from './HighlightedText';

const TranslationBoxes = ({
  text,
  translation,
  translationHighlightWords,
  speechHighlightWords,
  fromLanguage,
  toLanguage,
}) => {
  // const handleInputChange = e => {
  //   setText(e.target.value);
  // };

  return (
    <Box width={'full'}>
      <Flex width={'full'} gap={4}>
        {/* <VStack width={'50%'} spacing={4}>
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
            disabled={fromLanguage === '' ? true : false}
            textAlign={fromLanguage === 'ar-EG' ? 'right' : 'left'}
          />
        </VStack> */}

        <VStack spacing={4} width={'50%'}>
          <Text fontWeight="bold" fontSize={'lg'}>
            Original Text
          </Text>
          <HighlightedText
            text={text}
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
            text={translation}
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
