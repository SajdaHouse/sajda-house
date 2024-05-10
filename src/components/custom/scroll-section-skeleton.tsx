import ProductCard from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ProductCardSkeleton } from "./product-card-skeleton";

export default function ScrollSectionSkeleton({
  title,
}: {
  title: string;
}) {
  return (
    <div className="relative">
      <h3 className="text-2xl mb-4">{title}</h3>
      <Carousel
        opts={{
          loop: true,
          direction: "rtl",
          skipSnaps: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {Array.from({length:10}).map((i,index) => (
            <CarouselItem
              key={`${index} ${title}`}
              className="p-2 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 md"
            >
              <ProductCardSkeleton/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
