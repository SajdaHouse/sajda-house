import { Button } from "@/components/ui/button";
import {BsArrowLeft} from "react-icons/bs"
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full py-20 flex flex-col items-center justify-center">
      <h1 className="text-9xl text-cyan-800">404</h1>
      <h4 className="text-xl font-medium text-teal-600 mb-2">
        هذة الصفحة غير موجودة
      </h4>
      <Link href="/" title="الصفحة الرئيسية">
        <Button className="text-teal-500" variant={"link"}>
          الرجوع للصفحة الرئيسية
          <BsArrowLeft className="ms-1" />
        </Button>
      </Link>
    </main>
  );
}
