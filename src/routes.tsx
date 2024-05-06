import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Layout from './shared-components/Layout/Layout';
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
    PrefetchProductPage,
    Contacts,
} from './pages';

const RootRouterProvider = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <MainPage />,
                },
                {
                    path: 'catalog',
                    element: <CategoryPage />,
                },
                {
                    path: 'catalog/:categoryParams',
                    element: <CatalogPage />,
                },
                {
                    path: 'catalog/:categoryParams/:productName',
                    element: <ProductPage />,
                },
                {
                    path: 'prefetch/:sku/:hex',
                    element: <PrefetchProductPage />,
                },
                {
                    path: 'cart',
                    element: <ShoppingCartPage />,
                },
                {
                    path: 'checkout',
                    element: <CheckoutPage />,
                },
                {
                    path: 'checkout/success',
                    element: <CheckoutSuccessPage />,
                },
                {
                    path: 'signin',
                    element: <SignInPage />,
                },
                {
                    path: 'api/v1/auth/activate',
                    element: <ActivationPage />,
                },
                {
                    path: 'api/v1/auth/login/reset',
                    element: <ResetPasswordPage />,
                },
                {
                    path: 'api/v1/auth/google-login',
                    element: <GoogleAuthPage />,
                },
                {
                    path: 'about',
                    element: <AboutUsPage />,
                },
                {
                    path: 'delivery',
                    element: <DeliveryPage />,
                },
                {
                    path: 'contacts',
                    element: <Contacts />,
                },
                {
                    path: 'cabinet',
                    element: (
                        <PrivateRoutes>
                            <UserCabinet />
                        </PrivateRoutes>
                    ),
                },
                {
                    path: 'cabinet/:name',
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
            ],
        },
    ]);

    return <RouterProvider router={router} fallbackElement="Loading..." />;
};

export default RootRouterProvider;
