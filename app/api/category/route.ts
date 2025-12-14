import { NextResponse } from "next/server";

export interface CategoryItem {
  id: string;
  categoryName: string;
  description: string | null;
  createAt?: string;
  updateAt?: string;
}
// 获取所有分类
export async function GET() {
  try {
    const url = `${process.env.BASE_URL}/blog/category`;
    const res = await fetch(url, {
      method: "get",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err);
  }
}
