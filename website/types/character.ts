// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

/**
 * 角色数据类型定义
 * 可扩展的数据结构，支持未来添加新字段
 */

export interface Character {
  /** 角色 ID */
  id: string;

  /** 角色姓名 */
  name: string;

  /** 角色代号 */
  code: string;

  /** 角色别称 */
  nickname?: string;

  /** 颜色主题 */
  color: {
    /** 主色调（用于卡片边框、强调色等） */
    primary: string;
    /** 深色调（用于悬停效果等） */
    dark: string;
  };

  /** 角色定位/身份 */
  role: string;

  /** 种族（如"狐狸娘"、"猫娘"） */
  species?: string;

  /** 角色引言 */
  quote: string;

  /** 角色头像 URL（可选） */
  avatar?: string;

  /** 背景图片 URL（用于手风琴展示） */
  backgroundImage?: string;

  /** 简短描述（用于卡片展示） */
  description: string;

  /** 关键词标签 */
  keywords: string[];

  /** 扩展元数据（为未来功能预留） */
  meta?: {
    /** 机体型号 */
    bodyType?: string;
    /** 武器装备 */
    weapons?: string[];
    /** 特殊能力 */
    abilities?: string[];
    /** 其他自定义字段 */
    [key: string]: unknown;
  };
}

/**
 * 角色卡片显示数据（简化版）
 */
export interface CharacterCardData {
  id: string;
  name: string;
  code: string;
  role: string;
  color: {
    primary: string;
    dark: string;
  };
  quote: string;
  description: string;
  keywords: string[];
  backgroundImage?: string;
}

/**
 * API 响应类型
 */
export interface CharactersResponse {
  characters: Character[];
  total: number;
}

export interface CharacterResponse {
  character: Character;
}
