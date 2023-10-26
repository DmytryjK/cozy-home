import {
    MainPage,
    CatalogPage,
    CategoryPage,
    ProductPage,
    ShoppingCartPage,
    CheckoutPage,
    SignInPage,
    ActivationPage,
    ResetPasswordPage,
    UserCabinet,
} from './pages';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage';

const routes = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/catalog',
        element: <CategoryPage />,
    },
    {
        path: '/catalog/:categoryName',
        element: <CatalogPage />,
    },
    {
        path: '/catalog/:categoryName/:subCategoryName',
        element: <CatalogPage />,
    },
    {
        path: '/product/:productSku',
        element: <ProductPage />,
    },
    {
        path: '/cart',
        element: <ShoppingCartPage />,
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/checkout/success',
        element: <CheckoutSuccessPage />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
    {
        path: '/cabinet',
        element: <UserCabinet />,
    },
    {
        path: '/cabinet/:name',
        element: <UserCabinet />,
    },
    {
        path: '/api/v1/auth/activate',
        element: <ActivationPage />,
    },
    {
        path: '/api/v1/auth/login/reset',
        element: <ResetPasswordPage />,
    },
];

export default routes;
