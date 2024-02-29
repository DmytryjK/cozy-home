import PrivateRoutes from './PrivateRoutes';
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
    AboutUsPage,
    GoogleAuthPage,
    DeliveryPage,
    NotFoundPage,
    CheckoutSuccessPage,
} from './pages';

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
        path: '/api/v1/auth/activate',
        element: <ActivationPage />,
    },
    {
        path: '/api/v1/auth/login/reset',
        element: <ResetPasswordPage />,
    },
    {
        path: '/api/v1/auth/google-login',
        element: <GoogleAuthPage />,
    },
    {
        path: '/about',
        element: <AboutUsPage />,
    },
    {
        path: '/delivery',
        element: <DeliveryPage />,
    },
    {
        path: '/cabinet',
        element: (
            <PrivateRoutes>
                <UserCabinet />
            </PrivateRoutes>
        ),
    },
    {
        path: '/cabinet/:name',
        element: (
            <PrivateRoutes>
                <UserCabinet />
            </PrivateRoutes>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

export default routes;
