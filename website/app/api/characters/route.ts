// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { NextResponse } from "next/server";
import { Character, CharactersResponse } from "@/types/character";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const charactersDir = path.join(process.cwd(), "data", "characters");
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
    return NextResponse.json(
      { error: "获取角色列表失败" },
      { status: 500 }
    );
  }
}
