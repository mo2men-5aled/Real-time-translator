import { Box } from '@chakra-ui/react';

const FileUpload = ({ accept, multiple, children, handleChange, inputRef }) => {
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
