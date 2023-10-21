import './styles/main.scss';

import { ChakraProvider, Container, theme } from '@chakra-ui/react';

import Header from './components/Header';
import TranslationPage from './pages/translationPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <Container maxW="7xl" centerContent padding={4} position="relative">
        <TranslationPage />
      </Container>
    </ChakraProvider>
  );
}

export default App;
