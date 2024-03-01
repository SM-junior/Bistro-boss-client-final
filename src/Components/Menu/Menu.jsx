import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import MenuItem from "./MenuItem";
import useMenu from '../../hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section>
            <SectionTitle
                title='from our menu'
                subTitle='check it out!'
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-4 my-10 px-2">
                {
                    popular.map(items => <MenuItem
                        key={items._id}
                        item={items}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center my-4"><button className="btn btn-outline border-x-0 border-t-0 border-b-2  uppercase">view full menu</button></div>
            <div className="contact capitalize text-center bg-black text-white pt-10 pb-24 my-10 text-[50px] font-semibold">call us: +88 1236765446</div>
        </section>
    );
};

export default Menu;