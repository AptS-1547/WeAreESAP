// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useTransition } from "./TransitionContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * 页面过渡动画组件
 * 提供淡入淡出 + 滑动效果
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { finishTransition } = useTransition();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname} // 路由变化时重新渲染
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.4,
              ease: "easeInOut",
            }
      }
      onAnimationComplete={() => {
        // 页面进入动画完成后，结束全局过渡
        finishTransition();
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
