"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useData } from "../contexts/data-hook";
import Image from "next/image";
import { BsX } from "react-icons/bs";

export default function CartPage() {
  const { cart, removeFromCart } = useData();
  let productsPrice = 0;
  for (const product of cart) {
    productsPrice += product.price * product.quantity;
  }

  const totalPrice = productsPrice;

  return (
    <main className="container mb-7">
      <p className="font-bold text-2xl text-[#7B7C7D] mb-5">عربة التسوق</p>
      <div className="flex lg:gap-10 gap-5 flex-col md:flex-row">
        <div className="bg-white flex flex-col p-5 md:px-5 md:py-5 sm:px-20 sm:py-10 w-full md:max-w-80 h-fit rounded">
          <p className="mb-5 text-xl text-gray-500 font-semibold">
            ملخص الطلب :
          </p>
          <table className="table-auto mb-4 text-gray-600 font-medium">
            <tbody id="totalContainer">
              <tr className="border-b">
                <td>مجموع المنتجات :</td>
                <td className="py-2">
                  {productsPrice.toLocaleString("en-us")}
                </td>
              </tr>
              <tr className="border-b border-gray-400">
                <td>تكلفة الشحن :</td>
                <td className="py-2">مجاني</td>
              </tr>
              <tr className="text-gray-900">
                <td>المجموع الكلي :</td>
                <td className="py-2">{totalPrice.toLocaleString("en-us")}</td>
              </tr>
            </tbody>
          </table>
          {cart.length > 0 && (
            <Link
              className="px-4 py-2 flex justify-center items-center bg-[#0093E9] rounded font-bold text-white text-base select-none hover:bg-[rgb(0,137,223)] active:bg-[rgb(0,117,203)] cursor-pointer duration-150"
              href="checkout"
              title="تأكيد الشراء"
            >
              تأكيد الطلب
            </Link>
          )}
        </div>
        <div className="flex flex-col flex-grow gap-4" id="cartContainer">
          {cart.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded sm:p-4 p-2 w-full flex justify-between items-center"
            >
              <Image
                src={product.image}
                className="w-20 rounded"
                alt="item-1"
                width="80"
                height="80"
              />
              <div className="flex flex-col gap-1 flex-grow lg:px-5 px-3 sm:text-base text-sm">
                <p className="font-medium">{product.title}</p>
                <p className="font-medium text-gray-400">
                  الكمية : {product.quantity}
                </p>
                <p className="font-medium text-gray-400">
                  السعر : {product.price.toLocaleString("en-us")} ×{" "}
                  {product.quantity} ={" "}
                  {(product.quantity * product.price).toLocaleString("en-us")}{" "}
                  ج.م
                </p>
              </div>

              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  removeFromCart({ id: product.id });
                }}
              >
                <BsX size={20} className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
