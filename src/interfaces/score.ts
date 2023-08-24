export interface Score {
  value: number;
  date: string;
}

export interface Scores {
  count: number;
  highscore: Score;
  scores: Score[];
}
