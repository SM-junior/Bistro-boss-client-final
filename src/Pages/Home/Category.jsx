import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../Components/SectionTitle';

const Category = () => {
    return (
        <section className='my-20'>
            <SectionTitle
                subTitle='from 11.00 am to 10.00 pm'
                title='order online'
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper my-8"
            >
                <SwiperSlide><img src={img1} alt="" /><p className='uppercase -mt-16 text-white text-center'>desert</p></SwiperSlide>
                <SwiperSlide><img src={img2} alt="" /><p className='uppercase -mt-16 text-white text-center'>pizza</p></SwiperSlide>
                <SwiperSlide><img src={img3} alt="" /><p className='uppercase -mt-16 text-white text-center'>soup</p></SwiperSlide>
                <SwiperSlide><img src={img4} alt="" /><p className='uppercase -mt-16 text-white text-center'>drinks</p></SwiperSlide>
                <SwiperSlide><img src={img5} alt="" /><p className='uppercase -mt-16 text-white text-center'>salad</p></SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;