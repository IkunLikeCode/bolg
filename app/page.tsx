/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare, BookOpen, Sparkles, Heart, Eye } from "lucide-react";
import requestApi from "@/utils";
import { Respones } from "./types";
import { PostItem } from "./api/article/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryItem } from "./api/category/route";
export default function Page() {
  const router = useRouter();
  const features = [
    {
      title: "记录",
      desc: "将灵感与成长持续沉淀为文字",
      icon: <PenSquare className="size-6" />,
    },
    {
      title: "分享",
      desc: "技术与生活的思考与实践",
      icon: <BookOpen className="size-6" />,
    },
    {
      title: "创造",
      desc: "把点子落地为真实可用的作品",
      icon: <Sparkles className="size-6" />,
    },
  ];

  const [mockCards, setPostList] = useState<PostItem[]>([]);
  const [categories, setCategoryList] = useState<CategoryItem[]>([]);
  // 分页获取文章
  useEffect(() => {
    const getPost = async function () {
      const res = await requestApi.request<
        Respones<{
          message: string;
          posts: PostItem[];
          total: number;
        }>
      >({
        method: "get",
        url: "/api/article",
        params: {
          page: 1,
          pageSize: 3,
        },
      });
      console.log(res);
      if (res.success) {
        setPostList(res.data.posts);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    // 获取所有分类
    const getAllCategory = async function () {
      const res = await requestApi.request<Respones<CategoryItem[]>>({
        method: "get",
        url: "/api/category",
      });
      if (res.success) {
        setCategoryList(res.data);
      }
    };
    getAllCategory();
  }, []);

  return (
    <div className="w-full h-full space-y-8">
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-[#f8fafc] to-[#eef2ff]">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(600px_300px_at_80%_10%,#93c5fd,transparent),radial-gradient(400px_200px_at_10%_20%,#a7f3d0,transparent)]" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold tracking-tight">
            YB Blog
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#666]">
            记录、分享与创造，一起把热爱变成长期主义
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild>
              <Link href="/article">开始浏览</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">关于我</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border bg-white p-5 flex items-start gap-3">
            <div className="size-10 rounded-md bg-[#f1f5f9] flex items-center justify-center text-[#0ea5e9]">
              {f.icon}
            </div>
            <div className="flex-1">
              <div className="text-base sm:text-lg font-semibold">
                {f.title}
              </div>
              <div className="mt-1 text-sm text-[#666]">{f.desc}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border bg-white p-5">
        <div className="text-lg sm:text-xl font-bold">分类</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.categoryName}
              className="px-3 py-1 rounded-md text-sm bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors cursor-default">
              {c.categoryName}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-lg sm:text-xl font-bold">精选</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockCards.map((card) => (
            <div
              onClick={() => router.push(`/article/${card.id}`)}
              key={card.title}
              className="rounded-xl border bg-white overflow-hidden cursor-pointer">
              <div className="aspect-video  flex items-center justify-center text-5xl font-bold text-white">
                <img
                  src={card.cover}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="truncate text-base sm:text-lg font-semibold">
                  {card.title}
                </div>
                <div className="text-sm text-[#666]">{card.summary}</div>
                <div className="pt-2 flex items-center gap-4 text-[#0ea5e9]">
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Heart className="size-4" />
                    <span className="text-sm">{card.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Eye className="size-4" />
                    <span className="text-sm">{card.viewCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
