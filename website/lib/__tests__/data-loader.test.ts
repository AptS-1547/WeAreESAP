// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from "vitest";
import {
  loadJsonFile,
  loadJsonFiles,
  loadJsonFileDirect,
} from "../data-loader";

describe("data-loader", () => {
  describe("loadJsonFile", () => {
    it("应该成功加载存在的 JSON 文件", async () => {
      const data = await loadJsonFile(
        ["data", "characters"],
        "1547.json",
        "zh-CN"
      );

      expect(data).not.toBeNull();
      expect(data).toHaveProperty("id", "1547");
      expect(data).toHaveProperty("name");
    });

    it("应该在 locale 文件不存在时回退到默认 locale", async () => {
      const data = await loadJsonFile(
        ["data", "characters"],
        "1547.json",
        "non-existent-locale"
      );

      // 应该回退到 zh-CN
      expect(data).not.toBeNull();
      expect(data).toHaveProperty("id", "1547");
    });

    it("应该在文件不存在时返回 null", async () => {
      const data = await loadJsonFile(
        ["data", "characters"],
        "non-existent-file.json",
        "zh-CN"
      );

      expect(data).toBeNull();
    });

    it("应该支持自定义回退 locale", async () => {
      const data = await loadJsonFile(
        ["data", "characters"],
        "1547.json",
        "en",
        "en" // 自定义回退 locale
      );

      expect(data).not.toBeNull();
    });
  });

  describe("loadJsonFiles", () => {
    it("应该成功加载目录下的所有 JSON 文件", async () => {
      const data = await loadJsonFiles(["data", "characters"], "zh-CN");

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // 验证第一个项目的结构
      const firstItem = data[0];
      expect(firstItem).toHaveProperty("id");
      expect(firstItem).toHaveProperty("name");
    });

    it("应该在目录不存在时回退到默认 locale", async () => {
      const data = await loadJsonFiles(
        ["data", "characters"],
        "non-existent-locale"
      );

      // 应该回退到 zh-CN
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it("应该支持过滤函数", async () => {
      interface TestCharacter {
        id: string;
        tier?: string;
      }

      const data = await loadJsonFiles<TestCharacter>(
        ["data", "characters"],
        "zh-CN",
        {
          filter: (item) => item.id === "1547",
        }
      );

      expect(data.length).toBe(1);
      expect(data[0].id).toBe("1547");
    });

    it("应该在目录不存在时返回空数组", async () => {
      const data = await loadJsonFiles(
        ["data", "non-existent-directory"],
        "zh-CN"
      );

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(0);
    });
  });

  describe("loadJsonFileDirect", () => {
    it("应该成功加载指定路径的 JSON 文件", async () => {
      const data = await loadJsonFileDirect([
        "data",
        "characters",
        "zh-CN",
        "1547.json",
      ]);

      expect(data).not.toBeNull();
      expect(data).toHaveProperty("id", "1547");
    });

    it("应该在文件不存在时返回 null", async () => {
      const data = await loadJsonFileDirect([
        "data",
        "characters",
        "zh-CN",
        "non-existent.json",
      ]);

      expect(data).toBeNull();
    });
  });
});
