import ProductsPage from "@/components/pages/products-page";
import { consoleError, consoleLog, consoleSuccess } from "@/lib/console";
import { createClient } from "@/lib/supabase/server";
import { productType } from "@/lib/types";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string | undefined } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = searchParams["id"];
  const search = searchParams["search"];
  const categories = [
    {
      id: 5,
      title: "كرسي سفره",
    },
    {
      id: 1,
      title: "غرف المعيشة",
    },
    {
      id: 2,
      title: "غرف طعام",
    },
    {
      id: 7,
      title: "كنبه سرير",
    },
    {
      id: 6,
      title: "كنب",
    },
    {
      id: 3,
      title: "كراسي",
    },
    {
      id: 8,
      title: "سرير 200*120",
    },
    {
      id: 9,
      title: "سرير 200*160",
    },
    {
      id: 10,
      title: "سرير 200*180",
    },
    {
      id: 11,
      title: "سرير 200*200",
    },
  ];
  return {
    title: `${search ? `${search} -` : ""}${
      category &&
      categories.filter((categ) => categ.id.toString() === category.trim())[0]
        ? `${
            categories.filter(
              (categ) => categ.id.toString() === category.trim()
            )[0].title
          } -`
        : ""
    } بيت سجدة للأثاث المنزلي`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const category = searchParams["id"];
  const search = searchParams["search"];

  let products: productType[] = [];

  const supabase = createClient();

  consoleLog("Fetching products || category:", category, "|| search:", search);

  if (category && search) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${search}%`)
      .eq("category", category);

    if (error || !data) {
      consoleError(
        "Couldn't Fetch products|| category:",
        category,
        "|| search:",
        search,
        "|| error:",
        error,
        "|| data:",
        data
      );
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      data.length
    );

    products.push(...data);
  } else if (category) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category);

    if (error || !data) {
      consoleError(
        "Couldn't Fetch products|| category:",
        category,
        "|| search:",
        search,
        "|| error:",
        error,
        "|| data:",
        data
      );
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      data.length
    );

    products.push(...data);
  } else if (search) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("title", `%${search}%`);

    if (error || !data) {
      consoleError(
        "Couldn't Fetch products|| category:",
        category,
        "|| search:",
        search,
        "|| error:",
        error,
        "|| data:",
        data
      );
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      data.length
    );

    products.push(...data);
  } else {
    const { data, error } = await supabase.from("products").select("*");

    if (error || !data) {
      consoleError(
        "Couldn't Fetch products|| category:",
        category,
        "|| search:",
        search,
        "|| error:",
        error,
        "|| data:",
        data
      );
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      data.length
    );

    products.push(...data);
  }

  return <ProductsPage _products={products} />;
}
