import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';

import LnaguageSelectors from '../components/languageSelectors';
import Dictaphone from '../components/voiceInput';
import ControlPanel from '../components/ControlPanel';
import TranslationBoxes from '../components/translationBoxes';
import MediaViewBox from '../components/MediaViewBox';

const TranslationPage = () => {
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [translation, setTranslation] = useState('');

  const [websocket, setWebsocket] = useState(null);

  return (
    <Box width={'full'}>
      <LnaguageSelectors
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
        isSpeaking={isSpeaking}
      />
      <HStack mt={'1rem'} mb={'2rem'} width={'full'}>
        <Dictaphone
          text={text}
          setText={setText}
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          selectedFile={selectedFile}
          setIsSpeaking={setIsSpeaking}
          setTranslation={setTranslation}
        />
        <ControlPanel
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          text={text}
          setTranslation={setTranslation}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          isSpeaking={isSpeaking}
          websocket={websocket}
          setWebsocket={setWebsocket}
        />
      </HStack>
      <MediaViewBox selectedFile={selectedFile} />
      <TranslationBoxes
        text={text}
        setText={setText}
        translation={translation}
      />
    </Box>
  );
};

export default TranslationPage;
