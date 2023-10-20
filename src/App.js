import './styles/main.scss';

import { ChakraProvider, Container, theme } from '@chakra-ui/react';

import Header from './components/Header';
import TranslationBox from './components/mainApp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <Container maxW="7xl" centerContent padding={4} position="relative">
        <TranslationBox
          text=" It contains multiple phrases separated by periods. Each phrase represents a separate unit of meaning. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.This is a sample paragraph. It contains multiple phrases separated by periods. Each phrase represents a separate unit of meaning. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.This is a sample paragraph. It contains multiple phrases separated by periods. Each phrase represents a separate unit of meaning. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.This is a sample paragraph. It contains multiple phrases separated by periods. Each phrase represents a separate unit of meaning. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. asdakdasdasdasdasd asd . hi my name is momen khaled and i am from Egypt, I live in Minya and i was porn on maghagha city. i have graduated in the precious july in the day 27 was the ceremonyi have studied BioInformatics in the fuclty of compunter science and information tecknology "
          translation="Ceci est un paragraphe d'exemple. Il contient plusieurs phrases séparées par 112 des points. Chaque 150 phrase représente une unité de sens distincte. Le renard brun rapide saute par-dessus le chien paresseux. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ceci est un paragraphe d'exemple. Il contient plusieurs phrases séparées par des points. Chaque phrase représente une unité de sens distincte. Le renard brun rapide saute par-dessus le chien paresseux. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Ceci est un paragraphe d'exemple. Il contient plusieurs phrases séparées par des points. Chaque phrase représente une unité de sens distincte. Le renard brun rapide saute par-dessus le chien paresseux. Lorem ipsum dolor sit amet, consectetur adipiscing elit. The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
