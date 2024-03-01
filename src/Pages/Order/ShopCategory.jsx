import React from 'react';
import ShopCard from './ShopCard';

const ShopCategory = ({item}) => {
    return (
        <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center mx-auto gap-5 my-20'>
            {
                item.map(singleItem =>
                    <ShopCard 
                    key={singleItem._id}
                    singleItem={singleItem}
                    ></ShopCard>
                )
            }
        </section>
    );
};

export default ShopCategory;