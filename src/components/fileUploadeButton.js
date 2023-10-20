import React, { useRef } from 'react';

const FileUpload = ({ accept, multiple, children, handleChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => inputRef.current.click();

  return (
    <div onClick={handleClick}>
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
    </div>
  );
};

export default FileUpload;
