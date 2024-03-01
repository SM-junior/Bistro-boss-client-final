import React from 'react';
import SectionTitle from '../../Components/SectionTitle';
import img from '../../assets/home/featured.jpg'

const Features = () => {
    return (
        <section className='features my-10 bg-fixed'>
            <div className='py-24 bg-black bg-opacity-50 text-white'>
                <SectionTitle
                    title='from our menu'
                    subTitle='check it out'
                ></SectionTitle>
                <div className='grid md:grid-cols-2 w-[70%] items-center gap-4 mx-auto text-white'>
                    <img src={img} alt="" />
                    <div className='py-10'>
                        <h2 className='text-xl'>march 20, 20223</h2>
                        <h3 className='text-xl uppercase'>where can i get  some?</h3>
                        <p className='text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <div className="my-4"><button className="btn btn-outline border-x-0 border-t-0 border-b-2  uppercase text-white">view full menu</button></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;