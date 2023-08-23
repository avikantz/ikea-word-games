import { useEffect, useCallback, useState } from "react";

import { Score, Scores } from "@/interfaces";

const SCORES_KEY = "scores";

interface UseScoresProps {
  // TODO: refactor
  game: "jumble" | "bildval" | "scrabble";
  mode: string;
}

export const useScores = ({ game, mode }: UseScoresProps) => {
  const [scores, setScores] = useState<Scores>();

  // Populate scores on load
  useEffect(() => {
    const allScoresString = localStorage.getItem(SCORES_KEY);
    if (allScoresString) {
      const allScores = JSON.parse(allScoresString);
      // Get the scores for the game's mode
      if (game in allScores) {
        if (mode in allScores[game]) {
          setScores(allScores[game][mode] as Scores);
        }
      }
    }
  }, [game, mode]);

  const saveScore = useCallback(
    (score: number) => {
      const allScoresString = localStorage.getItem(SCORES_KEY);

      const newScore: Score = { value: score, date: new Date().toISOString() };
      const newScores: Scores = { highscore: newScore, scores: [newScore] };

      if (allScoresString) {
        const allScores = JSON.parse(allScoresString);

        if (game in allScores) {
          if (mode in allScores[game]) {
            let { highscore, scores } = allScores[game][mode] as Scores;

            // Update highscore if new score is higher
            if (score > highscore.value) {
              highscore = {
                value: score,
                date: new Date().toISOString(),
              };
            }

            // Add new score to list of scores and filter the list to the top 3
            scores = [
              ...scores,
              {
                value: score,
                date: new Date().toISOString(),
              },
            ]
              .sort((a, b) => b.value - a.value)
              .slice(0, 3);

            // Update new scores
            newScores.highscore = highscore;
            newScores.scores = scores;
          }
        }

        // Update local storage data
        localStorage.setItem(
          SCORES_KEY,
          JSON.stringify({
            ...allScores,
            [game]: {
              ...allScores[game],
              [mode]: newScores,
            },
          }),
        );
      }

      // Create new scores if none exist
      localStorage.setItem(
        SCORES_KEY,
        JSON.stringify({
          [game]: {
            [mode]: newScores,
          },
        }),
      );

      // Update local scores
      setScores(newScores);
    },
    [game, mode],
  );

  return { scores, saveScore };
};
