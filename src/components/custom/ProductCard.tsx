import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useData } from "../contexts/data-hook";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { ImagePlaceholder } from "./image-placeholder";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: {
    id: number;
    title: string;
    price: number;
    newPrice: number | null;
    mainImage: string;
  };
  priority?: boolean;
}) {
  const { addToCart, setCartOpen } = useData();
  let discount = 0;
  if (product.newPrice) {
    discount = Math.round(
      ((product.price - product.newPrice) / product.price) * 100
    );
  }
  const [loading, setLoading] = useState(false);

  return (
    <Link
      href={`/product?title=${product.title}&id=${product.id}`}
      title={product.title}
      className="flex flex-col h-full relative"
    >
      {/* -------------------- image -------------------- */}

      <div className="w-full rounded overflow-hidden aspect-square">
        <ImagePlaceholder
          src={product.mainImage}
          alt={product.title}
          width={300}
          height={300}
          priority={priority}
        />
      </div>

      {/* -------------------- discount -------------------- */}

      {product.newPrice && (
        <div className="absolute bg-[#0094e9af] text-white font-sans leading-none pt-1.5 pb-1 px-2 rounded-ss rounded-ee font-medium">
          {discount}%
        </div>
      )}

      {/* -------------------- name -------------------- */}

      <p className="font-medium my-2 text-[#4D4D4D] text-[0.9rem] line-clamp-1">
        {product.title}
      </p>

      {/* -------------------- prices and add to cart -------------------- */}

      <div className="flex justify-between items-start mb-2">
        {/* -------------------- prices -------------------- */}

        {product.newPrice ? (
          <div>
            <div>
              <p className="inline-block text-2xl font-medium">
                {product.newPrice.toLocaleString("en-us")}
              </p>
              <p className="inline-block ms-1 text-gray-600">ج.م</p>
            </div>
            <div>
              <p className="inline-block line-through text-gray-600 text-xl decoration-gray-600 leading-none">
                {product.price.toLocaleString("en-us")}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="inline-block text-2xl font-medium">
              {product.price.toLocaleString("en-us")}
            </p>
            <p className="inline-block ms-1 text-gray-600">ج.م</p>
          </div>
        )}

        {/* -------------------- add to cart -------------------- */}

        <Button
          size={"icon"}
          type="button"
          className="text-2xl font-sans font-light"
          aria-label="Add to cart"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            const cartProduct = {
              id: product.id,
              title: product.title,
              price: product.newPrice ?? product.price,
              image: product.mainImage,
              quantity: 1,
            };
            addToCart(cartProduct);
            setLoading(true);
            setCartOpen(true);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          disabled={loading}
        >
          {loading ? <BsCartCheck size={20} /> : <BsCartPlus size={20} />}
        </Button>
      </div>
    </Link>
  );
}
