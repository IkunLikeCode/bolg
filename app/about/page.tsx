import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Layers, Rocket, Github, ExternalLink } from "lucide-react";

export default function Page() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Vue",
    "React",
    "Next.js",
    "Nuxt",
    "NestJS",
    "Webpack",
    "Vite",
  ];

  return (
    <div className="w-full h-full space-y-8">
      <section className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-[#f8fafc] to-[#eef2ff]">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(600px_300px_at_80%_10%,#93c5fd,transparent),radial-gradient(400px_200px_at_10%_20%,#a7f3d0,transparent)]" />
        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex items-center gap-3">
            <Rocket className="text-[#0ea5e9]" />
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold tracking-tight">
              关于我
            </h1>
          </div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#666]">
            前端开发者，热爱创造。
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild>
              <Link href="/article">查看文章</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">返回首页</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <div className="flex items-center gap-2">
          <Code2 className="text-[#0ea5e9]" />
          <div className="text-lg sm:text-xl font-bold">技术栈</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-md text-sm bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors cursor-default">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <div className="flex items-center gap-2">
          <Layers className="text-[#0ea5e9]" />
          <div className="text-lg sm:text-xl font-bold">自我介绍</div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 items-start">
          <div className="flex md:block justify-center">
            <div className="size-28 md:size-36 rounded-full bg-gradient-to-br from-[#93c5fd] to-[#a5b4fc] flex items-center justify-center text-white text-2xl font-bold">
              YB
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-base sm:text-lg font-semibold">
              一名专注体验的前端 / 全栈开发者
            </div>
            <div className="text-sm text-[#666]">
              喜欢把复杂问题拆解为清晰的模块，用合理的工程化手段提升效率与质量。
              编码之外也热衷写作与分享，记录成长与灵感。
            </div>
            <div className="text-sm text-[#666]">
              擅长的方向包括页面架构设计、组件化与样式系统、SSR
              与同构渲染、构建与性能优化等。
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "HTML",
                "CSS",
                "JavaScript",
                "Vue",
                "React",
                "Next.js",
                "Nuxt",
                "NestJS",
                "Webpack",
                "Vite",
              ].map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-md bg-[#f1f5f9] text-xs sm:text-sm">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-3">
              <Button variant="link" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <Github className="mr-1 size-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="link" asChild>
                <a href="#" target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-1 size-4" />
                  联系我
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
