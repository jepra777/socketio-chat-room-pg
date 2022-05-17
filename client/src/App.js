import { React, Suspense } from 'react'
import { ChakraProvider, CircularProgress } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'
import { MainProvider } from './helpers/mainContext';
import { UsersProvider } from './helpers/usersContext';
import { SocketProvider } from './helpers/socketContext';

function App() {
  return (
   
    <ChakraProvider>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Suspense fallback={<CircularProgress isIndeterminate color='green.300' display='flex' justifyContent='center' mt={300} />}>
              <Routes>
                  {
                    routes.map((route, index) => (
                      <Route path={route.path} element={route.element} key={index} />
                    ))
                  }
              </Routes>
            </Suspense>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
