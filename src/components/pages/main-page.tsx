/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import ScrollSection from "../custom/ScrollSection";
import { Button } from "../ui/button";
import { BsPersonFill, BsStarFill } from "react-icons/bs";
import Link from "next/link";
import ScrollSectionSkeleton from "../custom/scroll-section-skeleton";
import { useCallback, useEffect, useState } from "react";
import { type productType } from "@/lib/types";
import { getProductsArray } from "@/lib/actions";
import { arraymove } from "@/lib/utils";
import { ImagePlaceholder } from "../custom/image-placeholder";

export default function MainPage() {
  const categories = [
    {
      id: 1,
      alt: "غرف معيشة",
      image:
        "/store/Category%201.png",
    },
    {
      id: 2,
      alt: "غرف طعام",
      image:
        "/store/Category%202.png",
    },
    {
      id: 3,
      alt: "كراسي",
      image:
        "/store/Category%203.png",
    },
    {
      id: 5,
      alt: "كراسي سفره",
      image:
        "/store/Category%204.png",
    },
    {
      id: 6,
      alt: "كنب",
      image:
        "/store/Category%205.png",
    },
    {
      id: 7,
      alt: "كنب سرير",
      image:
        "/store/Category%206.png",
    },
    {
      id: 8,
      alt: "سرير 120 × 200",
      image:
        "/store/Category%207.png",
    },
    {
      id: 9,
      alt: "سرير 160 × 200",
      image:
        "/store/Category%208.png",
    },
    {
      id: 10,
      alt: "سرير 180 × 200",
      image:
        "/store/Category%209.png",
    },
    {
      id: 11,
      alt: "سرير 200 × 200",
      image:
        "/store/Category%2010.png",
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
      205, 17, 30, 31, 38, 216, 176, 98,
    ]);
    setNewProducts(
      arraymove(
        _newProducts,
        _newProducts.indexOf(
          _newProducts.filter((prod) => prod.id === 205)[0]
        ),
        0
      )
    );
  }
  async function fetchTopSellingProducts() {
    const _topSellingProducts = await getProductsArray([
      203, 210, 216, 30, 198, 134, 135, 43, 80, 84,
    ]);
    setTopSellingProducts(_topSellingProducts);
  }
  return (
    <div className="container px-4 mb-7">
      <h1 className="sr-only">بيت سجدة للأثاث المنزلي</h1>

      {/* -------------------- images carousel and banners -------------------- */}

      <div className="rounded-lg overflow-hidden">
        <Image
          src={
            "/store/mainPageImage.png"
          }
          alt="بيت سجدة للأثاث"
          width={1280}
          height={720}
          className="w-full"
          priority
        />
      </div>
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
      <div className="flex justify-center border-t mt-4">
        <div className="flex justify-between items-center max-w-5xl w-full">
          <h3 className="mt-5 mb-4">أراء العملاء</h3>
          <Button
            size={"sm"}
            variant={"link"}
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
        <div className="rounded overflow-hidden">
          <ImagePlaceholder priority
          src={category.image}
          alt={category.alt}
          width={620}
          height={800}/>
        </div>
      </div>
    </Link>
  );
}
