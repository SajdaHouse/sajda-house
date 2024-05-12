"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useData } from "../contexts/data-hook";
import { FaSpinner } from "react-icons/fa";
import { infoSchema } from "@/lib/zod-objects";
import { placeOrder } from "@/lib/actions";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cartProductType } from "@/lib/types";
import { ImagePlaceholder } from "../custom/image-placeholder";

const governorates: { [key: string]: string } = {
  1: "الإسكندرية",
  2: "الإسماعيلية",
  3: "أسوان",
  4: "أسيوط",
  5: "الأقصر",
  6: "البحر الأحمر",
  7: "البحيرة",
  8: "بني سويف",
  9: "بورسعيد",
  10: "جنوب سيناء",
  11: "الجيزة",
  12: "الدقهلية",
  13: "دمياط",
  14: "سوهاج",
  15: "السويس",
  16: "الشرقية",
  17: "شمال سيناء",
  18: "الغربية",
  19: "الفيوم",
  20: "القاهرة",
  21: "القليوبية",
  22: "قنا",
  23: "كفر الشيخ",
  24: "مطروح",
  25: "المنوفية",
  26: "المنيا",
  27: "الوادي الجديد",
};

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, refreshCart } = useData();
  const [cartData, setCartData] = useState<cartProductType[]>(cart);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      username: "",
      address: "",
      city: "",
      additions: "",
      email: "",
      governorate: "",
      phone: "",
    },
  });

  let productsPrice = 0;
  for (const product of cart) {
    productsPrice += product.price * product.quantity;
  }
  const totalPrice = productsPrice;
  async function onSubmit(values: z.infer<typeof infoSchema>) {
    setLoading(true);
    const status = await placeOrder({ info: values, products: cart });
    if (status.error) {
      toast.error("حدث خطأ اثناء انشاء الطلب");
    } else {
      if (typeof window !== "undefined") {
        window.dataLayer?.push({
          event: "checkout",
          "Checkout Value": totalPrice,
        });
        window.dataLayer?.push({
          event: "conversion",
          send_to: "AW-16554192142/281XCLv56q4ZEI7a09U9",
          value: totalPrice,
          currency: "EGP",
          transaction_id: "",
        });
      }
      localStorage.setItem("cart", "");
      refreshCart();
      setDialogOpen(true);
    }
    setLoading(false);
  }

  return (
    <main className="container mb-7">
      {dialogOpen ? (
        <>
          <h2 className="w-full text-center mb-5">تم اضافة طلبك بنجاح</h2>
          <div className="flex flex-col gap-2">
            {cartData.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded sm:p-4 p-2 w-full flex justify-between items-center"
              >
                <ImagePlaceholder
                  src={product.image.url}
                  className="w-20 rounded"
                  alt="item-1"
                  width={80}
                  height={80}
                />
                {/* <Image
                src={product.image.url}
                className="w-20 rounded"
                alt="item-1"
                width="80"
                height="80"
                placeholder="blur"
                blurDataURL={product.image.hash}
              /> */}
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
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
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
                    <td className="py-2">
                      {totalPrice.toLocaleString("en-us")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 max-w-md w-full"
                >
                  <h1 className="text-2xl w-full text-center">
                    بيانات التوصيل
                  </h1>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم ثلاثي</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم ثلاثي" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="governorate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المحافظة</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                            {...field}
                          >
                            {Object.values(governorates).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder="المدينة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          عنوان المنزل ( اسم الشارع ورقم المنزل )
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="العنوان" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input
                            inputMode="tel"
                            placeholder="رقم الهاتف"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-full flex items-center justify-between">
                          <FormLabel>
                            البريد اللإلكتروني {"("} اختياري {")"}
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"link"}
                                className="p-0 h-auto w-auto"
                                type="button"
                              >
                                ليه محتاجينة ؟
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <p className="text-sm">
                                بنطلب البريد الالكتروني عشان لو عاوز تستلم وصل
                                الشراء علي البريد الالكتروني
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormControl>
                          <Input
                            inputMode="email"
                            placeholder="البريد اللإلكتروني"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          ملاحظات الطلب {"("} اختياري {")"}
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {cart.length > 0 && (
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <FaSpinner className="size-5 animate-spin" />
                      ) : (
                        "تأكيد الطلب"
                      )}
                    </Button>
                  )}
                </form>
              </Form>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
