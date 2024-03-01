import React from 'react';
import { Helmet } from 'react-helmet';
import HandItem from '../../Components/HandItem';
import img from '../../assets/menu/banner3.jpg';
import img1 from '../../assets/menu/dessert-bg.jpeg'
import img2 from '../../assets/menu/salad-bg.jpg';
import img3 from '../../assets/menu/soup-bg.jpg';
import img4 from '../../assets/menu/pizza-bg.jpg';
import useMenu from '../../hooks/useMenu';
import MenuCategory from './MenuCategory';
import SectionTitle from '../../Components/SectionTitle';

const OurMenu = () => {
    const [menu] = useMenu();

    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Our Menu</title>
            </Helmet>
            <HandItem
                height='h-[500px]'
                bg='bg-black'
                text='text-white'
                opacity='bg-opacity-50'
                bgImg={img}
                title='Our menu'
                description='would you like to try a dish?'
            ></HandItem>
            <SectionTitle
                title="today's offer"
                subTitle="don't miss"
            ></SectionTitle>
            <MenuCategory item={offered}></MenuCategory>
            <HandItem
                height='h-[400px]'
                bg='bg-black'
                text='text-white'
                opacity='bg-opacity-50'
                bgImg={img1}
                title='Desserts'
                description='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            ></HandItem>
            <MenuCategory item={dessert} title={'dessert'}></MenuCategory>
            <HandItem
                height='h-[400px]'
                bg='bg-black'
                text='text-white'
                opacity='bg-opacity-50'
                bgImg={img2}
                title='pizza'
                description='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            ></HandItem>
            <MenuCategory item={pizza} title={'pizza'}></MenuCategory>
            <HandItem
                height='h-[400px]'
                bg='bg-black'
                text='text-white'
                opacity='bg-opacity-50'
                bgImg={img3}
                title='salad'
                description='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            ></HandItem>
            <MenuCategory item={salad} title={'salad'}></MenuCategory>
            <HandItem
                height='h-[400px]'
                bg='bg-black'
                text='text-white'
                opacity='bg-opacity-50'
                bgImg={img4}
                title='soup'
                description='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
            ></HandItem>
            <MenuCategory item={soup} title={'soup'}></MenuCategory>
        </div>
    );
};

export default OurMenu;