// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { Navigation } from "@/components/Navigation";
import { TechModule } from "@/types/tech";
import { TechPageClient } from "./TechPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "技术设定 - We Are ESAP",
  description: "探索 ESAP 世界的核心技术：馈散粒子、流体钛、仿生人技术等",
};

async function getTechModules(): Promise<TechModule[]> {
  try {
    const fs = require("fs/promises");
    const path = require("path");

    const techDir = path.join(process.cwd(), "data", "tech");
    const files = await fs.readdir(techDir);

    const modules: TechModule[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(techDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const module: TechModule = JSON.parse(fileContent);
        modules.push(module);
      }
    }

    // 暂时只返回已有的模块，后面可以添加更多
    return modules;
  } catch (error) {
    console.error("获取技术模块数据失败:", error);
    return [];
  }
}

export default async function TechPage() {
  const modules = await getTechModules();

  return (
    <>
      <Navigation />
      <main>
        {/* Hero 区域 */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              技术设定
            </h1>
            <p className="text-lg text-muted-foreground">
              Technical Specifications of The ESAP Project
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-esap-yellow via-esap-pink to-esap-blue rounded-full mx-auto mt-6" />
          </div>
        </section>

        {/* 技术模块内容 */}
        {modules.length > 0 ? (
          <TechPageClient modules={modules} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <p className="text-muted-foreground">暂无技术设定数据</p>
          </div>
        )}
      </main>
    </>
  );
}
