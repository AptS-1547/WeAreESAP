// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { Character } from "@/types/character";
import { Icon } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CharacterRelationshipsProps {
  character: Character;
}

export function CharacterRelationships({
  character,
}: CharacterRelationshipsProps) {
  const t = useTranslations("characters");
  // 从 meta 读取关系信息
  const relationship = character.meta?.relationship as string | undefined;

  if (!relationship) {
    return null;
  }

  return (
    <section className="scroll-mt-24" id="relationships">
      <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
        <span
          className="w-2 h-8 rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${character.color.primary}, ${character.color.dark})`,
          }}
        />
        {t("detail.sections.relationships")}
      </h2>

      <div className="bg-muted rounded-2xl p-8 md:p-10">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {relationship}
          </p>
        </div>

        {/* TODO: 未来可以添加关系图谱可视化 */}
        <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border">
          <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="BarChart" size={20} className="text-muted-foreground" />
            {t("detail.relationships.visualizationPlaceholder")}
          </div>
        </div>
      </div>
    </section>
  );
}
