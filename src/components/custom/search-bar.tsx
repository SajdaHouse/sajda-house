"use client";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import React, { KeyboardEvent, Suspense, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchBar(){
  return <Suspense><SearchBarInput/></Suspense>
}

function SearchBarInput() {
  const params=useSearchParams();
  const [searchQuery,setSearchQuery]=useState(params.get("search"));
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <form action="/products">
        <label htmlFor="search" className="sr-only">البحث</label>
        <Input
          name="search"
          id="search"
          type="text"
          className="h-10 rounded-lg border-none outline-none shadow-[0px_4px_10px_0px_rgba(0,147,233,0.1)] lg:w-[40rem] md:w-[28rem] sm:w-[21rem] py-2 pe-3 ps-11 text-teal-700 placeholder:text-teal-400"
          placeholder="ابحث هنا ..."
          value={searchQuery??""}
          onChange={(e)=>{setSearchQuery(e.target.value)}}
          ref={inputRef}
        />
        <button
          type="submit"
          className="absolute top-[50%] right-4 translate-y-[-50%] text-teal-400 cursor-pointer"
        >
          <FaSearch size={20} />
        </button>
      </form>
    </div>
  );
}
