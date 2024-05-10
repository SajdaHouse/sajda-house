/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import ProductCard from "../custom/ProductCard";
import { productType } from "@/lib/types";
import Pagination from "../custom/pagination";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

export default function ProductsPage({
  _products,
}: {
  _products: productType[];
}) {
  const [products, setProducts] = useState(_products);
  const [max, setMax] = useState(20);

  useEffect(() => {
    setProducts(_products);
  }, [_products]);

  const paginationSchema = z.object({
    currentPage: z.coerce
      .number()
      .min(1)
      .max(Math.ceil(products.length / max))
      .nullable(),
  });
  const params = useSearchParams();

  const result = paginationSchema.safeParse({
    currentPage: params.get("page"),
  });

  let _currentPage = 1;
  if (result.success) {
    _currentPage = result.data.currentPage ?? 1;
  }
  const [currentPage, setCurrentPage] = useState(_currentPage);

  function changeOrder(order: "ATZP" | "ZTAP" | "ATZN" | "ZTAN") {
    switch (order) {
      case "ATZP":
        setProducts(
          products.toSorted((a, b) => (a.price ?? 0) - (b.price ?? 0))
        );
        break;
      case "ZTAP":
        setProducts(
          products.toSorted((a, b) => (b.price ?? 0) - (a.price ?? 0))
        );
        break;
      case "ATZN":
        setProducts(
          products.toSorted((a, b) => {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "ZTAN":
        setProducts(
          products.toSorted((a, b) => {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          })
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="">
      <div className="flex items-center p-5 pb-0 container">
        <Select onValueChange={changeOrder} dir="rtl">
          <SelectTrigger className="max-w-52">
            <SelectValue placeholder="ترتيب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ATZP">السعر تصاعديا</SelectItem>
            <SelectItem value="ZTAP">السعر تنازليا</SelectItem>
            <SelectItem value="ATZN">الاسم تصاعديا</SelectItem>
            <SelectItem value="ZTAN">الاسم تنازليا</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {products.length !== 0 ? (
        <div className="container flex items-stretch flex-wrap p-3">
          {products
            .slice((currentPage - 1) * max, (currentPage - 1) * max + max)
            .map((product) => (
              <div
                key={product.id}
                className="p-2 xl:w-[calc(100%/5-.01px)] lg:w-[calc(100%/4-.01px)] md:w-[calc(100%/3-.01px)] w-[calc(100%/2-.01px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full text-center text-xl font-medium px-2 py-5">
          لم يتم ايجاد اي منتج بهذا الاسم
        </div>
      )}
      <Pagination
        totalPages={Math.ceil(products.length / max)}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
