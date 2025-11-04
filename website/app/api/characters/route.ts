// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { NextResponse, NextRequest } from "next/server";
import { Character, CharactersResponse } from "@/types/character";
import fs from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    // 从查询参数获取 locale,默认为 zh-CN
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "zh-CN";

    // 尝试读取指定语言的目录
    let charactersDir = path.join(process.cwd(), "data", "characters", locale);

    // 检查目录是否存在,不存在则回退到 zh-CN
    try {
      await fs.access(charactersDir);
    } catch {
      console.log(`角色数据目录 ${locale} 不存在,回退到 zh-CN`);
      charactersDir = path.join(process.cwd(), "data", "characters", "zh-CN");
    }

    const files = await fs.readdir(charactersDir);

    const characters: Character[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(charactersDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const character: Character = JSON.parse(fileContent);
        characters.push(character);
      }
    }

    // 按 ID 排序
    characters.sort((a, b) => a.id.localeCompare(b.id));

    const response: CharactersResponse = {
      characters,
      total: characters.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("获取角色列表失败:", error);
    return NextResponse.json({ error: "获取角色列表失败" }, { status: 500 });
  }
}
