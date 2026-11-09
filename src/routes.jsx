import CartPage from "./pages/CartPage/CartPage";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop/Shop";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        errorElement: (
          <ErrorMessage message="Что-то пошло не тк. Попробуйте вернуться на главную." />
        ),
        children: [
          { index: true, element: <HomePage /> },
          { path: "shop", element: <Shop /> },
          { path: "cart", element: <CartPage /> },
          {path: "shop/:id", element:
            <ProductPage/>
          },
          {
            path: "*",
            element: (
              <ErrorMessage message="Что-то пошло не так. Попробуйте вернуться на главную." />
            ),
          },
        ],
      },
    ],
  },
];
export default routes;
