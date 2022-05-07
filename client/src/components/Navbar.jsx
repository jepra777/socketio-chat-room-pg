import { useState } from 'react'
import { Flex, Button, IconButton, HStack, VStack, Text, Heading } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AtSignIcon, AddIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const [display, changeDisplay] = useState('none')
    return (
       <>
       <Flex>
           <Flex
            ml={10}
            mt={6}
           >
               <Heading size='md' my='2'>
                    <Text fontSize="xl">Cakap.io</Text>
                </Heading>
           </Flex>
           <Flex
            pos="fixed"
            top="1rem"
            right="1rem"
           >
               <Flex 
                display={['none', 'none', 'flex', 'flex']}
               >
                    <HStack>
                        <Link to="/">
                            <Button colorScheme='gray' leftIcon={<HamburgerIcon />}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button colorScheme='gray' leftIcon={<AtSignIcon />}>
                                Register
                            </Button>
                        </Link>
                        <Link to="/login">
                        <Button colorScheme='gray' leftIcon={<AddIcon />}>
                            Log In
                        </Button>
                        </Link>
                    </HStack>
               </Flex>
               <IconButton 
                aria-label="Open Menu"
                size="lg"
                mr={2}
                icon={<HamburgerIcon />}
                display={['flex', 'flex', 'none', 'none']}
                onClick={ () => changeDisplay('flex')}
               />
           </Flex>
       </Flex>
       <Flex
        w="100vw"
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
       >
            <Flex justify="flex-end">
                <IconButton 
                    top="1rem"
                    right="1rem"
                    mr={2}
                    aria-label="Close Menu"
                    size="lg"
                    icon={
                        <CloseIcon />
                    }
                    onClick={ () => changeDisplay('none')}
                />
            </Flex>
            <Flex
                flexDir="column"
                align="center"
                mt={10}
            >
                    <VStack>
                        <Link to="/">
                            <Button colorScheme='gray' leftIcon={<HamburgerIcon />}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button colorScheme='gray' leftIcon={<AtSignIcon />}>
                                Register
                            </Button>
                        </Link>
                        <Link to="/login">
                        <Button colorScheme='gray' leftIcon={<AddIcon />}>
                            Login
                        </Button>
                        </Link>
                    </VStack>
            </Flex>
       </Flex>
       </>
    )
}