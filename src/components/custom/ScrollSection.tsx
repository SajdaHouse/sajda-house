import ProductCard from "./ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function ScrollSection({
  title,
  products,
}: {
  title: string;
  products: {
    id: number;
    title: string;
    price: number;
    newPrice: number | null;
    mainImage: string;
  }[];
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
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="p-2 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 md"
            >
              <ProductCard product={product} priority={true} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
