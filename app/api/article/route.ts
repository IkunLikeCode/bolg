import { NextRequest, NextResponse } from "next/server";

// 文章类型
export interface PostItem {
  category: {
    categoryName: string;
    createAt: string;
    description: null;
    id: string;
    updateAt: string;
  };
  content: string;
  cover: string;
  createAt: string;
  id: string;
  likeCount: number;
  status: number;
  summary: string;
  tags: {
    createAt: string;
    id: string;
    tagName: string;
  }[];
  title: string;
  updateAt: string;
  viewCount: number;
}

// 分页获取文章
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const page = query.get("page");
    const pageSize = query.get("pageSize");
    const url = `${process.env.BASE_URL}/blog/post?page=${Number(
      page
    )}&pageSize=${Number(pageSize)}`;
    const res = await fetch(url, {
      method: "get",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
