"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import ScrollSection from "../custom/ScrollSection";
import { Button } from "../ui/button";
import { BsPersonFill, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import ScrollSectionSkeleton from "../custom/scroll-section-skeleton";
import { useCallback, useEffect, useState } from "react";
import { productType } from "@/lib/types";
import { getProductsArray } from "@/lib/actions";
import { arraymove } from "@/lib/utils";
import Script from "next/script";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${G-2FPWD9QP9G}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${G-2FPWD9QP9G}');
  `}
</Script>
export default function MainPage() {
  const categories = [
    {
      id: 1,
      alt: "غرف معيشة",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%201.png",
    },
    {
      id: 2,
      alt: "غرف طعام",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%202.png",
    },
    {
      id: 3,
      alt: "كراسي",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%203.png",
    },
    {
      id: 5,
      alt: "كراسي سفره",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%204.png",
    },
    {
      id: 6,
      alt: "كنب",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%205.png",
    },
    {
      id: 7,
      alt: "كنب سرير",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%206.png",
    },
    {
      id: 8,
      alt: "سرير 120 × 200",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%207.png",
    },
    {
      id: 9,
      alt: "سرير 160 × 200",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%208.png",
    },
    {
      id: 10,
      alt: "سرير 180 × 200",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%209.png",
    },
    {
      id: 11,
      alt: "سرير 200 × 200",
      image:
        "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Category%2010.png",
    },
  ];

  const [newProducts, setNewProducts] = useState<productType[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<productType[]>(
    []
  );

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = useCallback(() => {
    Promise.all([fetchNewProducts(), fetchTopSellingProducts()]);
  }, []);
  async function fetchNewProducts() {
    const _newProducts = await getProductsArray([
      419, 431, 205, 17, 30, 31, 38, 216, 176, 98
    ]);
    if (
      _newProducts.error ||
      !_newProducts.data ||
      _newProducts.data.length === 0
    ) {
      console.error(_newProducts.error?.message);
    } else {
      setNewProducts(
        arraymove(
          _newProducts.data,
          _newProducts.data.indexOf(
            _newProducts.data.filter((prod) => prod.id === 419)[0]
          ),
          0
        )
      );
    }
  }
  async function fetchTopSellingProducts() {
    const _topSellingProducts = await getProductsArray([
      203, 210, 216, 30, 198, 134, 135, 43, 80, 84,
    ]);
    if (
      _topSellingProducts.error ||
      !_topSellingProducts.data ||
      _topSellingProducts.data.length === 0
    ) {
      console.error(_topSellingProducts.error?.message);
    } else {
      setTopSellingProducts(_topSellingProducts.data);
    }
  }
  return (
    <div className="container px-4 mb-7">
      <h1 className="sr-only">بيت سجدة للأثاث المنزلي</h1>

      {/* -------------------- images carousel and banners -------------------- */}

      <div className="rounded-lg overflow-hidden">
        <Image
          src={
            "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/mainPageImage2.png"
          }
          alt="بيت سجدة للأثاث"
          width={1280}
          height={720}
          className="w-full"
          priority
        />
      </div>
      {/* <div className="w-16 h-0.5 mb-5 bg-teal-400 rounded-full"></div> */}
      <h3 className="mt-5 text-2xl">الأقسام</h3>
      {/* -------------------- categories carousel -------------------- */}

      <Carousel
        opts={{
          direction: "rtl",
          align: "center",
          loop: true,
          skipSnaps: true,
        }}
        className="mt-4"
      >
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              className="select-none basis-[50%] sm:basis-[40%] md:basis-[30%] lg:basis-[22%] xl:basis-1/6 pb-5 pl-3"
              key={index}
            >
              <CategoryBanner category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mb-5">
        {newProducts.length > 0 ? (
          <ScrollSection title="جديد" products={newProducts} />
        ) : (
          <ScrollSectionSkeleton title="جديد" />
        )}
      </div>
      <div className="mb-5">
        {topSellingProducts.length > 0 ? (
          <ScrollSection title="الاكثر مبيعا" products={topSellingProducts} />
        ) : (
          <ScrollSectionSkeleton title="الاكثر مبيعا" />
        )}
      </div>
      {/* <div className="mb-5">
        <ScrollSection
          title="جديد"
          products={[
            {
              id: 205,
              title: "كرسى سفرهCx-710",
              price: 3000,
              newPrice: 2399,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/205/MainImage_V1.jpeg",
            },
            {
              id: 17,
              title: "ركنة رمادي M902",
              price: 35400,
              newPrice: 27000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/17/MainImage_V1.jpeg",
            },
            {
              id: 30,
              title: "ركنه قطيفه سماوي cox.12472",
              price: 23500,
              newPrice: 21000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/30/MainImage_V1.jpeg",
            },
            {
              id: 31,
              title: "فوتية+كنبه x.p.12445",
              price: 28500,
              newPrice: 27000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/31/MainImage_V1.jpeg",
            },
            {
              id: 38,
              title: "ركنه أصفر c x.6408",
              price: 28200,
              newPrice: 23400,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/38/MainImage_V1.jpeg",
            },

            {
              id: 216,
              title: "كرسي زيتي×بني",
              price: 2760,
              newPrice: 2320,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/216/MainImage_V1.jpeg",
            },
            {
              id: 176,
              title: "كرسي منت c.x-804",
              price: 7300,
              newPrice: 6210,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/176/MainImage_V1.jpeg",
            },
            {
              id: 98,
              title: "غرفه معيشه 3 قطع",
              price: 36000,
              newPrice: 32800,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/98/MainImage_V1.jpeg",
            },
          ]}
        />
      </div>
      <div className="my-5">
        <ScrollSection
          title="الاكثر مبيعا"
          products={[
            {
              id: 203,
              title: "كرسي أوف وايت c.x.55.67",
              price: 3480,
              newPrice: 2880,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/203/MainImage_V1.png",
            },
            {
              id: 210,
              title: "كرسي سفره أخضر",
              price: 2640,
              newPrice: 2190,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/210/MainImage_V1.jpeg",
            },
            {
              id: 216,
              title: "كرسي زيتي×بني",
              price: 2760,
              newPrice: 2320,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/216/MainImage_V1.jpeg",
            },
            {
              id: 30,
              title: "ركنه قطيفه سماوي cox.12472",
              price: 23500,
              newPrice: 21000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/30/MainImage_V1.jpeg",
            },
            {
              id: 198,
              title: "كرسى جانبى أصفر K-110",
              price: 4740,
              newPrice: 3120,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/198/MainImage_V1.jpeg",
            },
            {
              id: 134,
              title: "غرفه طعام بيج وبني.c.x-48.86",
              price: 21000,
              newPrice: 18600,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/134/MainImage_V1.jpeg",
            },
            {
              id: 135,
              title: "سفره 9 قطع R.821",
              price: 33720,
              newPrice: 29700,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/135/MainImage_V1.jpeg",
            },
            {
              id: 43,
              title: "ركنه كحلي cox.6362",
              price: 25200,
              newPrice: 19800,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/43/MainImage_V1.jpeg",
            },
            {
              id: 80,
              title: "ركنه بيج K140-12",
              price: 25800,
              newPrice: 21000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/80/MainImage_V1.jpeg",
            },
            {
              id: 84,
              title: "ركنه جنزاري K140-44",
              price: 29400,
              newPrice: 21000,
              mainImage:
                "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/products/84/MainImage_V1.jpeg",
            },
          ]}
        />
      </div> */}
      <div className="flex justify-center border-t mt-4">
        <div className="flex justify-between items-center max-w-5xl w-full">
          <h3 className="font-bold text-teal-500 mt-5 mb-4">أراء العملاء</h3>
          <Button
            size={"sm"}
            variant={"link"}
            className="text-teal-400"
            asChild
          >
            <Link
              title="عرض التقييمات"
              href="https://www.google.com/maps/place/%D8%B3%D8%AC%D8%AF%D8%A9+%D8%B1%D9%88%D9%88%D9%85+%D9%84%D9%84%D8%A3%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%89%E2%80%AD/@30.7677773,31.0486094,17z/data=!4m8!3m7!1s0x14f7b7530134864d:0x5ae872455a04dbb9!8m2!3d30.7677773!4d31.0486094!9m1!1b1!16s%2Fg%2F11v62bnyz5?entry=ttu"
            >
              عرض الكل {">"}
            </Link>
          </Button>
        </div>
      </div>
      <Carousel opts={{ align: "center", loop: true, direction: "rtl" }}>
        <CarouselContent>
          <CarouselItem className="lg:basis-1/3 basis-[80%]">
            <Comment
              username="Mostafa Helal"
              comment="بصراحة اكتر ناس عندها مصداقية اتعاملت معاهم انا تقريبا جبت اثاث البيت كله من عندهم والحاجة وصلت واتركبت زي الوصف واحسن كمان بعد ما شوفتها قدامي ربنا يرزقنا ويرزقكم بالحلال الطيب والف شكر بجد علي تعبكم وحسن معاملتكم"
            />
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 basis-[80%]">
            <Comment
              username="Shahd Ehab"
              comment="ممتازين الخامة و الجودة و الوقت و السعر محترمين جداً و ملتزمين و مش هيكون اخر تعامل ان شاء الله"
            />
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 basis-[80%]">
            <Comment
              username="rumasushi rumasushi"
              comment="ممتازين الخامة و الجودة و الوقت والسعر و محترمين جدا انا جبت سرير و عجبنى جدا روحت طلبة سرير تانى و مش هيكون اخر تعامل ان شاء الله"
            />
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 basis-[80%]">
            <Comment
              username="Nesreen Adel"
              comment="جوده عاليه باسعار جيده و التزام فى المواعيد و فينيش هايل ربنا يكرمكم"
            />
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 basis-[80%]">
            <Comment
              username="Yousra Gamil"
              comment="بصراحه التنفيذ مظبوط جدا زي الصوره بالظبط والمعامله في منتهي الدقه والإحترام والأمانه ويهتموا جدا بكل التفاصيل"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="w-full flex justify-center mt-1">
        <Button size={"lg"} asChild>
          <Link
            href="https://maps.app.goo.gl/MFx57hrWuahETLcs5"
            target="_blank"
            title="شارك برأيك"
          >
            شارك برأيك
          </Link>
        </Button>
      </div>
    </div>
  );
}
function Comment({ username, comment }: { username: string; comment: string }) {
  return (
    <div className="flex items-start justify-center h-full">
      <div className="rounded-lg my-2 p-5 bg-white flex flex-col shadow-sm">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="rounded-full aspect-square size-10 bg-gray-100 flex items-center justify-center overflow-hidden">
            <BsPersonFill color="#d1d5db" className="size-10 translate-y-1.5" />
          </div>
          <h4 className="text-gray-600">{username}</h4>
        </div>
        <div className="flex items-center justify-center w-full gap-1">
          <BsStarFill className="size-5" color="#fde047" />
          <BsStarFill className="size-5" color="#fde047" />
          <BsStarFill className="size-5" color="#fde047" />
          <BsStarFill className="size-5" color="#fde047" />
          <BsStarFill className="size-5" color="#fde047" />
        </div>
        <p className="mt-2 max-w-sm text-center">{comment}</p>
      </div>
    </div>
  );
}

function CategoryBanner({
  category,
}: {
  category: { image: string; alt: string; id: number };
}) {
  return (
    <Link
      href={`/products?category=${category.alt}&id=${category.id}`}
      title={category.alt}
    >
      <div className="bg-white rounded-[0.75rem] shadow-lg p-1 hover:p-0 aspect-[620/800] flex items-center justify-center overflow-hidden transition-all">
        <Image
          priority
          src={category.image}
          alt={category.alt}
          width={620}
          height={800}
          className="rounded"
        />
      </div>
    </Link>
  );
}
