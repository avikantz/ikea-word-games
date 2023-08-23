export interface Score {
  value: number;
  date: string;
}

export interface Scores {
  highscore: Score;
  scores: Score[];
}
