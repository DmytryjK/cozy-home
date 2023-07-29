import { useLocation } from 'react-router';
import './Breadcrumbs.scss';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';

const Breadcrumbs = () => {
    const location = useLocation();

    const pathMapping: { [key: string]: string } = {
        catalog: 'Каталог',
    };

    const pathSegments = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '');

    let currentLink = '';

    const crumbs = pathSegments.map((crumb) => {
        const decodedCrumb = decodeURIComponent(crumb);
        currentLink += `/${decodedCrumb}`;

        return (
            <li className="breadcrumbs__list_item" key={crumb}>
                <NavLink
                    to={currentLink}
                    className="breadcrumbs__list_item_link"
                >
                    {pathMapping[crumb] || decodedCrumb}
                </NavLink>
            </li>
        );
    });

    if (crumbs.length > 0) {
        crumbs.unshift(
            <li className="breadcrumbs__list_item" key={nextId('crumb-item')}>
                <NavLink to="/" className="breadcrumbs__list_item_link">
                    Головна
                </NavLink>
            </li>
        );
    }

    return (
        <div className="container">
            <nav className="breadcrumbs">
                <ol className="breadcrumbs__list">{crumbs}</ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
