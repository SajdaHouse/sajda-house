import CheckoutPage from "@/components/pages/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تأكيد الشراء | بيت سجدة للأثاث المنزلي",
};

export default function Checkout() {
  return <CheckoutPage />;
}
