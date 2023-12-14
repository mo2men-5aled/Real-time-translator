import { useEffect, useState } from 'react';
import { Box, Wrap, WrapItem, Button } from '@chakra-ui/react';

import LnaguageSelectors from '../components/languageSelectors';
import Dictaphone from '../components/voiceInput';

import ControlPanel from '../components/ControlPanel';
import TranslationBoxes from '../components/translationBoxes';
import MediaViewBox from '../components/MediaViewBox';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const TranslationPage = () => {
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [translation, setTranslation] = useState('');
  const [translationHighlightWords, setTranslationHighlightWords] =
    useState(null);
  const [speechHighlightWords, setSpeechHighlightWords] = useState(null);

  const [websocket, setWebsocket] = useState(null);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      // Check if the transcript contains a complete sentence
      if (
        transcript.endsWith('.') ||
        transcript.endsWith('!') ||
        transcript.endsWith('?')
      ) {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
          websocket.send(
            JSON.stringify({
              transcript: transcript,
              fromLanguage,
              toLanguage,
            })
          );

          // handle the response
          websocket.onmessage = event => {
            const data = JSON.parse(event.data);
            setTranslation(data.translation);
            setTranslationHighlightWords(data.translationHighlightedWords);
            setSpeechHighlightWords(data.transcriptionHighlightedWords);
          };
        }
      }
    } else {
      if (transcript)
        websocket.send(
          JSON.stringify({
            transcript: transcript,
            fromLanguage,
            toLanguage,
          })
        );
    }
  }, [listening, transcript, fromLanguage, toLanguage, websocket]);

  return (
    <Box width={'full'}>
      <LnaguageSelectors
        setFromLanguage={setFromLanguage}
        setToLanguage={setToLanguage}
        fromLanguage={fromLanguage}
        toLanguage={toLanguage}
        listening={listening}
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
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            SpeechRecognition={SpeechRecognition}
            listening={listening}
            transcript={transcript}
            resetTranscript={resetTranscript}
            browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
          />
        </WrapItem>
        <WrapItem>
          <Button
            isDisabled={
              fromLanguage && toLanguage && transcript && !listening
                ? false
                : true
            }
            size={'md'}
            colorScheme={'red'}
            onClick={() => {
              resetTranscript();
              setTranslation('');
              setTranslationHighlightWords(null);
              setSpeechHighlightWords(null);
            }}
          >
            Reset
          </Button>
        </WrapItem>

        <WrapItem>
          <ControlPanel
            fromLanguage={fromLanguage}
            toLanguage={toLanguage}
            setTranslation={setTranslation}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            listening={listening}
            websocket={websocket}
            setWebsocket={setWebsocket}
            setTranslationHighlightWords={setTranslationHighlightWords}
            setSpeechHighlightWords={setSpeechHighlightWords}
          />
        </WrapItem>
      </Wrap>
      <MediaViewBox
        selectedFile={selectedFile}
        fromLanguage={fromLanguage}
        useSpeechRecognition={useSpeechRecognition}
        SpeechRecognition={SpeechRecognition}
        listening={listening}
      />
      <TranslationBoxes
        transcript={transcript}
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
