"use client";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./cart-button";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <header className="container mb-3">
      <div className="mt-4 flex justify-between items-center">
        <Link href="/" title="بيت سجدة">
          <Image
            src="https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Logo.png"
            alt="Logo"
            width={106}
            height={61}
          />
        </Link>
        <div className="relative sm:block hidden">
          <SearchBar />
        </div>

        <CartButton />
      </div>
      <div className="relative sm:hidden block mt-2 ">
        <SearchBar />
      </div>
    </header>
  );
}
