import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, handlePause, handlePlay }) => {
  return (
    <Box width={'full'} position={'relative'} borderRadius={'lg'}>
      <ReactPlayer
        url={url}
        controls={true}
        playing={false} // Set to true to auto-play
        width="100%"
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </Box>
  );
};

export default VideoPlayer;
