// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

import { ComponentType } from "react";
import {
  // Lucide Icons
  LuGlobe,
  LuMessageCircle,
  LuUsers,
  LuTarget,
  LuBookOpen,
  LuMusic,
  LuMessageSquare,
  LuSettings,
  LuPenTool,
  LuCode,
  LuHand,
  LuBookMarked,
  LuPalette,
  LuStar,
  LuSparkles,
  LuLink,
  LuFileText,
  LuCog,
  LuBrain,
  LuBook,
  LuZap,
  LuCircle,
  LuChartBar,
} from "react-icons/lu";

import {
  // Heroicons
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
  HiExclamationTriangle,
} from "react-icons/hi2";

import {
  // Simple Icons
  SiGithub,
  SiDiscord,
} from "react-icons/si";

// 图标类型
export type IconName =
  // 平台图标
  | "Globe"
  | "Github"
  | "Discord"
  | "MessageCircle"
  | "Users"
  // 状态图标
  | "CheckCircle"
  | "XCircle"
  | "InfoCircle"
  | "Warning"
  // 功能图标
  | "Target"
  | "BookOpen"
  | "Music"
  | "MessageSquare"
  | "Settings"
  | "PenTool"
  | "Code"
  | "Hand"
  | "BookMarked"
  | "Palette"
  | "Star"
  | "Sparkles"
  | "Link"
  | "FileText"
  | "Cog"
  // 新增图标
  | "Brain"
  | "Book"
  | "Zap"
  | "Circle"
  | "BarChart";

// 图标映射表
const iconMap: Record<IconName, ComponentType<{ className?: string }>> = {
  // 平台图标 (Lucide + Simple Icons)
  Globe: LuGlobe,
  Github: SiGithub,
  Discord: SiDiscord,
  MessageCircle: LuMessageCircle,
  Users: LuUsers,

  // 状态图标 (Heroicons)
  CheckCircle: HiCheckCircle,
  XCircle: HiXCircle,
  InfoCircle: HiInformationCircle,
  Warning: HiExclamationTriangle,

  // 功能图标 (Lucide)
  Target: LuTarget,
  BookOpen: LuBookOpen,
  Music: LuMusic,
  MessageSquare: LuMessageSquare,
  Settings: LuSettings,
  PenTool: LuPenTool,
  Code: LuCode,
  Hand: LuHand,
  BookMarked: LuBookMarked,
  Palette: LuPalette,
  Star: LuStar,
  Sparkles: LuSparkles,
  Link: LuLink,
  FileText: LuFileText,
  Cog: LuCog,

  // 新增图标 (Lucide)
  Brain: LuBrain,
  Book: LuBook,
  Zap: LuZap,
  Circle: LuCircle,
  BarChart: LuChartBar,
};

export interface IconProps {
  /** 图标名称 */
  name: IconName;
  /** 图标大小（像素） */
  size?: number;
  /** 图标颜色 */
  color?: string;
  /** 额外的 CSS 类名 */
  className?: string;
}

/**
 * 统一的图标组件
 *
 * 使用方式:
 * ```tsx
 * <Icon name="Globe" size={24} />
 * <Icon name="CheckCircle" className="text-green-500" />
 * ```
 */
export function Icon({
  name,
  size = 20,
  color,
  className = "",
}: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  // 合并样式：尺寸和颜色通过内联样式，其他通过 className
  const combinedClassName = className;
  const style: React.CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    ...(color && { color }),
  };

  return (
    <span style={style} className={combinedClassName}>
      <IconComponent className="w-full h-full" />
    </span>
  );
}

/**
 * 检查图标名称是否存在
 */
export function hasIcon(name: string): name is IconName {
  return name in iconMap;
}
