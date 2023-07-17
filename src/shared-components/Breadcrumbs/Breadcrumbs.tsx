import React from 'react';
import './Breadcrumbs.scss';

type CrubmsProps = {
    crumbs: string[];
};

const Breadcrumbs = ({ crumbs }: CrubmsProps) => {
    return (
        <div className="container">
            <nav className="breadcrumbs">
                <ol className="breadcrumbs__list">
                    {crumbs.map((crumb) => (
                        <a
                            href="/"
                            key={crumb}
                            className="breadcrumbs__list_link"
                        >
                            <li className="breadcrumbs__list_link_item">
                                {crumb}
                            </li>
                        </a>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
