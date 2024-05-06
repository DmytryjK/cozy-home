/* eslint-disable react/prop-types */
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Breadcrumbs.scss';

type CrumbType = {
    path: string;
    name: string;
    deactivate?: boolean;
};

type Props = {
    path: string;
    name: string;
};
type BreadcrumbsChild2 = {
    path: string;
    crumbs: {
        path: string;
        name: string;
        deactivate?: boolean;
    }[];
};
type BreadcrumbsChild = {
    path: string;
    crumbs: {
        path: string;
        name: string;
        deactivate?: boolean;
    }[];
    children?: BreadcrumbsChild2[];
};

type BreadcrumbsType = {
    path: string;
    crumbs: {
        path: string;
        name: string;
        deactivate?: boolean;
    }[];
    children?: BreadcrumbsChild[];
};

const Breadcrumbs = ({ dynamicParams }: { dynamicParams?: Props[] }) => {
    const [currentCrumbs, setCurrentCrumbs] = useState<CrumbType[] | null>(
        null
    );
    const dynamicName = 'name';
    const { pathname, search } = useLocation();

    const breadcrumbs: BreadcrumbsType[] = [
        {
            path: '/catalog',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/catalog',
                    name: 'Каталог',
                    deactivate: true,
                },
            ],
            children: [
                {
                    path: `categoryId`,
                    crumbs: [
                        {
                            path: '/',
                            name: 'Головна',
                        },
                        {
                            path: '/catalog',
                            name: 'Каталог',
                        },
                        {
                            path: `/categoryId`,
                            name: dynamicName,
                            deactivate: true,
                        },
                    ],
                    children: [
                        {
                            path: `product`,
                            crumbs: [
                                {
                                    path: '/',
                                    name: 'Головна',
                                },
                                {
                                    path: '/catalog',
                                    name: 'Каталог',
                                },
                                {
                                    path: `/categoryId`,
                                    name: dynamicName,
                                },
                                {
                                    path: `/product`,
                                    name: dynamicName,
                                    deactivate: true,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: '/cabinet',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/cabinet',
                    name: 'Особистий кабінет',
                    deactivate: true,
                },
            ],
            children: [
                {
                    path: 'contacts',
                    crumbs: [
                        {
                            path: '/',
                            name: 'Головна',
                        },
                        {
                            path: '/cabinet',
                            name: 'Особистий кабінет',
                        },
                        {
                            path: '/contacts',
                            name: 'Контакти',
                            deactivate: true,
                        },
                    ],
                },
                {
                    path: 'favorites',
                    crumbs: [
                        {
                            path: '/',
                            name: 'Головна',
                        },
                        {
                            path: '/cabinet',
                            name: 'Особистий кабінет',
                        },
                        {
                            path: '/favorites',
                            name: 'Список бажань',
                            deactivate: true,
                        },
                    ],
                },
                {
                    path: 'resetpassword',
                    crumbs: [
                        {
                            path: '/',
                            name: 'Головна',
                        },
                        {
                            path: '/cabinet',
                            name: 'Особистий кабінет',
                        },
                        {
                            path: '/resetpassword',
                            name: 'Зміна паролю',
                            deactivate: true,
                        },
                    ],
                },
            ],
        },
        {
            path: '/delivery',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/delivery',
                    name: 'Доставка і оплата',
                    deactivate: true,
                },
            ],
        },
        {
            path: '/contacts',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/contacts',
                    name: 'Контакти',
                    deactivate: true,
                },
            ],
        },
        {
            path: '/about',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/about',
                    name: 'Про нас',
                    deactivate: true,
                },
            ],
        },
        {
            path: '/cart',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/cart',
                    name: 'Корзина',
                    deactivate: true,
                },
            ],
        },
        {
            path: '/checkout',
            crumbs: [
                {
                    path: '/',
                    name: 'Головна',
                },
                {
                    path: '/checkout',
                    name: 'Оплата замовлення',
                    deactivate: true,
                },
            ],
        },
    ];

    useEffect(() => {
        const fullPathSegments = (pathname + (search || ''))
            .split('/')
            .filter((path) => path !== '');
        let result: any[] = [];
        breadcrumbs.forEach((crumb) => {
            if (fullPathSegments.length === 0) return null;
            if (crumb.path.replace('/', '').includes(fullPathSegments[0])) {
                result = crumb.crumbs;
                if (crumb.children) {
                    if (fullPathSegments.length === 2) {
                        crumb.children.forEach((children) => {
                            if (
                                fullPathSegments[1].includes(
                                    children.path.replace('/', '')
                                )
                            ) {
                                result = children.crumbs;
                            }
                        });
                    }
                    if (fullPathSegments.length === 3) {
                        crumb.children.forEach((children) => {
                            if (
                                fullPathSegments[1].includes(
                                    children.path.replace('/', '')
                                )
                            ) {
                                result = children.crumbs;
                                if (children.children) {
                                    children.children.forEach((children) => {
                                        if (
                                            fullPathSegments[2].includes(
                                                children.path.replace('/', '')
                                            )
                                        ) {
                                            result = children.crumbs;
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
            return null;
        });

        const fullPathSegments2 = (pathname + (search || ''))
            .split('/')
            .filter((path) => path !== '');
        result.forEach((item: { name: string; path: string }) => {
            if (item.path !== '/') {
                fullPathSegments2.forEach((segment) => {
                    if (segment.includes(item.path.replace('/', ''))) {
                        item.path = `/${segment}`;
                    }
                });
            }
            return result;
        });
        if (result.length > 0 && dynamicParams) {
            result.forEach((item: { name: string; path: string }) => {
                if (item.name === 'name') {
                    dynamicParams.forEach((param) => {
                        if (
                            item.path
                                .replace('/', '')
                                .includes(param.path.replace('/', ''))
                        ) {
                            item.name = param.name;
                        }
                    });
                }
                return result;
            });
        }
        for (let i = 0; i < result.length - 1; i += 1) {
            if (result[i].path !== '/') {
                result[i + 1].path = result[i].path + result[i + 1].path;
            }
        }
        setCurrentCrumbs(result);
    }, [pathname, dynamicParams]);

    return (
        <nav className="breadcrumbs">
            <div className="container">
                <ol className="breadcrumbs__list">
                    {currentCrumbs?.map((item, index) => {
                        const { path, name, deactivate } = item;
                        return (
                            <li
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${path}-${index}`}
                                className="breadcrumbs__list_item"
                            >
                                <NavLink
                                    className="breadcrumbs__list_link"
                                    to={path}
                                >
                                    {name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumbs;
