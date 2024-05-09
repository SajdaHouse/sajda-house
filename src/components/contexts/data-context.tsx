"use client";
import * as React from "react";

import { cartProductType, categoryType } from "@/lib/types";
import { useState } from "react";
import { consoleLog } from "@/lib/console";
interface dataContextProps {
  cart: cartProductType[];
  cartOpen: boolean;
  setCartOpen(value: any): void;
  refreshCart(): void;
  addToCart(product: cartProductType): void;
  removeFromCart({ id }: { id: number }): void;
  categories: categoryType[];
}

const DataContext = React.createContext<dataContextProps | undefined>(
  undefined
);

const DataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [cart, setCart] = useState<cartProductType[]>([]);
  const categories = [{ id: 1, title: "غرف المعيشة" },
  { id: 2, title: "غرف طعام" },
  { id: 4, title: "سراير" },
  { id: 3, title: "كراسي" },
  { id: 5, title: "كرسي سفره" },
  { id: 6, title: "كنب" },
  { id: 7, title: "كنبه سرير" }];
  const [cartOpen, setCartOpen] = useState(false);

  const refreshCart = () => {
    consoleLog("refreshing cart");

    const lastCart = localStorage.getItem("cart");
    const cartData = lastCart ? JSON.parse(lastCart) : [];
    setCart(cartData);
  };

  const addToCart = (product: cartProductType) => {
    consoleLog("adding to cart || product:", product);

    let newCart = cart;

    if (newCart.filter((prod) => prod.id === product.id).length >= 1) {
      newCart = cart.map((prod) => {
        return prod.id === product.id
          ? {
              ...prod,
              quantity: prod.quantity + product.quantity,
            }
          : prod;
      });
    } else {
      newCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    refreshCart();
  };

  const removeFromCart = ({ id }: { id: number }) => {
    consoleLog("removing from cart || id:", id);

    const newCart = cart.filter((product) => {
      return product.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    refreshCart();
  };

  return (
    <DataContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        refreshCart,
        addToCart,
        removeFromCart,
        categories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
