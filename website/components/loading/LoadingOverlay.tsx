// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LoadingOverlayProps {
  /** 是否显示加载遮罩 */
  isLoading: boolean;
  /** 加载文本 */
  text?: string;
  /** LOGO 大小 */
  size?: number;
}

/**
 * 全屏加载遮罩组件
 * 用于页面级的加载状态
 */
export function LoadingOverlay({
  isLoading,
  text = "加载中...",
  size = 150,
}: LoadingOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-6">
            <LoadingSpinner size={size} withPulse={true} />
            {text && (
              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }
                }
                className="text-lg font-medium text-foreground"
              >
                {text}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
