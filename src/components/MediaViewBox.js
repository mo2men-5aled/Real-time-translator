import { useRef } from 'react';

import { HStack, Box, Text } from '@chakra-ui/react';

import VideoPlayer from './VideoPlayer';

const MediaViewBox = ({ selectedFile }) => {
  const mediaRef = useRef(null);
  return (
    <Box width={'full'} mb={'1rem'}>
      {selectedFile && (
        <Box width={'full'} borderWidth="0.1rem" borderRadius="md" padding={8}>
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
            >
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
            </audio>
          ) : (
            <VideoPlayer url={URL.createObjectURL(selectedFile)} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default MediaViewBox;
