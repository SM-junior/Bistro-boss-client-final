import React from 'react';
import { Link } from 'react-router-dom';

const MenuCategory = ({ item, title }) => {
    return (
        <section>
            <div className="grid md:grid-cols-2 gap-4 my-10 px-2 items-start justify-start">
                {
                    item.map(item =>
                        <div key={item._id} className="flex justify-center space-x-3">
                            <img className="w-[80px] h-[80px] rounded-tl-0 rounded-tr-full rounded-bl-full rounded-br-full " src={item.image} alt="" />
                            <div>
                                <h2 className="text-xl">{item.name}---------------</h2>
                                <p className="text-[13px]">{item.recipe}</p>
                            </div>
                            <p className="text-orange-500">${item.price}</p>
                        </div>
                    )
                }
            </div>
            <Link to={`/order/${title}`}><div className="text-center my-4"><button className="btn btn-outline border-x-0 border-t-0 border-b-2 mb-10 uppercase">Order your favourite food</button></div></Link>
        </section>
    );
};

export default MenuCategory;