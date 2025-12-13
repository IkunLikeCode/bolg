import { NextRequest, NextResponse } from "next/server";

// 根据分类id获取文章
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = `${process.env.BASE_URL}/api/post/${id}`;
    const res = await fetch(url, {
      method: "get",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      err,
    });
  }
}
