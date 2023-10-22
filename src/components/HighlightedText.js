import React from 'react';
import { Text, Highlight, Box } from '@chakra-ui/react';

const HighlightedText = ({ text, highlightWords }) => {
  const colorsList = {
    name: 'blue.400',
    country: 'red.400',
    city: 'green.400',
    animal: 'purple.400',
    place: 'pink.400',
    number: 'yellow.400',
  };

  // Split the input text into chunks of four lines
  const textChunks = text.split('.');
  const chunkSize = 4;
  const chunkedText = [];

  for (let i = 0; i < textChunks.length; i += chunkSize) {
    const chunk = textChunks.slice(i, i + chunkSize);
    chunkedText.push(chunk);
  }

  // Function to highlight words based on the rules
  const highlightText = text => {
    const words = text.split(' ');
    return words.map((word, index) => {
      for (let i = 0; i < highlightWords.labels.length; i++) {
        if (highlightWords.entity[i] === word) {
          const colorLabel = highlightWords.labels[i];
          const color = colorsList[colorLabel];
          console.log(color);
          return (
            <Highlight
              key={word + index + colorLabel + color}
              query={word}
              styles={{
                px: '2',
                py: '0',
                rounded: 'full',
                bg: color,
                margin: '0.1rem',
              }}
            >
              {word}
            </Highlight>
          );
        }
      }
      return word + ' ';
    });
  };

  return !text ? (
    <Box
      padding={4}
      borderWidth="0.1rem"
      borderRadius="md"
      width={'full'}
      color={'gray.500'}
    >
      <Text fontWeight={'bold'} textAlign={'center'} padding={'5.62rem'}>
        Translated text will be displayed in this section
      </Text>
    </Box>
  ) : (
    <Box width="full" placeholder="hi">
      {chunkedText.map((chunk, index) => (
        <Box
          key={index}
          padding={4}
          borderWidth="0.1rem"
          borderRadius="md"
          width={'full'}
          marginBottom={'1rem'}
        >
          <Box width="100%">
            {chunk.map((phrase, phraseIndex) => (
              <Text
                lineHeight={'tall'}
                key={phraseIndex}
                style={{ marginLeft: `${phraseIndex * 1.5}rem` }}
              >
                {highlightText(phrase)}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HighlightedText;
