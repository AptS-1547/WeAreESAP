// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { test, expect } from "@playwright/test";

test.describe("角色页面", () => {
  test("应该成功加载角色列表页", async ({ page }) => {
    await page.goto("/characters");

    // 验证页面加载成功
    await page.waitForLoadState("networkidle");

    // 验证页面有内容
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // 验证 URL 正确
    await expect(page).toHaveURL(/\/characters$/);
  });

  test("应该能够点击角色进入详情页", async ({ page }) => {
    await page.goto("/characters");

    // 等待页面加载完成
    await page.waitForLoadState("networkidle");

    // 查找可点击的角色元素（使用 cursor-pointer class）
    const clickableElements = page.locator(".cursor-pointer");
    const count = await clickableElements.count();

    // 至少应该有一些可点击的角色元素
    expect(count).toBeGreaterThan(0);

    // 点击第一个可点击元素（角色卡片/手风琴项）
    await clickableElements.first().click();

    // 验证 URL 包含角色 ID
    await expect(page).toHaveURL(/\/characters\/\w+/);

    // 验证页面内容存在
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("应该显示角色基本信息", async ({ page }) => {
    // 访问已知存在的角色详情页
    await page.goto("/characters/1547");

    // 验证角色名称显示
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();

    // 验证页面有内容（段落或描述文本）
    const content = page.locator("p, article, section");
    await expect(content.first()).toBeVisible();
  });
});
