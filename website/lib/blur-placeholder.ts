// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

/**
 * 获取图片的模糊占位符 (blur placeholder)
 */

import blurData from "@/data/blur-placeholders.json";

/**
 * 根据图片路径获取对应的 blur data URL
 * @param imagePath - 图片路径，例如 "/images/characters/img_1549.webp"
 * @returns blur data URL 或 undefined
 */
export function getBlurDataURL(imagePath: string): string | undefined {
  // 提取文件名
  const filename = imagePath.split("/").pop();
  if (!filename) return undefined;

  // 从 JSON 中获取对应的 blur data
  return blurData[filename as keyof typeof blurData];
}

/**
 * 检查图片是否有 blur placeholder
 * @param imagePath - 图片路径
 * @returns 是否存在 blur data
 */
export function hasBlurData(imagePath: string): boolean {
  return getBlurDataURL(imagePath) !== undefined;
}
