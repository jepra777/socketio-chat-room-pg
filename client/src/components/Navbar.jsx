import { useState, useEffect, useContext } from 'react'
import { Flex, Button, IconButton, HStack, VStack, Text, Heading } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AtSignIcon, AddIcon, ChatIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import {MainContext} from '../helpers/mainContext'
import {SocketContext} from '../helpers/socketContext'

export default function Navbar() {
    const [display, changeDisplay] = useState('none')
    const {room, setRoom} = useContext(MainContext)
    const socket = useContext(SocketContext)
    const removeAccessToken = () => {
        window.localStorage.clear();
    } 

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3001/v1/chat/room/', {
            credentials: "include",
        })
      .then((data) => data.json())
      .then((data) => setRoom(data.Room))
      .catch((err) => console.log(err));
    }, [])
   
    const handleClick = () => {
        socket.emit('login', {room}, error => {
            navigate('/chat')
        })
   }

   const handleClickAdmin = () => {
    navigate('/rooms')
}

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

                        {((localStorage.getItem("role") === null)) &&
                        <Link to="/register">
                         <Button colorScheme='gray' leftIcon={<AtSignIcon />}>
                             Register
                         </Button>
                        </Link>
                        }

                        {((localStorage.getItem("role") === null)) &&
                        <Link to="/login">
                        <Button colorScheme='gray' leftIcon={<AddIcon />}>
                            Log In
                        </Button>
                        </Link>
                        }

                        {((localStorage.getItem("role") === "user") || (localStorage.getItem("role") === "admin") || (localStorage.getItem("role") === "superAdmin")) &&
                         <Link to="/chat">
                         <Button 
                            colorScheme='gray' 
                            leftIcon={<ChatIcon />}
                            onClick={handleClick}
                        >
                             Chat
                         </Button>
                         </Link>
                        }

                        {((localStorage.getItem("role") === "user") || (localStorage.getItem("role") === "admin") || (localStorage.getItem("role") === "superAdmin")) &&
                         <Button 
                            colorScheme='gray' 
                            leftIcon={<ChatIcon />}
                            onClick={handleClickAdmin}
                        >
                             Chat Admin
                         </Button>
                        }

                        {((localStorage.getItem("role") === "user") || (localStorage.getItem("role") === "admin") || (localStorage.getItem("role") === "superAdmin")) &&
                         <Button 
                            colorScheme='gray' 
                            leftIcon={<CloseIcon />}
                            onClick={ () => {removeAccessToken(); navigate("/")} }
                         >
                             Sign Out
                         </Button>
                        }
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

                        {((localStorage.getItem("role") === null)) &&
                        <Link to="/register">
                         <Button colorScheme='gray' leftIcon={<AtSignIcon />}>
                             Register
                         </Button>
                        </Link>
                        }

                        {((localStorage.getItem("role") === null)) &&
                        <Link to="/login">
                        <Button colorScheme='gray' leftIcon={<AddIcon />}>
                            Log In
                        </Button>
                        </Link>
                        }

                        {((localStorage.getItem("role") === "user") || (localStorage.getItem("role") === "admin") || (localStorage.getItem("role") === "superAdmin")) &&
                         <Link to="/chat">
                         <Button colorScheme='gray' leftIcon={<ChatIcon />}>
                             Chat
                         </Button>
                         </Link>
                        }

                        {((localStorage.getItem("role") === "user") || (localStorage.getItem("role") === "admin") || (localStorage.getItem("role") === "superAdmin")) &&
                         <Button 
                            colorScheme='gray' 
                            leftIcon={<CloseIcon />}
                            onClick={ () => {removeAccessToken(); navigate("/")} }
                         >
                             Sign Out
                         </Button>
                        }
                    </VStack>
            </Flex>
       </Flex>
       </>
    )
}