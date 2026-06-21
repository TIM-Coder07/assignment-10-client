import React from 'react';
import UserSideBar from '../Component/Navbar/UserSideBar';

const layout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <UserSideBar></UserSideBar>
            <div className='flex-1'>
                {children}
            </div>
        </div>
    );
};

export default layout;