"use client";

import React, { forwardRef } from "react";
import { Tag } from "@chakra-ui/react";
import { useTranslation } from "@/app/i18n/client";

// ---------------------------------------------------------------------------------------------------------------------

interface GameRoundProps {
  round: number;
  maxRounds: number;
}

export const GameRound = forwardRef<HTMLDivElement, GameRoundProps>(({ round, maxRounds }, ref) => {
  const { t } = useTranslation();
  return (
    <Tag ref={ref} size="lg" bg="blue.500" color="white">
      {t("rounds", { count: round, max: maxRounds })}
    </Tag>
  );
});
GameRound.displayName = "GameRound";

// ---------------------------------------------------------------------------------------------------------------------

interface GameMultiplierProps {
  multiplier: number;
}

export const GameMultiplier = forwardRef<HTMLDivElement, GameMultiplierProps>(({ multiplier }, ref) => {
  return (
    <Tag ref={ref} size="lg" bg="yellow.500" color="black">
      {multiplier}x
    </Tag>
  );
});
GameMultiplier.displayName = "GameMultiplier";

// ---------------------------------------------------------------------------------------------------------------------

interface GameScoreProps {
  score: number;
}

export const GameScore = forwardRef<HTMLDivElement, GameScoreProps>(({ score }, ref) => {
  const { t } = useTranslation();
  return (
    <Tag ref={ref} size="lg" bg="black" color="white">
      {t("score", { score })}
    </Tag>
  );
});
GameScore.displayName = "GameScore";
