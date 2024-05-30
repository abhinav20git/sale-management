import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SaleSummary from './components/SaleSummary.jsx'

const router = createBrowserRouter([
  {
      path: '/',
      element: <App />,
  },
  {
      path: '/sale',
      element: <SaleSummary />,
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
