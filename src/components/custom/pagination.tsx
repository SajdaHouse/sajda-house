"use client";
import { BsChevronLeft, BsChevronRight, BsThreeDots } from "react-icons/bs";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { z } from "zod";

export default function Pagination({
  totalPages,
  onChange,
}: {
  totalPages: number;
  onChange?: (currentPage:number) => void;
}) {
  const paginationSchema = z.object({
    currentPage: z.coerce.number().min(1).max(totalPages).nullable(),
  });

  const params = useSearchParams();
  const pathname = usePathname();

  const result = paginationSchema.safeParse({
    currentPage: params.get("page"),
  });

  let currentPage = 1;
  if (result.success) {
    currentPage = result.data.currentPage ?? 1;
    if (onChange) onChange(currentPage);
  } else {
    changePage(1);
  }

  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (num) => num > 1 && num < totalPages
  );

  function changePage(page: number) {
    const newParams = new URLSearchParams(params);
    newParams.set("page", page.toString());
    if (onChange) onChange(page);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `${pathname}?${newParams.toString()}`);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  return (
    <div className="flex gap-2 items-center justify-center pb-5">
      {/* -------------------- chevron right -------------------- */}

      <Button
        variant={"ghost"}
        size={"icon"}
        disabled={currentPage == 0}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <BsChevronRight className="w-5 h-5" />
      </Button>

      {/* -------------------- first page -------------------- */}

      <Button
        key={1}
        variant={currentPage == 1 ? "outline" : "ghost"}
        size={"icon"}
        className="text-base"
        onClick={() => {
          changePage(1);
        }}
      >
        1
      </Button>

      {/* -------------------- first dots -------------------- */}

      {currentPage - 1 > 2 && <BsThreeDots />}

      {/* -------------------- pages -------------------- */}

      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage == pageNumber ? "outline" : "ghost"}
          size={"icon"}
          className="text-base"
          onClick={() => {
            changePage(pageNumber);
          }}
        >
          {pageNumber}
        </Button>
      ))}

      {/* -------------------- last dots -------------------- */}

      {totalPages - currentPage > 2 && <BsThreeDots />}

      {/* -------------------- last page -------------------- */}

      {totalPages != 1 && (
        <Button
          key={totalPages}
          variant={currentPage == totalPages ? "outline" : "ghost"}
          size={"icon"}
          className="text-base"
          onClick={() => {
            changePage(totalPages);
          }}
        >
          {totalPages}
        </Button>
      )}

      {/* -------------------- chevron left -------------------- */}

      <Button
        variant={"ghost"}
        size={"icon"}
        disabled={currentPage == totalPages}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <BsChevronLeft className="w-5 h-5" />
      </Button>
    </div>
  );
}
