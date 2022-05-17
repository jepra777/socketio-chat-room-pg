import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {MainContext} from '../helpers/mainContext'
import {SocketContext} from '../helpers/socketContext'
import {Box, Flex, Heading, IconButton, Text, Menu, Button, MenuButton, MenuList, MenuItem} from "@chakra-ui/react"
import {FiList} from 'react-icons/fi'
import {BiMessageDetail} from 'react-icons/bi'
import {RiSendPlaneFill} from 'react-icons/ri'
import ScrollToBottom from 'react-scroll-to-bottom';
import {useToast} from '@chakra-ui/react'
import {UsersContext} from '../helpers/usersContext'
import './Chat.scss'

const Chat = () => {
    const {name, room, setName, setRoom} = useContext(MainContext)
    const socket = useContext(SocketContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const {users} = useContext(UsersContext)
    const history = useNavigate()
    const toast = useToast()
    

    window.onpopstate = e => logout()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const chatRoom = urlParams.get('room')
    setRoom(chatRoom)

    useEffect(() => {
        fetch('http://localhost:3001/v1/chat/name/', {
            credentials: "include",
        })
      .then((data) => data.json())
      .then((data) => setName(data.Username))
      .catch((err) => console.log(err));
    }, [])

    //Checks to see if there's a user present
    // useEffect(() => {if (!name) return history('/')}, [history, name])

    useEffect(() => {
        socket.on("message", msg => {
            setMessages(messages => [...messages, msg])
        })
        // console.log(messages)

        socket.on("notification", notif => {
            toast({
                position:"top",
                title: notif?.title,
                description: notif?.description,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        })
    }, [socket, toast])
    
    const handleSendMsg = () => {
        const msg = message
        socket.emit('sendMsg', {name, room, msg}, () => setMessage(''))
        setMessage('')
    }

    const logout = () => {
        setName('') 
        setRoom('')
        history('/')
        history(0)
    }

    return (
        <Flex className='room' flexDirection='column' width={{ base: "100%", sm: '575px' }} height={{ base: "100%", sm: "auto" }}>
            <Heading className='heading' as='h4' bg='white' p='1rem 1.5rem' borderRadius='10px 10px 0 0'>
                <Flex alignItems='center' justifyContent='space-between'>
                    <Menu >
                        <MenuButton as={IconButton} icon={<FiList />} isRound='true' bg='blue.300' color='white' />
                        <MenuList>
                            {
                                users && users.map(user => {
                                    return (
                                        <MenuItem minH='40px' key={user.id}>
                                            <Text fontSize='sm'>{user.name}</Text>
                                        </MenuItem>
                                    )
                                })
                            }
                        </MenuList>
                    </Menu>
                    <Flex alignItems='center' flexDirection='column' flex={{ base: "1", sm: "auto" }}>
                        {/* <Heading fontSize='lg'> {room.slice(0, 1).toUpperCase() + room.slice(1)}</Heading> */}
                        <Heading fontSize='lg'> {room.toUpperCase()}</Heading>
                        <Flex alignItems='center'><Text mr='1' fontWeight='400' fontSize='md' opacity='.7' letterSpacing='0' >{name}</Text><Box h={2} w={2} borderRadius='100px' bg='green.300'></Box></Flex>
                    </Flex>
                    <Button color='gray.500' fontSize='sm' onClick={logout}  >Logout</Button>
                </Flex>
            </Heading>


            <ScrollToBottom className='messages' debug={false}>
                {messages.length > 0 ?
                    messages.map((msg, i) =>
                    (<Box key={i} className={`message ${msg.user === name ? "my-message" : ""}`} m=".2rem 0">
                        <Text fontSize='xs' opacity='.7' ml='5px' className='user'>{msg.user}</Text>
                        <Text fontSize='sm' className='msg' p=".4rem .8rem" bg='white' borderRadius='15px' color='white'>{msg.text}</Text>
                    </Box>)
                    )
                    :
                    <Flex alignItems='center' justifyContent='center' mt='.5rem' bg='#EAEAEA' opacity='.2' w='100%'>
                        <Box mr='2'>-----</Box>
                        <BiMessageDetail fontSize='1rem' />
                        <Text ml='1' fontWeight='400'>No messages</Text>
                        <Box ml='2'>-----</Box>
                    </Flex>
                }
               
            </ScrollToBottom>
            <div className='form'>
                <input type="text" placeholder='Enter Message' value={message} onChange={e => setMessage(e.target.value)} />
                <IconButton colorScheme='green' isRound='true' icon={<RiSendPlaneFill />} onClick={handleSendMsg} disabled={message === '' ? true : false}>Send</IconButton>
            </div>
        </Flex>
    )
}

export default Chat