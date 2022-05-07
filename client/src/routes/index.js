import React from 'react'

const Home = React.lazy(() => import('../pages/Home'))
const Register = React.lazy(() => import('../pages/Register'))
const Login = React.lazy(() => import('../pages/Login'))

const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login />}
]

export default routes