import Navbar from "../components/Navbar"
import { Flex, Center, Text } from "@chakra-ui/react"

export default function Home() {
    return (
        <>
        {/* Navbar - Start */}
        <Navbar />
        {/* Navbar - End */}
        {/* Home Content - Start */}
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
                <Text fontSize='xl'>
                    Chat with Room using SocketIO, ReactJS and Postgres JavaScript
                </Text>
            </Center>
        </Flex>
        {/* Home Content - End */}
        </>
    )
}