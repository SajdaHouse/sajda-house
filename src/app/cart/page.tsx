import CartPage from "@/components/pages/Cart";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "عربة التسوق | بيت سجدة للأثاث المنزلي",
};
export default async function Cart() {
  return <CartPage />;
}
