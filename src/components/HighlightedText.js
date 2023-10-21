import React from 'react';
import { Box, Text, Highlight } from '@chakra-ui/react';

const HighlightedText = ({ text, highlights, colors }) => {
  const words = text.split(' '); // Split the text into words using word boundaries
  const entities = Object.keys(highlights);

  entities.map((entity, index) => {
    words.map((word, wordIndex) => {
      if (word.includes(entity)) {
        words[wordIndex] = (
          <Highlight
            key={wordIndex}
            fontWeight="bold"
            color={colors[entity]}
            _hover={{ backgroundColor: '#f5f8fa' }}
          >
            {word}
          </Highlight>
        );
      }
    });
  });

  return <Text>{words}</Text>;
};

export default HighlightedText;
