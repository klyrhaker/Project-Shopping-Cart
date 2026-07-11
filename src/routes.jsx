import CartPage from "./components/CartPage/CartPage";
import Layout from "./components/Layout/Layout";
import Shop from "./components/Shop/Shop";
import HomePage from "./components/HomePage/HomePage";
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
