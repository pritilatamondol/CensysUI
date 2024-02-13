import { createBrowserRouter } from "react-router-dom";
import  App  from '../../src/App';
import ProductList from '../components/ProductList'
import Product from '../components/Product'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/addProduct",
    element: <Product />,
  },
]);
export default router;
