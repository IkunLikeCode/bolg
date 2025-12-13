"use client";
import { House, Newspaper, EqualApproximately } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const list = [
  {
    name: "首页",
    path: "/",
    icon: <House />,
  },
  {
    name: "文章",
    path: "/article",
    icon: <Newspaper />,
  },
  {
    name: "关于我",
    path: "/about",
    icon: <EqualApproximately />,
  },
];
export default function Header() {
  const pahtName = usePathname();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-5 py-2 box-sizing: border-box; shadow-sm">
      {/* 在小屏上隐藏这个 YB Blog */}
      <Link href={"/"} className="text-black text-xl font-bold hidden sm:block">
        YB Blog
      </Link>
      <div className="flex justify-center items-center">
        {list.map((item) => (
          <Button
            key={item.path}
            variant="link"
            onClick={() => router.push(item.path)}
            className={` text-lg font-bold cursor-pointer ${
              pahtName === item.path ? "text-[#0070f4]" : "text-black"
            }`}>
            <div className="flex items-center">
              <div
                className={`mr-2 ${
                  item.path === pahtName ? "text-[#0070f4]" : "text-black"
                }`}>
                {item.icon}
              </div>
              <div
                className={`${
                  item.path === pahtName ? "text-[#0070f4]" : "text-black"
                }`}>
                {" "}
                {item.name}
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="flex">
        <img src={"/log.png"}></img>
      </div>
    </div>
  );
}
