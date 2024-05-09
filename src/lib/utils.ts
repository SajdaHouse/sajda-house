import { order, product } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { productType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function arraymove(arr: any[], fromIndex: number, toIndex: number) {
  let newArr = arr;
  var element = newArr[fromIndex];
  newArr = newArr.toSpliced(fromIndex, 1);
  newArr = newArr.toSpliced(toIndex, 0, element);
  return newArr;
}

export function formatProduct(product:product):productType{
  return{
    ...product,
    description:JSON.parse(product.description),
    secondaryImages:JSON.parse(product.secondaryImages),
    created_at:product.created_at!,
    updated_at:product.updated_at!
  }
}
export function formatOrder(order:order){
  return{
    id:order.id,
    info:JSON.parse(order.info),
    products:JSON.parse(order.products),
    status:order.status,
    created_at:order.created_at,
    updated_at:order.updated_at
  }
}
