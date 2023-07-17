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
                        <li className="breadcrumbs__list_item" key={crumb}>
                            <a href="/" className="breadcrumbs__list_item_link">
                                {crumb}
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
