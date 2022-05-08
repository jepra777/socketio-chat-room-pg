import Navbar from "../components/Navbar"
import { Flex, Center, Text, Box, Heading, Input, InputGroup, InputRightElement, InputLeftElement, Button } from "@chakra-ui/react"
import { EmailIcon, AtSignIcon, LockIcon, ChevronRightIcon } from "@chakra-ui/icons"
import React from "react"
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

export default function Register() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            Username: '',
            Email: '',
            Password: ''
        },
        onSubmit: values => {
            fetch('http://localhost:3001/v1/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify(values),
            })
            .then((response) => {
            return response.json();
            })
            .then(() => {
            navigate("/login");
            })
            .catch((err) => {
            console.log(err);
            });
        },
    })

    return (
        <>
        {/* Navbar - Start */}
        <Navbar />
        {/* Navbar - End */}
        {/* Register Content - Start */}
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="80vh"
            px={8}
            mb={16}
        >
            <form onSubmit={formik.handleSubmit}>
            <Center>
                <Box as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
                    <Heading size='md' my='2'>
                        <Text fontSize="xl">Join Cakap.io</Text>
                    </Heading>

                    <Text>
                        The Modern Lightweight Chat Room
                    </Text>
                    
                    <InputGroup size='md' my='4'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<AtSignIcon color='gray.300' />}
                    />
                    <Input 
                        variant='outline' 
                        placeholder='Username' 
                        id='Username'
                        name='Username'
                        value={formik.values.Username}
                        onChange={formik.handleChange}
                    />
                    </InputGroup>

                    <InputGroup size='md' my='4'>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<EmailIcon color='gray.300' />}
                    />
                    <Input 
                        variant='outline' 
                        placeholder='Email' 
                        id='Email'
                        name='Email'
                        value={formik.values.Email}
                        onChange={formik.handleChange}
                    />
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
                        id='Password'
                        name='Password'
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    
                    <Button 
                        colorScheme='gray' 
                        leftIcon={<ChevronRightIcon />}
                        type="submit"
                    >
                        Join
                    </Button>
                </Box>
            </Center>
            </form>
        </Flex>
        {/* Register Content - End */}
        </>
    )
}