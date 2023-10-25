import { Icon, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

const AudioStreamComponent = ({
  websocket,
  text,
  setText,
  fromLanguage,
  toLanguage,
  selectedFile,
  setIsSpeaking,
  setTranslation,
  setTranslationHighlightWords,
  setSpeechHighlightWords,
}) => {
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    const createAndSendAudioChunk = () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.requestData(); // Get the latest audio chunk
      }
    };

    setInterval(createAndSendAudioChunk, 2000);
  }, [mediaRecorder]);

  const startAudioStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        if (websocket && websocket.readyState === WebSocket.OPEN) {
          websocket.send(audioBlob);
          websocket.onmessage = e => {
            const data = JSON.parse(e.data);
            setText(data.text);
            setTranslation(data.translation);
            setTranslationHighlightWords(data.highlightWords);
            setSpeechHighlightWords(data.speechHighlitedWords);
          };
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());

        setAudioStream(null);
        setMediaRecorder(null);
      };

      recorder.start();

      setAudioStream(stream);
      setMediaRecorder(recorder);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const stopAudioStream = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <Button
      isDisabled={
        fromLanguage && toLanguage && !(text || selectedFile) ? false : true
      }
      size={'md'}
      colorScheme={audioStream ? 'red' : 'blue'}
      onClick={audioStream ? stopAudioStream : startAudioStream}
      leftIcon={<Icon as={audioStream ? BsFillMicMuteFill : BsFillMicFill} />}
    >
      {audioStream ? 'Stop' : 'Start'} Speaking
    </Button>
  );
};

export default AudioStreamComponent;
