"use client";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import {BsList,BsBox2} from "react-icons/bs"
import { useData } from "../contexts/data-hook";

export default function Navbar() {
  const { categories } = useData();
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-white mb-5 overflow-auto">
      <div className="container flex px-4 sm:justify-normal justify-between gap-3">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex items-center text-gray-600">
            <BsList className="me-2 text-xl" />
            <p className="text-sm text-center align-middle whitespace-nowrap">
              جميع الاقسام
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent asChild>
            <div className="flex flex-col text-right w-full max-w-96 min-w-48">
              {categories.map((categ) => (
                <DropdownLink
                  title={categ.title}
                  key={categ.id}
                  href={categ.id===4?`/beds`:`/products?category=${categ.title}&id=${categ.id}`}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-grow flex items-center sm:justify-center justify-evenly text-center gap-4">
          <Navlink title="الصفحة الرئيسية" href="/" />
          <Navlink title="جميع منتجاتنا" href="/products" />
        </div>
      </div>
    </nav>
  );
  function DropdownLink({ title, href }: { title: string; href: string }) {
    return (
      <Link
        href={href}
        title={title}
        onClick={() => {
          setOpen(false);
        }}
      >
        <Button
          variant={"ghost"}
          size={"sm"}
          dir="rtl"
          className="text-gray-600 text-small w-full justify-start"
        >
          <BsBox2 className="me-3 text-gray-400" />
          {title}
        </Button>
      </Link>
    );
  }
}

function Navlink({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      title={title}
      className="text-gray-600 text-[.8rem] font-normal py-1 whitespace-nowrap"
    >
      {title}
    </Link>
  );
}
