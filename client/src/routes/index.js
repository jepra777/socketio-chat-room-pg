import React from 'react'

const Home = React.lazy(() => import('../pages/Home'))
const Register = React.lazy(() => import('../pages/Register'))
const Login = React.lazy(() => import('../pages/Login'))
const Chat = React.lazy(() => import('../pages/Chat'))
const ChatAdmin = React.lazy(() => import('../pages/ChatAdmin'))
const RoomLists = React.lazy(() => import('../pages/RoomLists'))

const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login />},
    { path: '/chat', element: <Chat />},
    { path: '/chatAdmin', element: <ChatAdmin />},
    { path: '/rooms', element: <RoomLists />}
]

export default routes