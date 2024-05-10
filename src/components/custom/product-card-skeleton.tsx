import { cn } from "@/lib/utils";
import Image from "next/image";
function ProductCardSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col h-full",className)} {...props}>
      <Image
        src="/store/placeholder.png"
        alt="بيت سجدة للأثاث"
        width={300}
        height={300}
        className="rounded w-full aspect-square"
      />
      <div className="my-2 h-6 rounded custom-puls" />
      <div className="flex justify-between gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="h-8 w-full custom-puls rounded"></div>
          <div className="h-6 w-full custom-puls rounded"></div>
        </div>
        <div className="h-full aspect-square custom-puls rounded"></div>
      </div>
    </div>
  );
}
export { ProductCardSkeleton };