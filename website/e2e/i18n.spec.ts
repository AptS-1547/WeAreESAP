// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { test, expect } from "@playwright/test";

test.describe("国际化", () => {
  test("应该能够访问中文版本（默认 locale）", async ({ page }) => {
    await page.goto("/");

    // 中文版是默认 locale，URL 不包含 /zh-CN（localePrefix: "as-needed"）
    await expect(page).toHaveURL(/\/$/);

    // 验证页面包含中文内容
    const body = page.locator("body");
    const text = await body.textContent();

    // 检查是否包含中文字符
    expect(text).toMatch(/[\u4e00-\u9fa5]/);
  });

  test("应该能够访问英文版本", async ({ page }) => {
    await page.goto("/en");

    // 验证页面加载成功
    await expect(page).toHaveURL(/\/en/);

    // 验证页面标题
    await expect(page).toHaveTitle(/We Are ESAP/);
  });

  test("应该能够访问日文版本", async ({ page }) => {
    await page.goto("/ja");

    // 验证页面加载成功
    await expect(page).toHaveURL(/\/ja/);

    // 验证页面加载（可能回退到中文）
    await expect(page.locator("body")).toBeVisible();
  });

  test("切换语言后角色页面应该保持功能", async ({ page }) => {
    // 访问中文版角色页（默认 locale，URL 不带 /zh-CN）
    await page.goto("/characters/1547");
    await expect(page).toHaveURL(/\/characters\/1547/);

    // 切换到英文版
    await page.goto("/en/characters/1547");
    await expect(page).toHaveURL(/\/en\/characters\/1547/);

    // 验证页面内容存在
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });
});
