import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import ShopCard from './ShopCard';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ShopCategory from './ShopCategory';

const TabItem = () => {
    const categories=['salad','pizza','soup','dessert','drinks'];
    const {category}=useParams()
    const initialIndex=categories.indexOf(category)
    const [tabIndex, setTabIndex]=useState(initialIndex);
    
    const [menu]=useMenu();
    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <Tabs>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}></Tabs>
            <TabList className='text-center'>
                <Tab>salad</Tab>
                <Tab>pizza</Tab>
                <Tab>soups</Tab>
                <Tab>desserts</Tab>
                <Tab>drinks</Tab>
            </TabList>

            <TabPanel>
                <ShopCategory item={salad}></ShopCategory>
            </TabPanel>
            <TabPanel>
                <ShopCategory item={pizza}></ShopCategory>
            </TabPanel>
            <TabPanel>
                <ShopCategory item={soup}></ShopCategory>
            </TabPanel>
            <TabPanel>
                <ShopCategory item={dessert}></ShopCategory>
            </TabPanel>
            <TabPanel>
                <ShopCategory item={drinks}></ShopCategory>
            </TabPanel>
        </Tabs>
    );
};

export default TabItem;