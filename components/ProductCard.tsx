interface Props {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
  };
}

const Product = ({ product }: Props) => {
  return (
    <div className=" border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold  text-sm line-clamp-2 mb-1">
          {product.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-3 mb-3">
          {product.description.slice(0, 60)}...
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold ">₹ {product.price}</span>

          <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-800 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
