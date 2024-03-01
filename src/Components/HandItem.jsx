import '../css/style.css'

const HandItem = ({ title, description, bgImg, bg, text, opacity, height }) => {
    return (
        <section>
            <div style={{ backgroundImage: `url(${bgImg})` }} className={`${height} flex items-center justify-center hand-item mb-4 py-20`}>
                <div className={`${bgImg} ${bg} ${text} ${opacity} text-center w-[70%] mx-auto py-10 px-6`}>
                    <h2 className='text-3xl uppercase logo'>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    );
};

export default HandItem;