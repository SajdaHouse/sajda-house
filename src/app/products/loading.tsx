import { ProductCardSkeleton } from "@/components/custom/product-card-skeleton";

export default function LoadingPage() {
  return (
    <main>
      <div className="flex items-center p-5 pb-0 container">
        <div className="w-52 h-10 custom-puls"></div>
      </div>
      <div className="container flex items-stretch flex-wrap p-3">
        {Array.from({ length: 10 }).map((n, index) => (
          <div
            key={index}
            className="p-2 xl:w-[calc(100%/5-.01px)] lg:w-[calc(100%/4-.01px)] md:w-[calc(100%/3-.01px)] w-[calc(100%/2-.01px)]"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </main>
  );
}
