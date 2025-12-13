"use client";
import { useParams } from "next/navigation";
import requestApi from "@/utils";
import { useEffect, useState } from "react";
import type { PostItem } from "@/app/api/article/route";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 支持GFM语法
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Heart } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={dracula}
      language={match[1]}
      PreTag="div"
      className="my-4 rounded-md" // 给代码块加Tailwind样式
      {...props}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={`${className} bg-gray-100 px-1 rounded`} {...props}>
      {children}
    </code>
  );
};

export default function Page() {
  const params = useParams();
  const [PostData, setPostData] = useState<PostItem | null>(null);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    const getPostDetail = async (id: string) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await requestApi.request<any>({
          method: "get",
          url: `/api/articleDetail/${id}`,
        });
        if (result.code === 200) {
          setPostData(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPostDetail(params.id as string);
  }, [params.id]);
  return (
    <div>
      <div className="prose flex-1  max-w-none bg-gray-100 p-10">
        <div className="flex flex-col text-lg md:flex-row md:text-2xl font-bold underline gap-1 ">
          <div>标题:</div>
          <div>{PostData?.title}</div>
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // 给H1加Tailwind样式（大标题）
            h1: ({ children }) => (
              <h1 className="text-4xl font-bold text-gray-800 my-6">
                {children}
              </h1>
            ),
            // H2样式
            h2: ({ children }) => (
              <h2 className="text-3xl font-semibold text-gray-800 my-5">
                {children}
              </h2>
            ),
            // H3样式
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold text-gray-700 my-4">
                {children}
              </h3>
            ),
            // 其他元素补充Tailwind样式（可选）
            p: ({ children }) => (
              <p className="my-3 text-gray-700">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                {children}
              </a>
            ),
            // 代码块复用你之前的逻辑
            code: CodeBlock,
          }}>
          {PostData?.content ?? ""}
        </ReactMarkdown>
        <div className="like flex">
          <div className="likeText text-lg font-bold">为它点赞:</div>
          <div>
            <Heart
              onClick={async () => {
                if (isLike) {
                  return;
                }
                if (!isLike) {
                  try {
                    setIsLike(true);
                    await requestApi.request({
                      method: "get",
                      url: `/api/articleLike/${params.id}`,
                    });
                  } catch (er) {
                    console.log(er);
                  }
                }
              }}
              color="red"
              className="cursor-pointer"
              fill={isLike ? "red" : "#f3f4f6"}></Heart>
          </div>
        </div>
      </div>
    </div>
  );
}
