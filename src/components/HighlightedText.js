import React from 'react';
import { Text, Highlight, Box } from '@chakra-ui/react';

const HighlightedText = ({
  text,
  highlightWords,
  fromLanguage,
  discription,
}) => {
  // Function to calculate luminance of an RGB color
  function getLuminance(rgbColor) {
    const [r, g, b] = rgbColor.match(/\d+/g);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const uniqueLabels = [...new Set(highlightWords.label)]; // Get unique labels

  const colorsList = {}; // Object to store data for each label

  uniqueLabels.forEach(label => {
    // Generate a random color in RGB format
    const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;

    // Calculate the luminance of the background color
    const luminance = getLuminance(color);

    // Determine text color based on luminance
    const textColor = luminance > 0.5 ? 'black' : 'white';

    colorsList[label] = {
      background: color,
      text: textColor,
    };
  });
  // Split the input text into chunks of four lines
  const textChunks = text.split(/[.!?]+/);

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
      for (let i = 0; i < highlightWords.label.length; i++) {
        if (highlightWords.entity[i] === word) {
          const colorLabel = highlightWords.label[i];
          const color = colorsList[colorLabel].background;
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
                color: colorsList[colorLabel].text,
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
      <Text
        fontWeight={'bold'}
        textAlign={'center'}
        pt={'4rem'}
        pb={'4rem'}
        ps={'2rem'}
        pe={'2rem'}
        lineHeight={'tall'}
      >
        {discription}
      </Text>
    </Box>
  ) : (
    <Box width="full" textAlign={fromLanguage === 'ar' ? 'right' : 'left'}>
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
                style={
                  fromLanguage === 'ar'
                    ? { marginRight: `${phraseIndex * 1.5}rem` }
                    : { marginLeft: `${phraseIndex * 1.5}rem` }
                }
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
