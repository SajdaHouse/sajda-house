/* eslint-disable react-hooks/exhaustive-deps */
import { BsBasket, BsCart, BsTrash } from "react-icons/bs";
import { useData } from "../contexts/data-hook";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export default function CartButton() {
  const { cart, refreshCart, removeFromCart, cartOpen, setCartOpen } =
    useData();
  useEffect(() => {
    refreshCart();
  }, []);
  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setCartOpen(true);
        }}
      >
        <BsCart className="size-8 text-slate-500" />
        <div className="size-5 absolute -top-1 -right-2 bg-sky-500 rounded-full ring-1 ring-slate-50 overflow-hidden text-white text-[0.85rem] flex items-center justify-center font-sans">
          {cart.length}
        </div>
      </div>
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full max-w-xs flex flex-col gap-2">
          <SheetHeader className="border-b">
            <SheetTitle className="mb-5 w-full flex items-center justify-center gap-2">
              <BsBasket size={20} />
              عربة التسوق
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-2 flex-grow overflow-y-auto">
            {cart.length >= 1 ? (
              cart.map((product, index) => (
                <div
                  key={index}
                  className="rounded-md relative overflow-hidden border p-2 flex gap-2 items-center justify-start"
                >
                  <Image
                    src={product.image}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="rounded"
                  />
                  <div className="flex flex-col justify-evenly text-[0.8rem] leading-4 flex-grow h-full">
                    <h6 className="line-clamp-2 text-[0.8rem] leading-4 text-ellipsis break-words overflow-hidden max-h-[2rem]">
                      {product.title}
                    </h6>
                    <div className="w-full">
                      <p className="text-teal-600">
                        {product.quantity} ×{" "}
                        {product.price.toLocaleString("en-us")} ={" "}
                        {(product.price * product.quantity).toLocaleString(
                          "en-us"
                        )}
                        ج.م
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-0 size-10 flex items-center justify-center">
                    <BsTrash
                      className="size-6 text-red-500 cursor-pointer"
                      onClick={() => {
                        removeFromCart({ id: product.id });
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center p-3">عربة التسوق فارغة</p>
            )}
          </div>
          {cart.length > 0 ? (
            <div className="w-full flex flex-col gap-2 pt-3 border-t">
              <p className="text-center font-medium">
                مجموع العربة :{" "}
                {cart
                  .map((product) => product.price * product.quantity)
                  .reduce((prev, current) => prev + current, 0)
                  .toLocaleString("en-us")}{" "}
                ج.م
              </p>
              <div className="flex gap-2 w-full">
                <SheetClose asChild>
                  <Button className="flex-grow">متابعة التسوق</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="flex-grow" asChild>
                    <Link href="/cart" title="عربة التسوق">
                      الانتقال للعربة
                    </Link>
                  </Button>
                </SheetClose>
              </div>
              <SheetClose asChild>
                <Button className="w-full" asChild>
                  <Link href="/checkout" title="تأكيد الشراء">
                    شراء
                  </Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <SheetClose asChild>
              <Button className="w-full">اكمل التسوق</Button>
            </SheetClose>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
