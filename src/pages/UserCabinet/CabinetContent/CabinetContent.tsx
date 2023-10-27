import React from 'react';
import './CabinetContent.scss';
import UserContacts from './UserContacts/UserContacts';
import UserFavorites from './UserFavorites/UserFavorites';

const CabinetContent = () => {
    return (
        <div className="cabinet-content">
            <UserContacts />
        </div>
    );
};

export default CabinetContent;
