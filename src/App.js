import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import AddProduct from './pages/products/AddProduct';
import Layout from './layout/Layout';
import Stores from './pages/Stores';
import Catalogue from './pages/Catalogue';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: 'add-product',
        element: <AddProduct/>
      },
      {
        path: 'Stores',
        element: <Stores />
      },
      {
        path: 'Catalogue',
        element: <Catalogue />
      },
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
