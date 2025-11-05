// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LoadingSpinnerProps {
  /** 大小（像素） */
  size?: number;
  /** 是否显示脉冲效果 */
  withPulse?: boolean;
  /** 类名 */
  className?: string;
}

/**
 * 加载动画组件 - 使用 ESAP 三角形 LOGO
 * 支持旋转动画和脉冲效果
 */
export function LoadingSpinner({
  size = 120,
  withPulse = true,
  className = "",
}: LoadingSpinnerProps) {
  const shouldReduceMotion = useReducedMotion();
  const strokeWidth = 3;
  const gap = 8; // 边之间的间隙

  // 计算三角形的点（等边三角形）
  const height = (size * Math.sqrt(3)) / 2;

  // 三个顶点
  const top = { x: size / 2, y: 10 };
  const bottomLeft = { x: 10, y: height - 10 };
  const bottomRight = { x: size - 10, y: height - 10 };

  // 计算缩短的路径（留出间隙）
  const shortenPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    gapStart: number,
    gapEnd: number
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    const startX = x1 + (dx * gapStart) / length;
    const startY = y1 + (dy * gapStart) / length;
    const endX = x1 + (dx * (length - gapEnd)) / length;
    const endY = y1 + (dy * (length - gapEnd)) / length;

    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  // 三条边的路径
  const paths = [
    // 黄色 - 左边
    shortenPath(bottomLeft.x, bottomLeft.y, top.x, top.y, gap, gap),
    // 粉色 - 右边
    shortenPath(top.x, top.y, bottomRight.x, bottomRight.y, gap, gap),
    // 蓝色 - 底边
    shortenPath(
      bottomRight.x,
      bottomRight.y,
      bottomLeft.x,
      bottomLeft.y,
      gap,
      gap
    ),
  ];

  const colors = ["#ffd93d", "#ff69b4", "#4da6ff"]; // 黄、粉、蓝

  return (
    <motion.div
      className={className}
      animate={shouldReduceMotion ? {} : { rotate: 360 }}
      transition={
        shouldReduceMotion
          ? {}
          : {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }
      }
    >
      <svg
        width={size}
        height={height}
        viewBox={`0 0 ${size} ${height}`}
        fill="none"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={colors[i]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: shouldReduceMotion || !withPulse ? 1 : 0.3 }}
            animate={
              shouldReduceMotion || !withPulse
                ? undefined
                : {
                    opacity: [0.3, 1, 0.3],
                  }
            }
            transition={
              shouldReduceMotion || !withPulse
                ? undefined
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5, // 依次亮起
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </svg>
    </motion.div>
  );
}
