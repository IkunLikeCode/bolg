"use client";
import { useEffect, useState } from "react";
import requestApi from "@/utils";
import type { CategoryItem } from "@/app/api/category/route";
import type { PostItem } from "@/app/api/article/route";
import type { Respones } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const colorList = [
  "#0070f4",
  "#ff4d4f",
  "#faad14",
  "#52c41a",
  "#1890ff",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

function tagColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return colorList[(h % colorList.length) - 1];
}

function CategoryList(props: {
  categoryItem: CategoryItem;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  const { categoryItem, isActive, onClick } = props;
  return (
    <Button
      variant="outline"
      size="sm"
      className={`w-full justify-start rounded-lg px-3 py-2 cursor-pointer transition-all hover:shadow-sm ${
        isActive
          ? "bg-[#e2e8f0] text-[#0ea5e9] border-[#93c5fd]"
          : "bg-[#f1f5f9] text-black"
      }`}
      onClick={() => onClick(categoryItem.id)}>
      <div className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${
            isActive ? "bg-[#0ea5e9]" : "bg-[#cbd5e1]"
          }`}
        />
        <span className="text-sm sm:text-base font-semibold">
          {categoryItem.categoryName}
        </span>
      </div>
    </Button>
  );
}

function NotData() {
  return (
    <div className="flex justify-center items-center text-2xl  text-center mt-10">
      暂无数据...
    </div>
  );
}

function PostItem(props: {
  postItem: PostItem;
  onClick: (id: string) => void;
}) {
  const { postItem, onClick } = props;
  return (
    <div
      onClick={() => onClick(postItem.id)}
      className="rounded-xl border bg-white overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-video bg-[#f1f5f9]">
        <img src={postItem.cover} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-2">
        <div className="truncate text-base sm:text-lg font-semibold">
          {postItem.title}
        </div>
        <div className="text-sm text-[#666]">{postItem.summary}</div>
        <div className="pt-1 flex flex-wrap gap-2">
          {postItem.tags.map((item) => {
            return (
              <span
                key={item.id}
                className="px-2 py-1 rounded-md bg-[#f1f5f9] text-xs sm:text-sm"
                style={{ color: tagColor(item.id) }}>
                {item.tagName}
              </span>
            );
          })}
        </div>
        <div className="pt-2 flex items-center gap-4 text-[#0ea5e9]">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Heart className="size-4" />
            <span className="text-sm">{postItem.likeCount}</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Eye className="size-4" />
            <span className="text-sm">{postItem.viewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10,
  });
  const [postList, setPostList] = useState<PostItem[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const router = useRouter();
  const handleCategoryClick = async (id: string) => {
    try {
      setActiveCategory(id);
      const result = await requestApi.request<
        Respones<{
          message: string;
          posts: PostItem[];
          total: number;
        }>
      >({
        method: "get",
        url: `/api/article/${id}`,
      });
      setPostList(result.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  const getPostDetail = async (id: string) => {
    router.push(`/article/${id}`);
    requestApi.request({
      method: "get",
      url: `/api/articleViewCount/${id}`,
    });
  };

  useEffect(() => {
    // 分页获取文章
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
          page: pageInfo.page,
          pageSize: pageInfo.pageSize,
        },
      });
      console.log(res);
      if (res.success) {
        setPostList(res.data.posts);
      }
    };

    getPost();
  }, [pageInfo]);

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
    <div className="w-full flex gap-4 h-full">
      {postList && postList.length >= 1 ? (
        <div className="postList flex-1 grid gap-4 grid-cols-1  md:grid-cols-2">
          {postList.map((item) => (
            <PostItem
              onClick={getPostDetail}
              key={item.id}
              postItem={item}></PostItem>
          ))}
        </div>
      ) : (
        <div className="flex-1 w-full text-center">
          <NotData></NotData>
        </div>
      )}
      <div className="categoryList  shadow-md h-full grid grid-cols-1 md:grid-cols-2 gap-2 p-2 sm:p-3 lg:p-4">
        <CategoryList
          isActive={activeCategory === ""}
          key={"all"}
          onClick={handleCategoryClick}
          categoryItem={{
            id: "",
            categoryName: "全部",
            description: null,
          }}></CategoryList>
        {categoryList.map((item) => (
          <CategoryList
            isActive={item.id === activeCategory}
            key={item.id}
            onClick={handleCategoryClick}
            categoryItem={item}></CategoryList>
        ))}
      </div>
    </div>
  );
}
