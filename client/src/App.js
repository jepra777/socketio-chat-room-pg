import { React, Suspense } from 'react'
import { ChakraProvider, CircularProgress } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
   
    <ChakraProvider>
      <Suspense fallback={<CircularProgress isIndeterminate color='green.300' display='flex' justifyContent='center' mt={300} />}>
        <Routes>
            {
              routes.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))
            }
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
