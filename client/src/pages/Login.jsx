import Navbar from "../components/Navbar"
import { Flex, Center, Text, Box, Heading, Input, InputGroup, InputRightElement, InputLeftElement, Button } from "@chakra-ui/react"
import { AtSignIcon, LockIcon, ChevronRightIcon } from "@chakra-ui/icons"
import React from "react"

export default function Login() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
        {/* Navbar - Start */}
        <Navbar />
        {/* Navbar - End */}
        {/* Log In Content - Start */}
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="80vh"
            px={8}
            mb={16}
        >
            <Center>
                <Box as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
                    <Heading size='md' my='2'>
                        <Text fontSize="xl">Hi, Welcome Back!</Text>
                    </Heading>

                    <Text>
                        In Modern Lightweight Chat Room
                    </Text>
                    
                    <InputGroup size='md' my='4'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<AtSignIcon color='gray.300' />}
                    />
                    <Input variant='outline' placeholder='Username or Email' />
                    </InputGroup>
                    
                    <InputGroup size='md' my='4'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<LockIcon color='gray.300' />}
                    />
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    
                    <Button colorScheme='gray' leftIcon={<ChevronRightIcon />}>
                        Log In
                    </Button>
                </Box>
            </Center>
        </Flex>
        {/* Log In Content - End */}
        </>
    )
}