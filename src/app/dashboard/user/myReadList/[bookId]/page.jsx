import React from 'react';

const UserBookDetailsPage = async({params}) => {
    const {bookId} = await params
    console.log("BooK ID:", bookId);
    
    return (
        <div>
            Details BooK ID : {bookId}
        </div>
    );
};

export default UserBookDetailsPage;