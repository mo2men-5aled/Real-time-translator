import { useState } from 'react';
import { Box, Wrap, WrapItem } from '@chakra-ui/react';

import LnaguageSelectors from '../components/languageSelectors';
import Dictaphone from '../components/voiceInput';
import ResetBoxes from '../components/resetButton';

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
  const [translationHighlightWords, setTranslationHighlightWords] = useState(
    {}
  );
  const [speechHighlightWords, setSpeechHighlightWords] = useState({});

  const [websocket, setWebsocket] = useState(null);

  return (
    <Box width={'full'}>
      <LnaguageSelectors
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
        isSpeaking={isSpeaking}
      />
      <Wrap
        justify="center"
        mt={'1rem'}
        mb={'2rem'}
        spacing="1rem"
        width={'full'}
      >
        <WrapItem>
          <Dictaphone
            text={text}
            setText={setText}
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            selectedFile={selectedFile}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
            setTranslation={setTranslation}
            websocket={websocket}
            setTranslationHighlightWords={setTranslationHighlightWords}
            setSpeechHighlightWords={setSpeechHighlightWords}
          />
        </WrapItem>

        <WrapItem>
          <ResetBoxes
            setText={setText}
            setTranslation={setTranslation}
            selectedFile={selectedFile}
            isSpeaking={isSpeaking}
            text={text}
            translation={translation}
          />
        </WrapItem>
        <WrapItem>
          <ControlPanel
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            text={text}
            setText={setText}
            setTranslation={setTranslation}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            isSpeaking={isSpeaking}
            websocket={websocket}
            setWebsocket={setWebsocket}
            setTranslationHighlightWords={setTranslationHighlightWords}
            setSpeechHighlightWords={setSpeechHighlightWords}
          />
        </WrapItem>
      </Wrap>
      <MediaViewBox selectedFile={selectedFile} />
      <TranslationBoxes
        text={text}
        setText={setText}
        translation={translation}
        translationHighlightWords={translationHighlightWords}
        speechHighlightWords={speechHighlightWords}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
      />
    </Box>
  );
};

export default TranslationPage;
