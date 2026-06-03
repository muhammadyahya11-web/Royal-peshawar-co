import { ShoppingBag, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "./../context/ShopContext.jsx";
import { toast } from "react-toastify";

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useContext(ShopContext);
  const [size, setSize] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!size) {
      toast.info("Pick a size first");
      return;
    }
    addToCart(product, size);
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-[#e8e4de] shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <Link to={`/product/${product._id}`} className="block relative">
        {product.featured && (
          <span className="absolute top-3 left-3 z-10 bg-[#f3efe8] text-[#a68b5b] text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}

        <div className="aspect-[3/4] overflow-hidden bg-[#f3efe8]">
          <img
            src={product.images?.[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="p-4 md:p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-display text-base md:text-lg text-[#3d3935] line-clamp-1 group-hover:text-[#a68b5b] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-[#3d3935] mt-1">
          PKR {product.price}
        </p>

        {product.sizes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-[2rem] h-7 text-xs rounded-full transition ${
                  size === s
                    ? "bg-[#3d3935] text-white"
                    : "bg-[#f3efe8] text-[#8f8980] hover:text-[#3d3935]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium text-[#8f8980] rounded-full border border-[#e8e4de] hover:bg-[#f3efe8] hover:text-[#3d3935] transition"
            >
              <Eye size={14} />
              View
            </button>
          )}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium rounded-full bg-[#3d3935] text-white hover:bg-[#5c564f] transition"
          >
            <ShoppingBag size={14} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
};
