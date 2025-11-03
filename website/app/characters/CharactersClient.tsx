// Copyright 2025 AptS:1547, AptS:1548
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "@/components/ui";
import {
  CharacterAccordion,
  CharacterMobileView,
  CharacterCard,
} from "@/components/character";
import { CharacterCardData } from "@/types/character";

interface CharactersClientProps {
  accordionCharacters: CharacterCardData[];
  otherCharacters: CharacterCardData[];
}

export function CharactersClient({
  accordionCharacters,
  otherCharacters,
}: CharactersClientProps) {
  const router = useRouter();
  const { startTransition } = useTransition();

  const handleCharacterClick = (characterId: string) => {
    // 先触发过渡动画
    startTransition();
    // 然后跳转路由（pathname 变化时会自动结束过渡）
    router.push(`/characters/${characterId}`);
  };

  return (
    <>
      {/* 桌面端：手风琴展示 */}
      <section className="hidden md:block">
        <CharacterAccordion
          characters={accordionCharacters}
          onCharacterClick={handleCharacterClick}
        />
      </section>

      {/* 移动端：可折叠列表 */}
      <section className="md:hidden py-8">
        <CharacterMobileView
          characters={accordionCharacters}
          onCharacterClick={handleCharacterClick}
        />
      </section>

      {/* 其他角色：卡片网格展示（桌面端和移动端共用） */}
      {otherCharacters.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* 分组标题 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                其他成员
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-esap-yellow via-esap-pink to-esap-blue rounded-full mx-auto" />
            </div>

            {/* 响应式网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCharacters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={() => handleCharacterClick(character.id)}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
