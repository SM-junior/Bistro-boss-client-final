import React from 'react';
import { useState, useEffect } from 'react';
import useMenu from '../../hooks/useMenu';
import ShopCategory from '../Order/ShopCategory';

const Recommends = () => {
    const [menu]=useMenu();
    const offered=menu.filter(item=>item.category==='offered')

    return (
        <ShopCategory item={offered}></ShopCategory>
    );
};

export default Recommends;