import React, { useRef } from 'react';
import { HStack, Box, Text } from '@chakra-ui/react';
const MediaViewBox = React.memo(
  ({ selectedFile, fromLanguage, SpeechRecognition, listening }) => {
    const mediaRef = useRef(null);

    const handlePlay = () => {
      // Start speech recognition when the video begins playing
      if (!listening) {
        SpeechRecognition.startListening({
          continuous: true,
          language: fromLanguage, // Set the appropriate language
        });
      }
    };

    const handlePause = () => {
      // Stop speech recognition when the video is paused
      if (listening) {
        SpeechRecognition.stopListening();
      }
    };

    return (
      <Box width={'full'} mb={'1rem'}>
        {selectedFile && (
          <Box
            width={'full'}
            borderWidth="0.1rem"
            borderRadius="md"
            padding={8}
          >
            <HStack
              width={'full'}
              justifyContent={'center'}
              alignItems={'center'}
              marginBottom={'1rem'}
              padding={8}
            >
              <Text
                fontWeight="bold"
                fontSize={'lg'}
                textAlign={'center'}
                width={'full'}
              >
                Selected File:
              </Text>
              <Text
                width={'full'}
                fontWeight="bold"
                fontSize={'lg'}
                textAlign={'center'}
                color={'blue.400'}
              >
                {' '}
                {selectedFile.name}
              </Text>
            </HStack>

            {selectedFile.type.startsWith('audio/') ? (
              <audio
                ref={mediaRef}
                controls
                style={{
                  width: '100%',
                }}
                onPlay={handlePlay}
                onPause={handlePause}
              >
                <source
                  src={URL.createObjectURL(selectedFile)}
                  type={selectedFile.type}
                />
              </audio>
            ) : (
              <Box width={'full'} position={'relative'} borderRadius={'lg'}>
                <video
                  ref={mediaRef}
                  controls
                  style={{
                    width: '100%',
                  }}
                  onPlay={handlePlay}
                  onPause={handlePause}
                >
                  <source
                    src={URL.createObjectURL(selectedFile)}
                    type={selectedFile.type}
                  />
                </video>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }
);

export default MediaViewBox;
