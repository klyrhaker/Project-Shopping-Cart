import CartPage from "./components/CartPage/CartPage";
import Layout from "./components/Layout/Layout";
import Shop from "./components/Shop/Shop";
import HomePage from "./components/HomePage/HomePage";
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
];
export default routes;
