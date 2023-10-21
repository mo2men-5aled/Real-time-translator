import { Box } from '@chakra-ui/react';
import React, { useRef } from 'react';

const FileUpload = ({ accept, multiple, children, handleChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current.click();

  return (
    <Box onClick={handleClick}>
      <input
        type="file"
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={e => {
          inputRef.current = e;
        }}
        onChange={handleChange}
      />
      {children}
    </Box>
  );
};

export default FileUpload;
