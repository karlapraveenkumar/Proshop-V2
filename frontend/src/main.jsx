import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App.jsx'
import HomeSecreen from './screens/HomeSecreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true } path='/' element={<HomeSecreen/>} />
      <Route path='/product/:id' element={<ProductScreen/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
