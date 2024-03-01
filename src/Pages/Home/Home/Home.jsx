import HandItem from '../../../Components/HandItem';
import Menu from '../../../Components/Menu/Menu';
import Slides from '../Slides';
import Category from '../Category';
import Features from '../Features';
import Testimonials from '../Testimonials';
import Recommends from '../Recommends';
import { Helmet } from 'react-helmet-async';
import img from '../../../assets/home/chef-service.jpg'

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Slides></Slides>
            <Category></Category>
            <HandItem
                bg='bg-white'
                text='text-black'
                bgImg={img}
                title='Bistro Boss'
                description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.'
            ></HandItem>
            <Menu></Menu>
            <Recommends></Recommends>
            <Features></Features>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;