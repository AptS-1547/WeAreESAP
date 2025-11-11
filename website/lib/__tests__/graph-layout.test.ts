// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from "vitest";
import { getLayoutedElements } from "../graph-layout";
import { Node, Edge } from "reactflow";

describe("graph-layout", () => {
  describe("getLayoutedElements", () => {
    it("应该成功布局包含中心节点的图谱", async () => {
      const nodes: Node[] = [
        {
          id: "1",
          data: { label: "中心节点", isCenter: true },
          position: { x: 0, y: 0 },
          type: "custom",
        },
        {
          id: "2",
          data: { label: "普通节点1", isCenter: false },
          position: { x: 0, y: 0 },
          type: "custom",
        },
        {
          id: "3",
          data: { label: "普通节点2", isCenter: false },
          position: { x: 0, y: 0 },
          type: "custom",
        },
      ];

      const edges: Edge[] = [
        {
          id: "e1-2",
          source: "1",
          target: "2",
        },
        {
          id: "e1-3",
          source: "1",
          target: "3",
        },
      ];

      const layoutedNodes = await getLayoutedElements(nodes, edges);

      // 验证返回的节点数量
      expect(layoutedNodes.length).toBe(nodes.length);

      // 验证所有节点都有位置
      layoutedNodes.forEach((node) => {
        expect(node.position).toBeDefined();
        expect(typeof node.position.x).toBe("number");
        expect(typeof node.position.y).toBe("number");
      });

      // 验证中心节点存在
      const centerNode = layoutedNodes.find((n) => n.data.isCenter);
      expect(centerNode).toBeDefined();
    });

    it("应该处理空节点数组", async () => {
      const nodes: Node[] = [];
      const edges: Edge[] = [];

      const layoutedNodes = await getLayoutedElements(nodes, edges);

      expect(layoutedNodes.length).toBe(0);
    });

    it("应该处理只有一个节点的图谱", async () => {
      const nodes: Node[] = [
        {
          id: "1",
          data: { label: "单个节点", isCenter: true },
          position: { x: 0, y: 0 },
          type: "custom",
        },
      ];

      const edges: Edge[] = [];

      const layoutedNodes = await getLayoutedElements(nodes, edges);

      expect(layoutedNodes.length).toBe(1);
      expect(layoutedNodes[0].position).toBeDefined();
    });

    it("应该为节点分配不同的位置", async () => {
      const nodes: Node[] = [
        {
          id: "1",
          data: { label: "Node 1", isCenter: true },
          position: { x: 0, y: 0 },
          type: "custom",
        },
        {
          id: "2",
          data: { label: "Node 2", isCenter: false },
          position: { x: 0, y: 0 },
          type: "custom",
        },
        {
          id: "3",
          data: { label: "Node 3", isCenter: false },
          position: { x: 0, y: 0 },
          type: "custom",
        },
      ];

      const edges: Edge[] = [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e1-3", source: "1", target: "3" },
      ];

      const layoutedNodes = await getLayoutedElements(nodes, edges);

      // 验证节点位置都不同
      const positions = layoutedNodes.map(
        (n) => `${n.position.x},${n.position.y}`
      );
      const uniquePositions = new Set(positions);

      // 验证所有节点的位置都是唯一的
      expect(uniquePositions.size).toBe(nodes.length);
    });

    it("应该保留节点的原始数据", async () => {
      const nodes: Node[] = [
        {
          id: "1",
          data: { label: "Test", customField: "value", isCenter: false },
          position: { x: 0, y: 0 },
          type: "custom",
        },
      ];

      const edges: Edge[] = [];

      const layoutedNodes = await getLayoutedElements(nodes, edges);

      expect(layoutedNodes[0].data.label).toBe("Test");
      expect(layoutedNodes[0].data.customField).toBe("value");
      expect(layoutedNodes[0].id).toBe("1");
    });
  });
});
