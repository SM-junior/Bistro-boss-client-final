import React from 'react';
import HandItem from '../../Components/HandItem';
import shopImg from '../../assets/shop/order.jpg'
import TabItem from './TabItem';

const Order = () => {
    return (
        <div>
            <HandItem
                bgImg={shopImg}
                height='h-[500px]'
                bg='bg-black'
                text='text-white'
                title='Our Shop'
                description='would you like to try a dish?'
                opacity='bg-opacity-50'
            ></HandItem>
            <TabItem></TabItem>
        </div>
    );
};

export default Order;