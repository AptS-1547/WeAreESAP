// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { NextResponse } from "next/server";
import { Character, CharacterResponse } from "@/types/character";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(
      process.cwd(),
      "data",
      "characters",
      `${id}.json`
    );

    const fileContent = await fs.readFile(filePath, "utf-8");
    const character: Character = JSON.parse(fileContent);

    const response: CharacterResponse = {
      character,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("获取角色详情失败:", error);
    return NextResponse.json(
      { error: "角色不存在" },
      { status: 404 }
    );
  }
}
