import { Icon, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';

const AudioStreamComponent = ({
  websocket,
  setText,
  fromLanguage,
  toLanguage,
  selectedFile,
  isSpeaking,
  setIsSpeaking,
  setTranslation,
  setTranslationHighlightWords,
  setSpeechHighlightWords,
}) => {
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [sendAudioData, setSendAudioData] = useState(false);

  useEffect(() => {
    const createAndSendAudioChunk = () => {
      if (
        mediaRecorder &&
        mediaRecorder.state === 'recording' &&
        sendAudioData
      ) {
        mediaRecorder.requestData(); // Get the latest audio chunk
      }
    };

    let intervalId; // Store the interval ID to clear it when needed

    if (sendAudioData) {
      intervalId = setInterval(createAndSendAudioChunk, 5000);
    } else {
      clearInterval(intervalId); // Clear the interval if not sending audio data
    }

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, [mediaRecorder, isSpeaking, sendAudioData]);

  const startAudioStream = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const recorder = new MediaRecorder(stream);
        const audioChunks = [];

        recorder.ondataavailable = e => {
          if (e.data.size > 0) {
            audioChunks.push(e.data);
          }

          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

          // Convert audioBlob to Base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onload = () => {
            const audioBase64 = reader.result;

            // prepare the data to send to the server
            const data = {
              from: fromLanguage,
              to: toLanguage,
              data: audioBase64,
            };

            if (websocket && websocket.readyState === WebSocket.OPEN) {
              websocket.send(JSON.stringify(data));
              websocket.onmessage = e => {
                const data = JSON.parse(e.data);
                console.log(data);
                setText(data.text);
                setTranslation(data.translation);
                setTranslationHighlightWords(data.highlightedWords);
                setSpeechHighlightWords(data.speechHighlitedWords);
              };
            }
          };
        };

        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());

          setAudioStream(null);
          setMediaRecorder(null);
          setIsSpeaking(false);
        };

        recorder.start();

        setAudioStream(stream);
        setMediaRecorder(recorder);
        setIsSpeaking(true);
        setSendAudioData(true);
      }
    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }

    // check if mediaDevices is available for the browser
  };

  const stopAudioStream = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsSpeaking(false);
      setSendAudioData(false);
    }
  };

  return (
    <Button
      isDisabled={fromLanguage && toLanguage && !selectedFile ? false : true}
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
