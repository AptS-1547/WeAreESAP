// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingWrapperProps {
  /** 是否正在加载 */
  isLoading: boolean;
  /** 加载完成后显示的内容 */
  children: ReactNode;
  /** 自定义加载组件（默认使用 LoadingSpinner） */
  loadingComponent?: ReactNode;
  /** 最小加载时间（毫秒），防止闪烁，默认 300ms */
  minLoadingTime?: number;
  /** 错误对象 */
  error?: Error | null;
  /** 自定义错误组件 */
  errorComponent?: ReactNode;
  /** 动画配置 */
  transition?: {
    /** 动画持续时间（秒） */
    duration?: number;
    /** 内容延迟时间（秒） */
    stagger?: number;
  };
  /** 类名 */
  className?: string;
}

/**
 * 通用加载包装器组件
 *
 * 高级功能：
 * - 支持自定义加载组件
 * - 支持最小加载时间（防止快速闪烁）
 * - 支持错误状态处理
 * - 支持自定义动画配置
 * - 自动处理加载→内容/错误的状态切换
 *
 * 使用场景：需要更灵活控制的加载场景
 *
 * @example
 * ```tsx
 * <LoadingWrapper
 *   isLoading={isLoadingTech}
 *   minLoadingTime={500}
 *   error={error}
 *   loadingComponent={<CustomLoader />}
 * >
 *   <TechModuleView data={techData} />
 * </LoadingWrapper>
 * ```
 */
export function LoadingWrapper({
  isLoading,
  children,
  loadingComponent,
  minLoadingTime = 300,
  error = null,
  errorComponent,
  transition = {},
  className = "",
}: LoadingWrapperProps) {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const {
    duration = 0.3,
    stagger = 0.1,
  } = transition;

  // 处理最小加载时间
  useEffect(() => {
    if (isLoading) {
      setLoadingStartTime(Date.now());
      setShowLoading(true);
    } else if (loadingStartTime !== null) {
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setShowLoading(false);
          setLoadingStartTime(null);
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        setShowLoading(false);
        setLoadingStartTime(null);
      }
    }
  }, [isLoading, loadingStartTime, minLoadingTime]);

  // 默认加载组件
  const defaultLoadingComponent = (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <LoadingSpinner size={120} withPulse={true} />
      <p className="text-lg font-medium text-muted-foreground">加载中...</p>
    </div>
  );

  // 默认错误组件
  const defaultErrorComponent = error ? (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="text-6xl">⚠️</div>
      <h3 className="text-xl font-semibold text-foreground">加载失败</h3>
      <p className="text-muted-foreground">{error.message || "发生了一个错误"}</p>
    </div>
  ) : null;

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration }}
          >
            {errorComponent || defaultErrorComponent}
          </motion.div>
        ) : showLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration }}
          >
            {loadingComponent || defaultLoadingComponent}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration, delay: stagger }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
