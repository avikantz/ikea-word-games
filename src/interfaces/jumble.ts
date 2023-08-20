import { IKEAProduct } from "./product";

export type JUMBLE_MODE = "easy" | "medium" | "hard" | "insane";

export interface IKEAJumbleWord {
  word: string;
  shuffledWord: string;
  product: IKEAProduct;
}
