import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Header = () => {
  return (
    <Flex
      p={2}
      justifyContent="center"
      alignItems="center"
      borderWidth="0.1rem"
    >
      <ColorModeSwitcher position="absolute" right="1rem" />
      <Text fontWeight={'bold'} fontSize={'1.5rem'}>
        Real-time Translator
      </Text>
    </Flex>
  );
};

export default Header;
