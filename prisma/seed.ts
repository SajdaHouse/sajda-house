import { products } from "./products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const newProducts = products.map((prod) => {
    return {
      id: prod.id,
      title: prod.title,
      category: prod.category,
      mainImage: `${process.env.BASE_URL}/products/${prod.id}/MainImage_${prod.id}_V1.${
        prod.mainImage.url.split(".")[3]
      }`,
      secondaryImages: JSON.stringify(
        prod.secondaryImages.map(
          (secImage, index) =>
            `${process.env.BASE_URL}/products/${prod.id}/SecondaryImage_${prod.id}_${index}_V1.${
              prod.mainImage.url.split(".")[3]
            }`
        )
      ),
      description: JSON.stringify(prod.description),
      price: prod.price,
      newPrice: prod.newPrice,
      old_url: prod.url,
    };
  });
  await prisma.product.deleteMany({});
  await prisma.product.createMany({ data: newProducts });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
