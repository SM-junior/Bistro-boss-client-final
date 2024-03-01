
const MenuItem = ({item}) => {
    const {name, recipe, price, image}=item;
    return (
        <div className="flex justify-center space-x-3">
            <img className="w-[80px] h-[80px] rounded-tl-0 rounded-tr-full rounded-bl-full rounded-br-full " src={image} alt="" />
            <div>
                <h2 className="text-xl">{name}---------------</h2>
                <p className="text-[13px]">{recipe}</p>
            </div>
            <p className="text-orange-500">${price}</p>
        </div>
    );
};

export default MenuItem;