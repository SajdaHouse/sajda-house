"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useData } from "../contexts/data-hook";
import { productType } from "@/lib/types";
import { ImagePlaceholder } from "../custom/image-placeholder";

export default function ProductPage({ product }: { product: productType }) {
  const { setCartOpen, addToCart: addProductToCart } = useData();
  const [quantity, setQuantity] = useState(1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function addQuantity(q: 1 | -1) {
    if (q === 1) {
      setQuantity(quantity + 1);
    } else if (q === -1) {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  }

  async function addToCart() {
    if (!product?.id || !product.mainImage || !product.title || !product.price)
      return;
    addProductToCart({
      id: product.id,
      image: product.mainImage,
      title: product.title,
      price: product.newPrice ? product.newPrice : product.price,
      quantity: quantity,
    });
    setCartOpen(true);
  }
  if (!product) return notFound();
  return (
    <main className="container mb-7">
      <div className="flex md:flex-row flex-col gap-5">
        <div className="md:w-1/2 w-full pt-0 flex flex-col gap-2">
          <Carousel
            opts={{ loop: true, direction: "rtl" }}
            className="rounded-xl overflow-hidden"
            setApi={setApi}
          >
            <CarouselContent>
              {[product.mainImage, ...product.secondaryImages].map(
                (image, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full rounded-xl overflow-hidden aspect-square">
                      <ImagePlaceholder
                        src={image}
                        alt={product.title}
                        width={700}
                        height={700}
                        priority
                      />
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
          {product.secondaryImages.length > 0 && (
            <div className="w-full flex justify-center items-center gap-2">
              {[product.mainImage, ...product.secondaryImages].map(
                (image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded overflow-hidden transition-opacity cursor-pointer ${
                      current === index + 1 ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => {
                      api?.scrollTo(index);
                    }}
                  >
                    <ImagePlaceholder
                      src={image}
                      alt={product.title}
                      width={70}
                      height={70}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-medium">{product.title}</p>
          {product.newPrice ? (
            <>
              <div className="flex gap-1 items-center">
                <p className="text-3xl font-sans">
                  {product.newPrice
                    ? product.newPrice.toLocaleString("en-us")
                    : product.price.toLocaleString("en-us")}
                </p>
                <p className="text-2xl font-medium">ج.م</p>
                <del className="flex gap-1 items-center text-gray-400">
                  <p className="text-2xl ms-2 font-sans">
                    <span>{product.price.toLocaleString("en-us")}</span>
                  </p>
                </del>
              </div>
            </>
          ) : (
            <></>
          )}
          <p className="text-xl">الكمية : </p>
          <div className="flex rounded shadow w-fit font-sans bg-white">
            <button
              className="py-2 px-3 border-l"
              onClick={() => {
                addQuantity(1);
              }}
            >
              +
            </button>
            <p className="py-2 px-3" id="quantity">
              {quantity}
            </p>
            <button
              className="p-y2 px-3 border-r"
              onClick={() => {
                addQuantity(-1);
              }}
            >
              -
            </button>
          </div>
          <button
            className="bg-[#0093E9] text-white w-fit px-20 hover:bg-[rgb(0,137,223)] active:bg-[rgb(0,117,203)] cursor-pointer duration-150 py-3 text-xl font-medium rounded-md"
            onClick={addToCart}
          >
            <i className="bi bi-basket ml-2"></i>
            اضافة للسلة
          </button>
          {product.description.map((description) => (
            <div
              className="my-2 pt-3 border-t border-gray-300"
              key={description.title}
            >
              <p className="mb-3 text-2xl font-medium">{description.title} :</p>
              <ul className="list-disc mr-5 marker:text-gray-300">
                {description.rows?.map((row) => (
                  <li className="mt-2" key={row}>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}