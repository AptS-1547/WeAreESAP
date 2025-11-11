// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from "vitest";
import { getCharacterRelationships } from "../relationship-parser";

describe("relationship-parser", () => {
  describe("getCharacterRelationships", () => {
    it("应该成功加载存在的关系数据", async () => {
      const relationships = await getCharacterRelationships("1547");

      expect(Array.isArray(relationships)).toBe(true);
      expect(relationships.length).toBeGreaterThan(0);

      // 验证第一个关系的结构
      const firstRel = relationships[0];
      expect(firstRel).toHaveProperty("targetId");
      expect(firstRel).toHaveProperty("type");
      expect(firstRel).toHaveProperty("label");
      expect(firstRel).toHaveProperty("description");
    });

    it("应该返回正确的关系类型", async () => {
      const relationships = await getCharacterRelationships("1547");

      // 检查是否有创造者关系
      const creatorRel = relationships.find((r) => r.type === "creator");
      expect(creatorRel).toBeDefined();
      expect(creatorRel?.targetId).toBe("1548");
    });

    it("应该在文件不存在时返回空数组", async () => {
      const relationships = await getCharacterRelationships("non-existent");

      expect(Array.isArray(relationships)).toBe(true);
      expect(relationships.length).toBe(0);
    });

    it("应该验证所有关系项都有必需字段", async () => {
      const relationships = await getCharacterRelationships("1547");

      relationships.forEach((rel) => {
        expect(rel.targetId).toBeTruthy();
        expect(rel.type).toBeTruthy();
        expect(rel.label).toBeTruthy();
        expect(rel.description).toBeTruthy();
      });
    });
  });
});
